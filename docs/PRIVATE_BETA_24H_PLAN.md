# LEGO Tracker - Private Beta 24h Plan

## Stato beta

LEGO Tracker e pronto per una private beta controllata se viene presentato come:

- portfolio tracker personale
- dashboard di valore collezione
- scanner opportunita rule-based
- prototipo Quant AI con dati mock/stime quando mancano fonti reali

Non va presentato come predittore finanziario definitivo.

## Cosa testare con amici

1. Login e ritorno al portfolio salvato.
2. Aggiunta/modifica di quantita, prezzo pagato e condizione.
3. Import CSV prezzi o sold comps.
4. Portfolio: valore, gain, breakdown per tema/anno/condizione.
5. Quant AI: Command Center, Pro Mode, Portfolio AI, Data Sources, Quality Gate.
6. Data Vault: export backup JSON.

## Regole messaggi AI

- I set flagship di qualita come Titanic, Colosseo, UCS, Icons, Modular, Architecture e Technic non vengono consigliati in vendita solo perche pesano tanto nel portfolio.
- La concentrazione viene mostrata come rischio da monitorare, non come vendita automatica.
- Exit/trim compare solo per posizioni deboli, score basso o rischio alto reale.
- "Non inseguire" mostra solo segnali deboli o troppo rischiosi.

## Limiti attuali

- Forecast e score sono rule-based.
- Senza CSV o API prezzi reali, molti segnali restano mock/stime.
- Backtest usa dati mock, non storico reale.
- BrickLink/eBay/BrickEconomy non sono ancora pipeline produzione completa.

## Checklist prima di farla provare

- Aprire l'app da `http://127.0.0.1:4177/`, non da file locale.
- Fare export backup da Data Vault.
- Importare almeno un CSV prezzi per i set principali.
- Controllare Quality Gate.
- Spiegare ai tester che i forecast servono per feedback UX e logica, non decisioni reali.

## Feedback da chiedere

- Capisci subito quanto vale il portfolio?
- Capisci quali dati sono reali e quali stimati?
- Le azioni BUY/HOLD/WATCH/EXIT sono spiegate bene?
- La modifica di prezzo/quantita nel portfolio e comoda?
- Cosa manca per fidarti dei segnali?
