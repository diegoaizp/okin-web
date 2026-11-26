/* OKIN · Catálogo «Elige tu pan» v0.2 (simplificado: sin entradas rápidas; buscador en la columna de filtros)
   Filtros por facetas (O dentro de un grupo, Y entre grupos), con recuento por opción.
   El estado vive en la URL: panes.html?ocasion=desayuno&preparacion=ready se puede enlazar
   desde la home, el menú, el recomendador o una campaña. */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const { PRODUCTOS: P, FAMILIAS, OCASIONES, SELLOS, PREPS, FORMATOS } = OKIN;
  const TOTAL = 122; // catálogo real en okin.es
  const norm = t => String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  /* ---------- Grupos de filtros ---------- */
  const GROUPS = {
    ocasion:     { label: 'Ocasión',     opts: OCASIONES, test: (p, k) => p.oc.includes(k) },
    preparacion: { label: 'Preparación', opts: PREPS,     test: (p, k) => OKIN.prep(p) === k },
    formato:     { label: 'Formato',     opts: FORMATOS,  test: (p, k) => OKIN.formato(p) === k },
    familia:     { label: 'Familia',     opts: FAMILIAS,  test: (p, k) => p.fam === k },
    elaboracion: { label: 'Elaboración', opts: pick(SELLOS, ['masa', 'doble', 'larga', 'hidra', 'suela', 'clean']), test: (p, k) => p.sellos.includes(k) },
    negocio:     { label: 'Para tu negocio', opts: { caja: 'Caja hostelería' }, test: (p, k) => p.sellos.includes(k) }
  };
  function pick(o, keys) { return Object.fromEntries(keys.map(k => [k, o[k]])); }

  /* ---------- Estado (desde la URL) ---------- */
  const url = new URLSearchParams(location.search);
  const state = { q: url.get('q') || '', sort: url.get('orden') || 'rec', sel: {}, cmp: [] };
  Object.keys(GROUPS).forEach(g => {
    state.sel[g] = new Set((url.get(g) || '').split(',').filter(k => k in GROUPS[g].opts));
  });
  state.cmp = (url.get('comparar') || '').split(',').filter(s => P.some(p => p.slug === s)).slice(0, 4);

  function syncURL() {
    const u = new URLSearchParams();
    if (state.q) u.set('q', state.q);
    Object.keys(GROUPS).forEach(g => { if (state.sel[g].size) u.set(g, [...state.sel[g]].join(',')); });
    if (state.sort !== 'rec') u.set('orden', state.sort);
    if (state.cmp.length) u.set('comparar', state.cmp.join(','));
    const qs = u.toString().replace(/%2C/g, ',');
    history.replaceState(null, '', location.pathname + (qs ? '?' + qs : ''));
  }

  /* ---------- Filtrado ---------- */
  const matchQ = p => !state.q || norm(`${p.n} ${p.ref} ${FAMILIAS[p.fam]}`).includes(norm(state.q.trim()));
  const matchGroup = (p, g) => !state.sel[g].size || [...state.sel[g]].some(k => GROUPS[g].test(p, k));
  const matchAll = (p, except) => matchQ(p) && Object.keys(GROUPS).every(g => g === except || matchGroup(p, g));
  const activeCount = () => Object.values(state.sel).reduce((n, s) => n + s.size, 0);

  const SORTS = {
    rec: (a, b) => P.indexOf(a) - P.indexOf(b),
    new: (a, b) => (b.nuevo ? 1 : 0) - (a.nuevo ? 1 : 0) || P.indexOf(a) - P.indexOf(b),
    'g-asc': (a, b) => a.g - b.g,
    'g-desc': (a, b) => b.g - a.g,
    az: (a, b) => a.n.localeCompare(b.n, 'es')
  };

  /* ---------- Pintar filtros ---------- */
  const form = $('#filtersForm');
  function renderFilters() {
    Object.entries(GROUPS).forEach(([g, def]) => {
      const box = $(`[data-group="${g}"] .fgroup__opts`, form);
      box.innerHTML = Object.entries(def.opts).map(([k, label]) => {
        const n = P.filter(p => matchAll(p, g) && def.test(p, k)).length;
        const on = state.sel[g].has(k);
        return `<label class="fopt${n || on ? '' : ' is-zero'}${on ? ' is-on' : ''}">
          <input type="checkbox" name="${g}" value="${k}"${on ? ' checked' : ''}${n || on ? '' : ' disabled'}>
          <span>${label}</span><small>${n}</small></label>`;
      }).join('');
    });
  }
  form.addEventListener('change', e => {
    const i = e.target;
    if (!i.name || !(i.name in GROUPS)) return;
    state.sel[i.name][i.checked ? 'add' : 'delete'](i.value);
    update();
  });

  /* ---------- Buscador y orden ---------- */
  const q = $('#catQ'), sort = $('#sort');
  q.value = state.q; sort.value = state.sort;
  let qt;
  q.addEventListener('input', () => { clearTimeout(qt); qt = setTimeout(() => { state.q = q.value; update(); }, 120); });
  sort.addEventListener('change', () => { state.sort = sort.value; update(); });

  /* ---------- Resultados ---------- */
  const grid = $('#grid'), empty = $('#empty'), count = $('#count'), chips = $('#activeChips');


  function renderResults() {
    const list = P.filter(p => matchAll(p)).sort(SORTS[state.sort] || SORTS.rec);
    const cards = list.map(p => OKIN.card(p));
    grid.innerHTML = cards.join('');
    grid.hidden = !list.length;
    empty.hidden = !!list.length;

    const filtered = activeCount() || state.q;
    count.innerHTML = filtered
      ? `${list.length} de ${P.length} ${list.length === 1 ? 'pan' : 'panes'}`
      : `${TOTAL} panes <span>· muestra de ${P.length} en el prototipo</span>`;
    $('#filtersApplyLabel').textContent = list.length ? `Ver ${list.length} ${list.length === 1 ? 'pan' : 'panes'}` : 'Ningún pan';

    const fc = $('#filtersCount');
    fc.hidden = !activeCount(); fc.textContent = activeCount();

    const items = [];
    if (state.q) items.push(`<button type="button" data-clear="q">«${state.q.replace(/</g, '&lt;')}»<span class="ms" aria-hidden="true">close</span></button>`);
    Object.entries(state.sel).forEach(([g, set]) => set.forEach(k =>
      items.push(`<button type="button" data-g="${g}" data-k="${k}" aria-label="Quitar ${GROUPS[g].opts[k]}">${GROUPS[g].opts[k]}<span class="ms" aria-hidden="true">close</span></button>`)));
    if (items.length > 1) items.push('<button type="button" class="active__clear" data-clear="all">Quitar todo</button>');
    chips.innerHTML = items.join('');
    syncCompare();
  }
  chips.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.clear === 'all') return reset();
    if (b.dataset.clear === 'q') { state.q = ''; q.value = ''; }
    else state.sel[b.dataset.g].delete(b.dataset.k);
    update();
  });

  function reset() {
    Object.values(state.sel).forEach(s => s.clear());
    state.q = ''; q.value = '';
    update();
  }
  $('#filtersReset').addEventListener('click', reset);
  $('#emptyReset').addEventListener('click', reset);

  function update() { renderFilters(); renderResults(); syncURL(); }

  function scrollToResults() {
    const t = $('.toolbar');
    if (t.getBoundingClientRect().top > innerHeight * .6) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------- Filtros en móvil: hoja a pantalla completa ---------- */
  const filters = $('#filters'), openBtn = $('#filtersOpen');
  function setFilters(open) {
    filters.classList.toggle('is-open', open);
    document.body.classList.toggle('filters-open', open);
    openBtn.setAttribute('aria-expanded', open);
    if (open) $('#filtersClose').focus(); else openBtn.focus();
  }
  openBtn.addEventListener('click', () => setFilters(true));
  $('#filtersClose').addEventListener('click', () => setFilters(false));
  $('#filtersApply').addEventListener('click', () => { setFilters(false); scrollToResults(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && filters.classList.contains('is-open')) setFilters(false); });
  // En móvil, los grupos largos empiezan cerrados
  if (matchMedia('(max-width: 900px)').matches) $$('.fgroup', form).slice(3).forEach(d => d.open = false);

  /* ---------- Cargar más (prototipo) ---------- */
  $('#loadMore').addEventListener('click', () => { $('#moreNote').hidden = false; });

  /* ---------- Comparar (hasta 4) ---------- */
  const tray = $('#tray'), trayList = $('#trayList'), dlg = $('#cmp');
  grid.addEventListener('change', e => {
    const i = e.target;
    if (i.type !== 'checkbox') return;
    if (i.checked && state.cmp.length < 4) state.cmp.push(i.value);
    else state.cmp = state.cmp.filter(s => s !== i.value);
    syncCompare(); syncURL();
  });
  function syncCompare() {
    const full = state.cmp.length >= 4;
    $$('.prod', grid).forEach(card => {
      const on = state.cmp.includes(card.dataset.slug), box = $('input', card);
      card.classList.toggle('is-cmp', on);
      if (!box) return;
      box.checked = on;
      box.disabled = full && !on;
      box.nextElementSibling.textContent = on ? 'Para comparar' : full ? 'Máximo 4' : 'Comparar';
    });
    tray.hidden = !state.cmp.length;
    document.body.classList.toggle('has-tray', !!state.cmp.length);
    $('#trayN').textContent = state.cmp.length;
    $('#trayGo').disabled = state.cmp.length < 2;
    $('#trayGo').style.opacity = state.cmp.length < 2 ? .5 : '';
    trayList.innerHTML = state.cmp.map(s => P.find(p => p.slug === s)).map(p =>
      `<li><img src="${OKIN.img(p)}" alt="">${p.n}<button type="button" data-rm="${p.slug}" aria-label="Quitar ${p.n}"><span class="ms" aria-hidden="true">close</span></button></li>`).join('');
  }
  trayList.addEventListener('click', e => {
    const b = e.target.closest('[data-rm]');
    if (!b) return;
    state.cmp = state.cmp.filter(s => s !== b.dataset.rm);
    syncCompare(); syncURL();
  });
  $('#trayClear').addEventListener('click', () => { state.cmp = []; syncCompare(); syncURL(); });

  const ROWS = [
    ['Referencia', p => p.ref],
    ['Familia', p => FAMILIAS[p.fam]],
    ['Preparación', p => (p.bake === 0 ? '<span class="ms" aria-hidden="true">ac_unit</span> ' : '<span class="ms" aria-hidden="true">local_fire_department</span> ') + PREPS[OKIN.prep(p)]],
    ['Descongelación', p => `${p.thaw} min`],
    ['Horneado', p => p.bake === 0 ? 'No necesita' : `${p.bake} min a ${p.temp} ºC`],
    ['Peso', p => `${p.g} g`],
    ['Medidas', p => `${OKIN.num(p.l)}${p.w ? ' × ' + OKIN.num(p.w) : ''} cm`],
    ['Uds. por caja', p => p.box],
    ['Cajas por palet', p => p.pal],
    ['Uds. por palet', p => (p.box * p.pal).toLocaleString('es-ES')],
    ['Ocasiones', p => p.oc.map(k => OCASIONES[k]).join(', ')],
    ['Elaboración', p => p.sellos.filter(k => k !== 'ready' && k !== 'caja').map(k => SELLOS[k]).join(', ')]
  ];
  $('#trayGo').addEventListener('click', () => {
    if (state.cmp.length < 2) return;
    const ps = state.cmp.map(s => P.find(p => p.slug === s));
    const head = `<thead><tr><th></th>${ps.map(p => `<th><a href="${OKIN.href(p)}"${p.url ? '' : ' target="_blank" rel="noopener"'}><img src="${OKIN.img(p)}" alt=""><b>${p.n}</b><small>${p.ref}</small></a></th>`).join('')}</tr></thead>`;
    const body = ROWS.map(([label, f]) => {
      const vals = ps.map(f);
      const same = new Set(vals.map(String)).size === 1;
      return `<tr${same ? ' class="is-same"' : ''}><th scope="row">${label}</th>${vals.map(v => `<td>${v}</td>`).join('')}</tr>`;
    }).join('');
    $('#cmpTable').innerHTML = head + '<tbody>' + body + '</tbody>';
    dlg.showModal();
  });
  $('#cmpClose').addEventListener('click', () => dlg.close());
  $('#cmpOnly').addEventListener('change', e => dlg.classList.toggle('cmp__only', e.target.checked));
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

  update();
})();
