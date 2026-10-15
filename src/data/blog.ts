// Blog della demo (docs/brief-sito.md, "Blog nella demo"): titoli provvisori, etichetta
// "Bozza", nessun testo di articolo. Solo il primo ha la pagina di esempio.
// Le copertine sono fotografiche dalla revisione del 15 ottobre 2026.
export const areeBlog = [
  'Tutti', 'Sicurezza sul lavoro', 'Prevenzione incendi', 'Ambiente', 'Sistemi di gestione',
  'Formazione', 'Impianti', 'Energie rinnovabili', 'Notizie',
] as const;

export type AreaBlog = Exclude<(typeof areeBlog)[number], 'Tutti'>;

export interface Articolo {
  titolo: string;
  area: AreaBlog;
  /** copertina fotografica (revisione del 15 ottobre 2026) */
  foto: string;
  href?: string;
}

export const articoli: Articolo[] = [
  { titolo: "Cos'è il biometano e come si produce", area: 'Energie rinnovabili', foto: 'aerogeneratore-campo-grano', href: '/blog/esempio-articolo/' },
  { titolo: 'Lavori in quota: obblighi e misure di prevenzione', area: 'Sicurezza sul lavoro', foto: 'lavori-in-quota-fune' },
  { titolo: 'Resistenza al fuoco delle strutture: cosa prevede il codice di prevenzione incendi', area: 'Prevenzione incendi', foto: 'impianto-sprinkler-antincendio' },
];
