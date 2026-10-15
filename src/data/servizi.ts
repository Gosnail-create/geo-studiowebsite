// Le sette aree di servizio, sempre con questi nomi e in quest'ordine
// (design-system/README.md). Slug e CTA da docs/brief-sito.md.
export interface Tecnologia {
  nome: string;
  /** nome breve per le pillole del pannello Servizi (docs/testi-revisione.md) */
  pillola: string;
  url: string;
}

export interface Servizio {
  slug: string;
  nome: string;
  url: string;
  cta: string;
  /** divisione nel pannello Servizi (docs/testi-revisione.md) */
  divisione: 'impianti' | 'qhse';
  /** descrizione di una riga nel pannello Servizi (design-system/components/ServiceCard.html) */
  breve: string;
  tecnologie?: Tecnologia[];
}

export const divisioni = { impianti: 'Impianti tecnologici', qhse: 'QHSE' } as const;

export const servizi: Servizio[] = [
  {
    slug: 'progettazione-impianti-tecnologici',
    nome: 'Progettazione impianti tecnologici',
    url: '/servizi/progettazione-impianti-tecnologici/',
    cta: 'Richiedete una valutazione del progetto',
    divisione: 'impianti',
    breve: 'Impianti elettrici, termoidraulici e di climatizzazione, aree ATEX e verifiche di messa a terra.',
  },
  {
    slug: 'energie-rinnovabili',
    nome: 'Energie rinnovabili',
    url: '/servizi/energie-rinnovabili/',
    cta: 'Valutate il vostro impianto con noi',
    divisione: 'impianti',
    breve: 'Fotovoltaico, mini-eolico, biometano e idroelettrico, dalla fattibilità al cantiere.',
    tecnologie: [
      { nome: 'Impianti fotovoltaici', pillola: 'Fotovoltaico', url: '/servizi/energie-rinnovabili/impianto-fotovoltaico/' },
      { nome: 'Impianti mini-eolici', pillola: 'Mini-eolico', url: '/servizi/energie-rinnovabili/impianto-mini-eolico/' },
      { nome: 'Impianti a biometano', pillola: 'Biometano', url: '/servizi/energie-rinnovabili/impianto-a-biometano/' },
      { nome: 'Impianti idroelettrici', pillola: 'Idroelettrico', url: '/servizi/energie-rinnovabili/impianto-idroelettrico/' },
    ],
  },
  {
    slug: 'sicurezza-negli-ambienti-di-lavoro',
    nome: 'Sicurezza negli ambienti di lavoro',
    url: '/servizi/sicurezza-negli-ambienti-di-lavoro/',
    cta: 'Richiedete un sopralluogo',
    divisione: 'qhse',
    breve: 'Valutazione dei rischi, misure di rumore e vibrazioni, incarichi di RSPP esterno.',
  },
  {
    slug: 'ambiente',
    nome: 'Consulenza ambientale',
    url: '/servizi/ambiente/',
    cta: 'Verificate i vostri adempimenti ambientali',
    divisione: 'qhse',
    breve: 'Rifiuti, emissioni, acque e acustica: autorizzazioni e valutazioni.',
  },
  {
    slug: 'prevenzione-incendi',
    nome: 'Prevenzione incendi',
    url: '/servizi/prevenzione-incendi/',
    cta: 'Verificate i vostri adempimenti antincendio',
    divisione: 'qhse',
    breve: 'Progetti, SCIA e rinnovi presso i Vigili del Fuoco, piani di emergenza.',
  },
  {
    slug: 'sistemi-di-gestione',
    nome: 'Sistemi di gestione',
    url: '/servizi/sistemi-di-gestione/',
    cta: 'Valutate il percorso verso la certificazione',
    divisione: 'qhse',
    breve: 'Qualità, ambiente, sicurezza e sicurezza alimentare, modelli 231.',
  },
  {
    slug: 'formazione',
    nome: 'Formazione',
    url: '/servizi/formazione/',
    cta: 'Organizzate la formazione del personale',
    divisione: 'qhse',
    breve: 'Corsi obbligatori per lavoratori, preposti, dirigenti e addetti alle emergenze.',
  },
];

export const servizioPerSlug = (slug: string) => servizi.find((s) => s.slug === slug);
