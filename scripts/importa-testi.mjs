// Importazione iniziale: da docs/testi-it.md genera un file YAML per pagina in
// src/content/pagine/. Da quel momento i file YAML sono la fonte dei contenuti;
// rieseguire lo script li sovrascrive. La configurazione qui sotto aggiunge solo
// ciò che i testi non dicono: foto, etichette, link e componenti.
// Uso: node scripts/importa-testi.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stringify } from 'yaml';
import { leggiTesti, ISTRUZIONI } from './lib/testi.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pagine = leggiTesti(resolve(root, 'docs/testi-it.md'));

const ER = 'Energie rinnovabili';
const CONFIG = {
  'home': { origine: 'home', etichetta: 'Consulenza tecnica e progettazione dal 1990', foto: 'tecnico-ispezione-macchinari' },
  'chi-siamo': { origine: 'chi-siamo', foto: 'tecnici-progetto-planimetria' },
  'servizi': { origine: 'servizi', etichetta: 'Servizi' },
  'progettazione-impianti-tecnologici': { servizio: 'progettazione-impianti-tecnologici', etichetta: 'Progettazione impianti tecnologici', foto: 'collettori-impianto-riscaldamento' },
  'energie-rinnovabili': { servizio: 'energie-rinnovabili', etichetta: ER, foto: 'azienda-agricola-eolico-fotovoltaico' },
  'impianto-fotovoltaico': { servizio: 'energie-rinnovabili', etichetta: ER, foto: 'tecnico-installazione-pannelli-fotovoltaici' },
  'impianto-mini-eolico': { servizio: 'energie-rinnovabili', etichetta: ER, foto: 'campo-aerogeneratori-piccola-taglia' },
  'impianto-a-biometano': { servizio: 'energie-rinnovabili', etichetta: ER },
  'impianto-idroelettrico': { servizio: 'energie-rinnovabili', etichetta: ER, foto: 'centrale-idroelettrica-torrente' },
  'sicurezza-negli-ambienti-di-lavoro': { servizio: 'sicurezza-negli-ambienti-di-lavoro', etichetta: 'Sicurezza negli ambienti di lavoro', foto: 'operai-lavorazione-carpenteria' },
  'ambiente': { servizio: 'ambiente', etichetta: 'Consulenza ambientale', foto: 'gru-selezione-rottami-metallici' },
  'prevenzione-incendi': { servizio: 'prevenzione-incendi', etichetta: 'Prevenzione incendi', foto: 'impianto-sprinkler-antincendio' },
  'sistemi-di-gestione': { servizio: 'sistemi-di-gestione', etichetta: 'Sistemi di gestione', foto: 'verifica-documenti-magazzino' },
  'formazione': { servizio: 'formazione', etichetta: 'Formazione', foto: 'formatrice-corso-gruppo' },
};

const LINK = {
  'Scoprite i servizi': '/servizi/',
  'Conoscete Geo Studio': '/chi-siamo/',
  'Tutti gli articoli': '/blog/',
};

const TECNOLOGIE = {
  'Impianti fotovoltaici': '/servizi/energie-rinnovabili/impianto-fotovoltaico/',
  'Impianti a biometano': '/servizi/energie-rinnovabili/impianto-a-biometano/',
  'Impianti mini-eolici': '/servizi/energie-rinnovabili/impianto-mini-eolico/',
  'Impianti idroelettrici': '/servizi/energie-rinnovabili/impianto-idroelettrico/',
};

const cardServizi = pagine.home.sezioni
  .find((s) => s.titolo === 'Di cosa ci occupiamo').blocchi
  .find((b) => b.tipo === 'tabella').righe.map(([titolo, testo]) => ({ titolo, testo }));

function converti(b) {
  switch (b.tipo) {
    case 'p': {
      let testo = b.testo;
      const extra = [];
      for (const [frase, etichetta] of ISTRUZIONI) {
        if (testo.includes(frase)) {
          testo = testo.replace(frase, '');
          if (etichetta) extra.push({ tipo: 'blog' }, { tipo: 'link', label: etichetta, href: LINK[etichetta] });
          else extra.push({ tipo: 'mappa' });
        }
      }
      return [{ tipo: 'p', testo }, ...extra];
    }
    case 'link': return [{ tipo: 'link', label: b.label, href: LINK[b.label] }];
    case 'istruzione': return [{ tipo: 'servizi', voci: cardServizi, linkLabel: 'Approfondite' }];
    case 'immagine': return [{ tipo: 'rendering', chiave: 'vistaAerea' }];
    case 'elenco': return [{ tipo: 'elenco', voci: b.voci, colonne: b.voci.length > 6 ? 2 : 1 }];
    case 'tabella': {
      const [, seconda] = b.intestazioni;
      if (seconda === 'Testo della card' && b.intestazioni[0] === 'Area') {
        return [{ tipo: 'servizi', voci: b.righe.map(([titolo, testo]) => ({ titolo, testo })), linkLabel: 'Approfondite' }];
      }
      if (seconda === 'Testo della card') {
        return [{
          tipo: 'card',
          voci: b.righe.map(([titolo, testo]) => ({
            titolo, testo, href: TECNOLOGIE[titolo],
            ...(titolo === 'Impianti a biometano' ? { rendering: 'vistaLaterale' } : {}),
          })),
        }];
      }
      if (seconda === 'Corsi') {
        return [{ tipo: 'corsi', voci: b.righe.map(([area, corsi]) => ({ area, corsi: corsi.split('; ') })) }];
      }
      return [{ tipo: 'tabella', intestazioni: b.intestazioni, righe: b.righe }];
    }
    default: return [b];
  }
}

mkdirSync(resolve(root, 'src/content/pagine'), { recursive: true });

for (const [chiave, p] of Object.entries(pagine)) {
  const cfg = CONFIG[chiave];
  const hero = { titolo: p.h1, testo: [] };
  const dopoHero = [];
  if (cfg.etichetta) hero.etichetta = cfg.etichetta;
  for (const b of p.intro) {
    if (b.tipo === 'p') hero.testo.push(b.testo);
    else if (b.tipo === 'bottone') hero.bottone = b.label;
    else if (b.tipo === 'link') hero.link = { label: b.label, href: LINK[b.label] };
    else if (b.tipo === 'immagine') hero.rendering = 'ingresso';
    else if (b.tipo === 'istruzione') dopoHero.push(...converti(b));
  }
  if (cfg.foto) hero.foto = cfg.foto;

  const sezioni = [];
  let faq;
  let chiusura;
  for (const s of p.sezioni) {
    const bottone = s.blocchi.find((b) => b.tipo === 'bottone');
    if (s.titolo === 'Domande frequenti') {
      faq = s.blocchi.filter((b) => b.tipo === 'faq').map(({ domanda, risposta }) => ({ domanda, risposta }));
    } else if (bottone) {
      chiusura = { titolo: s.titolo, testo: s.blocchi.find((b) => b.tipo === 'p').testo, bottone: bottone.label };
    } else {
      const blocchi = s.blocchi.flatMap(converti);
      if (chiave === 'home') blocchi.forEach((b) => { if (b.tipo === 'passi') b.titoloInline = true; });
      sezioni.push({ titolo: s.titolo, blocchi });
    }
  }

  const doc = {
    title: p.title,
    description: p.description,
    origine: cfg.origine ?? 'servizio',
    ...(cfg.servizio ? { servizio: cfg.servizio } : {}),
    hero,
    ...(dopoHero.length ? { dopoHero } : {}),
    sezioni,
    ...(faq ? { faq } : {}),
    ...(chiusura ? { chiusura } : {}),
  };
  const intestazione = `# Contenuti della pagina "${chiave}", da docs/testi-it.md. I testi del cliente non si modificano.\n`;
  writeFileSync(resolve(root, `src/content/pagine/${chiave}.yaml`), intestazione + stringify(doc, { lineWidth: 0 }));
  console.log(chiave);
}
