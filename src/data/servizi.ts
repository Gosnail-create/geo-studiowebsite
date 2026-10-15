// Le sette aree di servizio, sempre con questi nomi e in quest'ordine
// (design-system/README.md). Slug e CTA da docs/brief-sito.md.
export interface Tecnologia {
  nome: string;
  url: string;
}

export interface Servizio {
  slug: string;
  nome: string;
  url: string;
  cta: string;
  tecnologie?: Tecnologia[];
}

export const servizi: Servizio[] = [
  {
    slug: 'progettazione-impianti-tecnologici',
    nome: 'Progettazione impianti tecnologici',
    url: '/servizi/progettazione-impianti-tecnologici/',
    cta: 'Richiedete una valutazione del progetto',
  },
  {
    slug: 'energie-rinnovabili',
    nome: 'Energie rinnovabili',
    url: '/servizi/energie-rinnovabili/',
    cta: 'Valutate il vostro impianto con noi',
    tecnologie: [
      { nome: 'Impianti fotovoltaici', url: '/servizi/energie-rinnovabili/impianto-fotovoltaico/' },
      { nome: 'Impianti mini-eolici', url: '/servizi/energie-rinnovabili/impianto-mini-eolico/' },
      { nome: 'Impianti a biometano', url: '/servizi/energie-rinnovabili/impianto-a-biometano/' },
      { nome: 'Impianti idroelettrici', url: '/servizi/energie-rinnovabili/impianto-idroelettrico/' },
    ],
  },
  {
    slug: 'sicurezza-negli-ambienti-di-lavoro',
    nome: 'Sicurezza negli ambienti di lavoro',
    url: '/servizi/sicurezza-negli-ambienti-di-lavoro/',
    cta: 'Richiedete un sopralluogo',
  },
  {
    slug: 'ambiente',
    nome: 'Consulenza ambientale',
    url: '/servizi/ambiente/',
    cta: 'Verificate i vostri adempimenti ambientali',
  },
  {
    slug: 'prevenzione-incendi',
    nome: 'Prevenzione incendi',
    url: '/servizi/prevenzione-incendi/',
    cta: 'Verificate i vostri adempimenti antincendio',
  },
  {
    slug: 'sistemi-di-gestione',
    nome: 'Sistemi di gestione',
    url: '/servizi/sistemi-di-gestione/',
    cta: 'Valutate il percorso verso la certificazione',
  },
  {
    slug: 'formazione',
    nome: 'Formazione',
    url: '/servizi/formazione/',
    cta: 'Organizzate la formazione del personale',
  },
];

export const servizioPerSlug = (slug: string) => servizi.find((s) => s.slug === slug);
