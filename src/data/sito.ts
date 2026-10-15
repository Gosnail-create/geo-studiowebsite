// Dati aziendali da docs/brief-sito.md e docs/testi-it.md (Header e footer).
export const azienda = {
  ragioneSociale: 'Geo Studio Engineering S.r.l.',
  descrizione: 'consulenza tecnica e progettazione dal 1990',
  indirizzo: 'via Madonna 420, 37051 Bovolone (VR)',
  telefono: '045 7101045',
  telefonoHref: 'tel:+390457101045',
  email: 'info@geo-studio.it',
  piva: '03982960233',
  mappaUrl: 'https://www.google.com/maps/search/?api=1&query=via+Madonna+420+37051+Bovolone+VR',
  social: [
    { nome: 'LinkedIn', url: 'https://www.linkedin.com/company/geo-studio-engineering-s.r.l./' },
    { nome: 'Instagram', url: 'https://www.instagram.com/geostudioengineeringsrl/' },
    { nome: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100086458782275' },
  ],
} as const;

export const lingue = [
  { codice: 'IT', nome: 'Italiano', attiva: true },
  { codice: 'EN', nome: 'English', attiva: false },
  { codice: 'DE', nome: 'Deutsch', attiva: false },
  { codice: 'ES', nome: 'Español', attiva: false },
] as const;

export const navigazione = [
  { nome: 'Chi siamo', url: '/chi-siamo/' },
  { nome: 'Blog', url: '/blog/' },
  { nome: 'Contatti', url: '/contatti/' },
] as const;

export const linkStudio = [
  { nome: 'Chi siamo', url: '/chi-siamo/' },
  { nome: 'Blog', url: '/blog/' },
  { nome: 'Contatti', url: '/contatti/' },
  { nome: 'Segnalazioni', url: '/segnalazioni/' },
] as const;
