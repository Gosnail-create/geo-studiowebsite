# Geo Studio Engineering – sito demo

Questo repository contiene una demo navigabile del nuovo sito di Geo Studio Engineering, società di consulenza tecnica e progettazione di Bovolone (VR). Serve a Gosnail per mostrare al cliente struttura, testi e design prima dello sviluppo definitivo, che sarà fatto in WordPress. Non è il sito ufficiale: deve essere fedele ai contenuti e al design system, ma non deve essere indicizzato e non raccoglie dati.

## Materiali di partenza (cartelle `docs/`, `design-system/`, `assets/`)

- `docs/testi-it.md`: testi italiani di tutte le pagine. È la fonte dei contenuti. Ignora il paragrafo introduttivo e l'ultima sezione "Domande e materiali per il cliente", che sono note di lavoro.
- `docs/brief-sito.md`: alberatura, URL, modelli di pagina, CTA, form, regole per il blog demo.
- `docs/immagini.md`: foto per pagina, rendering del biometano, regole sulle copertine del blog.
- `design-system/`: README del design system, `tokens.json` (colori, tipografia, spazi, raggi, ombre), `components/bundle.css` e le anteprime HTML di Hero, ServiceCard e Button.
- `assets/`: logo a colori e in negativo (PNG), tre rendering del biometano (JPG).

## Regole sui contenuti

- Usa i testi di `docs/testi-it.md` così come sono. Non riscriverli, non accorciarli, non aggiungere frasi, dati, numeri o servizi. Se un testo non entra nel layout, cambia il layout.
- Nei testi, "Title:" e "Description:" sono i metadati della pagina; i titoli di terzo livello sono l'H1; quelli di quarto livello gli H2; quelli di quinto livello le domande frequenti; le righe "Bottone:" sono le CTA; le tabelle "Card | Testo della card" diventano card; le righe "Pannello dati:" diventano pannelli su `brand-deep` con i valori in IBM Plex Mono; le righe tra parentesi quadre sono segnaposto da mostrare come tali.
- Registro: si dà del "voi" al lettore, l'azienda parla alla prima persona plurale. Nessun testo promette consulenze gratuite. Nessun punto esclamativo, emoji o superlativo.
- Non inventare testi per il blog, le pagine legali o qualsiasi parte mancante: usa segnaposto dichiarati ("Testo in preparazione").

## Regole di design

- Segui `design-system/README.md` e `design-system/tokens.json`: genera da `tokens.json` le variabili CSS e usa solo quelle, senza colori, misure o font fuori sistema.
- Font self-hosted (pacchetti @fontsource di Red Hat Display, Red Hat Text e IBM Plex Mono), non caricati da Google Fonts.
- Il verde `accent` è solo per il bottone principale e piccoli indicatori; la grafite `brand-deep` solo a blocchi (pannelli dati, fasce di chiusura, footer). Hero su `surface` con foto, mai grafite a tutto schermo.
- Angoli con i token `radius-*`, card piatte senza ombra, taglio obliquo a 64 gradi solo per piccoli segni grafici.
- Icone lineari con tratto 1,5 px (Lucide va bene).
- Griglia a 12 colonne, larghezza massima 1200 px, margine minimo 16 px su mobile. Il sito deve funzionare bene da 360 px in su.
- Accessibilità: contrasto almeno 4,5:1, focus visibile con il token `focus`, alt text sulle immagini, struttura dei titoli corretta, form utilizzabile da tastiera.

## Regole tecniche

- Stack: Astro (output statico), TypeScript, CSS con variabili. Niente framework CSS pesanti.
- Contenuti in file separati per pagina (Markdown/MDX o file di dati), non incollati nei componenti.
- La demo non deve essere indicizzata: `<meta name="robots" content="noindex, nofollow">` su ogni pagina, `robots.txt` con `Disallow: /`, intestazione `X-Robots-Tag: noindex, nofollow` in `vercel.json`. Nessuna sitemap.
- Nessuno strumento di tracciamento, nessun servizio esterno che imposti cookie (niente Google Fonts, Google Maps incorporata, reCAPTCHA). La mappa è un'immagine statica o un riquadro con link a Google Maps.
- Il form non invia dati: validazione lato client, poi redirect a /contatti/grazie/.
- Prima di ogni commit esegui la build (`npm run build`) e correggi gli errori.
- Il deploy avviene su Vercel collegato a questo repository GitHub: ogni push sul branch principale aggiorna la demo. Non serve configurare nulla di Vercel dal codice oltre a `vercel.json`.
- Messaggi di commit brevi, in italiano, uno per fase di lavoro.
