# LEGO Tracker

LEGO Tracker is a dark, portfolio-first LEGO price tracker built for collectors.

It includes:

- local account login
- saved portfolio and watchlist
- LEGO catalog sync through Rebrickable
- portfolio analytics
- set detail decision center
- BrickLink Price Guide integration scaffold
- Streamlit preview app for quick cloud deployment

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

## Streamlit

The Streamlit entrypoint is:

```bash
streamlit run streamlit_app.py
```

For Streamlit Cloud, set the main file to:

```text
streamlit_app.py
```

Use `.streamlit/secrets.toml.example` as the template for secrets.

