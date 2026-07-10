# LEGO Quant AI Report

## Cosa e stato implementato

LEGO Tracker ora include una nuova area avanzata chiamata **LEGO Quant AI**. La sezione trasforma il prodotto da tracker collezione a primo motore predittivo rule-based per investimento LEGO.

Componenti aggiunti:

- database mock Quant con campi investimento, rischio, forecast e storico prezzi;
- feature engineering per CAGR, premium vs retail, price per piece, proximity retirement, tema, minifigure, scarsita, liquidita e volatilita;
- forecast engine trasparente con orizzonti 12 mesi, 3 anni e 5 anni;
- opportunity scanner con Strong Buy, Watchlist, Avoid e High Risk / High Reward;
- backtesting engine su dati mock storici;
- dashboard UI con Quant Overview, Top Opportunities, Set Detail Forecast, Theme Analysis, Retirement Radar e Backtest Report;
- Portfolio AI con score pesato sulla collezione, forecast 5Y, concentrazione per tema e azioni hold/trim/watch;
- Data Sources Hub per importare snapshot prezzo CSV e usare quei prezzi dentro portfolio e forecast;
- Sold Comps Importer per importare CSV di vendite reali e calcolare prezzo mediano, range, volume venduto e liquidita;
- Price Confidence Engine per valutare affidabilita dello snapshot in base a volume venduto, recenza, fonte e dispersione prezzo;
- template CSV scaricabili per snapshot prezzi e sold comps;
- Price History Center con snapshot giornalieri, trend per set ed export storico CSV;
- Quality Gate per misurare qualita dati, copertura prezzi reali, storico e snapshot vecchi;
- Data Vault per esportare/ripristinare portfolio, watchlist, snapshot prezzi e storico senza includere API key;
- salvataggio server-side per market snapshot, price history e pesi modello quando l'utente e loggato;
- export account server-side con portfolio, watchlist e market data, senza password o API key;
- setup BrickLink locale da UI con credenziali salvate solo in `.brickpulse.local.json`;
- export CSV separati per portfolio e snapshot prezzi, utili per fogli, GitHub, Streamlit o migrazioni future;
- Strategy Lab per simulare un piano acquisti con budget, profilo rischio e orizzonte 3/5 anni;
- Model Lab per modificare i pesi dello score e vedere il breakdown dei fattori;
- Deal Scanner per confrontare prezzo corrente e target buy, con invio rapido in watchlist;
- Alert Center per combinare deal, watchlist, target raggiunti e rischio portfolio;
- AI Command Center come cockpit operativo che sintetizza azioni del giorno, deal, portfolio risk e top opportunity;
- AI Daily Brief testabile dal motore Quant, con headline, azioni e note operative;
- Pro Mode con rotazione capitale: candidati trim/exit, buy list e avoid list;
- grafici forecast/storico sul dettaglio set;
- import portfolio CSV con colonne flessibili;
- aggiornamento batch prezzi mercato per portfolio/watchlist tramite proxy BrickLink quando configurato;
- explanation layer in linguaggio naturale;
- adapter TypeScript future-ready per Rebrickable, BrickEconomy, BrickLink, eBay e Amazon;
- normalizzazione futura dei price snapshot per unificare retail, sealed, used, sold count e fonte prezzo;
- normalizzazione condizioni set: sealed mint, sealed damaged box, used complete e used incomplete;
- test automatici per scoring, forecast, scanner, backtest, normalizzazione e rischio.

## Come funziona il modello

Il modello attuale e rule-based e usa dati mock realistici, non dati reali di mercato. Per ogni set calcola:

- crescita storica stimata tramite CAGR;
- premium o discount rispetto al retail;
- efficienza prezzo per pezzo;
- distanza dal retirement e anni post-retirement;
- forza del tema, con peso maggiore per linee come Star Wars UCS, Icons, Modular, Technic e Harry Potter;
- esclusivita minifigure;
- liquidita e volatilita;
- scarcity score;
- investment score finale da 0 a 100.

Il Model Lab rende questi pesi configurabili. Ogni set mostra:

- contributo domanda;
- contributo rarita;
- contributo forza tema;
- contributo minifigure;
- contributo retirement;
- contributo liquidita;
- contributo scarsita;
- boost da prezzo sotto retail;
- penalita premium elevato;
- penalita volatilita.

Il Quality Gate assegna anche un data quality score. La qualita sale quando il set ha fonte prezzo non mock, retail e market price, sealed/used price, liquidita, storico prezzi e data update recente.

La condizione del set ora impatta l'analisi portfolio:

- sealed mint mantiene il 100% del valore sealed;
- sealed damaged box applica uno sconto prudente;
- used complete applica un valore inferiore al sealed;
- used incomplete applica uno sconto piu forte.

Questo evita che il portfolio tratti ogni posizione come sigillata perfetta.

Il forecast combina score, forza tema, prossimita al retirement e volatilita per generare:

- forecast 12 mesi;
- forecast 3 anni;
- forecast 5 anni;
- expected ROI;
- confidence level;
- risk level;
- azione consigliata;
- target buy;
- target sell.

La nuova analisi portfolio pesa ogni set per valore corrente, quindi un set costoso influenza piu dello stesso score su un set piccolo. Il sistema calcola anche concentrazione per tema, rischio aggregato e una lista di azioni operative:

- hold / accumula;
- tieni;
- alleggerisci;
- valuta uscita;
- monitora.

Il Data Sources Hub accetta CSV con colonne flessibili come:

- setNumber / set_num / code;
- retailPrice / retail;
- currentMarketPrice / price;
- sealedPrice / sealed;
- usedPrice / used;
- soldCount;
- listingCount;
- source;
- capturedAt / date.

Quando un codice set combacia, lo snapshot importato sostituisce il prezzo stimato nel portfolio e nel motore Quant.

Il Sold Comps Importer accetta CSV di vendite reali con colonne flessibili:

- setNumber / set_num / code;
- soldPrice / sold_price / price / total;
- shipping / postage;
- condition / new_or_used;
- source / marketplace;
- soldAt / date / ended.

Il sistema raggruppa per set, calcola mediana sealed e used, scarta outlier semplici tramite range 10%-90%, salva volume venduto e aggiorna snapshot/storico. Questo e il ponte piu diretto verso eBay sold e BrickLink sold data.

Il Price Confidence Engine assegna uno score 0-100 a ogni snapshot considerando:

- numero di vendite reali;
- recenza dello snapshot;
- presenza di sealed price;
- presenza di used price;
- fonte dati;
- ampiezza del range prezzo 10%-90%.

Questo evita di trattare allo stesso modo un prezzo basato su 1 vendita vecchia e un prezzo basato su molte vendite recenti.

Il Price History Center costruisce memoria nel tempo:

- ogni import prezzi o sold comps aggiunge punti allo storico;
- lo snapshot giornaliero salva un punto al giorno per ogni set con prezzo importato;
- la vista mostra trend positivi/negativi e ultima fonte prezzo;
- lo storico puo essere esportato in CSV.

Questa e la base per passare da forecast statici a trend verificabili.

Il Data Vault crea un backup JSON completo dei dati utente locali:

- portfolio;
- watchlist;
- snapshot prezzi;
- storico prezzi;
- metadata ultimo sync.

Il backup non esporta API key, password o segreti. Serve come ponte pratico per migrare il progetto su una versione online o su Streamlit mantenendo gli stessi dati della versione Mac.

Quando l'utente e loggato, il server salva anche:

- marketSnapshots;
- priceHistory;
- quantModelWeights.

Questo prepara il passaggio online: il portfolio non dipende piu solo dal browser locale, e il motore Quant puo ricostruire dati mercato e modello dell'account.

Lo Strategy Lab usa gli output Quant per creare un piano acquisti simulato:

- budget disponibile;
- profilo difensivo, bilanciato o aggressivo;
- orizzonte 3 anni o 5 anni;
- target buy per set;
- capitale allocato;
- valore atteso a fine orizzonte;
- rischio medio del piano.

Questo non e ancora un consiglio finanziario: e un simulatore operativo che diventera molto piu affidabile quando ricevera prezzi venduti reali e storico marketplace.

Il Deal Scanner usa i forecast normalizzati per classificare ogni set in:

- sotto target buy;
- quasi a target;
- fair watch;
- prezzo tirato.

L'Alert Center produce segnali operativi ordinati per priorita:

- buy / target hit;
- watch;
- sell risk;
- portfolio risk.

L'AI Command Center e la schermata principale per l'uso quotidiano: aggrega Portfolio AI, Deal Scanner, Alert Center e Top Opportunities in quattro azioni rapide.

La Pro Mode traduce il modello in rotazione di capitale: cosa alleggerire, cosa comprare a target e quali set evitare per rischio/premium. Il dettaglio set ora mostra anche curve forecast e storico sealed, usando snapshot importati quando disponibili.

Il bottone "Aggiorna prezzi" prova ad aggiornare i set presenti in portfolio e watchlist usando il proxy BrickLink del server. Ogni prezzo valido viene salvato come snapshot locale e alimenta grafici, Deal Scanner, Alert Center e Portfolio AI.

La configurazione BrickLink puo essere salvata dalla UI locale. Il frontend invia consumer key, consumer secret, token e token secret al server locale; il server li salva nel file `.brickpulse.local.json` e non li restituisce mai nelle risposte. Il test connessione usa Price Guide su un set demo per verificare che OAuth e credenziali funzionino.

## Limiti attuali

I dati sono mock e devono essere considerati dimostrativi. Non sono raccomandazioni finanziarie e non rappresentano valori di mercato verificati.

Limiti principali:

- nessuno storico reale dei prezzi venduti;
- nessun volume reale da marketplace;
- retirement year stimato o mock per alcuni set;
- nessuna distinzione ancora tra nuovo sigillato, damaged box, usato completo e usato incompleto nel modello;
- nessun costo di commissioni, spedizione, cambio valuta o tasse;
- nessuna stagionalita reale calcolata su vendite storiche.

## Dati necessari per renderlo reale

Per arrivare a un vero LEGO Investment Predictor servono fonti dati affidabili:

- Rebrickable API per catalogo ufficiale, parti, set, immagini e minifigure;
- BrickEconomy o fonte equivalente per valori storici e market trend;
- BrickLink API o import CSV per Price Guide, listing, vendite e liquidita;
- eBay API per prezzi venduti reali;
- Amazon o retail feed per prezzo retail corrente e availability;
- archivio locale normalizzato per salvare snapshot giornalieri o settimanali.

Nota: Rebrickable fornisce catalogo ufficiale LEGO ma non pricing data. I prezzi devono arrivare da fonti esterne.

## Roadmap

1. Collegare Rebrickable come fonte catalogo ufficiale normalizzata.
2. Collegare almeno una fonte prezzo reale per sealed, used e retail.
3. Salvare snapshot storici nel database locale/server.
4. Aggiungere normalizzazione condizioni: sealed mint, sealed damaged, used complete, used incomplete.
5. Aggiungere volumi venduti e listing count per calcolare liquidita reale.
6. Migliorare backtesting con dati storici veri.
7. Aggiungere pesi configurabili del modello.
8. Passare da rule-based puro a modello ibrido: regole trasparenti + regressione/ML leggero.
9. Aggiungere alert automatici quando prezzo reale scende sotto target buy.
10. Pubblicare dashboard online con API key gestite via env/secrets, mai nel frontend.
