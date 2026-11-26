/* OKIN · Muestra de catálogo para el prototipo (13 de 122 panes)
   ----------------------------------------------------------------
   Datos tomados de las fichas públicas de okin.es (24/11/2026):
   referencia, peso cocido, medidas, descongelación, cocción, caja, palet, sellos y familia.
   «oc» (ocasiones) es una PROPUESTA editorial deducida de la descripción de cada ficha: validar con OKIN.
   En producción esto vendría del PIM / Salesforce. */
window.OKIN = window.OKIN || {};

OKIN.FAMILIAS = {
  rustikos: 'Rustikos', gourmet: 'Gourmet', zereal: 'Zereal+', gastro: 'Gastro', akua: 'Akua',
  premiere: 'Premiere', koskor: 'Koskor', eko: 'Eko', integral: 'Integral', frizzante: 'Frizzante'
};

OKIN.OCASIONES = {
  desayuno: 'Desayunos', brunch: 'Brunch', bocadillo: 'Bocadillos', pintxo: 'Pintxos y tapas', mesa: 'Pan de mesa'
};

OKIN.SELLOS = {
  ready: 'Ready · sin horno', cinco: '5 minutos y listo', masa: 'Masa madre', doble: 'Doble fermentación',
  larga: 'Larga fermentación', hidra: 'Alta hidratación', suela: 'Horno de suela', clean: 'Clean label',
  caja: 'Caja hostelería'
};

/* Destacados de la ficha: ilustración y frase de okin.es. Se muestran en este orden */
OKIN.DESTACADOS = {
  doble: { t: 'Doble fermentación', img: 'assets/brand/sello-doble-fermentacion.png', txt: 'Más sabor, mayor digestividad, mejor conservación, corteza fina, miga resiliente y alveolada.' },
  clean: { t: 'Clean label', img: 'assets/brand/sello-clean-label.png', txt: 'Sin aditivos ni conservantes.' },
  ready: { t: 'Ready', img: 'assets/brand/sello-ready.png', txt: 'Pan cocido. Descongelar y listo.' }
};

/* g: peso cocido (g) · pre: peso precocido (g, null si no aplica) · l/w: largo y ancho (cm)
   thaw: descongelación (min, temperatura ambiente) · bake/temp: horneado (min / ºC; 0 = no necesita)
   box: unidades por caja · pal: cajas por palet
   sem: semillas en la receta, según la descripción de okin.es ('sesamo' = lleva sésamo, 'si' = semillas sin sésamo,
        ausente = sin semillas). Las TRAZAS no están en la web actual: validar con OKIN antes de usar «Sin sésamo».
   integral / eko: ninguno de los 13 de la muestra lo es (las familias Integral y Eko no están en la muestra). */
OKIN.PRODUCTOS = [
  { slug: 'barra-gourmet-ready', n: 'Barra Gourmet Ready', ref: 'P146A', fam: 'gourmet', g: 250, pre: null, l: 45, w: 7,
    thaw: 30, bake: 0, temp: 0, box: 32, pal: 24, sellos: ['ready', 'doble', 'clean'], oc: ['desayuno', 'bocadillo'],
    nuevo: true, url: 'producto-barra-gourmet-ready.html',
    // Campos de ficha (okin.es, 25/11/2026). Ver OKIN.FICHA en ficha.js
    ean13: '8436017108675', ean14: '18436017108672', caja: [503, 293, 461],
    nutri: { kj: 1096, kcal: 259, grasas: 1.1, saturadas: 0.2, hidratos: 53, azucares: 3.5, fibra: 2.5, proteinas: 7.9, sal: 1.3 },
    perfil: { dulce: 2, salado: 2, acido: 1, amargo: 1, retrogusto: 2, crujiente: 2, elastica: 2 } },
  { slug: 'txapela-plus', n: 'Txapela Plus', ref: 'C124B', fam: 'rustikos', g: 330, pre: 400, l: 52, w: 7,
    thaw: 20, bake: 18, temp: 180, box: 24, pal: 28, sellos: ['masa', 'doble', 'hidra', 'suela', 'clean'], oc: ['mesa'] },
  { slug: 'rombo-bocata', n: 'Rombo Bocata', ref: 'C130A', fam: 'rustikos', g: 110, pre: null, l: 26, w: 6,
    thaw: 30, bake: 0, temp: 0, box: 63, pal: 28, sellos: ['ready', 'doble', 'suela', 'clean'], oc: ['bocadillo'] },
  { slug: 'rombo', n: 'Rombo', ref: 'C135A', fam: 'rustikos', g: 65, pre: null, l: 16, w: 8,
    thaw: 30, bake: 0, temp: 0, box: 56, pal: 48, sellos: ['ready', 'doble', 'hidra', 'suela', 'clean', 'caja'], oc: ['mesa', 'pintxo'] },
  { slug: 'mini-rombo', n: 'Mini Rombo', ref: 'C136A', fam: 'rustikos', g: 40, pre: null, l: 12, w: 6,
    thaw: 30, bake: 0, temp: 0, box: 100, pal: 48, sellos: ['ready', 'doble', 'hidra', 'suela', 'clean', 'caja'], oc: ['mesa', 'pintxo'] },
  { slug: 'mini-chapata', n: 'Mini Chapata', ref: 'C139A', fam: 'rustikos', g: 40, pre: null, l: 8, w: 6,
    thaw: 30, bake: 0, temp: 0, box: 100, pal: 48, sellos: ['ready', 'doble', 'clean', 'caja'], oc: ['mesa', 'bocadillo', 'desayuno'] },
  { slug: 'spirale-akua-multi', n: 'Spirale Akua Multi', ref: 'E135A', fam: 'akua', g: 270, pre: 300, l: 40, w: null,
    thaw: 30, bake: 16, temp: 180, box: 22, pal: 28, sellos: ['masa', 'larga', 'hidra', 'clean'], oc: ['mesa'], sem: 'si' },
  { slug: 'barra-de-media', n: 'Barra de Media', ref: 'P108D', fam: 'gourmet', g: 330, pre: 380, l: 54, w: 8,
    thaw: 20, bake: 18, temp: 180, box: 22, pal: 30, sellos: ['doble', 'clean'], oc: ['mesa', 'bocadillo', 'desayuno'] },
  { slug: 'bocadillo-gourmet', n: 'Bocadillo Gourmet', ref: 'P117A', fam: 'gourmet', g: 120, pre: null, l: 27, w: 6,
    thaw: 30, bake: 0, temp: 0, box: 60, pal: 30, sellos: ['ready', 'doble', 'clean'], oc: ['bocadillo'] },
  { slug: 'pan-con-pasas-7-5-y-nueces-5', img: 'pan-pasas-nueces', n: 'Pan con pasas y nueces', ref: 'P453A', fam: 'gastro', g: 200, pre: 230, l: 29, w: 8,
    thaw: 20, bake: 18, temp: 200, box: 42, pal: 28, sellos: ['doble', 'clean'], oc: ['desayuno', 'brunch'] },
  { slug: 'bollo-centeno-50', img: 'bollo-centeno', n: 'Bollo Centeno 50 %', ref: 'P458A', fam: 'gastro', g: 80, pre: 92, l: 16, w: 6,
    thaw: 20, bake: 14, temp: 180, box: 84, pal: 28, sellos: ['masa', 'doble', 'clean'], oc: ['mesa'] },
  { slug: 'pan-semillas', n: 'Pan Semillas', ref: 'P460A', fam: 'zereal', g: 290, pre: 345, l: 37.5, w: 8,
    thaw: 20, bake: 18, temp: 180, box: 28, pal: 28, sellos: ['masa', 'doble', 'clean'], oc: ['mesa', 'brunch'], sem: 'sesamo' },
  { slug: 'baguetina-semillas', n: 'Baguetina Semillas', ref: 'Q203A', fam: 'zereal', g: 135, pre: 150, l: 27, w: 6.5,
    thaw: 20, bake: 5, temp: 180, box: 50, pal: 28, sellos: ['masa', 'doble', 'cinco', 'clean'], oc: ['bocadillo', 'brunch'], sem: 'sesamo' }
];

/* Requisitos del recomendador (paso 4). Se combinan con Y. */
OKIN.REQS = {
  sinsesamo: { t: 'Sin sésamo', ok: p => p.sem !== 'sesamo' },
  sinsemillas: { t: 'Sin semillas', ok: p => !p.sem },
  consemillas: { t: 'Con semillas', ok: p => !!p.sem },
  integral: { t: 'Integral', ok: p => !!p.integral },
  eko: { t: 'Ecológico', ok: p => p.fam === 'eko' },
  clean: { t: 'Clean label', ok: p => p.sellos.includes('clean') }
};

/* Derivados que usan catálogo y ficha */
OKIN.prep = p => p.bake === 0 ? 'ready' : p.bake <= 5 ? 'cinco' : 'horno';
OKIN.PREPS = { ready: 'Listo sin horno', cinco: 'Horno en 5 min', horno: 'Con horneado' };
OKIN.formato = p => p.g <= 130 ? 'individual' : p.g <= 250 ? 'mediano' : 'grande';
OKIN.FORMATOS = { individual: 'Individual · hasta 130 g', mediano: 'Mediano · 131 a 250 g', grande: 'Grande · más de 250 g' };
OKIN.num = n => String(n).replace('.', ',');
OKIN.img = p => `assets/img/productos/${p.img || p.slug}.jpg`;
OKIN.miga = p => `assets/img/productos/${p.img || p.slug}-miga.jpg`;
OKIN.href = p => p.url || `https://www.okin.es/producto/${p.slug}`;
OKIN.prepLine = p => p.bake === 0
  ? `<span class="ms" aria-hidden="true">ac_unit</span>${p.thaw} min descongelando · sin horno`
  : `<span class="ms" aria-hidden="true">local_fire_department</span>${p.thaw} min + ${p.bake} min a ${p.temp} ºC`;

/* Tarjeta de producto: la usan el catálogo y «Otras opciones» de la ficha.
   v0.2: más sencilla. Foto sobre fondo de tono, nombre, una línea de datos y la preparación.
   «Comparar» aparece sobre la foto al pasar el ratón (en móvil, siempre). */
OKIN.prepShort = p => p.bake === 0
  ? `<span class="ms" aria-hidden="true">ac_unit</span>Sin horno · ${p.thaw} min`
  : `<span class="ms" aria-hidden="true">local_fire_department</span>Horno · ${p.bake} min`;
OKIN.card = (p, opts = {}) => {
  const ext = !p.url;
  const badges = [
    p.nuevo ? '<span class="badge badge--new">Novedad</span>' : ''
  ].join('');
  return `<article class="prod" data-slug="${p.slug}">
    <a class="prod__link" href="${OKIN.href(p)}"${ext ? ' target="_blank" rel="noopener"' : ''}>
      <figure class="prod__img" data-src-tag="OKIN · foto de producto (okin.es)">
        <img src="${OKIN.img(p)}" alt="${p.n}" loading="lazy" width="553" height="745">
        <img class="prod__miga" src="${OKIN.miga(p)}" alt="" loading="lazy" width="553" height="745">
        <span class="prod__badges">${badges}</span>
      </figure>
      <h3 class="prod__name">${p.n}</h3>
      <span class="prod__meta">${p.ref} · ${p.g} g · ${OKIN.num(p.l)} cm</span>
      <span class="prod__prep">${OKIN.prepShort(p)}</span>
    </a>
    ${opts.compare === false ? '' : `<label class="prod__cmp" title="Comparar"><input type="checkbox" value="${p.slug}"><span>Comparar</span></label>`}
  </article>`;
};
