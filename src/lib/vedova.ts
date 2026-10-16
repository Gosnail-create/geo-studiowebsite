// Spazio indivisibile fra le ultime due parole di un paragrafo d'apertura, perché l'ultima non
// resti da sola sulla riga quando text-wrap: pretty non basta. Il testo non cambia.
export const senzaVedova = (t: string) => t.replace(/ (\S+)$/, ' $1');
