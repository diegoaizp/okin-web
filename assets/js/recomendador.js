/* OKIN · Recomendador «Encontrar mi pan» v0.5
   ----------------------------------------------------------------
   Una pantalla por pregunta (Negocio › Momento › Horneado › Requisitos) y una pantalla final
   con UNA recomendación que lleva a su ficha. Fondo blanco y lo mínimo en pantalla.

   - Las respuestas únicas pasan solas a la siguiente pantalla. Requisitos admite varias.
   - Solo se ofrecen las respuestas que dejan algún pan (con lo ya respondido).
   - Cada pantalla es un paso del historial: el «atrás» del navegador vuelve a la pregunta anterior.
   - URL: ?negocio=hosteleria&momento=desayuno&horneado=descongelar&req=clean&paso=resultado
     También entiende la de la home (?para=servir&momento=desayuno) y continúa desde ahí.
   Preguntas, respuestas y reglas son una PROPUESTA (ver README). */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const screen = $('#rkScreen');
  if (!screen || !window.OKIN) return;

  const P = OKIN.PRODUCTOS;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TIENDA = ['comercio', 'super'];
  const CONTACTO = 'https://www.okin.es/contacto';

  /* ---------- Preguntas ---------- */
  const OC = { desayuno: 'desayuno', brunch: 'brunch', pintxo: 'pintxo', comida: 'mesa', cena: 'mesa', bocata: 'bocadillo' };
  const Q = [
    { id: 'negocio', q: () => '¿Tu negocio?', help: () => 'Así sabemos qué formatos te convienen.', a: [
      ['hosteleria', 'Hostelería'], ['comercio', 'Pequeño comercio'], ['super', 'Supermercado'],
      ['distribuidor', 'Distribuidor'], ['industria', 'Industria']
    ] },
    { id: 'momento', q: s => TIENDA.includes(s.negocio) ? '¿Para qué lo compran?' : '¿Para qué lo usas?',
      help: s => TIENDA.includes(s.negocio) ? 'El momento en que tus clientes se lo comen.' : 'El momento en que lo sirves.', a: [
      ['desayuno', 'Desayuno'], ['brunch', 'Brunch'], ['pintxo', 'Pintxo'],
      ['comida', 'Comida y menú'], ['cena', 'Cena'], ['bocata', 'Bocata y burger']
    ] },
    { id: 'horneado', q: () => '¿Cómo lo haces?', help: () => 'Cómo preparas el pan antes de servirlo o venderlo.', a: [
      ['descongelar', 'Solo descongelar'], ['cinco', 'Horno 5 minutos'],
      ['largo', 'Horneado largo'], ['congelador', 'Tengo poco congelador']
    ] },
    { id: 'req', multi: true, q: () => '¿Qué necesitas?', help: () => 'Elige los que quieras, o continúa sin elegir.',
      a: Object.entries(OKIN.REQS).map(([k, r]) => [k, r.t]) }
  ];
  /* Imagen de cada respuesta: [archivo en assets/img, origen]. Se prioriza foto real de OKIN.
     «referencia» e «IA» son solo para el boceto: sustituir antes de publicar (ver README). */
  const IMG = {
    hosteleria: ['okin-mesa-servicio.jpg', 'OKIN · foto real'],
    comercio: ['okin-entrega-tienda.jpg', 'Imagen aportada · adaptación con IA'],
    super: ['ia-estanteria-hogazas.jpg', 'IA · referencia, no publicar'],
    distribuidor: ['okin-surtido-gastro.jpg', 'OKIN · foto real'],
    industria: ['okin-linea-operarias.jpg', 'OKIN · foto real'],
    desayuno: ['okin-desayuno-bufe.jpg', 'OKIN · foto real'],
    brunch: ['okin-desayuno-variado.jpg', 'OKIN · foto real'],
    pintxo: ['okin-aperitivo-bar.jpg', 'OKIN · foto real'],
    comida: ['menu-mesa-flash.jpg', 'Imagen adaptada con IA'],
    cena: ['slide-rustikos.jpg', 'OKIN · foto real'],
    bocata: ['fam-ready.jpg', 'OKIN · foto real'],
    descongelar: ['fam-gourmet.jpg', 'OKIN · foto real'],
    cinco: ['okin-bollos-pala.jpg', 'OKIN · foto real'],
    largo: ['okin-premiere.jpg', 'OKIN · foto real'],
    congelador: ['okin-logistica.jpg', 'OKIN · foto real'],
    sinsesamo: ['slide-akua.jpg', 'OKIN · foto real'],
    sinsemillas: ['okin-barras-mesa.jpg', 'OKIN · foto real'],
    consemillas: ['fam-zereal.jpg', 'OKIN · foto real'],
    integral: ['rebanadas-pila.jpg', 'Moodboard · referencia'],
    eko: ['slide-eko.jpg', 'OKIN · foto real'],
    clean: ['okin-barra-corazon.jpg', 'OKIN · foto real']
  };
  const LABEL = {};
  Q.forEach(q => q.a.forEach(([k, t]) => (LABEL[q.id + ':' + k] = t)));
  const label = (id, k) => LABEL[id + ':' + k] || k;
  const EXCLUYE = { sinsemillas: ['consemillas', 'sinsesamo'], consemillas: ['sinsemillas'], sinsesamo: ['sinsemillas'] };
  const RES = Q.length;   // índice de la pantalla de resultado

  /* ---------- Estado desde la URL (y parámetros de la home) ---------- */
  const url = new URLSearchParams(location.search);
  const state = { negocio: null, momento: null, horneado: null, req: [] };
  const valid = (id, k) => Q.find(q => q.id === id).a.some(a => a[0] === k);
  ['negocio', 'momento', 'horneado'].forEach(id => { const v = url.get(id); if (v && valid(id, v)) state[id] = v; });
  state.req = (url.get('req') || '').split(',').filter(k => valid('req', k));
  const PARA = { servir: 'hosteleria', vender: 'comercio', catalogo: 'distribuidor' };
  const HOME = { aperitivo: ['momento', 'pintxo'], mesa: ['momento', 'comida'], bocadillo: ['momento', 'bocata'],
    sinhorno: ['horneado', 'descongelar'], ready: ['horneado', 'descongelar'], horno: ['horneado', 'largo'],
    saludable: ['req', 'consemillas'] };
  if (!state.negocio && PARA[url.get('para')]) state.negocio = PARA[url.get('para')];
  const hm = url.get('momento');
  if (hm && HOME[hm]) { const [id, v] = HOME[hm]; if (id === 'req') state.req.push(v); else state[id] = v; }

  /* ---------- Reglas ---------- */
  function checks(s) {
    const c = [];
    if (s.momento) c.push({ id: 'momento', k: s.momento, ok: p => p.oc.includes(OC[s.momento]) });
    if (s.horneado === 'descongelar') c.push({ id: 'horneado', k: 'descongelar', ok: p => p.bake === 0 });
    if (s.horneado === 'cinco') c.push({ id: 'horneado', k: 'cinco', ok: p => p.bake <= 5 });
    s.req.forEach(k => c.push({ id: 'req', k, ok: OKIN.REQS[k].ok }));
    return c;
  }
  const matches = s => { const c = checks(s); return P.filter(p => c.every(x => x.ok(p))); };

  function score(p, s) {
    let n = 0;
    if (s.negocio === 'hosteleria') n += (p.sellos.includes('caja') ? 1 : 0) + (p.g <= 130 ? 1 : 0);
    if (TIENDA.includes(s.negocio)) n += (p.g >= 200 ? 2 : 0) + (p.bake === 0 && s.negocio === 'comercio' ? 1 : 0);
    if (s.negocio === 'distribuidor') n += p.oc.length;
    if (s.negocio === 'industria') n += (p.oc.includes('bocadillo') ? 2 : 0) + (p.bake === 0 ? 1 : 0);
    if (s.momento === 'desayuno') n += p.g >= 200 ? 2 : 0;       // tostadas: mejor de barra
    if (s.momento === 'pintxo') n += p.g <= 65 ? 2 : 0;
    if (s.momento === 'bocata') n += p.g >= 100 && p.g <= 140 ? 1 : 0;
    if (s.horneado === 'cinco') n += p.bake > 0 ? 2 : 0;
    if (s.horneado === 'largo') n += p.bake > 5 ? 2 : 0;
    if (s.horneado === 'congelador') n += p.box <= 32 ? 2 : 0;
    n += p.nuevo ? .5 : 0;
    return n;
  }
  const ranked = s => matches(s).sort((a, b) => score(b, s) - score(a, s));

  function reasons(p, s) {
    const r = [];
    if (s.momento) r.push(`Pensado para ${label('momento', s.momento).toLowerCase()}.`);
    if (p.bake === 0) r.push(`Se sirve tras ${p.thaw} minutos descongelando, sin horno.`);
    else if (s.horneado === 'cinco' || s.horneado === 'largo') r.push(`${p.bake} minutos a ${p.temp} ºC y sale recién horneado.`);
    if (s.horneado === 'congelador') r.push(`Caja de ${p.box} unidades: pides lo que vas a usar.`);
    if (s.req.includes('consemillas')) r.push(p.sem === 'sesamo' ? 'Con semillas de lino, sésamo y amapola.' : 'Con semillas en la miga.');
    if (s.req.includes('sinsemillas')) r.push('Sin semillas.');
    else if (s.req.includes('sinsesamo')) r.push('Sin sésamo en la receta.');
    if (s.req.includes('clean')) r.push('Clean label: sin aditivos ni conservantes.');
    if (s.negocio === 'hosteleria' && p.sellos.includes('caja')) r.push('Formato caja para hostelería.');
    if (TIENDA.includes(s.negocio) && p.g >= 200) r.push(`Pieza de ${p.g} g, pensada para vender entera.`);
    if (s.negocio === 'distribuidor') r.push(`${p.box} unidades por caja y ${p.pal} cajas por palet.`);
    if (s.negocio === 'industria' && p.oc.includes('bocadillo')) r.push('Se corta y se rellena sin desmigarse.');
    if (r.length < 2 && p.sellos.includes('doble')) r.push('Doble fermentación: más aroma y mejor corteza.');
    return r.slice(0, 3);
  }

  /* ---------- URL e historial ---------- */
  let cur = 0;
  const qs = (withStep = true) => {
    const u = new URLSearchParams();
    ['negocio', 'momento', 'horneado'].forEach(id => state[id] && u.set(id, state[id]));
    if (state.req.length) u.set('req', state.req.join(','));
    if (withStep) u.set('paso', cur === RES ? 'resultado' : cur + 1);
    return u.toString();
  };
  const save = push => history[push ? 'pushState' : 'replaceState']({ cur }, '', location.pathname + '?' + qs());
  addEventListener('popstate', e => {
    if (e.state && typeof e.state.cur === 'number') show(e.state.cur, false);
  });

  /* ---------- Pantallas ---------- */
  const bar = $('#rkBar');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function questionHTML(i) {
    const q = Q[i];
    const opts = q.a.filter(([k]) => {
      if (q.id === 'negocio') return true;
      const on = q.multi ? state.req.includes(k) : state[q.id] === k;
      if (on) return true;
      const t = { ...state, req: [...state.req] };
      if (q.multi) t.req = [...t.req.filter(x => !(EXCLUYE[k] || []).includes(x)), k]; else t[q.id] = k;
      return matches(t).length > 0;     // solo respuestas que dejan algún pan
    });
    return `<section class="rk-q" aria-labelledby="rkTitle">
      <p class="rk-step">Pregunta ${i + 1} de ${Q.length}</p>
      <h1 class="rk-title" id="rkTitle" tabindex="-1">${q.q(state)}</h1>
      <p class="rk-help">${q.help(state)}</p>
      <ul class="rk-opts${q.multi ? ' rk-opts--multi' : ''}" style="--cols:${opts.length <= 5 ? opts.length : 3}">
        ${opts.map(([k, t]) => {
          const on = q.multi ? state.req.includes(k) : state[q.id] === k;
          return `<li><button type="button" class="rk-opt" data-k="${k}" aria-pressed="${on}">
            <span class="rk-opt__img" data-src-tag="${IMG[k] ? IMG[k][1] : ''}">${IMG[k] ? `<img src="assets/img/recomendador/${IMG[k][0].replace(/\.\w+$/, '.jpg')}" alt="" decoding="async">` : ''}</span>
            ${q.multi ? '<span class="rk-box" aria-hidden="true"><span class="ms">check</span></span>' : ''}
            <span class="rk-opt__foot">
              <span class="rk-opt__t">${t}</span>
              ${q.multi ? '' : `<span class="ms rk-opt__go" aria-hidden="true">${on ? 'check' : 'arrow_forward'}</span>`}
            </span>
          </button></li>`;
        }).join('')}
      </ul>
      <div class="rk-nav">
        ${i > 0 ? '<button type="button" class="rk-back" data-back><span class="ms" aria-hidden="true">arrow_back</span>Anterior</button>' : '<span></span>'}
        ${q.multi
          ? `<button type="button" class="btn btn--yellow" data-next><span class="btn__label">Ver mi pan</span><span class="btn__icon" aria-hidden="true"><span class="ms">arrow_forward</span></span></button>`
          : (state[q.id] ? '<button type="button" class="rk-back rk-back--next" data-next>Siguiente<span class="ms" aria-hidden="true">arrow_forward</span></button>' : '')}
      </div>
    </section>`;
  }

  function resultHTML() {
    // Si nada cumple todo (solo puede pasar llegando por URL), se relaja de atrás adelante
    let list = ranked(state), dropped = [], used = state;
    const tries = [{ ...state, req: [] }, { ...state, req: [], horneado: null }, { ...state, req: [], horneado: null, momento: null }];
    for (let t = 0; !list.length && t < tries.length; t++) {
      list = ranked(tries[t]);
      if (list.length) { used = tries[t]; dropped = checks(state).filter(c => !checks(used).some(x => x.id === c.id && x.k === c.k)); }
    }
    const [p, ...rest] = list;
    const ficha = p.url ? `${p.url}?${qs(false)}` : OKIN.href(p);
    const ext = x => x.url ? '' : ' target="_blank" rel="noopener"';
    const answers = [
      state.negocio && label('negocio', state.negocio), state.momento && label('momento', state.momento),
      state.horneado && label('horneado', state.horneado), ...state.req.map(k => label('req', k))
    ].filter(Boolean);
    const prep = p.bake === 0 ? `<span class="ms" aria-hidden="true">ac_unit</span>Sin horno · ${p.thaw} min descongelando`
                              : `<span class="ms" aria-hidden="true">local_fire_department</span>${p.thaw} min + ${p.bake} min de horno`;
    return `<section class="rk-res" aria-labelledby="rkTitle">
      <figure class="rk-res__img"><img src="${OKIN.img(p)}" alt="${esc(p.n)}" width="553" height="745"></figure>
      <div class="rk-res__body">
        <p class="rk-step">Te recomendamos</p>
        <h1 class="rk-title rk-res__name" id="rkTitle" tabindex="-1">${p.n}</h1>
        <p class="rk-res__meta">Ref. ${p.ref} · ${p.g} g · ${p.box} uds/caja</p>
        <p class="rk-res__prep">${prep}</p>
        ${dropped.length ? `<p class="rk-res__note">No tenemos uno que cumpla también «${dropped.map(d => label(d.id, d.k)).join('», «')}». Este es el más cercano.</p>` : ''}
        <ul class="rk-res__why">${reasons(p, used).map(r => `<li>${r}</li>`).join('')}</ul>
        <div class="rk-res__ctas">
          <a class="btn btn--yellow" href="${ficha}"${ext(p)}><span class="btn__label">Ver la ficha</span><span class="btn__icon" aria-hidden="true"><span class="ms">arrow_forward</span></span></a>
          <a class="rk-link" href="${CONTACTO}" target="_blank" rel="noopener">Prefiero hablar con el equipo</a>
        </div>
        ${rest.length ? `<div class="rk-res__more"><p>También te pueden encajar</p>
          ${rest.slice(0, 2).map(x => `<a href="${x.url ? x.url + '?' + qs(false) : OKIN.href(x)}"${ext(x)}>${x.n}<span>${x.g} g · ${x.bake === 0 ? 'sin horno' : 'horno ' + x.bake + ' min'}</span></a>`).join('')}
        </div>` : ''}
        <div class="rk-res__ans">
          <span>${answers.join(' · ') || 'Sin respuestas'}</span>
          <button type="button" class="rk-link" data-goto="0">Cambiar respuestas</button>
          <button type="button" class="rk-link" data-reset>Empezar de nuevo</button>
        </div>
      </div>
    </section>`;
  }

  let busy = false;
  function show(i, push = true, focus = true) {
    cur = Math.max(0, Math.min(RES, i));
    bar.style.width = `${(cur / RES) * 100}%`;
    document.title = (cur === RES ? 'Tu pan' : `Pregunta ${cur + 1} de ${Q.length}`) + ' · Encontrar mi pan · OKIN';
    const paint = () => {
      screen.innerHTML = cur === RES ? resultHTML() : questionHTML(cur);
      screen.classList.remove('is-out');
      screen.classList.add('is-in');
      scrollTo(0, 0);
      if (focus) $('#rkTitle', screen)?.focus({ preventScroll: true });
      busy = false;
    };
    if (push !== null) save(push);
    if (reduced || !screen.innerHTML) return paint();
    busy = true;
    screen.classList.remove('is-in');
    screen.classList.add('is-out');
    setTimeout(paint, 220);
  }

  screen.addEventListener('click', e => {
    if (busy) return;
    const opt = e.target.closest('.rk-opt');
    if (opt) {
      const q = Q[cur], k = opt.dataset.k;
      if (q.multi) {
        const on = state.req.includes(k);
        state.req = on ? state.req.filter(x => x !== k) : [...state.req.filter(x => !(EXCLUYE[k] || []).includes(x)), k];
        screen.innerHTML = questionHTML(cur);           // repinta sin transición
        $(`.rk-opt[data-k="${k}"]`, screen)?.focus();
        save(false);
        return;
      }
      state[q.id] = k;
      // Si al cambiar una respuesta ya no queda ningún pan, se borran las respuestas siguientes
      if (!matches(state).length) { Q.slice(cur + 1).forEach(x => (x.multi ? (state.req = []) : (state[x.id] = null))); }
      opt.setAttribute('aria-pressed', 'true');
      $('.rk-opt__go', opt).textContent = 'check';
      screen.querySelectorAll('.rk-opt').forEach(o => o !== opt && o.setAttribute('aria-pressed', 'false'));
      busy = true;
      setTimeout(() => { busy = false; show(cur + 1); }, reduced ? 0 : 240);
      return;
    }
    if (e.target.closest('[data-back]')) return show(cur - 1);
    if (e.target.closest('[data-next]')) return show(cur + 1);
    const g = e.target.closest('[data-goto]');
    if (g) return show(+g.dataset.goto);
    if (e.target.closest('[data-reset]')) {
      Object.assign(state, { negocio: null, momento: null, horneado: null, req: [] });
      return show(0);
    }
  });

  /* ---------- Arranque ---------- */
  const paso = url.get('paso');
  let start;
  if (paso === 'resultado') start = RES;
  else if (+paso >= 1 && +paso <= Q.length) start = +paso - 1;
  else { const f = Q.findIndex(q => !q.multi && !state[q.id]); start = f === -1 ? Q.length - 1 : f; }
  // El primer paso sustituye la entrada del historial (no añade una)
  show(start, false, false);
})();
