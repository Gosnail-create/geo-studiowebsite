// Blog della demo (docs/brief-sito.md, "Blog nella demo"): titoli provvisori, etichetta
// "Bozza", nessun testo di articolo. Solo il primo ha la pagina di esempio.
export const areeBlog = [
  'Tutti', 'Sicurezza sul lavoro', 'Prevenzione incendi', 'Ambiente', 'Sistemi di gestione',
  'Formazione', 'Impianti', 'Energie rinnovabili', 'Notizie',
] as const;

export type AreaBlog = Exclude<(typeof areeBlog)[number], 'Tutti'>;

export interface Articolo {
  titolo: string;
  area: AreaBlog;
  href?: string;
}

export const articoli: Articolo[] = [
  { titolo: "Cos'è il biometano e come si produce", area: 'Energie rinnovabili', href: '/blog/esempio-articolo/' },
  { titolo: 'Lavori in quota: obblighi e misure di prevenzione', area: 'Sicurezza sul lavoro' },
  { titolo: 'Resistenza al fuoco delle strutture: cosa prevede il codice di prevenzione incendi', area: 'Prevenzione incendi' },
];
