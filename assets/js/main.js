/* OKIN · Home v0.3 */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  requestAnimationFrame(() => document.body.classList.add('is-loaded'));
  // ?shot → modo captura (altura de hero fija y todo visible), sólo para revisión
  const shot = new URLSearchParams(location.search).get('shot');
  if (shot !== null) document.documentElement.classList.add('shot');
  if (shot) document.documentElement.style.setProperty('--shot-h', shot + 'px');

  /* ---------- Vídeo de apertura: horizontal / vertical + capítulos ---------- */
  const video = $('#heroVideo');
  const toggle = $('#heroToggle');
  if (video && toggle) {
  const portrait = matchMedia('(max-aspect-ratio: 4/5)');

  const landscapePoster = video.poster;

  function setSource() {
    const v = portrait.matches;
    const src = v ? video.dataset.srcV : video.dataset.srcH;
    if (video.getAttribute('src') === src) return;
    video.poster = v ? video.dataset.posterV : landscapePoster;
    video.src = src;
    if (!reduced) video.play().catch(() => {});
  }
  setSource();
  portrait.addEventListener('change', setSource);

  if (reduced) { video.pause(); toggle.textContent = 'Reproducir'; }

  function setPlaying(on) {
    toggle.textContent = on ? 'Pausa' : 'Reproducir';
    toggle.setAttribute('aria-label', on ? 'Pausar vídeo' : 'Reproducir vídeo');
  }
  toggle.addEventListener('click', () => {
    if (video.paused) { video.play(); setPlaying(true); } else { video.pause(); setPlaying(false); }
  });
  }

  /* ---------- Cabecera v0.2 ---------- */
  const header = $('#header');
  const scrim = $('#scrim');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const menuBtn = $('#menuBtn'), menu = $('#mobileMenu');
  let pastHero = false;

  // Sólida al salir del hero
  // --header-h es un calc() (barra secundaria + fila principal): se mide la cabecera
  const hh = header.offsetHeight || 72;
  // Páginas sin hero (catálogo, ficha): la cabecera es sólida desde el principio
  const hero = $('#hero');
  if (hero) {
    new IntersectionObserver(([e]) => {
      pastHero = !e.isIntersecting;
      header.classList.toggle('is-solid', pastHero);
      document.body.classList.toggle('past-hero', pastHero);
      if (!pastHero) header.classList.remove('is-hidden');
    }, { rootMargin: `-${hh}px 0px 0px 0px` }).observe(hero);
  } else {
    pastHero = true;
    header.classList.add('is-solid');
    document.body.classList.add('past-hero');
  }

  // Se esconde al bajar y vuelve al subir
  let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY, dy = y - lastY;
    if (Math.abs(dy) < 6) return;
    const busy = header.classList.contains('is-open') || document.body.classList.contains('menu-open');
    header.classList.toggle('is-hidden', pastHero && dy > 0 && !busy);
    if (dy > 0 && pastHero && !busy) closePops();
    lastY = y;
  }, { passive: true });

  // Estado «abierto» (fondo sólido + velo) según lo que haya desplegado
  function syncOpen() {
    const open = $$('.panel, #search').some(el => !el.hidden);
    header.classList.toggle('is-open', open);
    scrim.hidden = !open;
  }

  // Paneles de las puertas (Actualidad es un enlace directo, sin panel)
  const doors = $$('.door[data-panel]');
  const openDoor = () => doors.find(d => d.getAttribute('aria-expanded') === 'true');
  function openPanel(name) {
    if (name) { closeSearch(); closePops(); }
    doors.forEach(d => {
      const on = d.dataset.panel === name;
      d.setAttribute('aria-expanded', on);
      $('#panel-' + d.dataset.panel).hidden = !on;
    });
    syncOpen();
  }
  const closePanels = () => openPanel(null);
  let hoverT;
  doors.forEach(d => {
    d.addEventListener('click', () => openPanel(d.getAttribute('aria-expanded') === 'true' ? null : d.dataset.panel));
    d.addEventListener('mouseenter', () => {
      if (!fine.matches) return;
      clearTimeout(hoverT);
      // Si ya hay uno abierto cambia al instante; si no, pequeña intención de 140 ms
      hoverT = setTimeout(() => openPanel(d.dataset.panel), openDoor() ? 0 : 140);
    });
    d.addEventListener('mouseleave', () => { if (!openDoor()) clearTimeout(hoverT); });
  });
  // Pasar por una puerta-enlace cierra el panel abierto
  $$('a.door').forEach(a => a.addEventListener('mouseenter', () => {
    if (!fine.matches) return;
    clearTimeout(hoverT);
    if (openDoor()) closePanels();
  }));
  header.addEventListener('mouseleave', () => {
    if (!fine.matches) return;
    clearTimeout(hoverT);
    if (openDoor()) hoverT = setTimeout(closePanels, 260);
  });
  header.addEventListener('mouseenter', () => { if (openDoor()) clearTimeout(hoverT); });
  $$('.panel a[href^="#"]').forEach(a => a.addEventListener('click', closePanels));

  // Popovers: Área clientes e idioma
  const popBtns = $$('[data-pop]');
  function closePops(except) {
    popBtns.forEach(b => {
      if (b === except) return;
      b.setAttribute('aria-expanded', false);
      $('#pop-' + b.dataset.pop).hidden = true;
    });
  }
  popBtns.forEach(b => b.addEventListener('click', e => {
    e.stopPropagation();
    const open = b.getAttribute('aria-expanded') !== 'true';
    closePops(b);
    if (open) { closePanels(); closeSearch(); }
    b.setAttribute('aria-expanded', open);
    $('#pop-' + b.dataset.pop).hidden = !open;
  }));
  $$('.pop').forEach(p => p.addEventListener('click', e => e.stopPropagation()));
  document.addEventListener('click', () => closePops());

  // Buscador (prototipo con un índice mínimo; en producción, el buscador del catálogo)
  const search = $('#search'), input = $('#searchInput'), results = $('#searchResults');
  const searchBtns = [$('#searchBtn'), $('#searchBtnM')];
  const INDEX = [
    { n: 'Barra Gourmet Ready', ref: 'P146A', d: 'Lista tras 30 min de descongelación, sin horno', k: 'barra desayuno sin horno ready gourmet bocadillo', img: 'barra-ready-1.jpg', url: 'producto-barra-gourmet-ready.html' },
    { n: 'Rustikos', ref: 'Familia', d: 'Corteza crujiente y miga alveolada', k: 'rustikos rustico hogaza mesa semillas', img: 'okin-rustikos.jpg', url: 'panes.html?familia=rustikos' },
    { n: 'Gastro', ref: 'Familia', d: 'Panecillos para hostelería', k: 'gastro panecillo hosteleria brunch mesa', img: 'okin-gastro.jpg', url: 'panes.html?familia=gastro' },
    { n: 'Premiere', ref: 'Familia', d: 'Panes de especialidad', k: 'premiere especialidad semillas cereales', img: 'okin-premiere.jpg', url: 'panes.html?familia=premiere' },
    { n: 'Desayunos', ref: 'Ocasión', d: 'Panes para el servicio de mañana', k: 'desayuno tostada brunch manana', img: 'okin-desayuno-variado.jpg', url: 'panes.html?ocasion=desayuno' },
    { n: 'Pintxos y tapas', ref: 'Ocasión', d: 'Formatos pequeños para barra', k: 'pintxo tapa aperitivo bar', img: 'okin-aperitivo-bar.jpg', url: 'panes.html?ocasion=pintxo' },
    { n: 'Bocadillos', ref: 'Ocasión', d: 'Barras y chapatas para take away', k: 'bocadillo take away barra chapata', img: 'bocadillo-papel.jpg', url: 'panes.html?ocasion=bocadillo' },
  ];
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
  const esc = t => t.replace(/[&<>"]/g, c => ESC[c]);
  function mark(t, nq) {
    const i = norm(t).indexOf(nq);
    if (i < 0) return esc(t);
    return esc(t.slice(0, i)) + '<mark>' + esc(t.slice(i, i + nq.length)) + '</mark>' + esc(t.slice(i + nq.length));
  }
  function render(q) {
    const nq = norm(q.trim());
    if (!nq) { results.innerHTML = ''; return; }
    const hits = INDEX.filter(i => norm(`${i.n} ${i.ref} ${i.k}`).includes(nq));
    results.innerHTML = hits.length
      ? hits.map(i => `<li><a href="${i.url}"><img src="assets/img/${i.img}" alt=""><span><b>${mark(i.n, nq)}</b><small>${mark(i.ref, nq)} · ${esc(i.d)}</small></span></a></li>`).join('')
      : `<li class="is-none">No encontramos «${esc(q)}». Prueba con <a class="inline" href="#recomendador" data-search-close>Encontrar mi pan</a> o <a class="inline" href="https://www.okin.es/contacto">habla con el equipo</a>.</li>`;
  }
  input.addEventListener('input', () => render(input.value));
  $$('#searchChips button').forEach(b => b.addEventListener('click', () => { input.value = b.textContent; render(input.value); input.focus(); }));
  function openSearch() {
    closePanels(); closePops();
    if (!menu.hidden) setMenu(false);
    search.hidden = false;
    searchBtns.forEach(b => b.setAttribute('aria-expanded', true));
    header.classList.remove('is-hidden');
    syncOpen();
    requestAnimationFrame(() => input.focus());
  }
  function closeSearch() {
    if (search.hidden) return;
    search.hidden = true;
    searchBtns.forEach(b => b.setAttribute('aria-expanded', false));
    syncOpen();
  }
  searchBtns.forEach(b => b.addEventListener('click', () => (search.hidden ? openSearch() : closeSearch())));
  search.addEventListener('click', e => { if (e.target.closest('[data-search-close]')) closeSearch(); });

  scrim.addEventListener('click', () => { closePanels(); closeSearch(); });

  /* ---------- Menú móvil ---------- */
  function setMenu(open) {
    if (open) closeSearch();
    menu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.textContent = open ? 'Cerrar' : 'Menú';
    document.body.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  menuBtn.addEventListener('click', () => setMenu(menu.hidden));
  $$('[data-close]', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));

  // Teclado: «/» abre el buscador; Esc cierra lo que esté abierto
  addEventListener('keydown', e => {
    const typing = /^(input|textarea|select)$/i.test(document.activeElement.tagName);
    if (e.key === '/' && !typing) { e.preventDefault(); openSearch(); return; }
    if (e.key !== 'Escape') return;
    const d = openDoor();
    if (!search.hidden) { closeSearch(); (fine.matches ? searchBtns[0] : searchBtns[1]).focus(); }
    else if (d) { closePanels(); d.focus(); }
    else if (!menu.hidden) setMenu(false);
    closePops();
  });

  /* ---------- Cierre y Sobre OKIN: parallax opuesto de las fotos pequeñas ---------- */
  // Al bajar, unas fotos bajan y otras suben; al subir, se invierte.
  const parBlocks = $$('.closing, [data-par]');
  if (parBlocks.length && !reduced && shot === null) {
    let ticking = false;
    const par = () => {
      ticking = false;
      const vh = innerHeight;
      parBlocks.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        // -1 cuando el bloque asoma por abajo · 0 centrado · 1 cuando sale por arriba
        const p = Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / ((vh + r.height) / 2)));
        el.style.setProperty('--par', (p * r.height * 0.4).toFixed(1) + 'px');
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(par); } };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    par();
  }

  /* ---------- Revelado al hacer scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      if (e.target.id === 'thaw') countUp(e.target.querySelector('.num'));
      io.unobserve(e.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (el.parentElement.classList.contains('reco__options') || el.classList.contains('proof__item'))
      ? `${(i % 4) * 0.1}s` : '';
    io.observe(el);
  });

  function countUp(el) {
    const to = +el.dataset.count;
    if (reduced || shot !== null) { el.textContent = to; return; }
    const t0 = performance.now(), dur = 1600;
    const step = now => {
      const k = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- Recomendador: primera decisión en la home ---------- */
  const FLOW = {
    servir: {
      label: 'Para servir en mi negocio',
      q: '¿En qué momento lo sirves?',
      a: [
        ['desayuno', 'Desayunos', 'Tostadas, bocadillos y bufé'],
        ['aperitivo', 'Aperitivo y pintxos', 'Piezas pequeñas para barra'],
        ['mesa', 'Pan de mesa', 'Comidas y cenas'],
        ['bocadillo', 'Bocadillos y take away', 'Para llevar o para la carta']
      ]
    },
    vender: {
      label: 'Para vender en tienda',
      q: '¿Cómo lo vas a vender?',
      a: [
        ['horno', 'Horneado en tienda', 'Tengo horno en el punto de venta'],
        ['sinhorno', 'Sin horno', 'Necesito pan que se descongela y se vende'],
        ['especialidad', 'Panes de especialidad', 'Rústicos, cereales y centeno'],
        ['surtido', 'Renovar el surtido', 'Quiero comparar mi lineal']
      ]
    },
    catalogo: {
      label: 'Para ampliar mi catálogo',
      q: '¿Qué quieres completar?',
      a: [
        ['horeca', 'Gama para hostelería', 'Para mis clientes de canal Horeca'],
        ['retail', 'Gama para tiendas', 'Para supermercados y proximidad'],
        ['saludable', 'Gama saludable', 'Integral, centeno y semillas'],
        ['ready', 'Pan listo sin horno', 'Gama Ready para clientes sin horno']
      ]
    }
  };

  const opts = $$('.opt'), optsWrap = $('#recoOptions'), step = $('#recoStep');
  if (optsWrap && step) {
  const q = $('#recoQ'), answers = $('#recoAnswers');

  function choose(key) {
    const f = FLOW[key];
    opts.forEach(o => o.setAttribute('aria-pressed', o.dataset.para === key));
    optsWrap.classList.add('has-choice');
    q.textContent = f.q;
    answers.innerHTML = f.a.map(([id, t, s]) =>
      `<a class="answer" href="recomendador.html?para=${key}&momento=${id}"><b>${t}</b><span>${s}</span></a>`).join('');
    step.hidden = false;
    step.style.animation = 'none'; step.offsetHeight; step.style.animation = '';
    setTimeout(() => step.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' }), 60);
    try { sessionStorage.setItem('okin-para', key); } catch (_) {}
  }
  opts.forEach(o => o.addEventListener('click', () => choose(o.dataset.para)));
  // Para cambiar la primera respuesta basta con pulsar otra tarjeta (sin «Paso 2», etiqueta ni «Cambiar»)
  }

  /* ---------- Familias en grande: carrusel a sangre (bucle, autoplay 6 s, arrastre) ---------- */
  $$('[data-pcar]').forEach(car => {
    const track = $('.pcar__track', car), slides = $$('.pslide', car);
    const ticks = $('.pcar__ticks', car), cur = $('.pcar__index b', car), tot = $('.pcar__total', car);
    const next = $('[data-pcar-next]', car), prev = $('[data-pcar-prev]', car);
    const nextImg = $('img', next), nextName = $('b', next), timer = $('.pcar__timer', car);
    const n = slides.length, DELAY = 6000;
    const pad = k => String(k).padStart(2, '0');
    const name = s => s.querySelector('.tag').textContent.replace(/^(Familia|Gama)\s+/i, '');
    let i = 0, t = null, hovering = false, visible = false;
    const auto = !reduced && shot === null;
    car.style.setProperty('--pcar-delay', DELAY + 'ms');

    ticks.innerHTML = slides.map(() => '<i></i>').join('');
    const tickEls = [...ticks.children];
    tot.textContent = pad(n);

    function go(k) {
      i = (k + n) % n;
      track.style.transform = `translateX(calc(${-i} * (100% + 20px)))`;
      slides.forEach((s, j) => {
        const on = j === i;
        s.classList.toggle('is-active', on);
        s.inert = !on;
        s.setAttribute('aria-hidden', !on);
      });
      tickEls.forEach((el, j) => el.classList.toggle('is-on', j === i));
      cur.textContent = pad(i + 1);
      // «Siguiente» enseña la próxima familia
      const nx = slides[(i + 1) % n], pv = slides[(i - 1 + n) % n];
      nextImg.src = nx.querySelector('.pslide__bg').getAttribute('src');
      nextName.textContent = name(nx);
      next.setAttribute('aria-label', 'Siguiente: ' + name(nx));
      prev.setAttribute('aria-label', 'Anterior: ' + name(pv));
      car.classList.toggle('on-light', slides[i].classList.contains('pslide--light'));
      schedule();
    }

    function schedule() {
      clearTimeout(t);
      const running = auto && !hovering && visible;
      car.classList.remove('is-running');
      timer.offsetWidth;                       // reinicia la barra del «siguiente»
      car.classList.toggle('is-running', running);
      if (running) t = setTimeout(() => go(i + 1), DELAY);
    }

    prev.addEventListener('click', () => go(i - 1));
    next.addEventListener('click', () => go(i + 1));

    // Se para con el ratón encima o con el foco dentro, y fuera de pantalla
    car.addEventListener('mouseenter', () => { hovering = true; schedule(); });
    car.addEventListener('mouseleave', () => { hovering = false; schedule(); });
    car.addEventListener('focusin', () => { hovering = true; schedule(); });
    car.addEventListener('focusout', e => { if (!car.contains(e.relatedTarget)) { hovering = false; schedule(); } });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; schedule(); }, { threshold: 0.4 }).observe(car);

    // Teclado: flechas cuando el foco está dentro
    car.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') go(i + 1);
      if (e.key === 'ArrowLeft') go(i - 1);
    });

    // Arrastre (ratón y táctil)
    let x0 = 0, y0 = 0, dx = 0, down = false, horiz = null;
    track.addEventListener('pointerdown', e => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      down = true; horiz = null; dx = 0; x0 = e.clientX; y0 = e.clientY;
    });
    addEventListener('pointermove', e => {
      if (!down) return;
      dx = e.clientX - x0;
      if (horiz === null && (Math.abs(dx) > 6 || Math.abs(e.clientY - y0) > 6)) horiz = Math.abs(dx) > Math.abs(e.clientY - y0);
      if (!horiz) return;
      track.classList.add('is-dragging');
      track.style.transform = `translateX(calc(${-i} * (100% + 20px) + ${dx}px))`;
    });
    addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      track.classList.remove('is-dragging');
      if (horiz && Math.abs(dx) > 60) go(i + (dx < 0 ? 1 : -1)); else go(i);
    });
    addEventListener('pointercancel', () => { if (down) { down = false; track.classList.remove('is-dragging'); go(i); } });
    track.addEventListener('click', e => { if (horiz && Math.abs(dx) > 6) { e.preventDefault(); horiz = null; } }, true);
    track.addEventListener('dragstart', e => e.preventDefault());

    go(0);
  });

  /* ---------- Escaparate: carrusel + pestañas «Por ocasión / Por familia» ---------- */
  $$('[data-rail-group]').forEach(group => {
    const prev = $('[data-rail-prev]', group), next = $('[data-rail-next]', group), bar = $('.rail__progress i', group);
    const tabs = $$('[role="tab"]', group);
    let rail = $$('.rail', group).find(r => !r.hidden);

    const stepW = () => rail.querySelector('.rail__item').getBoundingClientRect().width + parseFloat(getComputedStyle(rail).columnGap || 0);
    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const k = max > 0 ? rail.scrollLeft / max : 0;
      const w = Math.min(1, rail.clientWidth / rail.scrollWidth);
      bar.style.width = (w * 100) + '%';
      bar.style.transform = `translateX(${k * (1 - w) / w * 100}%)`;
      prev.disabled = rail.scrollLeft < 4;
      next.disabled = rail.scrollLeft > max - 4;
    };
    prev.addEventListener('click', () => rail.scrollBy({ left: -stepW(), behavior: reduced ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => rail.scrollBy({ left: stepW(), behavior: reduced ? 'auto' : 'smooth' }));
    addEventListener('resize', update);

    // Pestañas (flechas izquierda/derecha para moverse entre ellas)
    function select(tab) {
      tabs.forEach(t => {
        const on = t === tab;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        $('#' + t.getAttribute('aria-controls')).hidden = !on;
      });
      rail = $('#' + tab.getAttribute('aria-controls'));
      rail.scrollLeft = 0;
      update();
    }
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', e => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        n.focus(); select(n);
      });
    });

    // Arrastrar con ratón (en táctil ya funciona el scroll nativo). Un arrastre no abre la tarjeta.
    $$('.rail', group).forEach(r => {
      r.addEventListener('scroll', () => { if (r === rail) update(); }, { passive: true });
      let x0 = 0, s0 = 0, down = false, moved = false;
      r.addEventListener('pointerdown', e => {
        if (e.pointerType !== 'mouse') return;
        down = true; moved = false; x0 = e.clientX; s0 = r.scrollLeft;
      });
      addEventListener('pointermove', e => {
        if (!down) return;
        const dx = e.clientX - x0;
        if (!moved && Math.abs(dx) > 4) { moved = true; r.classList.add('is-dragging'); }
        if (moved) r.scrollLeft = s0 - dx;
      });
      addEventListener('pointerup', () => {
        if (!down) return;
        down = false;
        if (moved) {
          r.classList.remove('is-dragging');
          const w = stepW();
          r.scrollTo({ left: Math.round(r.scrollLeft / w) * w, behavior: 'smooth' });
        }
      });
      r.addEventListener('click', e => { if (moved) { e.preventDefault(); moved = false; } }, true);
    });
    update();
  });

  /* ---------- Revisión: mostrar origen de imágenes (tecla «i») ---------- */
  const rt = $('#reviewToggle');
  function review(on) { document.body.classList.toggle('show-sources', on); rt.setAttribute('aria-pressed', on); }
  rt.addEventListener('click', () => review(!document.body.classList.contains('show-sources')));
  addEventListener('keydown', e => {
    if (e.key === 'i' && !/input|textarea/i.test(document.activeElement.tagName)) review(!document.body.classList.contains('show-sources'));
  });
})();
