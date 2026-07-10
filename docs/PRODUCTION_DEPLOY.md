# LEGO Tracker Deploy

## Stato consigliato

La versione attuale va pubblicata come **private beta**, non ancora come prodotto finanziario/autopilot.

Motivo: il tracking portfolio e Quant AI funzionano, ma i prezzi devono essere alimentati da provider reali o CSV verificati. Le previsioni devono restare spiegate come stime, non come garanzie.

## Deploy Web App Python

Usa un host tipo Render, Railway o Fly.io.

Comando di avvio:

```bash
BRICKPULSE_HOST=0.0.0.0 BRICKPULSE_SECURE_COOKIES=1 python3 server.py
```

Variabili ambiente:

```text
REBRICKABLE_API_KEY
BRICKLINK_CONSUMER_KEY
BRICKLINK_CONSUMER_SECRET
BRICKLINK_TOKEN
BRICKLINK_TOKEN_SECRET
BRICKPULSE_SECURE_COOKIES=1
```

## Deploy Streamlit Preview

Main file:

```text
streamlit_app.py
```

Secrets Streamlit:

```toml
rebrickable_api_key = "..."
bricklink_consumer_key = ""
bricklink_consumer_secret = ""
bricklink_token = ""
bricklink_token_secret = ""
```

## Cosa non pubblicare

Questi file devono restare solo sul Mac:

```text
.brickpulse.local.json
.brickpulse.users.json
.streamlit/secrets.toml
```

Sono gia esclusi da `.gitignore`.

## Checklist Beta

- Repository pulito su GitHub.
- Rebrickable key configurata su hosting.
- Almeno un CSV prezzi reali importato.
- Backup esportato da Data Vault.
- Disclaimer visibile: dati e previsioni sono stime.
- Test Quant verdi.

## Blocchi Prima Della Produzione Vera

- Database cloud al posto di JSON locale.
- Autenticazione gestita o hardening sicurezza.
- Audit log append-only.
- Scheduler prezzi giornaliero.
- Provider pricing reale con termini commerciali chiari.
- Marketplace/payments solo dopo controllo umano e limiti forti.
