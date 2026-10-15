// Collezione dei contenuti di pagina: un file YAML per pagina in src/content/pagine/.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const voce = z.object({ titolo: z.string(), testo: z.string() });

const blocco = z.discriminatedUnion('tipo', [
  z.object({ tipo: z.literal('p'), testo: z.string() }),
  z.object({ tipo: z.literal('passi'), voci: z.array(z.string()), titoloInline: z.boolean().optional() }),
  z.object({ tipo: z.literal('elenco'), voci: z.array(z.string()), colonne: z.union([z.literal(1), z.literal(2)]).optional() }),
  z.object({ tipo: z.literal('tabella'), intestazioni: z.array(z.string()), righe: z.array(z.array(z.string())) }),
  z.object({ tipo: z.literal('servizi'), voci: z.array(voce), linkLabel: z.string() }),
  z.object({
    tipo: z.literal('card'),
    voci: z.array(voce.extend({ href: z.string(), rendering: z.enum(['ingresso', 'vistaAerea', 'vistaLaterale']).optional() })),
  }),
  z.object({ tipo: z.literal('corsi'), voci: z.array(z.object({ area: z.string(), corsi: z.array(z.string()) })) }),
  z.object({ tipo: z.literal('pannello'), voci: z.array(z.object({ valore: z.string(), descrizione: z.string() })) }),
  z.object({ tipo: z.literal('rendering'), chiave: z.enum(['ingresso', 'vistaAerea', 'vistaLaterale']) }),
  z.object({ tipo: z.literal('segnaposto'), testo: z.string() }),
  z.object({ tipo: z.literal('link'), label: z.string(), href: z.string() }),
  z.object({ tipo: z.literal('blog') }),
  z.object({ tipo: z.literal('mappa') }),
]);

const pagine = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/pagine' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    origine: z.enum(['home', 'servizi', 'servizio', 'chi-siamo']),
    servizio: z.string().optional(),
    hero: z.object({
      etichetta: z.string().optional(),
      titolo: z.string(),
      testo: z.array(z.string()),
      bottone: z.string().optional(),
      link: z.object({ label: z.string(), href: z.string() }).optional(),
      foto: z.string().optional(),
      rendering: z.enum(['ingresso', 'vistaAerea', 'vistaLaterale']).optional(),
      dati: z.array(z.object({ valore: z.string(), descrizione: z.string() })).optional(),
    }),
    // blocchi senza titolo subito dopo l'hero (la griglia dei servizi nell'hub)
    dopoHero: z.array(blocco).optional(),
    sezioni: z.array(z.object({ titolo: z.string(), blocchi: z.array(blocco) })),
    faq: z.array(z.object({ domanda: z.string(), risposta: z.string() })).optional(),
    chiusura: z.object({ titolo: z.string(), testo: z.string(), bottone: z.string() }).optional(),
  }),
});

// Pagine con struttura propria (Contatti, conferma): i campi li leggono le singole pagine.
const speciali = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/speciali' }),
  schema: z.record(z.string(), z.any()),
});

export const collections = { pagine, speciali };
