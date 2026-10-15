// Foto stock per pagina (docs/immagini.md), salvate in public/images.
// Le dimensioni arrivano da src/data/foto.json, scritto da scripts/ottimizza-foto.mjs.
import dimensioni from './foto.json';

export interface Foto {
  nome: string;
  alt: string;
  width: number;
  height: number;
  larghezze: number[];
}

const alt: Record<string, string> = {
  'tecnico-ispezione-macchinari': 'Tecnico con una cartella di documenti che osserva un impianto di processo in un reparto produttivo',
  'tecnici-progetto-planimetria': 'Persone attorno a una planimetria stesa sul tavolo, una indica un punto del disegno',
  'collettori-impianto-riscaldamento': 'Collettori di un impianto di riscaldamento a pavimento con valvole, flussimetri e pompa di circolazione',
  'azienda-agricola-eolico-fotovoltaico': 'Azienda agricola con pannelli fotovoltaici sul tetto e una pala eolica dietro gli alberi',
  'tecnico-installazione-pannelli-fotovoltaici': 'Tecnico con gilet ad alta visibilità che collega i cavi di un modulo fotovoltaico sul tetto',
  'campo-aerogeneratori-piccola-taglia': 'Due aerogeneratori di piccola taglia in un prato aperto',
  'centrale-idroelettrica-torrente': 'Piccola centrale idroelettrica lungo un torrente, con traversa e salto d\'acqua',
  'operai-lavorazione-carpenteria': 'Due operai con elmetto e guanti al lavoro su una struttura metallica in officina',
  'gru-selezione-rottami-metallici': 'Gru a polipo che seleziona rottami metallici in un impianto di trattamento',
  'impianto-sprinkler-antincendio': 'Tubazioni rosse e valvole di un impianto sprinkler antincendio su una parete industriale',
  'verifica-documenti-magazzino': 'Due persone in magazzino esaminano un documento su una cartellina',
  'formatrice-corso-gruppo': 'Formatrice che spiega a un gruppo di partecipanti davanti a una lavagna a fogli',
  'facciata-edificio-uffici': 'Facciata di un edificio per uffici con file regolari di finestre',
  'tavole-progetto-architettonico': 'Tavole di progetto architettonico sparse su un piano di lavoro',
};

export function foto(nome: keyof typeof dimensioni): Foto {
  const d = dimensioni[nome];
  return { nome, alt: alt[nome] ?? '', ...d };
}

export type NomeFoto = keyof typeof dimensioni;
