import json
import os
from pathlib import Path

import streamlit as st


st.set_page_config(
    page_title="LEGO Tracker",
    page_icon="LT",
    layout="wide",
)


DEMO_PORTFOLIO = [
    {"code": "10276", "name": "Colosseum", "qty": 1, "paid": 549.99, "value": 1194.98, "theme": "Icons", "year": 2020},
    {"code": "75192", "name": "Millennium Falcon", "qty": 1, "paid": 849.99, "value": 849.99, "theme": "Star Wars", "year": 2017},
    {"code": "10294", "name": "Titanic", "qty": 1, "paid": 679.99, "value": 679.99, "theme": "Icons", "year": 2021},
]


def get_secret(name, env_name=None):
    env_name = env_name or name.upper()
    try:
        value = st.secrets.get(name, "")
    except Exception:
        value = ""
    return str(value or os.environ.get(env_name, "")).strip()


REBRICKABLE_API_KEY = get_secret("rebrickable_api_key", "REBRICKABLE_API_KEY")
BRICKLINK_READY = all(
    [
        get_secret("bricklink_consumer_key", "BRICKLINK_CONSUMER_KEY"),
        get_secret("bricklink_consumer_secret", "BRICKLINK_CONSUMER_SECRET"),
        get_secret("bricklink_token", "BRICKLINK_TOKEN"),
        get_secret("bricklink_token_secret", "BRICKLINK_TOKEN_SECRET"),
    ]
)


def load_local_portfolio():
    users_path = Path(".brickpulse.users.json")
    if not users_path.exists():
        return DEMO_PORTFOLIO

    try:
        users = json.loads(users_path.read_text()).get("users", {})
    except json.JSONDecodeError:
        return DEMO_PORTFOLIO

    first_user = next(iter(users.values()), {})
    rows = first_user.get("state", {}).get("portfolio", [])
    if not rows:
        return DEMO_PORTFOLIO

    portfolio = []
    for item in rows:
        meta = item.get("meta", {})
        qty = int(item.get("qty", 1))
        paid = float(item.get("paid", 0))
        value = float(meta.get("marketPrice", meta.get("retailPrice", paid)))
        portfolio.append(
            {
                "code": item.get("code", ""),
                "name": meta.get("name", item.get("code", "Set LEGO")),
                "qty": qty,
                "paid": paid,
                "value": value,
                "theme": meta.get("theme", "Collezione"),
                "year": meta.get("year", ""),
            }
        )
    return portfolio


portfolio = load_local_portfolio()
total_paid = sum(row["paid"] * row["qty"] for row in portfolio)
total_value = sum(row["value"] * row["qty"] for row in portfolio)
gain = total_value - total_paid
gain_pct = (gain / total_paid * 100) if total_paid else 0
owned_qty = sum(row["qty"] for row in portfolio)


st.markdown(
    """
    <style>
    .stApp {
      background:
        radial-gradient(circle at 70% 0%, rgba(124, 45, 255, .22), transparent 34%),
        #030306;
      color: #f8f7ff;
    }
    [data-testid="stMetricValue"] {
      color: #f8f7ff;
    }
    div[data-testid="stDataFrame"] {
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 14px;
      overflow: hidden;
    }
    </style>
    """,
    unsafe_allow_html=True,
)


st.title("LEGO Tracker")
st.caption("Portfolio-first LEGO collection analytics")

api_cols = st.columns(2)
if REBRICKABLE_API_KEY:
    api_cols[0].success("Rebrickable API collegata")
else:
    api_cols[0].warning("Rebrickable API non configurata")

if BRICKLINK_READY:
    api_cols[1].success("BrickLink API collegata")
else:
    api_cols[1].warning("BrickLink API non configurata")

metric_cols = st.columns(4)
metric_cols[0].metric("Set posseduti", f"{owned_qty}")
metric_cols[1].metric("Costo pagato", f"€{total_paid:,.0f}")
metric_cols[2].metric("Valore stimato", f"€{total_value:,.0f}")
metric_cols[3].metric("Gain", f"€{gain:,.0f}", f"{gain_pct:+.1f}%")

st.divider()

left, right = st.columns([1.2, 0.8])

with left:
    st.subheader("Portfolio")
    st.dataframe(
        [
            {
                "Set": f'{row["code"]} · {row["name"]}',
                "Tema": row["theme"],
                "Anno": row["year"],
                "Qta": row["qty"],
                "Pagato": f'€{row["paid"]:,.2f}',
                "Valore": f'€{row["value"]:,.2f}',
            }
            for row in portfolio
        ],
        use_container_width=True,
        hide_index=True,
    )

with right:
    st.subheader("Breakdown")
    themes = {}
    years = {}
    for row in portfolio:
        themes[row["theme"]] = themes.get(row["theme"], 0) + row["value"] * row["qty"]
        years[str(row["year"])] = years.get(str(row["year"]), 0) + row["value"] * row["qty"]

    st.write("Temi")
    st.bar_chart(themes)
    st.write("Anni")
    st.bar_chart(years)
