// Ottimizza le foto stock scaricate e le salva in public/images con nomi leggibili,
// in WebP a tre larghezze. Scrive le dimensioni in src/data/foto.json.
// Uso: node scripts/ottimizza-foto.mjs <cartella-con-gli-originali>
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sorgente = process.argv[2];
if (!sorgente) {
  console.error('Indicate la cartella con gli originali.');
  process.exit(1);
}

// file originale -> nome pubblicato
const foto = {
  'home-1.jpg': 'tecnico-ispezione-macchinari',
  'chi-siamo-1.jpg': 'tecnici-progetto-planimetria',
  'progettazione-1.jpg': 'collettori-impianto-riscaldamento',
  'rinnovabili-1.jpg': 'azienda-agricola-eolico-fotovoltaico',
  'fotovoltaico-1.jpg': 'tecnico-installazione-pannelli-fotovoltaici',
  'minieolico-1.jpg': 'campo-aerogeneratori-piccola-taglia',
  'idroelettrico-1.jpg': 'centrale-idroelettrica-torrente',
  'sicurezza-2.jpg': 'operai-lavorazione-carpenteria',
  'ambiente-2.jpg': 'gru-selezione-rottami-metallici',
  'incendi-1.jpg': 'impianto-sprinkler-antincendio',
  'gestione-1.jpg': 'verifica-documenti-magazzino',
  'formazione-1.jpg': 'formatrice-corso-gruppo',
  'contatti-1.jpg': 'facciata-edificio-uffici',
  'blog-1.jpg': 'tavole-progetto-architettonico',
};

const larghezze = [640, 1024, 1600];
const out = resolve(root, 'public/images');
mkdirSync(out, { recursive: true });
const dimensioni = {};

for (const [file, nome] of Object.entries(foto)) {
  const input = readFileSync(resolve(sorgente, file));
  const meta = await sharp(input).rotate().metadata();
  dimensioni[nome] = { width: meta.width, height: meta.height, larghezze };
  for (const w of larghezze) {
    await sharp(input).rotate().resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78 }).toFile(resolve(out, `${nome}-${w}.webp`));
  }
  console.log(nome);
}

writeFileSync(resolve(root, 'src/data/foto.json'), JSON.stringify(dimensioni, null, 2) + '\n');
