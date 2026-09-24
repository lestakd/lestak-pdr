# Feltöltési útmutató — helyi SEO frissítés + navbar-javítás (2026.09.24)

Ez a csomag 4 fájlt tartalmaz, amit a GitHub repódban kell frissíteni/létrehozni:

1. `index.html` — **MEGLÉVŐ fájl, frissítés**
2. `assets/styles.css` — **MEGLÉVŐ fájl, frissítés**
3. `robots.txt` — **ÚJ fájl** (eddig nem létezett a repóban)
4. `sitemap.xml` — **ÚJ fájl** (eddig nem létezett a repóban)

## 1-2. lépés: `index.html` és `assets/styles.css` frissítése

Mindkettő már létező fájl a repódban, tehát a **biztonságos "Add file → Upload files"** módszert használd:

1. Menj a GitHub repód főoldalára.
2. Kattints az **"Add file" → "Upload files"** gombra.
3. Húzd rá (drag & drop) az ebből a csomagból származó `index.html` fájlt — a GitHub felismeri, hogy ugyanaz
   a névvel/útvonallal létező fájlt frissítesz, és módosításként kezeli (nem hoz létre duplikátumot).
4. Ugyanígy: navigálj be az `assets` mappába a repóban, majd onnan "Add file → Upload files" és húzd rá a
   csomag `assets/styles.css` fájlját.
5. Mindkét feltöltésnél írj rövid commit-üzenetet (pl. "SEO frissítés + navbar javítás"), majd kattints
   "Commit changes"-re.

## 3-4. lépés: `robots.txt` és `sitemap.xml` létrehozása (új fájlok)

Mivel ezek teljesen ÚJ fájlok a repo gyökerében (nem almappában vannak, tehát nincs mappa-struktúra kockázat):

1. A repód főoldalán "Add file → Upload files".
2. Húzd rá a csomag `robots.txt` és `sitemap.xml` fájljait egyszerre (mindkettő a repo gyökerébe kerül).
3. Commit üzenet, majd "Commit changes".

## Ellenőrzés feltöltés után

A Netlify 1-2 percen belül automatikusan újrapublikálja az oldalt. Ezután érdemes ellenőrizni:

- Az élő oldalon (asztali nézetben, kb. 1280px vagy szélesebb böngésző-ablaknál) a felső menüsor rendben,
  törésmentesen jelenik-e meg (korábban ez el volt csúszva/törve).
- Keskenyebb ablaknál (1024-1279px között) a hamburger-menü (≡ ikon) jelenik-e meg a teljes menü helyett —
  ez szándékos változás, a korábbi törés-hiba javításának része.
- A böngésző címsorában/lap-fülén a cím most már tartalmazza a "Jégkár javítás és PDR horpadásjavítás
  Diósd, Érd, Budapest környékén" szöveget.
- Görgess le a "Technológia" szekció alá — ott egy új "Szolgáltatási terület" blokknak kell megjelennie
  a településnevekkel.

## Mit NEM tartalmaz ez a csomag

Ez a kör kizárólag a weboldal on-page tartalmát/technikai beállításait érinti. A Google Cégem (Google Business
Profile) profil optimalizálása (kategóriák, nyitvatartás, fotók, bejegyzések) NEM része ennek a körnek —
ha ez is fontos a rangsoroláshoz, azt egy következő körben érdemes átnézni.

**Fontos emlékeztető**: a `lestakpdr.hu` domain még nincs véglegesítve/DNS-hez kötve. Ez a placeholder-cím most
összesen 6 helyen szerepel a kódban (canonical link, Open Graph URL, JSON-LD, valamint most újonnan a
`robots.txt` és a `sitemap.xml` mindhárom bejegyzése). Ha eldől a végleges domain, mindegyiket egyszerre
kell majd frissíteni — szólj, és átvezetem.
