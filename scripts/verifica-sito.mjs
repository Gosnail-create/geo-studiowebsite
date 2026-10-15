// Verifica il sito generato in dist/ dopo la build:
// - ogni URL dell'alberatura esiste;
// - tutti i link e le risorse interne puntano a file esistenti, comprese le ancore;
// - ogni pagina ha lang="it", <title>, meta robots noindex, un solo H1, titoli senza salti di livello;
// - ogni immagine ha l'attributo alt;
// - nessuna risorsa esterna caricata (script, fogli di stile, font, iframe);
// - robots.txt blocca tutto, vercel.json invia X-Robots-Tag, nessuna sitemap.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const errori = [];
const avvisi = [];

const html = [];
(function cerca(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) cerca(p);
    else if (f.endsWith('.html')) html.push(p);
  }
})(dist);

const urlDi = (file) => {
  const r = '/' + relative(dist, file).replace(/\\/g, '/');
  return r.endsWith('/index.html') ? r.slice(0, -'index.html'.length) : r;
};

const esiste = (percorso) => {
  const p = join(dist, decodeURIComponent(percorso));
  if (existsSync(p) && statSync(p).isFile()) return p;
  if (existsSync(join(p, 'index.html'))) return join(p, 'index.html');
  return null;
};

const idDi = (testo) => new Set([...testo.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const cacheId = new Map();

// 1. Alberatura
const alberatura = readFileSync(resolve(root, 'src/data/alberatura.ts'), 'utf8');
for (const [, url] of alberatura.matchAll(/url: '([^']+)'/g)) {
  if (!esiste(url)) errori.push(`Pagina mancante: ${url}`);
}
if (!existsSync(join(dist, '404.html'))) errori.push('Manca 404.html');

// 2-5. Controlli per pagina
for (const file of html) {
  const url = urlDi(file);
  const t = readFileSync(file, 'utf8');
  const pag = (m) => `${url}: ${m}`;

  if (!/<html lang="it"/.test(t)) errori.push(pag('manca lang="it"'));
  const titolo = t.match(/<title>([^<]*)<\/title>/);
  if (!titolo || !titolo[1].trim()) errori.push(pag('manca <title>'));
  if (!/<meta name="robots" content="noindex, nofollow">/.test(t)) errori.push(pag('manca meta robots noindex'));
  if (!/<meta name="description" content="[^"]+">/.test(t)) avvisi.push(pag('senza meta description'));

  const h1 = (t.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) errori.push(pag(`${h1} H1 invece di 1`));
  const livelli = [...t.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < livelli.length; i++) {
    if (livelli[i] > livelli[i - 1] + 1) errori.push(pag(`salto di titolo da h${livelli[i - 1]} a h${livelli[i]}`));
  }

  for (const [img] of t.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(img)) errori.push(pag(`immagine senza alt: ${img.slice(0, 80)}`));
  }

  for (const [tag] of t.matchAll(/<(?:script|link|iframe)\b[^>]*>/g)) {
    const src = tag.match(/\s(?:src|href)="(https?:)?\/\/[^"]+"/);
    if (src) errori.push(pag(`risorsa esterna: ${tag.slice(0, 100)}`));
  }

  for (const [, attr, valore] of t.matchAll(/\s(href|src|srcset)="([^"]+)"/g)) {
    const voci = attr === 'srcset' ? valore.split(',').map((v) => v.trim().split(/\s+/)[0]) : [valore];
    for (const v of voci) {
      if (/^(https?:|mailto:|tel:|data:)/.test(v)) continue;
      const [percorso, ancora] = v.replace(/&amp;/g, '&').split('#');
      const pulito = percorso.split('?')[0];
      const target = pulito ? esiste(pulito.startsWith('/') ? pulito : join(url, pulito)) : file;
      if (!target) { errori.push(pag(`link interno rotto: ${v}`)); continue; }
      if (ancora && target.endsWith('.html')) {
        if (!cacheId.has(target)) cacheId.set(target, idDi(readFileSync(target, 'utf8')));
        if (!cacheId.get(target).has(ancora)) errori.push(pag(`ancora inesistente: ${v}`));
      }
    }
  }
}

// 6. Indicizzazione
const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
if (!/User-agent: \*\s+Disallow: \/\s*$/m.test(robots)) errori.push('robots.txt non blocca tutto il sito');
const vercel = JSON.parse(readFileSync(resolve(root, 'vercel.json'), 'utf8'));
const xrt = vercel.headers?.some((h) => h.source === '/(.*)' && h.headers.some((x) => x.key === 'X-Robots-Tag' && x.value === 'noindex, nofollow'));
if (!xrt) errori.push('vercel.json non invia X-Robots-Tag: noindex, nofollow su tutto il sito');
if (readdirSync(dist).some((f) => f.startsWith('sitemap'))) errori.push('È presente una sitemap');

for (const a of avvisi) console.log(`  avviso: ${a}`);
if (errori.length) {
  console.error(`Verifica sito: ${errori.length} problemi\n  ` + errori.join('\n  '));
  process.exit(1);
}
console.log(`Verifica sito: ${html.length} pagine, link interni, metadati, titoli, alt e noindex in ordine`);
