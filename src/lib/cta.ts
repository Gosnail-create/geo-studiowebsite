// Tutte le CTA portano a /contatti/ con servizio e provenienza nel link
// (docs/brief-sito.md, sezione "Call to action").
export type Origine = 'header' | 'home' | 'servizi' | 'servizio' | 'chi-siamo' | 'articolo';

export function linkContatti(origine: Origine, servizio?: string): string {
  const params = new URLSearchParams();
  if (servizio) params.set('servizio', servizio);
  params.set('origine', origine);
  return `/contatti/?${params.toString()}`;
}
