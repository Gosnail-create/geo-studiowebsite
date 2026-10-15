// Lettura strutturata di docs/testi-it.md, condivisa da importa-testi e verifica-testi.
// Interpreta le convenzioni descritte in CLAUDE.md (Regole sui contenuti).
import { readFileSync } from 'node:fs';

export const PAGINE = {
  'Home': 'home',
  'Chi siamo': 'chi-siamo',
  'Servizi (hub)': 'servizi',
  'Progettazione impianti tecnologici': 'progettazione-impianti-tecnologici',
  'Energie rinnovabili (hub)': 'energie-rinnovabili',
  'Impianti fotovoltaici': 'impianto-fotovoltaico',
  'Impianti mini-eolici': 'impianto-mini-eolico',
  'Impianti a biometano': 'impianto-a-biometano',
  'Impianti idroelettrici': 'impianto-idroelettrico',
  'Sicurezza negli ambienti di lavoro': 'sicurezza-negli-ambienti-di-lavoro',
  'Consulenza ambientale': 'ambiente',
  'Prevenzione incendi': 'prevenzione-incendi',
  'Sistemi di gestione': 'sistemi-di-gestione',
  'Formazione': 'formazione',
};

const senzaPunto = (s) => s.replace(/\.$/, '');
const celle = (riga) => riga.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

/** Divide il corpo di una sezione in blocchi grezzi, nell'ordine del testo. */
function blocchi(righe) {
  const out = [];
  let i = 0;
  while (i < righe.length) {
    const r = righe[i];
    if (!r.trim()) { i++; continue; }
    if (/^\d+\. /.test(r)) {
      const voci = [];
      while (i < righe.length && /^\d+\. /.test(righe[i])) voci.push(righe[i++].replace(/^\d+\. /, ''));
      out.push({ tipo: 'passi', voci });
    } else if (r.startsWith('- ')) {
      const voci = [];
      while (i < righe.length && righe[i].startsWith('- ')) voci.push(righe[i++].slice(2));
      out.push({ tipo: 'elenco', voci });
    } else if (r.startsWith('|')) {
      const t = [];
      while (i < righe.length && righe[i].startsWith('|')) t.push(righe[i++]);
      const [intestazioni, , ...resto] = t.map(celle);
      out.push({ tipo: 'tabella', intestazioni, righe: resto });
    } else if (r.startsWith('##### ')) {
      const domanda = r.slice(6);
      i++;
      const risposta = [];
      while (i < righe.length && !righe[i].startsWith('#####')) {
        if (righe[i].trim()) risposta.push(righe[i]);
        i++;
      }
      out.push({ tipo: 'faq', domanda, risposta: risposta.join(' ') });
    } else if (r.startsWith('Bottone: ')) {
      const m = r.match(/^Bottone: (.+?)\.(?: Link secondario: (.+)\.)?$/);
      out.push({ tipo: 'bottone', label: m[1] });
      if (m[2]) out.push({ tipo: 'link', label: m[2] });
      i++;
    } else if (r.startsWith('Link: ')) {
      out.push({ tipo: 'link', label: senzaPunto(r.slice(6)) });
      i++;
    } else if (r.startsWith('Pannello dati: ')) {
      const voci = senzaPunto(r.slice(15)).split(' · ').map((v) => {
        const k = v.indexOf(', ');
        return { valore: v.slice(0, k), descrizione: v.slice(k + 2) };
      });
      out.push({ tipo: 'pannello', voci });
      i++;
    } else if (r.startsWith('Immagine: ')) {
      out.push({ tipo: 'immagine', descrizione: r.slice(10) });
      i++;
    } else if (r.startsWith('Griglia: ')) {
      out.push({ tipo: 'istruzione', testo: r });
      i++;
    } else if (/^\[.*\]$/.test(r.trim())) {
      out.push({ tipo: 'segnaposto', testo: r.trim() });
      i++;
    } else {
      out.push({ tipo: 'p', testo: r });
      i++;
    }
  }
  return out;
}

/** Restituisce le pagine di testi-it.md, ciascuna con meta, h1, intro e sezioni H2. */
export function leggiTesti(percorso) {
  const md = readFileSync(percorso, 'utf8').replace(/\r\n/g, '\n');
  const pagine = {};
  const parti = md.split(/^## /m).slice(1);
  for (const parte of parti) {
    const [titoloPagina, ...corpo] = parte.split('\n');
    const chiave = PAGINE[titoloPagina.trim()];
    if (!chiave) continue;
    const righe = corpo;
    const meta = righe.find((r) => r.startsWith('Title: '));
    const m = meta.match(/^Title: (.+?)\. Description: (.+)$/);
    const iH1 = righe.findIndex((r) => r.startsWith('### '));
    const sezioni = [];
    let intro = [];
    let corrente = null;
    for (const r of righe.slice(iH1 + 1)) {
      if (r.startsWith('#### ')) {
        corrente = { titolo: r.slice(5), righe: [] };
        sezioni.push(corrente);
      } else if (corrente) corrente.righe.push(r);
      else intro.push(r);
    }
    pagine[chiave] = {
      title: m[1],
      description: m[2],
      h1: righe[iH1].slice(4),
      intro: blocchi(intro),
      sezioni: sezioni.map((s) => ({ titolo: s.titolo, blocchi: blocchi(s.righe) })),
    };
  }
  return pagine;
}

// Frasi che nei testi sono istruzioni di impaginazione e non testo da pubblicare:
// diventano componenti (griglia del blog, mappa) e non stringhe.
export const ISTRUZIONI = [
  [' Tre card con gli ultimi articoli e il link Tutti gli articoli.', 'Tutti gli articoli'],
  [' Mappa della sede.', null],
];

/** Tutte le stringhe del cliente che devono comparire identiche nei contenuti. */
export function stringheAttese(pagina) {
  const out = [pagina.title, pagina.description, pagina.h1];
  const daBlocchi = (bs) => {
    for (const b of bs) {
      if (b.tipo === 'p') {
        let t = b.testo;
        for (const [frase, etichetta] of ISTRUZIONI) {
          if (t.includes(frase)) { t = t.replace(frase, ''); if (etichetta) out.push(etichetta); }
        }
        out.push(t);
      } else if (b.tipo === 'segnaposto') out.push(b.testo);
      else if (b.tipo === 'tabella' && b.intestazioni[1] === 'Corsi') {
        b.righe.forEach(([area, corsi]) => out.push(area, ...corsi.split('; ')));
      }
      else if (b.tipo === 'passi' || b.tipo === 'elenco') out.push(...b.voci);
      else if (b.tipo === 'tabella') {
        if (b.intestazioni[1] !== 'Testo della card') out.push(...b.intestazioni);
        b.righe.forEach((r) => out.push(...r));
      }
      else if (b.tipo === 'faq') out.push(b.domanda, b.risposta);
      else if (b.tipo === 'bottone' || b.tipo === 'link') out.push(b.label);
      else if (b.tipo === 'pannello') b.voci.forEach((v) => out.push(v.valore, v.descrizione));
    }
  };
  daBlocchi(pagina.intro);
  // "Domande frequenti" è il titolo fisso del componente Faq.
  for (const s of pagina.sezioni) { if (s.titolo !== 'Domande frequenti') out.push(s.titolo); daBlocchi(s.blocchi); }
  return out;
}

// Annotazioni tra parentesi che nei testi di servizio descrivono il sito multilingue.
const ANNOTAZIONI = [' (nelle altre lingue: Paese)', ' (solo in italiano)'];
const PREFISSI_ELENCO = ['Campi: ', 'Messaggi di errore: ', 'Link: ', 'Colonna recapiti: ', 'Filtri per area: '];
const PREFISSI_VALORE = ['H1: ', 'Testo guida del campo Messaggio: ', 'Casella obbligatoria: ', 'Casella facoltativa: ', 'Bottone: ', 'Blocco candidature: '];
// Parole che nei testi indicano un componente e non un testo da pubblicare.
const SEGNALI = new Set(['mappa']);

/** Testi della sezione "Blog, contatti e testi di servizio", per titolo di terzo livello. */
export function leggiTestiServizio(percorso) {
  const md = readFileSync(percorso, 'utf8').replace(/\r\n/g, '\n');
  const sezione = md.split(/^## /m).find((p) => p.startsWith('Blog, contatti e testi di servizio'));
  const out = {};
  for (const parte of sezione.split(/^### /m).slice(1)) {
    const [titolo, ...righe] = parte.split('\n');
    const attese = [];
    for (let r of righe) {
      r = r.trim();
      if (!r) continue;
      for (const a of ANNOTAZIONI) r = r.replace(a, '');
      // modello della riga in testa agli articoli e note sulle altre lingue: non sono testi da pubblicare
      if (r.startsWith('Riga in testa a ogni articolo: ') || r.startsWith('Nelle versioni ')) continue;
      const riquadro = r.match(/^Riquadro in fondo a ogni articolo: (.+?\?) (.+) Bottone: (.+)\.$/);
      if (riquadro) { attese.push(riquadro[1], riquadro[2], riquadro[3]); continue; }
      const meta = r.match(/^Title: (.+?)\. Description: (.+)$/);
      if (meta) { attese.push(meta[1], meta[2]); continue; }
      const pe = PREFISSI_ELENCO.find((p) => r.startsWith(p));
      if (pe) { attese.push(...senzaPunto(r.slice(pe.length)).split(' · ').filter((v) => !SEGNALI.has(v))); continue; }
      const pv = PREFISSI_VALORE.find((p) => r.startsWith(p));
      if (pv) { const v = r.slice(pv.length); attese.push(pv === 'Blocco candidature: ' || pv === 'Testo guida del campo Messaggio: ' ? v : senzaPunto(v)); continue; }
      attese.push(r);
    }
    out[titolo.trim()] = { attese, testo: righe.join('\n') };
  }
  return out;
}
