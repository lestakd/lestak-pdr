# Lesták Horpadás és Jégkár Javító Kft. — weboldal

Ez a repository a [lestakpdr.hu](https://lestakpdr.hu) weboldal élő forráskódját tartalmazza.

A weboldal egyszerű, statikus HTML + CSS + JS (nincs build-lépés szükséges a publikáláshoz — a Netlify
közvetlenül ezeket a fájlokat szolgálja ki a `netlify.toml`-ban beállítottak szerint).

## Fájlok
- `index.html` — főoldal
- `adatkezelesi-tajekoztato.html`, `aszf.html` — jogi oldalak
- `assets/styles.css` — lefordított Tailwind CSS
- `app.js` — navigáció / mobilmenü / galéria interakciók
- `favicon.svg` — logó / favicon

## Publikálás
A Netlify automatikusan újra publikálja az oldalt minden alkalommal, amikor ide, a `main` ágra
push történik (pl. amikor egy fájlt itt, a GitHub webes felületén szerkesztesz és mented).
