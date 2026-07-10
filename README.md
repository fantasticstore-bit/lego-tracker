# LEGO Tracker

LEGO Tracker is a dark, portfolio-first LEGO price tracker built for collectors.

It includes:

- local account login
- saved portfolio and watchlist
- LEGO catalog sync through Rebrickable
- portfolio analytics
- set detail decision center
- LEGO Quant AI investment scoring and forecast dashboard
- BrickLink Price Guide integration scaffold
- local BrickLink credential setup saved in `.brickpulse.local.json`
- sold-comps CSV import for eBay/BrickLink/BrickEconomy sales exports
- Streamlit preview app for quick cloud deployment

## LEGO Quant AI

The app now includes a mock-data predictive area for LEGO investing:

- Quant Overview
- Top Opportunities
- Set Detail Forecast
- Theme Analysis
- Retirement Radar
- Backtest Report

The current model is rule-based and transparent. It uses realistic mock data only, not verified market data. See `docs/LEGO_QUANT_AI_REPORT.md` for model limits, future data needs, and roadmap.

For production readiness status, see:

```text
docs/LEGO_TRACKER_PRODUCTION_REPORT.md
```

For real market validation, use **Quant AI -> Data Sources -> Importa vendite reali** with CSV columns such as:

```text
setNumber,soldPrice,shipping,condition,source,soldAt
75313,799.99,18.00,sealed,eBay sold,2026-06-10
75313,710.00,15.00,used,BrickLink sold,2026-06-09
```

Inside Data Sources you can also download ready-to-fill templates for:

- market snapshots;
- sold comps.

Sold comps generate median sealed/used prices, sold volume, a 10%-90% comp range, and a price confidence score.

The app also builds price history:

- imports add points to set history;
- daily snapshots keep one point per set per day;
- Quant AI -> Price History shows trend and exports historical CSV.

Future connector placeholders live in `integrations/` for Rebrickable, BrickEconomy, BrickLink, eBay and Amazon.

Run Quant tests with:

```bash
node --test tests/quant-engine.test.js
```

## Run The Full Local App

```bash
python3 server.py
```

Then open:

```text
http://127.0.0.1:4177/
```

## Local Secrets

Create `.brickpulse.local.json` locally:

```json
{
  "rebrickable_api_key": "YOUR_REBRICKABLE_KEY",
  "bricklink_consumer_key": "",
  "bricklink_consumer_secret": "",
  "bricklink_token": "",
  "bricklink_token_secret": ""
}
```

Do not commit `.brickpulse.local.json` or `.brickpulse.users.json`.

You can also save BrickLink credentials from the local app UI. They are written server-side to `.brickpulse.local.json` and never echoed back to the browser.

For hosted deployments that support environment variables, use:

```text
REBRICKABLE_API_KEY
BRICKLINK_CONSUMER_KEY
BRICKLINK_CONSUMER_SECRET
BRICKLINK_TOKEN
BRICKLINK_TOKEN_SECRET
```

## Streamlit

The Streamlit entrypoint is:

```bash
streamlit run streamlit_app.py
```

The Streamlit dashboard can work in two modes:

- local mode: reads `.brickpulse.users.json` when available;
- portable mode: upload a JSON backup exported from **Quant AI -> Data Vault**.

It shows:

- portfolio KPI;
- theme and year breakdown;
- Quant AI top opportunities;
- Quality Gate;
- portable JSON export.

For Streamlit Cloud, set the main file to:

```text
streamlit_app.py
```

Use `.streamlit/secrets.toml.example` as the template for secrets.

In Streamlit Cloud, open the app settings, go to **Secrets**, and paste:

```toml
rebrickable_api_key = "YOUR_REBRICKABLE_KEY"
bricklink_consumer_key = ""
bricklink_consumer_secret = ""
bricklink_token = ""
bricklink_token_secret = ""
```

The app will show whether Rebrickable and BrickLink are connected.
