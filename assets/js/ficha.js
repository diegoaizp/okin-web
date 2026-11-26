/* OKIN · Ficha de producto v0.3
   La página es una plantilla: el pan sale de <body data-slug> y todo lo estructurado
   (destacados, ficha técnica, nutrición, perfil y descargas) se pinta desde OKIN.PRODUCTOS
   con el esquema OKIN.FICHA. Para otro pan basta con sus datos; lo que no tiene dato no aparece. */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const P = OKIN.PRODUCTOS.find(p => p.slug === document.body.dataset.slug);
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches || new URLSearchParams(location.search).has('shot');
  const n = v => OKIN.num(v);
  const has = v => v !== null && v !== undefined && v !== '';

  /* ==========================================================================
     Esquema de la ficha. Cada grupo: título, icono y filas [etiqueta, valor(p)].
     Una fila sin valor no se pinta; un grupo sin filas, tampoco.
     ========================================================================== */
  OKIN.FICHA = {
    tecnica: [
      { t: 'Características', icon: 'bakery_dining', rows: [
        ['Peso cocido', p => has(p.g) && `${n(p.g)} g`],
        ['Peso precocido', p => has(p.pre) && `${n(p.pre)} g`],
        ['Longitud', p => has(p.l) && `${n(p.l)} cm`],
        ['Anchura', p => has(p.w) && `${n(p.w)} cm`],
        ['Referencia', p => p.ref],
        ['EAN-13', p => p.ean13, 'mono']
      ] },
      { t: 'Preparación', icon: 'timer', rows: [
        ['Tiempo de descongelación', p => has(p.thaw) && `${p.thaw} min`],
        ['Temperatura', p => has(p.thaw) && 'Ambiente'],
        ['Tiempo de cocción', p => p.bake === 0 ? 'No necesita' : has(p.bake) && `${p.bake} min`],
        ['Temperatura de horno', p => p.bake > 0 && `${p.temp} ºC`],
        ['Opcional', p => p.bake === 0 && 'Golpe de horno o tostado']
      ] },
      { t: 'Embalaje', icon: 'inventory_2', rows: [
        ['Unidades por caja', p => has(p.box) && `${p.box} uds`],
        ['Cajas por palet', p => has(p.pal) && `${p.pal} cajas`],
        ['Unidades por palet', p => has(p.box) && has(p.pal) && `${p.box * p.pal} uds`],
        ['Dimensiones de caja', p => p.caja && `${p.caja.join(' × ')} mm`],
        ['EAN-14', p => p.ean14, 'mono']
      ] }
    ],
    nutricion: { t: 'Valores nutricionales', nota: 'por 100 g', icon: 'info', rows: [
      ['Valor energético', p => `${n(p.nutri.kj)} kJ / ${n(p.nutri.kcal)} kcal`],
      ['Grasas', p => `${n(p.nutri.grasas)} g`],
      ['de las cuales saturadas', p => `${n(p.nutri.saturadas)} g`, 'sub'],
      ['Hidratos de carbono', p => `${n(p.nutri.hidratos)} g`],
      ['de los cuales azúcares', p => `${n(p.nutri.azucares)} g`, 'sub'],
      ['Fibra alimentaria', p => `${n(p.nutri.fibra)} g`],
      ['Proteínas', p => `${n(p.nutri.proteinas)} g`],
      ['Sal', p => `${n(p.nutri.sal)} g`]
    ] },
    perfil: { t: 'Perfil organoléptico', nota: 'de 0 a 5', icon: 'restaurant', grupos: [
      { t: 'Sabor', k: 'sabor', attrs: [['dulce', 'Dulce'], ['salado', 'Salado'], ['acido', 'Ácido'], ['amargo', 'Amargo'], ['retrogusto', 'Retrogusto']] },
      { t: 'Textura', k: 'textura', attrs: [['crujiente', 'Crujiente'], ['elastica', 'Miga elástica']] }
    ] },
    // Las fichas en PDF de okin.es siguen el patrón /pdf_vertical/<slug> y /pdf_horizontal/<slug>
    descargas: p => [
      { t: 'Ficha de producto vertical', d: 'PDF · para imprimir', href: `https://www.okin.es/pdf_vertical/${p.slug}`, icon: 'download', ext: true },
      { t: 'Ficha de producto horizontal', d: 'PDF · para presentar', href: `https://www.okin.es/pdf_horizontal/${p.slug}`, icon: 'download', ext: true },
      { t: 'Catálogo completo', d: 'Todas las familias', href: 'https://www.okin.es/descargar-catalogos', icon: 'open_in_new', ext: true },
      { t: 'Área clientes', d: 'Ficha logística, etiquetas e imágenes en alta', href: '#login', icon: 'lock' }
    ]
  };

  const group = (g, p) => {
    const rows = g.rows.map(([label, val, cls]) => [label, p && val(p), cls]).filter(r => has(r[1]) && r[1] !== false);
    if (!rows.length) return '';
    return `<div class="spec">
      <h3 class="spec__h"><span class="ms" aria-hidden="true">${g.icon}</span>${g.t}${g.nota ? `<small>${g.nota}</small>` : ''}</h3>
      <dl>${rows.map(([l, v, c]) => `<div${c === 'sub' ? ' class="sub"' : ''}><dt>${l}</dt><dd${c === 'mono' ? ' class="mono"' : ''}>${v}</dd></div>`).join('')}</dl>
    </div>`;
  };

  /* ---------- 01 · Destacados ---------- */
  $('#destacados').innerHTML = Object.entries(OKIN.DESTACADOS)
    .filter(([k]) => P.sellos.includes(k))
    .map(([, d]) => `<li class="feat"><img src="${d.img}" alt="" width="300" height="300" loading="lazy"><b>${d.t}</b><p>${d.txt}</p></li>`)
    .join('');

  /* ---------- 02 · Ficha técnica ---------- */
  $('#specs').innerHTML = OKIN.FICHA.tecnica.map(g => group(g, P)).join('');

  /* ---------- 03 · Nutrición y perfil organoléptico ---------- */
  const F = OKIN.FICHA;
  const perfil = P.perfil ? `<div class="spec">
      <h3 class="spec__h"><span class="ms" aria-hidden="true">${F.perfil.icon}</span>${F.perfil.t}<small>${F.perfil.nota}</small></h3>
      ${F.perfil.grupos.map(gr => `<p class="taste__g taste__g--${gr.k}">${gr.t}</p>
        <ul class="taste" role="list">${gr.attrs.filter(([k]) => has(P.perfil[k])).map(([k, l]) => `<li class="taste--${gr.k}">
          <span>${l}</span>
          <span class="dots" role="img" aria-label="${P.perfil[k]} de 5">${[1, 2, 3, 4, 5].map(i => `<i${i <= P.perfil[k] ? ' class="on"' : ''}></i>`).join('')}</span>
          <b>${n(P.perfil[k])}</b></li>`).join('')}</ul>`).join('')}
    </div>` : '';
  $('#nutri').innerHTML = (P.nutri ? group(F.nutricion, P) : '') + perfil;
  if (!P.nutri && !P.perfil) $('#nutri').closest('.sec').hidden = true;

  /* ---------- 04 · Descargas ---------- */
  $('#files').innerHTML = F.descargas(P).map(d => `<li><a class="file" href="${d.href}"${d.ext ? ' target="_blank" rel="noopener"' : ''}>
      <span class="file__t">${d.t}</span><span class="file__d">${d.d}</span><span class="ms" aria-hidden="true">${d.icon}</span></a></li>`).join('');

  /* ---------- Comparador: la línea marca dónde acaba la miga y empieza la barra entera ---------- */
  const cmp = $('#cmpr'), range = $('.cmpr__range', cmp);
  const setX = v => cmp.style.setProperty('--x', v);
  range.addEventListener('input', () => { cmp.classList.add('is-used'); setX(range.value); });
  // Un pequeño vaivén al aparecer, para que se entienda que se puede deslizar. Se para si alguien lo toca.
  if (!still) {
    new IntersectionObserver(([e], io) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1800;
      const step = now => {
        if (cmp.classList.contains('is-used')) return;
        const k = Math.min(1, (now - t0) / dur);
        const v = 50 + Math.sin(k * Math.PI * 2) * 14 * (1 - k);
        setX(v.toFixed(2)); range.value = v;
        if (k < 1) requestAnimationFrame(step);
      };
      setTimeout(() => requestAnimationFrame(step), 500);
    }, { threshold: .6 }).observe(cmp);
  }

  /* ---------- Llega desde el recomendador ----------
     recomendador.html enlaza con ?negocio=hosteleria&momento=desayuno&horneado=descongelar&req=clean
     Se mantiene el formato antiguo de la home (?para=servir&momento=desayuno). */
  const L = {
    hosteleria: 'Hostelería', comercio: 'Pequeño comercio', super: 'Supermercado', distribuidor: 'Distribuidor', industria: 'Industria',
    desayuno: 'Desayuno', brunch: 'Brunch', pintxo: 'Pintxo', comida: 'Comida y menú', cena: 'Cena', bocata: 'Bocata y burger',
    descongelar: 'Sin horno, solo descongelar', cinco: 'Horno 5 min', largo: 'Horneado largo', congelador: 'Poco congelador',
    sinsesamo: 'Sin sésamo', sinsemillas: 'Sin semillas', consemillas: 'Con semillas', integral: 'Integral', eko: 'Ecológico', clean: 'Clean label',
    servir: 'Sirvo pan en mi negocio', vender: 'Vendo pan en tienda', catalogo: 'Amplío mi catálogo',
    aperitivo: 'Aperitivo y pintxos', mesa: 'Pan de mesa', bocadillo: 'Bocadillos y take away',
    sinhorno: 'Sin horno', ready: 'Pan listo sin horno', horeca: 'Gama para hostelería'
  };
  const u = new URLSearchParams(location.search);
  const keys = [u.get('negocio') || u.get('para'), u.get('momento'), u.get('horneado'), ...(u.get('req') || '').split(',')]
    .filter(k => k && L[k]);
  if (keys.length) {
    const steps = keys.map(k => L[k]);
    if (u.get('para') && !['sinhorno', 'ready'].includes(u.get('momento'))) steps.push('No tengo horno');
    $('#whySteps').innerHTML = steps.map(s => `<li>${s}</li>`).join('');
    $('#whyBack').href = 'recomendador.html?' + u.toString();
    $('#why').hidden = false;
  }

  /* ---------- Barra fija en móvil: aparece cuando los botones de arriba salen de pantalla ---------- */
  const sticky = $('#stickyBuy'), ctas = $('.pd__ctas'), end = $('.sec--end');
  let ctaGone = false, atEnd = false;
  const sync = () => {
    const on = ctaGone && !atEnd;
    sticky.classList.toggle('is-on', on);
    sticky.setAttribute('aria-hidden', !on);
    $$('a', sticky).forEach(a => a.tabIndex = on ? 0 : -1);
  };
  new IntersectionObserver(([e]) => { ctaGone = !e.isIntersecting && e.boundingClientRect.top < 0; sync(); }).observe(ctas);
  new IntersectionObserver(([e]) => { atEnd = e.isIntersecting; sync(); }, { threshold: .15 }).observe(end);
})();
