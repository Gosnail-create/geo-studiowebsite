// Verifica a ogni build che i contenuti in src/content/pagine/ siano fedeli a
// docs/testi-it.md, nei due sensi:
// 1. ogni testo del cliente compare identico nel file della pagina;
// 2. ogni testo del file della pagina viene dai testi del cliente (niente testi inventati).
// Fanno eccezione solo i campi tecnici (link, chiavi di immagini), le poche etichette
// d'interfaccia elencate in ETICHETTE_UI e i testi approvati in docs/testi-revisione.md.
// Un paragrafo può essere diviso fra più blocchi purché ogni frase resti identica.
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { leggiTesti, stringheAttese, leggiTestiServizio } from './lib/testi.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pagine = leggiTesti(resolve(root, 'docs/testi-it.md'));
const cartella = resolve(root, 'src/content/pagine');

const CAMPI_TECNICI = new Set(['href', 'tipo', 'chiave', 'foto', 'rendering', 'origine', 'servizio']);
const ETICHETTE_UI = new Set([
  'Consulenza tecnica e progettazione dal 1990', // etichetta hero home (Hero.html, footer)
  'Servizi', // etichetta degli hub
  'Approfondite', // link delle card (ServiceCard.html)
  'Progettazione impianti tecnologici', 'Energie rinnovabili', 'Sicurezza negli ambienti di lavoro',
  'Consulenza ambientale', 'Prevenzione incendi', 'Sistemi di gestione', 'Formazione', // nomi delle aree
]);

function stringhe(nodo, chiave, out) {
  if (typeof nodo === 'string') { if (!CAMPI_TECNICI.has(chiave)) out.push(nodo); }
  else if (Array.isArray(nodo)) nodo.forEach((n) => stringhe(n, chiave, out));
  else if (nodo && typeof nodo === 'object') for (const [k, v] of Object.entries(nodo)) stringhe(v, k, out);
  return out;
}

// L'hub Servizi riprende "le sette card della home, con lo stesso testo" (testi-it.md).
const cardHome = pagine.home.sezioni.flatMap((s) => s.blocchi)
  .filter((b) => b.tipo === 'tabella' && b.intestazioni[1] === 'Testo della card')
  .flatMap((b) => b.righe.flat());
const PRESTITI = { servizi: new Set(cardHome) };

// Testi della revisione del 15 ottobre 2026: voci di elenco, righe "Chiave: valore",
// coppie separate da " · ".
const REVISIONE = new Set();
for (const riga of readFileSync(resolve(root, 'docs/testi-revisione.md'), 'utf8').split(/\r?\n/)) {
  const r = riga.trim();
  if (!r || r.startsWith('#')) continue;
  const v = r.startsWith('- ') ? r.slice(2) : r.includes(': ') ? r.slice(r.indexOf(': ') + 2) : '';
  if (!v) continue;
  REVISIONE.add(v);
  v.split(' · ').forEach((x) => REVISIONE.add(x));
}

// Frasi di un paragrafo: si divide dopo ". " seguito da maiuscola.
const frasi = (t) => t.split(/(?<=\.) (?=[A-ZÀ-Ú])/);
const presente = (a, unite) => unite.includes(a) || frasi(a).every((f) => unite.includes(f));
const ammesso = (p, attese, extra) => attese.some((a) => a.includes(p)) || ETICHETTE_UI.has(p) || REVISIONE.has(p) || extra?.has(p);

const errori = [];
const file = readdirSync(cartella).filter((f) => f.endsWith('.yaml'));

for (const [chiave, pagina] of Object.entries(pagine)) {
  if (!file.includes(`${chiave}.yaml`)) { errori.push(`${chiave}: file mancante`); continue; }
  const doc = parse(readFileSync(resolve(cartella, `${chiave}.yaml`), 'utf8'));
  const presenti = stringhe(doc, '', []);
  const attese = stringheAttese(pagina);
  const insiemeAttese = new Set(attese);
  const unite = presenti.join('\u0000');

  for (const a of attese) {
    if (!presente(a, unite)) errori.push(`${chiave}: testo mancante o modificato:\n    «${a}»`);
  }
  for (const p of presenti) {
    if (!insiemeAttese.has(p) && !ammesso(p, attese, PRESTITI[chiave])) errori.push(`${chiave}: testo non presente in testi-it.md:\n    «${p}»`);
  }
}

// Pagine di servizio (Contatti, conferma, ...): i testi vengono dalla sezione
// "Blog, contatti e testi di servizio"; sono ammessi anche testi presi da docs/brief-sito.md.
const servizio = leggiTestiServizio(resolve(root, 'docs/testi-it.md'));
const brief = readFileSync(resolve(root, 'docs/brief-sito.md'), 'utf8');
const SPECIALI = {
  'Contatti': ['contatti'],
  'Pagina di conferma': ['grazie'],
  'Blog (pagina elenco, solo in italiano)': ['blog', 'articolo'],
};
const cartellaSpeciali = resolve(root, 'src/content/speciali');
let contaSpeciali = 0;
for (const [titolo, files] of Object.entries(SPECIALI)) {
  const { attese, testo } = servizio[titolo];
  const perFile = files.map((f) => [f, stringhe(parse(readFileSync(resolve(cartellaSpeciali, `${f}.yaml`), 'utf8')), '', [])]);
  const unite = perFile.flatMap(([, p]) => p).join('\u0000');
  for (const a of attese) if (!unite.includes(a)) errori.push(`${files.join('+')}: testo mancante o modificato:
    «${a}»`);
  for (const [f, presenti] of perFile) {
    contaSpeciali++;
    for (const p of presenti) {
      if (!attese.includes(p) && !testo.includes(p) && !brief.includes(p)) errori.push(`${f}: testo non presente in testi-it.md né nel brief:
    «${p}»`);
    }
  }
}

if (errori.length) {
  console.error(`Verifica testi: ${errori.length} problemi\n  ` + errori.join('\n  '));
  process.exit(1);
}
console.log(`Verifica testi: ${Object.keys(pagine).length + contaSpeciali} pagine conformi a docs/testi-it.md`);
