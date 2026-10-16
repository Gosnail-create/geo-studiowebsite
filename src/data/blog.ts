// Blog della demo (docs/brief-sito.md, "Blog nella demo"): titoli provvisori, etichetta
// "Bozza", nessun testo di articolo. Solo il primo ha la pagina di esempio.
// Copertine fotografiche dalla revisione del 15 ottobre 2026; riassunti approvati da Gosnail
// con la revisione 7 (docs/testi-revisione.md, "Riassunti degli articoli del blog").
export const areeBlog = [
  'Tutti', 'Sicurezza sul lavoro', 'Prevenzione incendi', 'Ambiente', 'Sistemi di gestione',
  'Formazione', 'Impianti', 'Energie rinnovabili', 'Notizie',
] as const;

export type AreaBlog = Exclude<(typeof areeBlog)[number], 'Tutti'>;

export interface Articolo {
  titolo: string;
  area: AreaBlog;
  /** copertina fotografica (public/images) */
  foto?: string;
  /** in alternativa alla foto, un rendering del biometano (src/data/rendering.ts), senza didascalia */
  rendering?: 'ingresso' | 'vistaAerea' | 'vistaLaterale';
  riassunto: string;
  href?: string;
}

// L'ordine è quello di pubblicazione, dal più recente: il primo va in evidenza.
export const articoli: Articolo[] = [
  {
    titolo: "Cos'è il biometano e come si produce",
    area: 'Energie rinnovabili',
    rendering: 'vistaAerea',
    riassunto: "Il biometano è un gas rinnovabile che si ottiene dagli effluenti zootecnici e dai sottoprodotti agricoli: la digestione anaerobica produce biogas, che dopo la purificazione può essere immesso nella rete del gas o usato come carburante. Per valutare un impianto in azienda contano soprattutto la quantità e la costanza delle matrici disponibili, la logistica e la distanza dalla rete.",
    href: '/blog/esempio-articolo/',
  },
  {
    titolo: 'Lavori in quota: obblighi e misure di prevenzione',
    area: 'Sicurezza sul lavoro',
    foto: 'lavori-in-quota-fune',
    riassunto: "Si parla di lavoro in quota quando un'attività espone il lavoratore al rischio di caduta da un'altezza superiore a 2 metri rispetto a un piano stabile, come stabilisce l'articolo 107 del D.Lgs. 81/2008. Gli obblighi del datore di lavoro partono dalla scelta delle attrezzature, privilegiando le protezioni collettive su quelle individuali, e arrivano alla formazione e all'addestramento di chi le usa.",
  },
  {
    titolo: 'Resistenza al fuoco delle strutture: cosa prevede il codice di prevenzione incendi',
    area: 'Prevenzione incendi',
    foto: 'impianto-sprinkler-antincendio',
    riassunto: "La resistenza al fuoco indica per quanto tempo un elemento strutturale, come una trave, un pilastro o un solaio, continua a svolgere la sua funzione durante un incendio, e si esprime in minuti con sigle come R 60 o REI 120. Nel codice di prevenzione incendi (DM 3 agosto 2015) è la misura S.2, e il livello richiesto dipende dalle caratteristiche dell'attività e dal carico di incendio specifico di progetto.",
  },
];
