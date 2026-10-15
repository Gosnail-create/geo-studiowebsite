# Brief del sito demo Geo Studio Engineering

Fonte: documento di progetto "Geo Studio – progetto del nuovo sito" (Gosnail, 15 ottobre 2026). Qui c'è solo ciò che serve per costruire la demo.

## Il cliente in breve

Geo Studio Engineering S.r.l. è una società di consulenza tecnica e progettazione con sede in via Madonna 420, 37051 Bovolone (VR), attiva dal 1990 e organizzata in due divisioni: impianti tecnologici e QHSE. Tel. 045 7101045, info@geo-studio.it, P. IVA e C.F. 03982960233. Social: LinkedIn https://www.linkedin.com/company/geo-studio-engineering-s.r.l./, Instagram https://www.instagram.com/geostudioengineeringsrl/, Facebook https://www.facebook.com/profile.php?id=100086458782275.

## Alberatura della demo (solo italiano)

| Pagina | URL | Modello |
| --- | --- | --- |
| Home | / | Home |
| Servizi | /servizi/ | Hub |
| Progettazione impianti tecnologici | /servizi/progettazione-impianti-tecnologici/ | Servizio |
| Energie rinnovabili | /servizi/energie-rinnovabili/ | Hub + servizio |
| Impianti fotovoltaici | /servizi/energie-rinnovabili/impianto-fotovoltaico/ | Servizio |
| Impianti mini-eolici | /servizi/energie-rinnovabili/impianto-mini-eolico/ | Servizio |
| Impianti a biometano | /servizi/energie-rinnovabili/impianto-a-biometano/ | Servizio |
| Impianti idroelettrici | /servizi/energie-rinnovabili/impianto-idroelettrico/ | Servizio |
| Sicurezza negli ambienti di lavoro | /servizi/sicurezza-negli-ambienti-di-lavoro/ | Servizio |
| Consulenza ambientale | /servizi/ambiente/ | Servizio |
| Prevenzione incendi | /servizi/prevenzione-incendi/ | Servizio |
| Sistemi di gestione | /servizi/sistemi-di-gestione/ | Servizio |
| Formazione | /servizi/formazione/ | Servizio |
| Chi siamo | /chi-siamo/ | Pagina istituzionale |
| Blog | /blog/ | Elenco articoli |
| Articolo di esempio | /blog/esempio-articolo/ | Articolo |
| Contatti | /contatti/ | Form |
| Conferma invio | /contatti/grazie/ | Conferma |
| Privacy policy | /privacy-policy/ | Testo legale |
| Cookie policy | /cookie-policy/ | Testo legale |
| Segnalazioni | /segnalazioni/ | Testo legale |
| Pagina 404 | (404) | Errore |

Nel sito definitivo ci saranno anche /en/, /de/ e /es/ con indirizzi tradotti; nella demo il selettore di lingua è visibile ma EN, DE ed ES sono disattivati con la nota "in arrivo". Il blog esisterà solo in italiano.

## Menu e footer

Header: logo · Servizi (menu a tendina con le sette aree; Energie rinnovabili apre le quattro tecnologie) · Chi siamo · Blog · Contatti · selettore lingua · bottone "Richiedete una consulenza".

Footer su `brand-deep` con logo in negativo: dati aziendali, le sette aree, Chi siamo / Blog / Contatti / Segnalazioni, recapiti e social, riga legale con © 2026, P. IVA, Privacy policy, Cookie policy, Preferenze cookie.

## Modelli di pagina

| Modello | Sezioni, dall'alto in basso | Colori |
| --- | --- | --- |
| Home | Hero (etichetta, H1, testo, bottone, link, foto); perché un solo interlocutore; sette card dei servizi; metodo in quattro passi; chi siamo in breve con pannello dati; tre articoli del blog; fascia di chiusura con bottone | Hero su `surface` con foto (mai grafite a tutto schermo); pannello dati e fascia di chiusura su `brand-deep` |
| Servizio | Etichetta d'area, H1, testo, bottone e foto; sezioni H2 del testo; domande frequenti in accordion; fascia di chiusura con il bottone del servizio | Card su `surface-raised`, fasce alternate su `surface-sunken`, chiusura su `brand-deep` |
| Hub (Servizi, Energie rinnovabili) | Introduzione e griglia di card verso le pagine figlie | Come sopra |
| Chi siamo | Storia, divisioni, metodo, organigramma (segnaposto), certificazione ISO 9001 in pannello dati, sede, fascia di chiusura | Pannello certificazione su `brand-deep` con il dato in IBM Plex Mono |
| Contatti | Testo, form, colonna recapiti, mappa statica | Form su `surface-raised`, bordi campi `line-strong` |

## Call to action

Tutte le CTA portano a /contatti/ con il servizio e la provenienza nel link, per esempio /contatti/?servizio=prevenzione-incendi&origine=servizio. Il form legge `servizio` e preseleziona il campo "Servizio di interesse".

| Pagina | Etichetta del bottone principale |
| --- | --- |
| Header | Richiedete una consulenza |
| Home | Parlate con un nostro tecnico |
| Progettazione impianti tecnologici | Richiedete una valutazione del progetto |
| Energie rinnovabili e sottopagine | Valutate il vostro impianto con noi |
| Sicurezza negli ambienti di lavoro | Richiedete un sopralluogo |
| Consulenza ambientale | Verificate i vostri adempimenti ambientali |
| Prevenzione incendi | Verificate i vostri adempimenti antincendio |
| Sistemi di gestione | Valutate il percorso verso la certificazione |
| Formazione | Organizzate la formazione del personale |
| Articolo del blog | Parlatene con un nostro tecnico |

Nessun testo promette consulenze gratuite.

## Il form (nella demo non invia dati)

| Campo | Tipo | Obbligatorio |
| --- | --- | --- |
| Nome e cognome | testo | sì |
| Azienda o ente | testo | sì |
| Email | email | sì |
| Telefono | telefono | no |
| Provincia | elenco delle province italiane | sì |
| Servizio di interesse | elenco: le sette aree più "Altro", precompilato dal link | sì |
| Messaggio | testo lungo | sì |
| Ho letto l'informativa sulla privacy | casella non preselezionata, link a /privacy-policy/ | sì |
| Desidero ricevere occasionalmente comunicazioni su novità normative, servizi ed eventi | casella non preselezionata | no |
| Lingua, pagina di origine, parametri UTM | campi nascosti | automatici |

Nel sito definitivo le richieste andranno nello Zoho CRM del cliente con notifica email; nella demo il form valida i campi lato client e porta a /contatti/grazie/ senza inviare nulla, con una nota discreta "Versione dimostrativa: i dati non vengono inviati".

## Blog nella demo

Gli articoli sono in riscrittura. L'elenco mostra tre card con titoli provvisori ("Cos'è il biometano e come si produce", "Lavori in quota: obblighi e misure di prevenzione", "Resistenza al fuoco delle strutture: cosa prevede il codice di prevenzione incendi"), un'etichetta "Bozza" e filtri per area (Tutti, Sicurezza sul lavoro, Prevenzione incendi, Ambiente, Sistemi di gestione, Formazione, Impianti, Energie rinnovabili, Notizie). Una sola pagina articolo di esempio mostra il modello: riga "Aggiornato il … · Area: …", indice, corpo con un segnaposto dichiarato al posto del testo, riquadro finale del servizio collegato con CTA. Non inventare testi di articoli.
