// Calcola il contrasto WCAG delle coppie di token usate nel sito.
// Testo: almeno 4,5:1. Bordi dei controlli, anello di focus e testo grande: almeno 3:1.
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(readFileSync(resolve(root, 'design-system/tokens.json'), 'utf8'));
const c = Object.fromEntries(tokens.color.tokens.map((t) => [t.name, t.value]));

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(c[a]), lum(c[b])].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

const chiari = ['surface', 'surface-raised', 'surface-sunken'];
// I numeri dei passi usano brand, già incluso fra i link.
const scuri = ['brand-deep', 'brand-deep-2'];
const coppie = [
  // testo corrente e secondario
  ...chiari.flatMap((f) => [['ink', f, 4.5, 'testo'], ['ink-muted', f, 4.5, 'testo secondario'], ['brand', f, 4.5, 'link']]),
  // accent-ink solo su surface e surface-raised (README): sottolineatura dei titoli del blog
  ['accent-ink', 'surface-raised', 3, 'sottolineatura link articoli'],
  ['accent-ink', 'surface', 3, 'sottolineatura dei titoli nelle righe del blog'],
  ['state-danger', 'surface-raised', 4.5, 'messaggi di errore'],
  ['surface-raised', 'brand', 4.5, 'intestazioni di tabella, filtro attivo'],
  ['on-accent', 'accent', 4.5, 'bottone principale'],
  ...scuri.flatMap((f) => [['on-brand-deep', f, 4.5, 'testo su grafite'], ['on-brand-deep-muted', f, 4.5, 'testo secondario su grafite'], ['accent-on-deep', f, 4.5, 'valori dei pannelli']]),
  // acciaio come superficie e stati selezionati (revisione del 15 ottobre 2026)
  ['on-brand', 'brand', 4.5, 'testo su acciaio'],
  ['on-brand-muted', 'brand', 4.5, 'testo secondario ed etichette su acciaio'],
  ['accent-on-brand', 'brand', 4.5, 'numeri e filetti su acciaio'],
  ['on-brand', 'brand-2', 4.5, 'testo su acciaio di secondo livello'],
  ['brand', 'brand-tint', 4.5, 'voce attiva del menu, tessera scelta'],
  ['ink', 'brand-tint', 4.5, 'testo su tessera scelta'],
  ['ink-muted', 'brand-tint', 4.5, 'descrizione su voce attiva'],
  ['on-accent', 'accent-hover', 4.5, 'bottone lime al passaggio del mouse'],
  ['accent-on-brand', 'brand', 3, 'anello di focus su acciaio'],
  ['brand', 'surface-sunken', 3, 'bordo dei campi attivi'],
  // controlli e focus
  ...chiari.map((f) => ['line-strong', f, 3, 'bordi dei campi']),
  ...chiari.map((f) => ['focus', f, 3, 'anello di focus']),
  ...scuri.map((f) => ['accent-on-deep', f, 3, 'anello di focus su grafite']),
  ['ink', 'surface', 3, 'bordo bottone secondario'],
  ['on-brand-deep', 'brand-deep', 3, 'bordo bottone secondario su grafite'],
];

let falliti = 0;
for (const [fg, bg, min, uso] of coppie) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) falliti++;
  console.log(`${ok ? 'ok ' : 'NO '} ${r.toFixed(2).padStart(5)}:1  (min ${min})  ${fg} su ${bg}  · ${uso}`);
}
if (falliti) { console.error(`Verifica contrasto: ${falliti} coppie sotto soglia`); process.exit(1); }
console.log(`Verifica contrasto: ${coppie.length} coppie conformi`);
