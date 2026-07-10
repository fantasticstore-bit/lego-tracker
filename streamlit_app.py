import json
import math
import os
from pathlib import Path

import streamlit as st


st.set_page_config(page_title="LEGO Tracker Quant", page_icon="LT", layout="wide")


DEMO_PORTFOLIO = [
    {"code": "10276", "name": "Colosseum", "qty": 1, "paid": 549.99, "value": 1194.98, "theme": "Icons", "year": 2020, "condition": "Sigillato"},
    {"code": "75192", "name": "Millennium Falcon", "qty": 1, "paid": 849.99, "value": 849.99, "theme": "Star Wars", "year": 2017, "condition": "Sigillato"},
    {"code": "10294", "name": "Titanic", "qty": 1, "paid": 679.99, "value": 679.99, "theme": "Icons", "year": 2021, "condition": "Sigillato"},
]

DEMO_QUANT_SETS = [
    {"setNumber": "75313", "name": "AT-AT", "theme": "Star Wars", "subtheme": "UCS", "retailPrice": 849.99, "currentMarketPrice": 812, "pieceCount": 6785, "minifigCount": 9, "exclusiveMinifigCount": 2, "availabilityStatus": "retiringSoon", "demandScore": 92, "rarityScore": 78, "liquidityScore": 86, "volatilityScore": 42},
    {"setNumber": "75192", "name": "Millennium Falcon", "theme": "Star Wars", "subtheme": "UCS", "retailPrice": 849.99, "currentMarketPrice": 849.99, "pieceCount": 7541, "minifigCount": 8, "exclusiveMinifigCount": 1, "availabilityStatus": "active", "demandScore": 95, "rarityScore": 62, "liquidityScore": 94, "volatilityScore": 36},
    {"setNumber": "10294", "name": "Titanic", "theme": "Icons", "subtheme": "Vehicles", "retailPrice": 679.99, "currentMarketPrice": 679.99, "pieceCount": 9090, "minifigCount": 0, "exclusiveMinifigCount": 0, "availabilityStatus": "active", "demandScore": 84, "rarityScore": 58, "liquidityScore": 82, "volatilityScore": 28},
    {"setNumber": "10307", "name": "Eiffel Tower", "theme": "Icons", "subtheme": "Landmarks", "retailPrice": 629.99, "currentMarketPrice": 629.99, "pieceCount": 10001, "minifigCount": 0, "exclusiveMinifigCount": 0, "availabilityStatus": "retiringSoon", "demandScore": 79, "rarityScore": 66, "liquidityScore": 74, "volatilityScore": 31},
    {"setNumber": "76417", "name": "Gringotts Wizarding Bank", "theme": "Harry Potter", "subtheme": "Diagon Alley", "retailPrice": 429.99, "currentMarketPrice": 429.99, "pieceCount": 4815, "minifigCount": 13, "exclusiveMinifigCount": 4, "availabilityStatus": "retiringSoon", "demandScore": 81, "rarityScore": 72, "liquidityScore": 76, "volatilityScore": 39},
    {"setNumber": "75331", "name": "The Razor Crest", "theme": "Star Wars", "subtheme": "UCS", "retailPrice": 599.99, "currentMarketPrice": 589.56, "pieceCount": 6187, "minifigCount": 4, "exclusiveMinifigCount": 1, "availabilityStatus": "retired", "demandScore": 77, "rarityScore": 69, "liquidityScore": 81, "volatilityScore": 46},
]


def get_secret(name, env_name=None):
    env_name = env_name or name.upper()
    try:
        value = st.secrets.get(name, "")
    except Exception:
        value = ""
    return str(value or os.environ.get(env_name, "")).strip()


def euro(value):
    return f"€{value:,.0f}".replace(",", ".")


def pct(value):
    return f"{value:+.1f}%"


def clamp(value, low=0, high=100):
    return max(low, min(high, value))


def theme_strength(theme, subtheme=""):
    key = f"{theme} {subtheme}".lower()
    if "star wars" in key and ("ucs" in key or "ultimate" in key):
        return 94
    if "star wars" in key:
        return 88
    if "icons" in key or "modular" in key:
        return 84
    if "harry potter" in key:
        return 78
    if "technic" in key:
        return 73
    if "ideas" in key:
        return 76
    return 60


def normalize_backup(payload):
    data = payload.get("data", payload)
    server_market = payload.get("market_data", {})
    server_state = payload.get("state", {})
    return {
        "portfolio": data.get("portfolio", server_state.get("portfolio", [])),
        "watchlist": data.get("watchlist", server_state.get("watchlist", [])),
        "marketSnapshots": data.get("marketSnapshots", server_market.get("marketSnapshots", {})),
        "priceHistory": data.get("priceHistory", server_market.get("priceHistory", {})),
        "quantModelWeights": data.get("quantModelWeights", server_market.get("quantModelWeights", {})),
    }


def load_local_data():
    users_path = Path(".brickpulse.users.json")
    if not users_path.exists():
        return {"portfolio": DEMO_PORTFOLIO, "marketSnapshots": {}, "priceHistory": {}, "quantModelWeights": {}}
    try:
        users = json.loads(users_path.read_text()).get("users", {})
    except Exception:
        return {"portfolio": DEMO_PORTFOLIO, "marketSnapshots": {}, "priceHistory": {}, "quantModelWeights": {}}
    first_user = next(iter(users.values()), {})
    normalized = normalize_backup({"state": first_user.get("state", {}), "market_data": first_user.get("market_data", {})})
    return normalized if normalized["portfolio"] else {"portfolio": DEMO_PORTFOLIO, "marketSnapshots": {}, "priceHistory": {}, "quantModelWeights": {}}


def portfolio_rows(raw_rows, snapshots):
    rows = []
    for item in raw_rows:
        meta = item.get("meta", {})
        code = str(item.get("code", item.get("setNumber", ""))).split("-")[0]
        snapshot = snapshots.get(code, {})
        paid = float(item.get("paid", item.get("paidPrice", meta.get("retailPrice", 0))) or 0)
        value = float(snapshot.get("currentMarketPrice", meta.get("marketPrice", meta.get("retailPrice", item.get("value", paid)))) or 0)
        rows.append(
            {
                "code": code,
                "name": meta.get("name", item.get("name", code or "Set LEGO")),
                "qty": int(item.get("qty", item.get("quantity", 1)) or 1),
                "paid": paid,
                "value": value,
                "theme": meta.get("theme", item.get("theme", "Collezione")),
                "year": meta.get("year", item.get("year", "")),
                "condition": item.get("condition", meta.get("condition", "Sigillato")),
                "source": snapshot.get("source", "local/demo"),
            }
        )
    return rows


def forecast_set(item, weights=None):
    weights = weights or {"demand": 0.19, "rarity": 0.15, "theme": 0.17, "minifigures": 0.1, "retirement": 0.14, "liquidity": 0.15, "scarcity": 0.1}
    total = sum(max(0, float(v)) for v in weights.values()) or 1
    weights = {k: max(0, float(v)) / total for k, v in weights.items()}
    retail = float(item.get("retailPrice", item.get("retail", 0)) or 0)
    current = float(item.get("currentMarketPrice", item.get("value", retail)) or 0)
    premium = ((current - retail) / retail * 100) if retail else 0
    minifig_score = clamp((item.get("exclusiveMinifigCount", 0) / item.get("minifigCount", 1)) * 100) if item.get("minifigCount") else 35
    retirement_score = 92 if item.get("availabilityStatus") == "retiringSoon" else 70 if item.get("availabilityStatus") == "retired" else 45
    theme_score = theme_strength(item.get("theme", ""), item.get("subtheme", ""))
    scarcity = clamp(item.get("rarityScore", 50) * 0.55 + retirement_score * 0.35)
    discount_boost = min(12, abs(premium) * 0.7) if premium < 0 else 0
    overpay_penalty = min(18, (premium - 35) * 0.45) if premium > 35 else 0
    volatility_penalty = item.get("volatilityScore", 45) * 0.14
    score = (
        item.get("demandScore", 50) * weights.get("demand", 0)
        + item.get("rarityScore", 50) * weights.get("rarity", 0)
        + theme_score * weights.get("theme", 0)
        + minifig_score * weights.get("minifigures", 0)
        + retirement_score * weights.get("retirement", 0)
        + item.get("liquidityScore", 50) * weights.get("liquidity", 0)
        + scarcity * weights.get("scarcity", 0)
        + discount_boost
        - overpay_penalty
        - volatility_penalty
    )
    score = round(clamp(score))
    annual_growth = clamp(3.5 + score * 0.09 + theme_score * 0.025 + retirement_score * 0.03 - item.get("volatilityScore", 45) * 0.035, -4, 18) / 100
    forecast_5y = current * math.pow(1 + annual_growth, 5)
    roi = ((forecast_5y - current) / current * 100) if current else 0
    risk_value = item.get("volatilityScore", 45) * 0.45 + max(0, premium) * 0.25 + (100 - item.get("liquidityScore", 50)) * 0.3
    risk = "high" if risk_value >= 58 else "medium" if risk_value >= 35 else "low"
    action = "buy" if score >= 80 and risk != "high" else "watch" if score >= 62 else "avoid"
    return {**item, "investmentScore": score, "forecast5Y": forecast_5y, "expectedRoi": roi, "riskLevel": risk, "action": action, "premiumVsRetail": premium}


uploaded = st.sidebar.file_uploader("Importa backup Data Vault JSON", type=["json"])
if uploaded:
    app_data = normalize_backup(json.loads(uploaded.read().decode("utf-8")))
else:
    app_data = load_local_data()

snapshots = app_data.get("marketSnapshots", {})
portfolio = portfolio_rows(app_data.get("portfolio", []), snapshots)
weights = app_data.get("quantModelWeights", {})

REBRICKABLE_API_KEY = get_secret("rebrickable_api_key", "REBRICKABLE_API_KEY")
BRICKLINK_READY = all(
    [
        get_secret("bricklink_consumer_key", "BRICKLINK_CONSUMER_KEY"),
        get_secret("bricklink_consumer_secret", "BRICKLINK_CONSUMER_SECRET"),
        get_secret("bricklink_token", "BRICKLINK_TOKEN"),
        get_secret("bricklink_token_secret", "BRICKLINK_TOKEN_SECRET"),
    ]
)

st.markdown(
    """
    <style>
    .stApp { background: radial-gradient(circle at 75% 0%, rgba(124,45,255,.20), transparent 34%), #030306; color: #f8f7ff; }
    [data-testid="stMetricValue"], h1, h2, h3 { color: #f8f7ff; }
    div[data-testid="stDataFrame"] { border: 1px solid rgba(255,255,255,.12); border-radius: 14px; overflow: hidden; }
    </style>
    """,
    unsafe_allow_html=True,
)

st.title("LEGO Tracker Quant")
st.caption("Cloud preview per portfolio, market data e LEGO Quant AI")

api_cols = st.columns(4)
api_cols[0].success("Rebrickable pronta") if REBRICKABLE_API_KEY else api_cols[0].warning("Rebrickable assente")
api_cols[1].success("BrickLink pronta") if BRICKLINK_READY else api_cols[1].warning("BrickLink assente")
api_cols[2].metric("Snapshot prezzi", len(snapshots))
api_cols[3].metric("Storico punti", sum(len(v) for v in app_data.get("priceHistory", {}).values() if isinstance(v, list)))

total_paid = sum(row["paid"] * row["qty"] for row in portfolio)
total_value = sum(row["value"] * row["qty"] for row in portfolio)
gain = total_value - total_paid
gain_pct = (gain / total_paid * 100) if total_paid else 0
owned_qty = sum(row["qty"] for row in portfolio)

metric_cols = st.columns(4)
metric_cols[0].metric("Set posseduti", owned_qty)
metric_cols[1].metric("Costo pagato", euro(total_paid))
metric_cols[2].metric("Valore stimato", euro(total_value))
metric_cols[3].metric("Gain", euro(gain), pct(gain_pct))

portfolio_tab, quant_tab, quality_tab, export_tab = st.tabs(["Portfolio", "Quant AI", "Quality Gate", "Export"])

with portfolio_tab:
    st.subheader("Portfolio")
    st.dataframe(
        [
            {
                "Set": f'{row["code"]} · {row["name"]}',
                "Tema": row["theme"],
                "Anno": row["year"],
                "Condizione": row["condition"],
                "Qta": row["qty"],
                "Pagato": euro(row["paid"]),
                "Valore": euro(row["value"]),
                "Fonte": row["source"],
            }
            for row in portfolio
        ],
        use_container_width=True,
        hide_index=True,
    )
    left, right = st.columns(2)
    with left:
        themes = {}
        for row in portfolio:
            themes[row["theme"]] = themes.get(row["theme"], 0) + row["value"] * row["qty"]
        st.write("Valore per tema")
        st.bar_chart(themes)
    with right:
        years = {}
        for row in portfolio:
            years[str(row["year"])] = years.get(str(row["year"]), 0) + row["value"] * row["qty"]
        st.write("Valore per anno")
        st.bar_chart(years)

with quant_tab:
    st.subheader("Top Quant Opportunities")
    quant_sets = []
    for base in DEMO_QUANT_SETS:
        snapshot = snapshots.get(base["setNumber"], {})
        quant_sets.append({**base, **({"currentMarketPrice": snapshot.get("currentMarketPrice", base["currentMarketPrice"]), "priceSource": snapshot.get("source", "mock/stima")} if snapshot else {})})
    opportunities = sorted([forecast_set(item, weights) for item in quant_sets], key=lambda row: row["investmentScore"], reverse=True)
    st.dataframe(
        [
            {
                "Set": f'{row["setNumber"]} · {row["name"]}',
                "Tema": row["theme"],
                "Score": row["investmentScore"],
                "Prezzo": euro(row["currentMarketPrice"]),
                "Forecast 5Y": euro(row["forecast5Y"]),
                "ROI": pct(row["expectedRoi"]),
                "Rischio": row["riskLevel"],
                "Azione": row["action"],
            }
            for row in opportunities
        ],
        use_container_width=True,
        hide_index=True,
    )

with quality_tab:
    st.subheader("Quality Gate")
    rows = []
    for row in opportunities:
        source = row.get("priceSource", "mock/stima")
        history_points = len(app_data.get("priceHistory", {}).get(row["setNumber"], []))
        quality = 20 + (25 if source != "mock/stima" else 0) + (20 if history_points >= 3 else 0) + (15 if row.get("currentMarketPrice") and row.get("retailPrice") else 0) + (10 if row.get("liquidityScore") else 0)
        rows.append({"Set": f'{row["setNumber"]} · {row["name"]}', "Qualita": min(100, quality), "Fonte": source, "Storico": history_points, "Rischio": row["riskLevel"]})
    st.dataframe(rows, use_container_width=True, hide_index=True)

with export_tab:
    st.subheader("Portable data")
    export_payload = {"app": "LEGO Tracker Streamlit Export", "data": app_data}
    st.download_button(
        "Scarica backup JSON",
        data=json.dumps(export_payload, ensure_ascii=False, indent=2),
        file_name="lego-tracker-streamlit-export.json",
        mime="application/json",
    )
    st.info("Per la versione online: carica qui il backup esportato da Quant AI -> Data Vault.")
