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
  'tecnico-manutenzione-macchinario': 'Tecnico con elmetto che controlla un componente di un macchinario in officina',
  'tecnico-dpi-verifica-reparto': 'Tecnico con elmetto e gilet ad alta visibilità che compila una scheda di controllo in un capannone',
  'sopralluogo-tecnico-cartellina': 'Tecnico con gilet ad alta visibilità che verifica un serramento durante un sopralluogo, con la cartellina in mano',
  'campionamento-ambientale-dpi': "Tecnico in tuta protettiva e maschera che osserva un campione in una beuta durante un rilievo all'aperto",
  'prelievo-campioni-ambientali': "Tecnico in tuta protettiva che preleva un campione con pipetta e beuta in un'area di deposito",
  'verifica-magazzino-gilet': 'Tre persone con gilet ad alta visibilità che discutono in un magazzino di profilati metallici',
  'tecnici-cantiere-tavola-progetto': 'Due tecnici con elmetto che consultano una tavola di progetto in cantiere',
  'gruppo-tecnici-reparto': 'Tre tecnici con elmetto e tuta da lavoro che consultano un tablet in un reparto produttivo',
  'lavori-in-quota-fune': 'Operatore con imbracatura e funi al lavoro sulla facciata di un edificio in mattoni',
  'quadro-elettrico-cablaggi': 'Quadro elettrico aperto con interruttori, morsettiere e cablaggi',
  'estintori-deposito': 'Estintori rossi in un deposito industriale',
  'aula-formazione-riunione': 'Formatore in piedi davanti a un gruppo di partecipanti seduti attorno a un tavolo con i computer',
  'gruppo-revisione-progetti': 'Persone che esaminano tavole di progetto su una scrivania con un computer portatile',
  'copertura-fotovoltaica-aerea': 'Vista aerea di una grande copertura industriale con file di moduli fotovoltaici',
  'borgo-pale-eoliche': 'Borgo di montagna tra i prati con due pale eoliche sulla collina',
  'centrale-idroelettrica-diga': 'Centrale idroelettrica ai piedi di una diga, sulla riva di un fiume',
  'aerogeneratore-campo-grano': 'Aerogeneratore in un campo di grano sotto un cielo con nuvole',
};

export function foto(nome: keyof typeof dimensioni): Foto {
  const d = dimensioni[nome];
  return { nome, alt: alt[nome] ?? '', ...d };
}

export type NomeFoto = keyof typeof dimensioni;
