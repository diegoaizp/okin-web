#!/usr/bin/env python3
"""Copia la cabecera (y el menú móvil) y el pie de index.html a las demás páginas.

Uso, desde «1. Desarrollo»:  python3 _herramientas/sincronizar-cabecera-pie.py

En cada página, el contenido entre <!--@HEADER:start--> y <!--@HEADER:end-->
(y lo mismo con @FOOTER) se sustituye por el de la home. Los enlaces a anclas de la
home (#recomendador…) pasan a index.html#… para que funcionen desde otra página.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = ["panes.html", "producto-barra-gourmet-ready.html"]

home = (ROOT / "index.html").read_text(encoding="utf-8")

h0 = home.index('<a class="skip"')
h1 = home.index('<main id="contenido">')
header = home[h0:h1].rstrip()

f0 = home.index("<!-- ============ PIE")
f1 = home.index('<script src="assets/js/main.js"')
footer = home[f0:f1].rstrip()


def to_subpage(html: str) -> str:
    # Anclas de la home → index.html#ancla (salvo #contenido, #login y «#» vacío)
    html = re.sub(r'href="#(?!contenido"|login"|")([\w-]+)"', r'href="index.html#\1"', html)
    # En otra página, la acción de la cabecera lleva a la home: flecha hacia delante, no hacia abajo
    html = html.replace('<span class="ms ms--down">arrow_downward</span>', '<span class="ms">arrow_forward</span>')
    return html


header, footer = to_subpage(header), to_subpage(footer)

for name in PAGES:
    p = ROOT / name
    s = p.read_text(encoding="utf-8")
    for tag, chunk in (("HEADER", header), ("FOOTER", footer)):
        pat = re.compile(rf"(<!--@{tag}:start-->).*?(<!--@{tag}:end-->)", re.S)
        assert pat.search(s), f"{name}: faltan los marcadores @{tag}"
        s = pat.sub(lambda m: f"{m.group(1)}\n{chunk}\n{m.group(2)}", s)
    p.write_text(s, encoding="utf-8")
    print("ok", name)
