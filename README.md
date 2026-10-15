# Geo Studio Engineering – sito demo

Demo navigabile del nuovo sito di Geo Studio Engineering, preparata da Gosnail per mostrare al cliente struttura, testi e design prima dello sviluppo in WordPress. Non è il sito ufficiale: non è indicizzata e il modulo contatti non invia dati. Le regole di lavoro sono in [CLAUDE.md](CLAUDE.md).

Online: https://geo-studiowebsite.vercel.app/ (deploy automatico da Vercel a ogni push su `main`).

## Comandi

```bash
npm install
npm run dev      # sviluppo locale
npm run build    # token, verifiche, build statica in dist/
```

`npm run build` si ferma se una verifica fallisce:

1. `scripts/genera-token.mjs` genera `src/styles/tokens.css` da `design-system/tokens.json`.
2. `scripts/verifica-testi.mjs` controlla che i contenuti siano identici a `docs/testi-it.md` e che non contengano testi aggiunti.
3. `scripts/verifica-contrasto.mjs` calcola il contrasto WCAG delle coppie di token usate.
4. `astro check` e `astro build`.
5. `scripts/verifica-sito.mjs` controlla sul sito generato pagine dell'alberatura, link interni, ancore, title, noindex, un solo H1, ordine dei titoli, alt delle immagini, assenza di risorse esterne, robots.txt e intestazione X-Robots-Tag.

## Dove stanno le cose

| Cosa | Dove |
| --- | --- |
| Testi delle pagine | `src/content/pagine/*.yaml` (home, hub, servizi, Chi siamo) e `src/content/speciali/*.yaml` (Contatti, conferma, blog, articolo) |
| Servizi, menu, dati aziendali, blog, province | `src/data/` |
| Foto stock ottimizzate e crediti | `public/images/` e `public/images/credits.md` |
| Rendering del biometano | `assets/rendering/` (usati solo nelle pagine indicate) |
| Componenti | `src/components/` |
| Pagine e URL | `src/pages/` |

I file YAML delle pagine sono stati creati da `docs/testi-it.md` con `scripts/importa-testi.mjs`; da allora sono loro la fonte. Rieseguire lo script li sovrascrive. Le foto si rigenerano dagli originali con `node scripts/ottimizza-foto.mjs <cartella>`.
