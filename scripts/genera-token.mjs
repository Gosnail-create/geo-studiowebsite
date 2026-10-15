// Genera src/styles/tokens.css da design-system/tokens.json.
// Il CSS del sito usa solo le variabili prodotte qui.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(readFileSync(resolve(root, 'design-system/tokens.json'), 'utf8'));
const out = resolve(root, 'src/styles/tokens.css');

const lines = [];
const add = (name, value) => lines.push(`  --${name}: ${value};`);

lines.push('  /* colore */');
for (const t of tokens.color.tokens) add(t.name, t.value);

lines.push('  /* famiglie */');
for (const [k, v] of Object.entries(tokens.type.families)) add(`font-${k}`, v);

lines.push('  /* stili tipografici */');
for (const group of tokens.type.groups) {
  for (const s of group.styles) {
    add(`${s.name}-family`, `var(--font-${s.family})`);
    add(`${s.name}-size`, s.fontSize);
    add(`${s.name}-line`, s.lineHeight);
    add(`${s.name}-weight`, String(s.fontWeight));
    add(`${s.name}-tracking`, s.letterSpacing ?? 'normal');
    // varianti per schermi stretti (sotto 768px) e intermedi (1024-1280px), dove definite
    if (s.fontSizeMobile) { add(`${s.name}-size-mobile`, s.fontSizeMobile); add(`${s.name}-line-mobile`, s.lineHeightMobile); }
    if (s.fontSizeMedium) { add(`${s.name}-size-medium`, s.fontSizeMedium); add(`${s.name}-line-medium`, s.lineHeightMedium); }
  }
}

lines.push('  /* spazi, raggi, ombre, angoli */');
for (const t of tokens.spacing.tokens) add(t.name, t.value);
for (const t of tokens.radius.tokens) add(t.name, t.value);
for (const t of tokens.shadow.tokens) add(t.name, t.value);
for (const t of tokens.angle.tokens) add(t.name, t.value);
lines.push('  /* misure */');
for (const t of tokens.size?.tokens ?? []) add(t.name, t.value);

const css = `/* File generato da scripts/genera-token.mjs: non modificare a mano. */\n:root {\n${lines.join('\n')}\n}\n`;
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, css);
console.log(`tokens.css: ${lines.length} righe`);
