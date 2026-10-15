// Verifica a ogni build che i contenuti in src/content/pagine/ siano fedeli a
// docs/testi-it.md, nei due sensi:
// 1. ogni testo del cliente compare identico nel file della pagina;
// 2. ogni testo del file della pagina viene dai testi del cliente (niente testi inventati).
// Fanno eccezione solo i campi tecnici (link, chiavi di immagini) e le poche etichette
// d'interfaccia elencate in ETICHETTE_UI, decise con Gosnail.
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { leggiTesti, stringheAttese } from './lib/testi.mjs';

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
    if (!presenti.includes(a) && !unite.includes(a)) errori.push(`${chiave}: testo mancante o modificato:\n    «${a}»`);
  }
  for (const p of presenti) {
    if (!insiemeAttese.has(p) && !ETICHETTE_UI.has(p) && !PRESTITI[chiave]?.has(p)) errori.push(`${chiave}: testo non presente in testi-it.md:\n    «${p}»`);
  }
}

if (errori.length) {
  console.error(`Verifica testi: ${errori.length} problemi\n  ` + errori.join('\n  '));
  process.exit(1);
}
console.log(`Verifica testi: ${Object.keys(pagine).length} pagine conformi a docs/testi-it.md`);
