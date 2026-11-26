# OKIN · Home v0.3 (la home como mostrador)

Prototipo estático de la home. Se abre con doble clic en `index.html`, sin servidor ni instalación.

- `index.html` es la home con sus 6 bloques (v0.3).
- `recomendador.html` es el recomendador «Encontrar mi pan» (v0.5): una pantalla por pregunta hasta la recomendación y su ficha. Ver «Recomendador» más abajo.
- `panes.html` es el catálogo «Elige tu pan» (v0.2) y `producto-barra-gourmet-ready.html` es la ficha de producto (v0.3: la ficha de okin.es con el sistema nuevo). Ver «Catálogo y ficha» más abajo.
- Tecla **i** o el botón «Origen de imágenes» (abajo a la izquierda, aparece al pasar el hero) muestra qué foto es de OKIN y cuál es de referencia.
- `?shot` o `?shot=900` en la URL activa el modo captura: fija la altura del hero y muestra todo sin animaciones. Sirve para hacer capturas a página completa.

## Dirección de arte (tomada de Union Boulangerie)

El contenedor mide 1840 px como máximo y los márgenes laterales van de 16 a 28 px, más cerca de los de Union (1800 px).

| Union | OKIN |
|---|---|
| Display «Serial Blur» en mayúsculas | **Serial B Blur** (local, `assets/fonts`) para los titulares |
| Body en mono (Shinka) | **DM Sans** (Google Fonts) para leer bien en B2B |
| Manuscrita (Kiddo) y garabatos naranjas | Anotaciones en cursiva naranja con flechas SVG que se dibujan solas |
| — | **Roc Grotesk Compressed** (Typekit `zjp0tcy`) para cifras grandes (30 min, 1994, 1.000.000) y la franja |
| Crema `#f2f0ed` + marrón `#55270a` | Papel `#F3EEE5` (tinte del crema OKIN) + marrón `#5D493C` |
| Bloque azul saturado | Bloque **amarillo `#F4D233`** para el recomendador |
| Etiquetas «ABOUT» naranjas | Etiquetas naranja `#CC5626`, marrón y amarilla |
| Pestañas de color en la cabecera | Sustituidas en la v0.2 por una cabecera de tres puertas (ver abajo) |
| Slides horizontales «Swipe» | Carrusel del oficio en el bloque 4 |

El ocre `#E0A22D` se usa en la franja de valores y el negro en iconos y botones.

## Cabecera v0.4 (alineada con la propuesta «okin diseño»)

Sigue la diapositiva 2 de `0. Documentacion/okin diseño.pptx`: **un menú superior secundario y cuatro entradas principales**. Panes reúne los tres recorridos de la propuesta: por canal, por ocasión y por familia.

| Propuesta (diap. 2) | Cabecera v0.4 |
|---|---|
| Menú superior: Delegación Madrid · Trabaja con nosotros · Contacto · Área privada | **Barra superior** fina con esos cuatro enlaces y el idioma. A la izquierda, «Panaderos en Zumaia desde 1994» (se oculta por debajo de 1180 px). Área clientes e idioma siguen siendo desplegables |
| Productos › Por canal | **Panes › Por canal**: Horeca, Retail, Marca de distribuidor, Distribución, Exportación, Industria (los seis perfiles de la diap. 1). Sustituye a la puerta «Soluciones» de la v0.2 |
| Productos › Por momento | **Panes › Por ocasión** (se mantiene el nombre porque es el del filtro del catálogo y del escaparate) |
| Productos › Por familia | **Panes › Por familia**, con Zereal añadida |
| ¿Necesitas ayuda…? · Ver todos · Descargas | Pie del panel Panes, con las mismas tres acciones |
| Inspiración: recetas, Momentos OKIN, guías, actualidad, sala de prensa | **Inspiración**: Recetas, Guías y Biblioteca (que antes estaba en OKIN), tarjeta «Momentos OKIN» y Sala de prensa en el pie. Las noticias se quedan en Actualidad para no repetirlas |
| Sobre OKIN: quiénes somos, calidad e innovación, sostenibilidad, equipo e I+D, empleo | **Sobre OKIN**: Quiénes somos · Calidad e innovación · Compromiso |
| Actualidad | **Actualidad**: enlace directo sin panel |

- Se mantiene «Panes» en lugar de «Productos» porque es el lenguaje del resto de la web («Elige tu pan», «Encontrar mi pan»).
- Las tres respuestas del recomendador (servir, vender, distribuir) ya no aparecen en el menú. Los seis canales son landings de perfil y el recomendador tiene su propia entrada.
- `--header-h` es ahora la altura total (`--topbar-h` 34 px + `--hdr-row` 72 px). En móvil la barra superior no se muestra (`--topbar-h: 0`) y sus enlaces pasan al menú.
- La versión anterior está en `_backup v0.4 cabecera antes de la propuesta/`.

### Del briefing (p. 9) a la v0.2, para el histórico

| Briefing (p. 9) | Cabecera v0.2 |
|---|---|
| Nuestros panes | **Panes**: por ocasión, por familia y por característica, más una ficha destacada |
| Ideas para disfrutar | Pasa a **Panes › Por ocasión**, porque la ocasión también sirve para encontrar pan |
| Soluciones | **Soluciones**: Sirves pan, Vendes pan, Distribuyes pan. Son las tres respuestas del recomendador |
| Sobre OKIN | **OKIN**: Quiénes somos y Contigo (servicio, Madrid, actualidad, empleo) |
| Biblioteca | **OKIN › Biblioteca**: contenido libre, sin registro |
| Comunidad (privado) | **Área clientes**: es una puerta con login y no un menú. Sus contenidos solo se ven al entrar |
| Buscador + Contacto | Buscador por **nombre, referencia u ocasión** (tecla `/`) y enlace a Contacto |

- La acción fija es **Encontrar mi pan** (amarillo).
- La cabecera es transparente sobre el hero. Se vuelve sólida al salir del hero o al abrir un panel. Se esconde al bajar y reaparece al subir.
- En escritorio, los paneles se abren al pasar el ratón o al hacer clic. Esc cierra.
- En móvil, el menú muestra primero «Encontrar mi pan». Debajo van Panes, Inspiración y Sobre OKIN en acordeón y Actualidad como enlace. Después vienen Área clientes, Contacto y Descargas; luego Delegación Madrid y Trabaja con nosotros, y al final los idiomas y el teléfono.
- El pie repite la arquitectura: Panes · Por canal · OKIN · Contacto.
- El buscador tiene un índice de prueba de 7 entradas. El icono de cámara reserva la «búsqueda por foto» del briefing para la fase 2.
- **Iconos:** Material Symbols Outlined (Google Fonts), cargados como subconjunto con `icon_names`. Al añadir un icono, hay que incluirlo en esa lista en orden alfabético. En la v0.3 las flechas de los bloques nuevos y de los botones también usan Material Symbols. Siguen en SVG los asteriscos y las anotaciones dibujadas de la barra.
- Familias, características y landings por tipo de cliente son provisionales. Muchos enlaces llevan a `#` hasta que existan sus páginas.
- La versión anterior (pestañas) está en `_backup v0.1 cabecera pestañas/`.

## Bloques (v0.3)

La v0.3 reordena la home como un **mostrador**: el pan a la vista, el fabricante detrás y dos formas de pedir, señalando (buscar) o preguntando (recomendador). La versión anterior, de cinco bloques, está en `_backup v0.2 home cinco bloques/`.

1. **Apertura.** Igual que en la v0.2: vídeo, el titular «Real Food, for Real Life, from Real Bakers», la frase «Fabricamos pan precocido congelado para hostelería, tiendas y distribuidores…» y la acción «Encontrar mi pan». Quien ya sabe qué busca tiene el buscador de la cabecera (tecla `/`).
   - v0.6: la frase va seguida en una sola línea, pegada al margen izquierdo, con el espacio entre palabras doble (`word-spacing: .2em`, lo mismo que mide el espacio de Serial B Blur). En móvil salta de línea entre palabras.
2. **Pruebas de fabricante.** Una franja con 1994 · 1.000.000 panes/día · +200 referencias · Clean label. Antes estaba en el bloque 4.
   - v0.6: las cuatro cifras usan la misma letra que el titular del hero (Serial B Blur, en mayúsculas y en naranja). El sello Clean Label se sustituye por el texto «Clean Label».
   - La versión anterior del hero y de la franja está en `_backup v0.6 hero y cifras antes de alinear/`.
2b. **Familias en grande** (carrusel). Patrón tomado del `cta-carousel` de [mushstudios.co](https://mushstudios.co/): una diapositiva a sangre cada vez, casi a todo el ancho (10 px de margen) y 72vh de alto (máx. 46rem), con degradado desde la izquierda, titular grande, una frase y una acción. Se adapta a OKIN con esquinas rectas, Serial Blur, botones de la casa y una variante clara (`pslide--light`) para fotos de fondo blanco. Cinco familias que completan las de la pestaña «Por familia»: Rustikos, Ready, Akua, Koskor y Eko. Los textos salen del catálogo 2023.
   - Pasa sola cada 6 s, en bucle. Se para con el ratón encima, con el foco dentro y fuera de pantalla. Con «reducir movimiento» o en modo `?shot` no avanza sola. No lleva botón de pausa.
   - Controles abajo. A la izquierda, contador «01 — 05» con una raya por familia (la activa, larga y amarilla). A la derecha, «anterior» compacto y «siguiente» como avance de la próxima familia: miniatura, «Siguiente» y su nombre. Una línea en el borde inferior del «siguiente» se llena mientras corre el tiempo. Los controles son de cristal esmerilado oscuro y pasan a crema y marrón en las diapositivas claras. Se arrastra con ratón o dedo, y con las flechas del teclado si el foco está dentro.
   - En móvil (≤900 px) mide 70svh, el texto baja al pie con degradado inferior y «anterior» + «siguiente» ocupan el ancho. Desaparece el contador.
   - Cada diapositiva admite `--pos` / `--pos-m` (encuadre escritorio/móvil) y `--zoom` / `--origin` (sólo escritorio) para apartar el pan del titular. Rustikos y Koskor van volteadas en horizontal.
3. **Escaparate** (nuevo). Carrusel de panes con dos pestañas: **por ocasión** (Desayunos, Brunch, Bocadillos, Pintxos y tapas, Menú del día), que orienta, y **por familia** (Rustikos, Gastro, Premiere, Gourmet, Ready, Zereal), para quien ya conoce el catálogo. Cada tarjeta abrirá el catálogo filtrado. Debajo: «Ver los +200 panes» y «Catálogos y fichas técnicas».
4. **Un caso resuelto + recomendador.** «Un desayuno sin encender el horno» muestra el recorrido del recomendador que lleva a la Barra Gourmet Ready (Sirvo pan › Desayunos › No tengo horno), con el dato de 30 min y el enlace a la ficha. A continuación va el bloque amarillo «Cuéntanos tu caso · ¿Para qué necesitas el pan?», con el paso 2 en la propia home.
5. **Sobre OKIN.** Solo «Quién está detrás de tu pan». El servicio («Y si prefieres hablarlo», con el retrato y la conversación) sale de la home y sus salidas pasan al bloque 6. El carrusel de la doble fermentación se reserva para la ficha de producto (está en el backup).
   - «Sobre OKIN» (`.okab`) sigue el bloque «About» de Union Boulangerie sobre **fondo negro**: una columna centrada con la etiqueta naranja algo girada, el titular, tres asteriscos naranjas y un párrafo con «1994» rodeado a mano (el trazo se dibuja al aparecer). Termina con el enlace «Conocer el obrador».
   - Alrededor hay cuatro fotos pequeñas de OKIN, inclinadas y por detrás del texto, como en «Hablemos». Tienen el mismo parallax opuesto: `main.js` mueve `--par` en `.closing` y en cualquier bloque con `data-par`.
   - La versión anterior, con la foto de la línea a sangre, está en `_backup v0.4 sobre okin foto a sangre/`.
6. **Hablemos** (cierre + servicio). Une el antiguo cierre y «El servicio». Ya no lleva «Encontrar mi pan», que se confundía con «¿Para qué necesitas el pan?» del bloque amarillo: aquí solo se habla con personas.
   - Titular «Cuéntanos cómo trabajas», al mismo tamaño que «Sobre OKIN» (`.h-display` a `clamp(2.1rem, 5vw, 4.75rem)`). Entradilla: «Te proponemos el pan que encaja en tu servicio, tu horno y tu volumen. Al otro lado hay panaderos, no una centralita.»
   - Tres salidas en fila (una debajo de otra en móvil): **Hablar con el equipo**, **Conoce a nuestra experta panadera** y **Servicio al cliente profesional**, cada una con una línea pequeña encima. Debajo, el teléfono.
   - Las fotos de alrededor son ahora de OKIN (panadero oliendo el pan y mesa de servicio) y suben a la altura del titular para no tapar las salidas.
   - La versión anterior (cierre «¿Qué pan estás buscando?» y bloque del servicio) está en `_backup v0.5 hablemos antes de unificar servicio/`.

## Vídeo provisional

El hero usa ahora **el montaje de Union Boulangerie y la producción industrial de OKIN**: `assets/video/hero-okin-industria.mp4` (escritorio) y `hero-okin-industria-vertical.mp4` (versión móvil, se carga en pantallas verticales). Están recodificados sin audio. **Es solo para el boceto interno; no se puede publicar.** Hay que sustituir los planos de Union por rodaje de OKIN.

Sigue en la carpeta la versión anterior, montada con fotos de OKIN y de referencia (`okin-hero.mp4` / `okin-hero-vertical.mp4`, 19,2 s). Para recuperarla, se cambian los `data-src-*` del `<video>`.

## Origen de las imágenes (`assets/img`)

| Prefijo / archivo | Origen | Uso |
|---|---|---|
| `okin-*`, `barra-ready-*` | Fotos reales de OKIN (okin.es y carpeta 04 FOTOS DEL CLIENTE). `barra-ready-entera/abierta.webp` son recortes con transparencia de `barra-ready-2/3` | Válidas |
| `fam-*` (v0.3) | Fotos de familia de OKIN (04 FOTOS DEL CLIENTE › _FAMILIAS PAN), reducidas a 1400 px | Válidas |
| `slide-*` (carrusel) | Fotos de familia de OKIN (04 FOTOS DEL CLIENTE: _FAMILIAS PAN, 00 ALTA y FOTO FAMILIA RUSTIKOS_2). Rustikos y Koskor reducidas a 2400 px y volteadas | Válidas |
| `masa-cajas-*`, `bollos-bandeja`, `corteza-grena*`, `bocadillo-*`, `rebanadas-pila` | `0. Assets/Vibe foto` | Moodboard: solo referencia |
| `masa-amasadora`, `manos-formado`, `miga-*`, `corteza-semillas`, `harina-aceite`, `bocadillo-huevo`, `nino-pan` | `Archivo 2/Tono fotográfico` | Referencia de tono |
| `ia-*` | Subcarpetas «IA» del tono fotográfico | Referencia de intención, no publicar |
| `productos/<slug>.jpg` y `productos/<slug>-miga.jpg` | Bodegón y miga de cada pan, descargados de okin.es (553 × 745). Los de la Barra Ready se han girado en vertical a partir de `barra-ready-2/3` | Válidas |

## Textos pendientes de validar

La página ya no muestra notas aclaratorias («validar con OKIN», «conversación ilustrativa»…). Lo pendiente queda solo en esta lista.

- Carrusel de familias: titulares y frases adaptados del catálogo 2023 (Rustikos, Ready, Akua, Koskor, Eko). Confirmar que siguen vigentes, sobre todo «80 % de agua» (Akua) y la certificación Ekolurra (Eko).

- Cifras de la franja (bloque 2): 1.000.000 panes/día y +200 referencias salen de la v0.2 y de la web actual. Validar con OKIN.
- Nombres de familia del escaparate y sus descripciones: contrastar con el catálogo vigente.
- Caso resuelto (bloque 4): el recorrido y la cafetería son ilustrativos.

- Proceso de doble fermentación (bloque 4): redactado de trabajo. Validar con producción.
- Hablemos (bloque 6): titular, entradilla y las líneas pequeñas de cada salida («Cuéntanos tu caso», «Cata y receta», «Pedidos y entregas») son propuesta. Comprobar que existe la página de la experta panadera (`/experta`).
- Preguntas del recomendador (home y `recomendador.html`), sus respuestas y las reglas de orden: son una propuesta.
- Algunas rutas del pie (`/familia/rustikos`, `/trabaja-con-nosotros`, `/delegacion-madrid`, `/blog`, legales) están deducidas de la web actual. Revisarlas.

## Catálogo y ficha (primer planteamiento)

Las dos páginas usan `styles.css` y añaden `assets/css/paginas.css`; la ficha añade además `assets/css/ficha.css`. Los datos de producto están en `assets/js/productos.js`: 13 panes reales (los 12 primeros de «Elige tu pan» y la Barra Gourmet Ready), con referencia, peso, medidas, preparación, caja, palet, sellos y familia tomados de okin.es. **Las ocasiones de cada pan son una propuesta**, deducida de la descripción de cada ficha.

La cabecera y el pie de `panes.html` y de la ficha son una copia de los de `index.html`. Si cambian en la home, hay que ejecutar `python3 _herramientas/sincronizar-cabecera-pie.py` para copiarlos de nuevo.

`main.js` es común a las tres páginas. Cada bloque comprueba que su marcado existe: sin `#hero`, la cabecera es sólida desde el principio.

### `panes.html` · Elige tu pan (v0.2, simplificada)

Versión más sencilla, tomando como referencia el catálogo de Europastry. La v0.1, con titular grande, entradas por ocasión y la pregunta «¿Tienes horno?», está guardada en `_backup v0.3 home antes de catalogo y ficha/panes-v0.1.html`.

- **Fondo blanco** y contenedor casi a sangre (márgenes de 16 a 48 px, sin ancho máximo).
- **Sin hero:** migas, título «Elige tu pan» con el número de panes al lado, y a trabajar.
- **Columna lateral fina (236 px):** buscador arriba y debajo los filtros en acordeón (Preparación, Ocasión y Familia abiertos; Formato, Elaboración y Para tu negocio cerrados). Solo se ven las opciones que dan resultados, con su recuento. Al final, dos enlaces discretos: «¿No sabes cuál? Encontrar mi pan» y «Descargar catálogo».
- **Rejilla ancha:** columnas de 300 px como mínimo (3 a 1440 px, 4 a 1920 px, 2 en móvil).
- **Tarjeta mínima:** foto sobre fondo de tono `--tone: #F1ECE3` (el blanco del bodegón se funde con él), nombre, «Ref. · peso · largo» y la preparación («Sin horno · 30 min» o «Horno · 18 min»). Solo se mantiene la insignia «Novedad». Al pasar el ratón aparecen la miga y el botón «Comparar» sobre la foto; en móvil «Comparar» se ve siempre como una casilla.
- **Encima de la rejilla:** filtros activos como chips y el orden a la derecha.
- **Comparar hasta 4:** la bandeja va abajo y el comparador se abre en una tabla. Lo que es igual en todos se atenúa y hay un interruptor «Solo diferencias».
- **En móvil:** el buscador queda arriba y los filtros se abren en una hoja a pantalla completa con «Ver N panes».

Dentro de un grupo de filtros se combinan con O y entre grupos con Y. El estado va en la URL y se puede enlazar: `panes.html?ocasion=desayuno&preparacion=ready&familia=gourmet&comparar=barra-gourmet-ready`. La home, el menú y la ficha enlazan así.

### `producto-barra-gourmet-ready.html` · Ficha (v0.3)

**La ficha actual de okin.es con el sistema de diseño nuevo:** mismos textos, mismos datos y mismo orden, sobre fondo blanco y con una sola rejilla. Cada sección lleva su número y su título en la columna izquierda (3/12) y el contenido en la derecha (9/12), así nada cambia de sitio de un bloque a otro. Las versiones anteriores están en `_backup v0.5 ficha antes de simplificar/` (v0.1) y `_backup v0.6 ficha limpia antes de reordenar/` (v0.2, con el scroll que abría la barra).

Archivos: la página, `assets/css/ficha.css` y `assets/js/ficha.js`. Los datos están en `assets/js/productos.js`.

1. **Titular.** Migas, «Novedad · Ref. P146A · Familia Gourmet», el nombre y dos acciones: «Pedir una muestra» y «Ficha técnica» (baja a las descargas).
2. **Foto con comparador.** La barra a todo el ancho: a la izquierda de la línea naranja se ve la miga (barra abierta) y a la derecha, la barra entera. Se arrastra con ratón o dedo y se mueve con el teclado: es un `input type="range"` transparente sobre la foto. Al aparecer hace un pequeño vaivén para que se entienda que se puede deslizar (no lo hace con «reducir movimiento» ni con `?shot`). Debajo: «Miga tierna y alveolada» · «Desliza para ver por dentro» · «Corteza fina · 45 × 7 cm». En móvil la barra se amplía y se recorta por los lados.
3. **01 Descripción.** El texto de okin.es: la entradilla en grande, los dos párrafos y la «Propuesta de consumo». Después, los tres destacados con las ilustraciones y las frases de okin.es: Doble fermentación, Clean label y Ready.
4. **02 Ficha técnica.** Tres grupos en columnas: Características (pesos, medidas, referencia, EAN-13), Preparación (descongelación, temperatura, cocción) y Embalaje (caja, palet, unidades por palet, medidas de caja, EAN-14).
5. **03 Nutrición y sabor.** Los valores nutricionales y el perfil organoléptico, con cinco puntos por atributo: naranja para el sabor y ocre para la textura, como en el gráfico de okin.es.
6. **04 Descarga de materiales.** Las fichas de producto vertical y horizontal, el catálogo y el Área clientes.
7. **¿Te ayudamos?** Las dos salidas de la ficha actual: «Contacta con nosotros» y «Elige tu pan», más el teléfono.

**Plantilla escalable.** Lo estructurado se pinta desde los datos con un esquema único, `OKIN.FICHA` en `ficha.js`: destacados, ficha técnica, nutrición, perfil y descargas.
- Cada grupo es un título, un icono y una lista de filas `[etiqueta, valor(p)]`.
- **Una fila sin dato no aparece**, y un grupo sin filas tampoco. Por eso «Peso precocido» (vacío en okin.es) no se muestra en la Barra Ready y sí saldrá en un pan con horno, igual que «Temperatura de horno».
- Para añadir un campo nuevo a las 122 referencias basta con una línea en el esquema. Los grupos se colocan solos en columnas (`auto-fit`), sin tocar el CSS.
- El pan sale de `<body data-slug="…">`. Los PDF siguen el patrón de okin.es: `/pdf_vertical/<slug>` y `/pdf_horizontal/<slug>`.
- Campos nuevos en `productos.js` (por ahora solo en la Barra Ready): `ean13`, `ean14`, `caja` (mm), `nutri` (por 100 g) y `perfil` (0 a 5). Los textos de los destacados están en `OKIN.DESTACADOS`.
- Siguen en el HTML el titular, la foto del comparador y la descripción. En producción vendrían del PIM.

**Imágenes:** el comparador usa `barra-ready-abierta.webp` y `barra-ready-entera.webp`, recortes con transparencia de `barra-ready-3` y `barra-ready-2` alineados al píxel. Para otros panes harían falta dos fotos cenitales con el mismo encuadre. Las ilustraciones de los destacados (`assets/brand/sello-*.png`) se han descargado de okin.es.

Si se llega desde el recomendador (`?negocio=hosteleria&momento=desayuno…` o el formato antiguo `?para=servir&momento=desayuno`), arriba aparece una franja fina «Te la proponemos porque…». En móvil, una barra fija con «Pedir muestra» y el PDF aparece cuando los botones del titular salen de pantalla.

### Datos que hay que validar con OKIN

- «Cocida al 100 %»: se deduce de las URL en francés e italiano (`baguette-gourmet-100-cuite`, `filone-gourmet-100-cotto`) y de que no tiene peso precocido.
- Conservación, vida útil congelada y cuánto aguanta una vez descongelada: no están en la ficha actual.
- Nutrición: la ficha actual pone «Valor energético (kcal/kj): 1096 / 259», con las unidades invertidas, y no indica la base. Se muestra «1096 kJ / 259 kcal» y se ha supuesto «por 100 g».
- Unidad de las medidas de caja (503 × 293 × 461): se ha supuesto mm.
- Alérgenos: deducidos de los ingredientes (gluten de trigo y cebada).
- Perfil organoléptico: okin.es lo publica solo como imagen. Los valores (Dulce 2, Salado 2, Ácido 1, Amargo 1, Retrogusto 2, Crujiente 2, Miga elástica 2) se han leído del gráfico. Pedir los datos del panel de cata.
- Texto de la descripción: en okin.es termina en «una solución rápida y calidad». Se ha corregido a «rápida y de calidad».
- Proceso de doble fermentación: ya no se muestra paso a paso. Si se recupera, hacen falta fotos reales de producción.
- La ficha actual muestra los cuatro pasos de horneado (`proceso_es.jpg`) en un pan que no necesita horno. En la nueva no aparecen.
- «Menú del día» (home y menú) y «Pan de mesa» (catálogo y recomendador) llevan al mismo filtro. Elegir un solo nombre.

## Recomendador · Encontrar mi pan (v0.5)

**Una pantalla por pregunta, fondo blanco y lo mínimo.** Las preguntas salen de la diapositiva 3 de *okin diseño*, pero se responden una a una hasta llegar a **una recomendación que lleva a su ficha**. La versión anterior, con las cuatro columnas a la vista, está en `_backup v0.4 recomendador columnas/`.

Archivos: `recomendador.html`, `assets/js/recomendador.js` y `assets/css/recomendador.css` (ya no usa `paginas.css`). Usa los 13 panes de `productos.js`.

- **Sin la cabecera del sitio.** Arriba solo el logo (lleva a la home), «Encontrar mi pan», una × para salir y una línea fina de progreso. Por eso `recomendador.html` ya no está en el script de sincronizar cabecera y pie.
- **Cada pregunta, una pantalla:** «Pregunta N de 4», la pregunta en grande, una línea de ayuda y **las respuestas en tarjetas** (texto abajo y flecha en la esquina; la elegida, en amarillo con ✓). Van en una fila si son hasta cinco y en filas de tres si son más; en móvil, dos por fila. Al elegir, pasa sola a la siguiente pantalla. Abajo, «Anterior».
- **En la home**, al elegir una de las tres tarjetas aparece directamente la segunda pregunta con sus respuestas. Ya no se muestran «Paso 2 de 4», la etiqueta con la respuesta ni «Cambiar»: para cambiar, se pulsa otra tarjeta.
- **Cada tarjeta lleva una foto** arriba y el texto abajo. Las fotos son copias ligeras (720 px, unos 57 KB) en `assets/img/recomendador/`, hechas a partir de `assets/img/`. Se priorizan fotos reales de OKIN:

  | Respuesta | Foto | Origen |
  |---|---|---|
  | Hostelería · Distribuidor · Industria | `okin-mesa-servicio` · `okin-surtido-gastro` · `okin-linea-operarias` | OKIN, real |
  | Pequeño comercio | `okin-entrega-tienda` | Aportada, adaptada con IA |
  | Supermercado | `ia-estanteria-hogazas` | **IA, solo referencia: no publicar** |
  | Desayuno · Brunch · Pintxo · Cena · Bocata | `okin-desayuno-bufe` · `okin-desayuno-variado` · `okin-aperitivo-bar` · `slide-rustikos` · `fam-ready` | OKIN, real |
  | Comida y menú | `menu-mesa-flash` | Adaptada con IA |
  | Descongelar · 5 min · Horneado largo · Poco congelador | `fam-gourmet` · `okin-bollos-pala` · `okin-premiere` · `okin-logistica` | OKIN, real |
  | Sin sésamo · Sin semillas · Con semillas · Ecológico · Clean label | `slide-akua` · `okin-barras-mesa` · `fam-zereal` · `slide-eko` · `okin-barra-corazon` | OKIN, real |
  | Integral | `rebanadas-pila` | Moodboard, solo referencia |

  Para cambiar una foto: editar `IMG` al principio de `recomendador.js` y generar su copia en `assets/img/recomendador/`.
- **Requisitos** admite varias (casilla en la esquina de cada tarjeta) y termina con el botón «Ver mi pan». Se puede continuar sin elegir ninguno.
- **Solo se ofrecen las respuestas que dejan algún pan** con lo ya respondido; las demás no se muestran. Si al volver atrás se cambia una respuesta y ya no queda ningún pan, se borran las respuestas siguientes.
- **Resultado:** un solo pan. Foto grande, nombre, referencia, peso y caja, preparación, hasta tres motivos, **«Ver la ficha»** y «Prefiero hablar con el equipo». Debajo, discretos, dos panes más que también encajan, las respuestas dadas, «Cambiar respuestas» y «Empezar de nuevo».
- **«Ver la ficha»** de la Barra Gourmet Ready lleva a `producto-barra-gourmet-ready.html` con las respuestas, que aparecen en la franja «Te la proponemos porque…». Los demás panes abren su ficha en okin.es.
- **Historial:** cada pantalla es un paso del navegador; el «atrás» vuelve a la pregunta anterior. La URL guarda respuestas y pantalla: `recomendador.html?negocio=hosteleria&momento=desayuno&horneado=descongelar&req=clean&paso=resultado`.
- **Desde la home** (`?para=servir&momento=desayuno`) empieza en la primera pregunta sin responder: Servir → Hostelería, Vender → Pequeño comercio, Catálogo → Distribuidor, Sin horno → Solo descongelar, Horno → Horneado largo.
- **Sin coincidencia exacta** (solo llegando por URL, p. ej. el ejemplo de la diapositiva: pintxo + descongelar + con semillas): recomienda el más cercano y lo dice en una línea («No tenemos uno que cumpla también “Con semillas”»).

| Pregunta | Respuestas | Qué hace |
|---|---|---|
| 1 · ¿Tu negocio? | Hostelería, Pequeño comercio, Supermercado, Distribuidor, Industria | No filtra. Cambia el orden, los motivos y la pregunta 2 («¿Para qué lo compran?» si es tienda) |
| 2 · ¿Para qué lo usas? | Desayuno, Brunch, Pintxo, Comida y menú, Cena, Bocata y burger | Filtra por ocasión. Comida y Cena → «Pan de mesa»; Bocata → «Bocadillos» |
| 3 · ¿Cómo lo haces? | Solo descongelar, Horno 5 minutos, Horneado largo, Tengo poco congelador | Descongelar: solo sin horno. 5 minutos: hasta 5 min de horno. Las otras dos ordenan |
| 4 · ¿Qué necesitas? | Sin sésamo, Sin semillas, Con semillas, Integral, Ecológico, Clean label | Varias, se combinan con Y. «Sin semillas» y «Con semillas» se excluyen |

### Pendiente de validar en el recomendador

- **Semillas y sésamo** (`sem` en `productos.js`): sacados de la descripción de okin.es. Pan Semillas y Baguetina Semillas llevan sésamo; Spirale Akua Multi, semillas sin sésamo. **Las trazas no están en la web actual.** Confirmar con OKIN antes de publicar «Sin sésamo», porque es un alérgeno.
- **Integral y Ecológico** no aparecen nunca porque no dejan ningún pan: las familias Integral y Eko no están en la muestra de 13. Con el catálogo completo saldrán.
- **Poco congelador:** sin medidas de caja por pan, se aproxima con «cajas de 32 unidades o menos». Hace falta el volumen de caja del PIM.
- **Orden por negocio** (`score()` en `recomendador.js`): hostelería prefiere caja hostelería y piezas pequeñas; tiendas, piezas de 200 g o más; industria, pan de bocadillo sin horno; distribuidor, panes que sirven para más ocasiones. Desayuno prefiere barras (tostadas) y pintxo, piezas de 65 g o menos. Es un criterio de trabajo.
- Los seis perfiles y las cuatro preguntas de la diapositiva siguen abiertos. La home pregunta primero «¿Para qué necesitas el pan?» con tres respuestas y el recomendador usa los cinco negocios de la diapositiva: hay que elegir una sola formulación.

## Siguiente fase

- Exportar las imágenes a WebP/AVIF con `srcset`. Ahora son JPG a 2200 px y pesan unos 14 MB en total.
- El kit de Typekit tiene que autorizar el dominio definitivo.
- Recomendador: preguntas propias para distribución y retail (qué surtido completar), y reglas con el catálogo completo.
- Catálogo completo (122 panes) desde el PIM o Salesforce. Faltan «Tipo de pan» (barra, chapata, bollo…) y los datos de nutrición y certificados de cada pan para activar esos filtros.
- Plantilla de ficha para las 122 referencias. Habría que decidir qué bloques son fijos y cuáles opcionales («Dónde encaja», «Ábrela», que necesita dos fotos cenitales alineadas: entera y abierta).
