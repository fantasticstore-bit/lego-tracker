const STORAGE_KEY = "brickpulse-state-v1";
const API_KEY_STORAGE = "brickpulse-rebrickable-key";
const SYNC_META_STORAGE = "brickpulse-sync-meta";
const AUTO_SYNC_ON_START = true;
const AUTO_SYNC_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const AUTO_PRICE_SYNC_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const DB_NAME = "brickpulse-catalog";
const DB_VERSION = 1;
const CATALOG_STORE = "sets";
const MAX_RENDERED_ROWS = 120;
const MAX_SELECT_OPTIONS = 800;
const MIN_FULL_CATALOG_COUNT = 20000;
const GIFT_COST_BASIS = 1;
const CURRENT_YEAR = new Date().getFullYear();
const BRICKLINK_PRICE_CACHE = "brickpulse-bricklink-price-cache";
const BRICKLINK_SYNC_META = "brickpulse-bricklink-sync-meta";
const MARKET_SNAPSHOTS_STORAGE = "brickpulse-market-snapshots-v1";
const PRICE_HISTORY_STORAGE = "brickpulse-price-history-v1";
const QUANT_MODEL_WEIGHTS_STORAGE = "brickpulse-quant-model-weights-v1";

const defaultState = {
  sets: [
    {
      code: "75192",
      name: "Millennium Falcon UCS",
      theme: "Star Wars",
      price: 1048,
      retail: 849,
      change: 31.4,
      status: "Liquidita alta",
      tag: "up",
      retiring: false,
      retireYear: null,
      heatYear: CURRENT_YEAR,
      liquidity: 94,
      sealedPremium: 28,
      signal: "Hold forte",
      signalText: "Domanda stabile, spread sigillato sano e vendite frequenti sopra fair value.",
      bars: [36, 42, 48, 44, 58, 61, 70, 74, 82, 88, 92, 96],
      colors: ["#1f7ad8", "#e1443f", "-7deg"],
    },
    {
      code: "10294",
      name: "Titanic",
      theme: "Icons",
      price: 718,
      retail: 679,
      change: 18.7,
      status: "Ritiro atteso",
      tag: "retiring",
      retiring: true,
      retireYear: CURRENT_YEAR,
      heatYear: CURRENT_YEAR,
      liquidity: 82,
      sealedPremium: 18,
      signal: "Accumula sotto retail",
      signalText: "Set iconico, pubblico adulto e offerta ancora leggibile: meglio comprare con sconto.",
      bars: [22, 24, 31, 36, 45, 51, 53, 62, 66, 73, 81, 84],
      colors: ["#18202f", "#f4bd25", "5deg"],
    },
    {
      code: "10316",
      name: "Rivendita di Gran Burrone",
      theme: "Icons",
      price: 558,
      retail: 499,
      change: 24.9,
      status: "Domanda premium",
      tag: "up",
      retiring: false,
      retireYear: null,
      heatYear: CURRENT_YEAR,
      liquidity: 88,
      sealedPremium: 22,
      signal: "Watch aggressiva",
      signalText: "Fanbase forte e prezzo alto: il rendimento dipende molto dal punto di ingresso.",
      bars: [18, 29, 34, 44, 47, 60, 64, 70, 69, 78, 85, 93],
      colors: ["#12805c", "#d9a421", "-3deg"],
    },
    {
      code: "42115",
      name: "Lamborghini Sian FKP 37",
      theme: "Technic",
      price: 452,
      retail: 399,
      change: 12.2,
      status: "Spread ampio",
      tag: "retiring",
      retiring: true,
      retireYear: CURRENT_YEAR,
      heatYear: CURRENT_YEAR,
      liquidity: 71,
      sealedPremium: 31,
      signal: "Compra solo scontata",
      signalText: "Buon set, ma il mercato Technic premia molto condizione e scatola perfetta.",
      bars: [30, 34, 37, 43, 45, 50, 54, 55, 59, 64, 66, 70],
      colors: ["#79a833", "#18202f", "8deg"],
    },
    {
      code: "21330",
      name: "Home Alone",
      theme: "Ideas",
      price: 346,
      retail: 299,
      change: 22.6,
      status: "Stagionale",
      tag: "up",
      retiring: false,
      retireYear: null,
      heatYear: CURRENT_YEAR,
      liquidity: 78,
      sealedPremium: 24,
      signal: "Vendi nei picchi",
      signalText: "La domanda sale a fine anno: utile avere alert prezzo per novembre e dicembre.",
      bars: [20, 26, 22, 31, 38, 43, 50, 58, 76, 83, 72, 88],
      colors: ["#b8322c", "#1f7ad8", "-10deg"],
    },
    {
      code: "75313",
      name: "AT-AT UCS",
      theme: "Star Wars",
      price: 812,
      retail: 799,
      change: 16.8,
      status: "Capitale alto",
      tag: "retiring",
      retiring: true,
      retireYear: CURRENT_YEAR,
      heatYear: CURRENT_YEAR,
      liquidity: 86,
      sealedPremium: 20,
      signal: "Hold selettivo",
      signalText: "Potenziale buono, ma immobilizza molto capitale: confrontare con due set medi.",
      bars: [28, 30, 38, 41, 48, 46, 55, 61, 67, 72, 76, 80],
      colors: ["#8a97a8", "#e1443f", "4deg"],
    },
  ],
  portfolio: [
    { code: "75192", qty: 1, paid: 729, condition: "Sigillato" },
    { code: "10294", qty: 2, paid: 538, condition: "Sigillato" },
    { code: "21330", qty: 1, paid: 249, condition: "Usato completo" },
    { code: "42115", qty: 1, paid: 339, condition: "Sigillato" },
    { code: "75313", qty: 1, paid: 689, condition: "Sigillato" },
  ],
  watchlist: [
    { code: "10316", target: 455, note: "Entrare solo con sconto forte" },
    { code: "10294", target: 590, note: "Buon candidato prima del ritiro" },
    { code: "75313", target: 720, note: "Capitale alto: aspettare occasione" },
    { code: "21330", target: 285, note: "Comprare prima del picco natalizio" },
    { code: "42115", target: 380, note: "Solo scatola perfetta" },
    { code: "75192", target: 900, note: "Aggiungere se il mercato raffredda" },
  ],
};

const viewCopy = {
  market: {
    eyebrow: "Mercato collezionisti",
    title: "Il tuo desk privato per prezzi, set e occasioni LEGO.",
  },
  portfolio: {
    eyebrow: "Portfolio personale",
    title: "Quanto vale davvero la tua collezione, posizione per posizione.",
  },
  signals: {
    eyebrow: "Segnali operativi",
    title: "Compra, tieni o aspetta: meno rumore, più decisione.",
  },
  quant: {
    eyebrow: "LEGO Quant AI",
    title: "Motore predittivo per stimare potenziale, rischio e timing dei set LEGO.",
  },
  watchlist: {
    eyebrow: "Radar occasioni",
    title: "I set da seguire prima che il mercato se ne accorga.",
  },
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return structuredClone(defaultState);
    return {
      sets: structuredClone(defaultState.sets),
      portfolio: Array.isArray(saved.portfolio) ? saved.portfolio : structuredClone(defaultState.portfolio),
      watchlist: Array.isArray(saved.watchlist) ? saved.watchlist : structuredClone(defaultState.watchlist),
    };
  } catch {
    return structuredClone(defaultState);
  }
}

let state = loadState();
let syncMeta = JSON.parse(localStorage.getItem(SYNC_META_STORAGE) || "{}");
let catalogImported = false;
let selectedCode = state.sets[0].code;
let activeFilter = "all";
let activeView = "market";
let activeQuantTab = "command";
let activePortfolioFacet = null;
let serverFeatures = { hasRebrickableKey: false, hasBrickLinkKey: false };
let currentUser = null;
const realPriceRequests = new Set();
let marketSnapshots = loadMarketSnapshots();
let priceHistory = loadPriceHistory();
let quantStrategy = { budget: 1500, profile: "balanced", horizon: "5y" };
let quantModelWeights = loadQuantModelWeights();
let marketCloudMeta = { loaded: false, updatedAt: null, lastSavedAt: null, error: "" };

const formatEuro = (value) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const elements = {
  landingPage: $("#landingPage"),
  appShell: $("#appShell"),
  authModal: $("#authModal"),
  authForm: $("#authForm"),
  authMode: $("#authMode"),
  authTitle: $("#authTitle"),
  authEmail: $("#authEmail"),
  authPassword: $("#authPassword"),
  authSubmit: $("#authSubmit"),
  authError: $("#authError"),
  authClose: $("#authClose"),
  logoutButton: $("#logoutButton"),
  currentUser: $("#currentUser"),
  setsList: $("#setsList"),
  detailArt: $("#detailArt"),
  detailTheme: $("#detailTheme"),
  detailName: $("#detailName"),
  detailCode: $("#detailCode"),
  detailBadges: $("#detailBadges"),
  detailRetailPrice: $("#detailRetailPrice"),
  detailPrice: $("#detailPrice"),
  detailSpread: $("#detailSpread"),
  detailPriceSource: $("#detailPriceSource"),
  detailVerdict: $("#detailVerdict"),
  detailDecisionText: $("#detailDecisionText"),
  detailSignal: $("#detailSignal"),
  detailSignalText: $("#detailSignalText"),
  detailScore: $("#detailScore"),
  detailLiquidity: $("#detailLiquidity"),
  detailPremium: $("#detailPremium"),
  detailSpark: $("#detailSpark"),
  detailYear: $("#detailYear"),
  detailParts: $("#detailParts"),
  detailThemeName: $("#detailThemeName"),
  searchInput: $("#searchInput"),
  viewEyebrow: $("#viewEyebrow"),
  viewTitle: $("#viewTitle"),
  portfolioValue: $("#portfolioValue"),
  portfolioHeadline: $("#portfolioHeadline"),
  portfolioReturnBadge: $("#portfolioReturnBadge"),
  portfolioCost: $("#portfolioCost"),
  portfolioGain: $("#portfolioGain"),
  portfolioGainPct: $("#portfolioGainPct"),
  portfolioCount: $("#portfolioCount"),
  portfolioDetails: $("#portfolioDetails"),
  portfolioGrowthChart: $("#portfolioGrowthChart"),
  themeSummary: $("#themeSummary"),
  yearSummary: $("#yearSummary"),
  conditionSummary: $("#conditionSummary"),
  allocationChart: $("#allocationChart"),
  portfolioRows: $("#portfolioRows"),
  signalGrid: $("#signalGrid"),
  watchlistGrid: $("#watchlistGrid"),
  sortDeals: $("#sortDeals"),
  resetData: $("#resetData"),
  pulseIndex: $("#pulseIndex"),
  pulseIndexText: $("#pulseIndexText"),
  marketGain: $("#marketGain"),
  marketGainPct: $("#marketGainPct"),
  marketWatched: $("#marketWatched"),
  marketTargets: $("#marketTargets"),
  marketRetiring: $("#marketRetiring"),
  marketLiquidity: $("#marketLiquidity"),
  marketLeader: $("#marketLeader"),
  portfolioForm: $("#portfolioForm"),
  portfolioSet: $("#portfolioSet"),
  portfolioSetSearch: $("#portfolioSetSearch"),
  portfolioSuggestions: $("#portfolioSuggestions"),
  portfolioRetailHint: $("#portfolioRetailHint"),
  portfolioMarketHint: $("#portfolioMarketHint"),
  portfolioQty: $("#portfolioQty"),
  portfolioPaid: $("#portfolioPaid"),
  portfolioCondition: $("#portfolioCondition"),
  importPortfolioCsv: $("#importPortfolioCsv"),
  portfolioCsvFile: $("#portfolioCsvFile"),
  watchForm: $("#watchForm"),
  watchSet: $("#watchSet"),
  watchSetSearch: $("#watchSetSearch"),
  watchSuggestions: $("#watchSuggestions"),
  watchTarget: $("#watchTarget"),
  watchNote: $("#watchNote"),
  quickPortfolio: $("#quickPortfolio"),
  quickWatch: $("#quickWatch"),
  engineNarrative: $("#engineNarrative"),
  catalogFile: $("#catalogFile"),
  catalogStatus: $("#catalogStatus"),
  clearCatalog: $("#clearCatalog"),
  apiKeyInput: $("#apiKeyInput"),
  syncApi: $("#syncApi"),
  syncMarketPrices: $("#syncMarketPrices"),
  bricklinkStatus: $("#bricklinkStatus"),
  bricklinkConsumerKey: $("#bricklinkConsumerKey"),
  bricklinkConsumerSecret: $("#bricklinkConsumerSecret"),
  bricklinkToken: $("#bricklinkToken"),
  bricklinkTokenSecret: $("#bricklinkTokenSecret"),
  saveBricklinkConfig: $("#saveBricklinkConfig"),
  testBricklinkConfig: $("#testBricklinkConfig"),
  runApiDoctor: $("#runApiDoctor"),
  apiDoctor: $("#apiDoctor"),
  resultNote: $("#resultNote"),
  quantCommandCenter: $("#quantCommandCenter"),
  quantProMode: $("#quantProMode"),
  quantOverview: $("#quantOverview"),
  quantOverviewGrid: $("#quantOverviewGrid"),
  quantPortfolioAi: $("#quantPortfolioAi"),
  quantDataSources: $("#quantDataSources"),
  marketSnapshotFile: $("#marketSnapshotFile"),
  soldCompsFile: $("#soldCompsFile"),
  quantPriceHistory: $("#quantPriceHistory"),
  quantQualityGate: $("#quantQualityGate"),
  quantDataVault: $("#quantDataVault"),
  backupImportFile: $("#backupImportFile"),
  quantStrategyLab: $("#quantStrategyLab"),
  quantModelLab: $("#quantModelLab"),
  quantDealScanner: $("#quantDealScanner"),
  quantAlertCenter: $("#quantAlertCenter"),
  quantOpportunities: $("#quantOpportunities"),
  quantSetDetail: $("#quantSetDetail"),
  quantThemeAnalysis: $("#quantThemeAnalysis"),
  quantRetirementRadar: $("#quantRetirementRadar"),
  quantBacktest: $("#quantBacktest"),
};

let authIntent = "login";

function getAuthUser() {
  return currentUser;
}

function setAuthVisible(isLoggedIn) {
  const user = getAuthUser();
  elements.landingPage.classList.toggle("hidden", isLoggedIn);
  elements.appShell.classList.toggle("visible", isLoggedIn);
  elements.currentUser.textContent = user?.email || "Account locale";
}

function openAuth(mode) {
  authIntent = mode;
  const isSignup = mode === "signup";
  elements.authMode.textContent = isSignup ? "Registrazione" : "Accesso";
  elements.authTitle.textContent = isSignup ? "Crea il tuo account" : "Bentornato";
  elements.authSubmit.textContent = isSignup ? "Registrati gratis" : "Accedi";
  elements.authError.textContent = "";
  elements.authModal.classList.add("open");
  elements.authModal.setAttribute("aria-hidden", "false");
  elements.authEmail.focus();
}

function closeAuth() {
  elements.authModal.classList.remove("open");
  elements.authModal.setAttribute("aria-hidden", "true");
}

function saveState() {
  const payload = {
    portfolio: state.portfolio,
    watchlist: state.watchlist,
  };
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(payload),
  );

  if (currentUser) {
    fetch("/api/user/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }
}

function applyUserState(savedState) {
  if (!savedState || typeof savedState !== "object") return;
  if (Array.isArray(savedState.portfolio)) state.portfolio = savedState.portfolio;
  if (Array.isArray(savedState.watchlist)) state.watchlist = savedState.watchlist;
}

async function fetchSession() {
  try {
    const response = await fetch("/api/auth/me");
    if (!response.ok) return null;
    const payload = await response.json();
    return payload.authenticated ? { email: payload.email } : null;
  } catch {
    return null;
  }
}

async function fetchUserState() {
  try {
    const response = await fetch("/api/user/state");
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

async function submitAuthRequest(email, password) {
  const endpoint = authIntent === "signup" ? "/api/auth/signup" : "/api/auth/login";
  const localStateBeforeAuth = {
    portfolio: [...state.portfolio],
    watchlist: [...state.watchlist],
  };
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.detail || "Accesso non riuscito");
  }

  currentUser = { email: payload.email };
  const serverStateIsEmpty = !payload.state?.portfolio?.length && !payload.state?.watchlist?.length;
  if (authIntent === "signup" && serverStateIsEmpty && (localStateBeforeAuth.portfolio.length || localStateBeforeAuth.watchlist.length)) {
    state.portfolio = localStateBeforeAuth.portfolio;
    state.watchlist = localStateBeforeAuth.watchlist;
  } else {
    applyUserState(payload.state);
  }
  await loadUserMarketData();
  await saveUserMarketData();
  saveState();
  render();
  closeAuth();
  setAuthVisible(true);
}

function saveSyncMeta(meta) {
  syncMeta = { ...syncMeta, ...meta };
  localStorage.setItem(SYNC_META_STORAGE, JSON.stringify(syncMeta));
}

function loadBrickLinkPriceCache() {
  try {
    return JSON.parse(localStorage.getItem(BRICKLINK_PRICE_CACHE) || "{}");
  } catch {
    return {};
  }
}

function saveBrickLinkPriceCache(cache) {
  localStorage.setItem(BRICKLINK_PRICE_CACHE, JSON.stringify(cache));
}

function getStoredApiKey() {
  return localStorage.getItem(API_KEY_STORAGE) || "";
}

function setApiKeySavedUi(hasKey) {
  elements.apiKeyInput.value = "";
  elements.apiKeyInput.placeholder = hasKey ? "Chiave API pronta" : "Chiave API Rebrickable";
}

function shouldAutoSyncCatalog() {
  if (!catalogImported) return true;
  if (state.sets.length < MIN_FULL_CATALOG_COUNT) return true;
  if (syncMeta.expectedCount && syncMeta.count && syncMeta.count < syncMeta.expectedCount) return true;
  if (!syncMeta.lastSync) return true;
  return Date.now() - new Date(syncMeta.lastSync).getTime() > AUTO_SYNC_MAX_AGE_MS;
}

async function getServerConfig() {
  try {
    const response = await fetch("/api/config");
    if (!response.ok) return { hasRebrickableKey: false, hasBrickLinkKey: false };
    return response.json();
  } catch {
    return { hasRebrickableKey: false, hasBrickLinkKey: false };
  }
}

async function saveRebrickableServerKey(apiKey) {
  if (!apiKey) return;
  await fetch("/api/config/rebrickable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey }),
  }).catch(() => {});
}

async function saveBrickLinkServerConfig() {
  const payload = {
    consumerKey: elements.bricklinkConsumerKey.value.trim(),
    consumerSecret: elements.bricklinkConsumerSecret.value.trim(),
    token: elements.bricklinkToken.value.trim(),
    tokenSecret: elements.bricklinkTokenSecret.value.trim(),
  };
  const response = await fetch("/api/config/bricklink", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.detail || "Configurazione BrickLink non salvata");
  serverFeatures.hasBrickLinkKey = true;
  elements.bricklinkConsumerKey.value = "";
  elements.bricklinkConsumerSecret.value = "";
  elements.bricklinkToken.value = "";
  elements.bricklinkTokenSecret.value = "";
  return result;
}

async function testBrickLinkServerConfig() {
  const response = await fetch("/api/config/bricklink/test", { method: "POST" });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.detail || "Test BrickLink non riuscito");
  return payload;
}

async function runApiDiagnostics() {
  const response = await fetch("/api/diagnostics");
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.detail || "Diagnostica non disponibile");
  return payload;
}

function renderApiDoctor(payload) {
  const checks = [
    ["Server locale", payload.server === "ok"],
    ["File segreto", payload.secretFileExists],
    ["File scrivibile", payload.secretFileWritable],
    ["Rebrickable API", payload.hasRebrickableKey],
    ["BrickLink completo", payload.hasBrickLinkKey],
    ["Utenti salvati", payload.userCount > 0],
    ["Market data account", payload.marketDataAccounts > 0],
  ];
  elements.apiDoctor.innerHTML = `
    <div class="api-doctor-grid">
      ${checks
        .map(
          ([label, ok]) => `
            <span class="${ok ? "ok" : "warn"}">
              <strong>${ok ? "OK" : "!"}</strong>
              ${label}
            </span>
          `,
        )
        .join("")}
    </div>
    <p>BrickLink campi: consumer key ${payload.brickLinkFields?.consumerKey ? "OK" : "-"}, consumer secret ${payload.brickLinkFields?.consumerSecret ? "OK" : "-"}, token ${payload.brickLinkFields?.token ? "OK" : "-"}, token secret ${payload.brickLinkFields?.tokenSecret ? "OK" : "-"}.</p>
  `;
}

function renderBrickLinkStatus() {
  if (!elements.bricklinkStatus) return;
  elements.bricklinkStatus.textContent = serverFeatures.hasBrickLinkKey
    ? "BrickLink configurato: puoi usare Aggiorna prezzi per portfolio e watchlist."
    : "BrickLink non configurato: inserisci consumer key, secret, token e token secret.";
}

function getSet(code) {
  const normalized = String(code).split("-")[0];
  const catalogSet = state.sets.find((set) => set.code === code) || state.sets.find((set) => set.code.split("-")[0] === normalized);
  if (catalogSet) return catalogSet;

  const savedItem = [...state.portfolio, ...state.watchlist].find((item) => String(item.code).split("-")[0] === normalized && item.meta);
  if (!savedItem) return null;

  return makeSavedSet(savedItem);
}

function makeSavedSet(item) {
  const meta = item.meta || {};
  const code = item.code;
  const parts = Number(meta.parts) || 0;
  const retail = Number(meta.retailPrice ?? item.paid ?? 0);
  const market = Number(meta.marketPrice ?? retail);
  const change = retail ? ((market - retail) / retail) * 100 : 0;
  return {
    code,
    name: meta.name || `Set ${code}`,
    theme: meta.theme || "Collezione",
    year: Number(meta.year) || "",
    parts,
    imgUrl: meta.imgUrl || "",
    price: market,
    marketPrice: market,
    retail,
    retailPrice: retail,
    change: Number(change.toFixed(1)),
    status: meta.status || "In collezione",
    tag: "owned",
    retiring: /retired|ritiro/i.test(meta.status || ""),
    retireYear: meta.retireYear || null,
    heatYear: meta.heatYear || (Number(meta.year) >= CURRENT_YEAR - 5 ? CURRENT_YEAR : null),
    liquidity: meta.liquidity || 70,
    sealedPremium: meta.sealedPremium || Math.max(0, Math.round(change)),
    signal: meta.signal || "In portfolio",
    signalText: meta.signalText || "Set importato dal tuo elenco personale.",
    bars: [22, 28, 34, 38, 44, 52, 58, 64, 70, 76, 82, 88],
    colors: ["#8d3cff", "#4f8cff", "-4deg"],
  };
}

function getRetailPrice(set) {
  const snapshot = getMarketSnapshot(set.code);
  return snapshot?.retailPrice || set.retailPrice || set.retail || Math.round((set.price || 0) * 0.82);
}

function getMarketPrice(set) {
  const snapshot = getMarketSnapshot(set.code);
  return snapshot?.currentMarketPrice || snapshot?.sealedPrice || set.realMarketPrice || set.marketPrice || set.price || getRetailPrice(set);
}

function getPriceSource(set) {
  const snapshot = getMarketSnapshot(set.code);
  if (snapshot) return snapshot.source || "CSV market snapshot";
  if (set.realMarketPrice) return set.priceSource || "BrickLink";
  return "Stimato";
}

function getBrickLinkSetNumber(set) {
  const code = String(set.code || "").trim();
  if (!code) return "";
  return code.includes("-") ? code : `${code}-1`;
}

function applyRealPrice(set, price, source = "BrickLink sold") {
  if (!price || price <= 0) return;
  set.realMarketPrice = Math.round(price);
  set.marketPrice = Math.round(price);
  set.price = Math.round(price);
  set.priceSource = source;
}

async function fetchBrickLinkMarketPrice(set) {
  const bricklinkNo = getBrickLinkSetNumber(set);
  if (!bricklinkNo) return null;
  const cache = loadBrickLinkPriceCache();
  const cached = cache[bricklinkNo];
  if (cached && Date.now() - cached.time < 12 * 60 * 60 * 1000) return cached;

  const response = await fetch(`/api/bricklink/price?set_num=${encodeURIComponent(bricklinkNo)}&guide_type=sold&new_or_used=N&country_code=IT`);
  if (!response.ok) return null;
  const payload = await response.json();
  const price = Number(payload?.data?.avg_price || payload?.data?.unit_price || payload?.data?.max_price || 0);
  if (!price) return null;

  const snapshot = { price, source: "BrickLink venduti 6 mesi", time: Date.now() };
  cache[bricklinkNo] = snapshot;
  saveBrickLinkPriceCache(cache);
  return snapshot;
}

async function hydrateRealPrice(set) {
  if (!serverFeatures.hasBrickLinkKey || !set || realPriceRequests.has(set.code) || set.realMarketPrice) return;

  realPriceRequests.add(set.code);

  try {
    const snapshot = await fetchBrickLinkMarketPrice(set);
    if (snapshot?.price > 0) {
      applyRealPrice(set, snapshot.price, snapshot.source);
      render();
    }
  } finally {
    realPriceRequests.delete(set.code);
  }
}

function inferRetireYear(set) {
  if (set.retireYear) return Number(set.retireYear);
  if (set.retiring && set.year && Number(set.year) >= CURRENT_YEAR - 5) return CURRENT_YEAR;
  if (set.status?.toLowerCase().includes("ritiro")) return CURRENT_YEAR;
  return null;
}

function isRetiringThisYear(set) {
  return inferRetireYear(set) === CURRENT_YEAR;
}

function isHotThisYear(set) {
  const heatYear = Number(set.heatYear) || (Number(set.year) >= CURRENT_YEAR - 5 && set.change >= 12 ? CURRENT_YEAR : null);
  return heatYear === CURRENT_YEAR && set.change >= 12 && set.liquidity >= 65;
}

function openCatalogDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(CATALOG_STORE)) {
        db.createObjectStore(CATALOG_STORE, { keyPath: "code" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function loadCatalog() {
  const db = await openCatalogDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CATALOG_STORE, "readonly");
    const store = transaction.objectStore(CATALOG_STORE);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

async function saveCatalog(sets) {
  const db = await openCatalogDb();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(CATALOG_STORE, "readwrite");
    const store = transaction.objectStore(CATALOG_STORE);
    store.clear();
    sets.forEach((set) => store.put(set));
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
}

async function clearCatalogDb() {
  const db = await openCatalogDb();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(CATALOG_STORE, "readwrite");
    transaction.objectStore(CATALOG_STORE).clear();
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      value += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(value);
      if (row.some((cell) => cell.trim() !== "")) rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }

  row.push(value);
  if (row.some((cell) => cell.trim() !== "")) rows.push(row);
  return rows;
}

function normalizeSetNumber(value) {
  return String(value || "").trim().split("-")[0];
}

function normalizeMoney(value) {
  if (typeof value === "number") return value;
  const normalized = String(value || "")
    .trim()
    .replace(/[€$£\s]/g, "")
    .replace(/\.(?=\d{3}(?:\D|$))/g, "")
    .replace(",", ".");
  const number = Number(normalized);
  return Number.isFinite(number) ? number : 0;
}

function loadMarketSnapshots() {
  try {
    const saved = JSON.parse(localStorage.getItem(MARKET_SNAPSHOTS_STORAGE) || "{}");
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

function saveMarketSnapshots() {
  localStorage.setItem(MARKET_SNAPSHOTS_STORAGE, JSON.stringify(marketSnapshots));
}

function loadPriceHistory() {
  try {
    const saved = JSON.parse(localStorage.getItem(PRICE_HISTORY_STORAGE) || "{}");
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

function savePriceHistory() {
  localStorage.setItem(PRICE_HISTORY_STORAGE, JSON.stringify(priceHistory));
}

function getDefaultQuantWeights() {
  return { ...(window.LegoQuantAI?.DEFAULT_SCORE_WEIGHTS || {
    demand: 0.19,
    rarity: 0.15,
    theme: 0.17,
    minifigures: 0.1,
    retirement: 0.14,
    liquidity: 0.15,
    scarcity: 0.1,
  }) };
}

function loadQuantModelWeights() {
  try {
    const saved = JSON.parse(localStorage.getItem(QUANT_MODEL_WEIGHTS_STORAGE) || "{}");
    return { ...getDefaultQuantWeights(), ...(saved && typeof saved === "object" ? saved : {}) };
  } catch {
    return getDefaultQuantWeights();
  }
}

function saveQuantModelWeights() {
  localStorage.setItem(QUANT_MODEL_WEIGHTS_STORAGE, JSON.stringify(quantModelWeights));
}

function getMarketDataPayload() {
  return {
    marketSnapshots,
    priceHistory,
    quantModelWeights,
  };
}

function applyMarketDataPayload(payload = {}) {
  if (payload.marketSnapshots && typeof payload.marketSnapshots === "object") {
    marketSnapshots = payload.marketSnapshots;
    saveMarketSnapshots();
  }
  if (payload.priceHistory && typeof payload.priceHistory === "object") {
    priceHistory = payload.priceHistory;
    savePriceHistory();
  }
  if (payload.quantModelWeights && typeof payload.quantModelWeights === "object") {
    quantModelWeights = { ...getDefaultQuantWeights(), ...payload.quantModelWeights };
    saveQuantModelWeights();
  }
}

function localMarketUpdatedAt() {
  const snapshotDates = Object.values(marketSnapshots)
    .map((snapshot) => snapshot.capturedAt)
    .filter(Boolean)
    .sort();
  return snapshotDates.at(-1) || "";
}

async function fetchUserMarketData() {
  try {
    const response = await fetch("/api/user/market-data");
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

async function loadUserMarketData() {
  if (!currentUser) return;
  const payload = await fetchUserMarketData();
  if (!payload) return;
  const serverUpdated = Number(payload.updated_at || 0);
  const hasServerData = Object.keys(payload.marketSnapshots || {}).length || Object.keys(payload.priceHistory || {}).length || Object.keys(payload.quantModelWeights || {}).length;
  if (hasServerData && serverUpdated >= Number(marketCloudMeta.updatedAt || 0)) {
    applyMarketDataPayload(payload);
    marketCloudMeta = { loaded: true, updatedAt: serverUpdated, lastSavedAt: marketCloudMeta.lastSavedAt, error: "" };
  }
}

async function saveUserMarketData() {
  if (!currentUser) return;
  try {
    const response = await fetch("/api/user/market-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getMarketDataPayload()),
    });
    if (!response.ok) throw new Error("Cloud market data non salvato");
    const payload = await response.json().catch(() => ({}));
    marketCloudMeta = {
      loaded: true,
      updatedAt: payload.updated_at || marketCloudMeta.updatedAt,
      lastSavedAt: new Date().toISOString(),
      error: "",
    };
  } catch (error) {
    marketCloudMeta = { ...marketCloudMeta, error: error.message || "Cloud market data non salvato" };
  }
}

function persistMarketData() {
  saveMarketSnapshots();
  savePriceHistory();
  saveQuantModelWeights();
  saveUserMarketData();
}

function getMarketSnapshot(code) {
  return marketSnapshots[normalizeSetNumber(code)] || null;
}

function addPriceHistorySnapshot(snapshot) {
  const setNumber = normalizeSetNumber(snapshot.setNumber);
  if (!setNumber) return;
  const point = {
    date: snapshot.capturedAt || new Date().toISOString().slice(0, 10),
    sealedPrice: snapshot.sealedPrice || snapshot.currentMarketPrice || 0,
    usedPrice: snapshot.usedPrice || 0,
    source: snapshot.source || "CSV market snapshot",
  };
  const existing = Array.isArray(priceHistory[setNumber]) ? priceHistory[setNumber] : [];
  const withoutDuplicate = existing.filter((item) => item.date !== point.date || item.source !== point.source);
  priceHistory[setNumber] = [...withoutDuplicate, point].sort((a, b) => a.date.localeCompare(b.date)).slice(-48);
}

function getPriceHistory(code) {
  return priceHistory[normalizeSetNumber(code)] || [];
}

function getPriceHistoryPointCount() {
  return Object.values(priceHistory).reduce((sum, rows) => sum + (Array.isArray(rows) ? rows.length : 0), 0);
}

function recordDailyMarketSnapshots() {
  const today = new Date().toISOString().slice(0, 10);
  let added = 0;
  Object.values(marketSnapshots).forEach((snapshot) => {
    const setNumber = normalizeSetNumber(snapshot.setNumber);
    if (!setNumber) return;
    const existing = getPriceHistory(setNumber).some((point) => point.date === today && point.source === "Daily auto snapshot");
    if (existing) return;
    addPriceHistorySnapshot({
      ...snapshot,
      capturedAt: today,
      source: "Daily auto snapshot",
    });
    added += 1;
  });
  if (added) persistMarketData();
  return added;
}

function getHistoryTrend(rows) {
  const valid = rows.filter((row) => Number(row.sealedPrice || row.value || 0) > 0);
  if (valid.length < 2) return { change: 0, direction: "flat" };
  const first = Number(valid[0].sealedPrice || valid[0].value || 0);
  const last = Number(valid.at(-1).sealedPrice || valid.at(-1).value || 0);
  const change = first ? ((last - first) / first) * 100 : 0;
  return {
    change,
    direction: change > 2 ? "up" : change < -2 ? "down" : "flat",
  };
}

function normalizeMarketSnapshotRow(record) {
  const setNumber = normalizeSetNumber(record.setNumber || record.set_number || record.set_num || record.code || record.item_no);
  if (!setNumber) return null;
  const currentMarketPrice = normalizeMoney(record.currentMarketPrice || record.marketPrice || record.current_price || record.price || record.value);
  const sealedPrice = normalizeMoney(record.sealedPrice || record.newPrice || record.new_price || record.sealed || currentMarketPrice);
  const usedPrice = normalizeMoney(record.usedPrice || record.used_price || record.used || sealedPrice * 0.82);
  const retailPrice = normalizeMoney(record.retailPrice || record.retail_price || record.retail || record.rrp);
  const soldCount = Number(record.soldCount || record.sold_count || record.sales || 0);
  const listingCount = Number(record.listingCount || record.listing_count || record.listings || 0);
  const source = record.source || record.marketplace || "CSV market snapshot";
  const capturedAt = record.capturedAt || record.captured_at || record.date || new Date().toISOString().slice(0, 10);
  const liquidityScore = Math.max(0, Math.min(100, soldCount * 4 + listingCount * 1.2));

  return {
    setNumber,
    retailPrice,
    currentMarketPrice: sealedPrice || currentMarketPrice,
    sealedPrice: sealedPrice || currentMarketPrice,
    usedPrice,
    soldCount,
    listingCount,
    liquidityScore: Math.round(liquidityScore),
    source,
    capturedAt,
  };
}

function parseMarketSnapshotCsv(text) {
  const rows = parseCsv(text);
  const headers = rows.shift()?.map((header) => header.trim()) || [];
  if (!headers.length) return [];
  return rows
    .map((cells) =>
      headers.reduce((record, header, index) => {
        record[header] = cells[index]?.trim() || "";
        return record;
      }, {}),
    )
    .map(normalizeMarketSnapshotRow)
    .filter(Boolean);
}

function median(values) {
  const sorted = values.filter((value) => Number.isFinite(value) && value > 0).sort((a, b) => a - b);
  if (!sorted.length) return 0;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function percentile(values, ratio) {
  const sorted = values.filter((value) => Number.isFinite(value) && value > 0).sort((a, b) => a - b);
  if (!sorted.length) return 0;
  const index = Math.min(sorted.length - 1, Math.max(0, Math.round((sorted.length - 1) * ratio)));
  return sorted[index];
}

function normalizeSoldCompRow(record) {
  const setNumber = normalizeSetNumber(record.setNumber || record.set_number || record.set_num || record.code || record.item_no || record.sku);
  if (!setNumber) return null;
  const rawPrice = normalizeMoney(record.soldPrice || record.sold_price || record.price || record.total || record.value);
  const shipping = normalizeMoney(record.shipping || record.postage || record.delivery || 0);
  const price = rawPrice + shipping;
  if (!price) return null;
  const conditionText = String(record.condition || record.new_or_used || record.type || "").toLowerCase();
  const condition = conditionText.includes("used") || conditionText.includes("usato") || conditionText === "u" ? "used" : "sealed";
  return {
    setNumber,
    price,
    condition,
    source: record.source || record.marketplace || "Sold comps CSV",
    soldAt: record.soldAt || record.sold_at || record.date || record.ended || new Date().toISOString().slice(0, 10),
  };
}

function parseSoldCompsCsv(text) {
  const rows = parseCsv(text);
  const headers = rows.shift()?.map((header) => header.trim()) || [];
  if (!headers.length) return [];
  const comps = rows
    .map((cells) =>
      headers.reduce((record, header, index) => {
        record[header] = cells[index]?.trim() || "";
        return record;
      }, {}),
    )
    .map(normalizeSoldCompRow)
    .filter(Boolean);

  const groups = comps.reduce((map, comp) => {
    const current = map.get(comp.setNumber) || [];
    current.push(comp);
    map.set(comp.setNumber, current);
    return map;
  }, new Map());

  return [...groups.entries()].map(([setNumber, group]) => {
    const prices = group.map((comp) => comp.price);
    const low = percentile(prices, 0.1);
    const high = percentile(prices, 0.9);
    const filtered = group.filter((comp) => comp.price >= low && comp.price <= high);
    const sealed = filtered.filter((comp) => comp.condition === "sealed").map((comp) => comp.price);
    const used = filtered.filter((comp) => comp.condition === "used").map((comp) => comp.price);
    const all = filtered.map((comp) => comp.price);
    const sealedMedian = median(sealed) || median(all);
    const usedMedian = median(used) || sealedMedian * 0.82;
    const newestDate = filtered.map((comp) => comp.soldAt).filter(Boolean).sort().at(-1) || new Date().toISOString().slice(0, 10);
    const sources = [...new Set(filtered.map((comp) => comp.source).filter(Boolean))].slice(0, 3);
    const existingSet = getSet(setNumber);
    return {
      setNumber,
      retailPrice: existingSet ? getRetailPrice(existingSet) : 0,
      currentMarketPrice: Math.round(sealedMedian),
      sealedPrice: Math.round(sealedMedian),
      usedPrice: Math.round(usedMedian),
      soldCount: filtered.length,
      listingCount: 0,
      liquidityScore: Math.round(Math.max(0, Math.min(100, filtered.length * 8))),
      source: `${sources.join(" + ") || "Sold comps CSV"} · ${filtered.length} sold`,
      capturedAt: newestDate,
      compLow: Math.round(low),
      compHigh: Math.round(high),
    };
  });
}

function normalizePortfolioRow(record) {
  const code = normalizeSetNumber(record.setNumber || record.set_num || record.code || record.set || record.item_no);
  if (!code) return null;
  const qty = Math.max(1, Number(record.qty || record.quantity || record.quantita || 1));
  const paid = normalizeMoney(record.paid || record.paidPrice || record.prezzoPagato || record.pricePaid || record.cost || record.retailPrice);
  const condition = record.condition || record.condizione || "Sigillato";
  const meta = {
    name: record.name || record.nome || "",
    theme: record.theme || record.tema || "Collezione",
    year: Number(record.year || record.anno || 0) || "",
    parts: Number(record.parts || record.pieces || record.pezzi || 0) || 0,
    retailPrice: normalizeMoney(record.retailPrice || record.retail || record.rrp),
    marketPrice: normalizeMoney(record.marketPrice || record.currentMarketPrice || record.value || record.valore),
    imgUrl: record.imgUrl || record.image || record.img_url || "",
    status: record.status || record.availability || "Import CSV",
  };

  return {
    code,
    qty,
    paid: paid || meta.retailPrice || meta.marketPrice || 0,
    condition,
    meta,
  };
}

function parsePortfolioCsv(text) {
  const rows = parseCsv(text);
  const headers = rows.shift()?.map((header) => header.trim()) || [];
  if (!headers.length) return [];
  return rows
    .map((cells) =>
      headers.reduce((record, header, index) => {
        record[header] = cells[index]?.trim() || "";
        return record;
      }, {}),
    )
    .map(normalizePortfolioRow)
    .filter(Boolean);
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function buildCsv(headers, rows) {
  return [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
  ].join("\n");
}

function downloadTextFile(filename, content, type = "application/json") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function createBackupPayload() {
  return {
    app: "LEGO Tracker",
    version: 2,
    exportedAt: new Date().toISOString(),
    user: currentUser?.email || null,
    data: {
      portfolio: state.portfolio,
      watchlist: state.watchlist,
      marketSnapshots,
      priceHistory,
      syncMeta,
      quantModelWeights,
    },
    note: "Backup locale senza API key o password.",
  };
}

function restoreBackupPayload(payload) {
  const data = payload?.data || payload;
  if (!data || typeof data !== "object") {
    throw new Error("Backup non valido");
  }

  const nextPortfolio = Array.isArray(data.portfolio) ? data.portfolio : state.portfolio;
  const nextWatchlist = Array.isArray(data.watchlist) ? data.watchlist : state.watchlist;
  const nextMarketSnapshots = data.marketSnapshots && typeof data.marketSnapshots === "object" ? data.marketSnapshots : marketSnapshots;
  const nextPriceHistory = data.priceHistory && typeof data.priceHistory === "object" ? data.priceHistory : priceHistory;
  const nextSyncMeta = data.syncMeta && typeof data.syncMeta === "object" ? data.syncMeta : syncMeta;
  const nextQuantModelWeights = data.quantModelWeights && typeof data.quantModelWeights === "object" ? data.quantModelWeights : quantModelWeights;

  state.portfolio = nextPortfolio;
  state.watchlist = nextWatchlist;
  marketSnapshots = nextMarketSnapshots;
  priceHistory = nextPriceHistory;
  syncMeta = nextSyncMeta;
  quantModelWeights = { ...getDefaultQuantWeights(), ...nextQuantModelWeights };

  saveState();
  localStorage.setItem(SYNC_META_STORAGE, JSON.stringify(syncMeta));
  persistMarketData();
}

function exportPortfolioCsv() {
  const headers = ["setNumber", "name", "theme", "qty", "paid", "condition", "retailPrice", "currentMarketPrice"];
  const rows = state.portfolio.map((item) => {
    const set = getSet(item.code);
    return {
      setNumber: normalizeSetNumber(item.code),
      name: set?.name || item.meta?.name || "",
      theme: set?.theme || item.meta?.theme || "",
      qty: item.qty,
      paid: item.paid,
      condition: item.condition,
      retailPrice: set ? getRetailPrice(set) : item.meta?.retailPrice || 0,
      currentMarketPrice: set ? getMarketPrice(set) : item.meta?.marketPrice || 0,
    };
  });
  downloadTextFile(`lego-portfolio-${new Date().toISOString().slice(0, 10)}.csv`, buildCsv(headers, rows), "text/csv");
}

function exportMarketSnapshotsCsv() {
  const headers = ["setNumber", "retailPrice", "currentMarketPrice", "sealedPrice", "usedPrice", "soldCount", "listingCount", "liquidityScore", "source", "capturedAt"];
  const rows = Object.values(marketSnapshots).map((snapshot) => ({
    setNumber: snapshot.setNumber,
    retailPrice: snapshot.retailPrice || 0,
    currentMarketPrice: snapshot.currentMarketPrice || 0,
    sealedPrice: snapshot.sealedPrice || 0,
    usedPrice: snapshot.usedPrice || 0,
    soldCount: snapshot.soldCount || 0,
    listingCount: snapshot.listingCount || 0,
    liquidityScore: snapshot.liquidityScore || 0,
    source: snapshot.source || "",
    capturedAt: snapshot.capturedAt || "",
  }));
  downloadTextFile(`lego-market-snapshots-${new Date().toISOString().slice(0, 10)}.csv`, buildCsv(headers, rows), "text/csv");
}

function exportPriceHistoryCsv() {
  const headers = ["setNumber", "date", "sealedPrice", "usedPrice", "source"];
  const rows = Object.entries(priceHistory).flatMap(([setNumber, history]) =>
    (Array.isArray(history) ? history : []).map((point) => ({
      setNumber,
      date: point.date || "",
      sealedPrice: point.sealedPrice || 0,
      usedPrice: point.usedPrice || 0,
      source: point.source || "",
    })),
  );
  downloadTextFile(`lego-price-history-${new Date().toISOString().slice(0, 10)}.csv`, buildCsv(headers, rows), "text/csv");
}

function seededNumber(seed, min, max) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 100000;
  }
  return min + (hash % (max - min + 1));
}

function makeImportedSet(row, themeNames = {}) {
  const code = row.set_num || row.code || row.number;
  const name = row.name || "Set LEGO";
  const year = Number(row.year) || 0;
  const parts = Number(row.num_parts) || 0;
  const theme = row.theme || themeNames[row.theme_id] || (row.theme_id ? `Tema ${row.theme_id}` : "Catalogo");
  const retailPrice = Math.max(8, Math.round(parts * 0.095 + seededNumber(`${code}-retail`, 4, 32)));
  const marketPrice = Math.max(6, Math.round(retailPrice * (1 + seededNumber(`${code}-market`, -18, 42) / 100)));
  const change = seededNumber(`${code}-change`, 3, 34) / 1.15;
  const liquidity = seededNumber(`${code}-liq`, 45, 96);
  const sealedPremium = seededNumber(`${code}-premium`, 8, 34);
  const retiring = year >= CURRENT_YEAR - 4 && year <= CURRENT_YEAR - 2 && liquidity >= 62;
  const heatYear = change >= 12 && liquidity >= 65 && year >= CURRENT_YEAR - 6 ? CURRENT_YEAR : null;
  const retireYear = retiring ? CURRENT_YEAR : null;
  const tag = retiring ? "retiring" : heatYear === CURRENT_YEAR ? "up" : "archive";
  const colors = [
    ["#1f7ad8", "#e1443f", "-7deg"],
    ["#12805c", "#f4bd25", "5deg"],
    ["#18202f", "#8a97a8", "8deg"],
    ["#b8322c", "#1f7ad8", "-10deg"],
  ][seededNumber(code, 0, 3)];
  const bars = Array.from({ length: 12 }, (_, index) => Math.min(96, Math.max(18, 24 + index * 5 + seededNumber(`${code}-${index}`, -8, 14))));

  return {
    code,
    name,
    theme,
    year,
    parts,
    imgUrl: row.img_url || row.set_img_url || "",
    price: marketPrice,
    marketPrice,
    retail: retailPrice,
    retailPrice,
    change: Number(change.toFixed(1)),
    status: retiring ? `Ritiro ${CURRENT_YEAR}` : year >= CURRENT_YEAR - 1 ? "Recente" : "Catalogo",
    tag,
    retiring,
    retireYear,
    heatYear,
    liquidity,
    sealedPremium,
    signal: retiring ? `Ritiro ${CURRENT_YEAR}` : heatYear === CURRENT_YEAR ? "Caldo quest'anno" : "Monitora prezzo",
    signalText: `${parts || "N/D"} pezzi, anno ${year || "N/D"}. Prezzo stimato: sostituiscilo con dati BrickLink quando collegheremo il mercato reale.`,
    bars,
    colors,
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchRebrickableJson(url, apiKey) {
  let response;
  const parsedUrl = new URL(url);
  const endpoint = parsedUrl.pathname.includes("/themes/") ? "themes" : "sets";
  const proxyUrl = `/api/rebrickable/${endpoint}${parsedUrl.search}`;

  if (apiKey === "server") {
    response = await fetch(proxyUrl);
  } else {
    try {
      response = await fetch(url, {
        headers: {
          Authorization: `key ${apiKey}`,
        },
      });
    } catch {
      response = await fetch(proxyUrl, {
        headers: {
          "X-Rebrickable-Key": apiKey,
        },
      });
    }
  }

  if (response.status === 401) {
    throw new Error("Chiave API non valida.");
  }

  if (response.status === 429) {
    throw new Error("Rebrickable sta limitando le richieste. Riprova tra poco.");
  }

  if (!response.ok) {
    throw new Error(`Errore Rebrickable ${response.status}.`);
  }

  return response.json();
}

async function loadThemeNames(apiKey) {
  const themeNames = {};
  let nextUrl = "https://rebrickable.com/api/v3/lego/themes/?page_size=1000&page=1";

  while (nextUrl) {
    const data = await fetchRebrickableJson(nextUrl, apiKey);
    (data.results || []).forEach((theme) => {
      themeNames[theme.id] = theme.name;
    });
    nextUrl = data.next;
  }

  return themeNames;
}

async function syncRebrickableCatalog(apiKey) {
  const pageSize = 1000;
  let page = 1;
  let nextUrl = `https://rebrickable.com/api/v3/lego/sets/?page_size=${pageSize}&page=${page}&ordering=-year,set_num`;
  let importedSets = [];
  let expectedCount = 0;

  elements.syncApi.disabled = true;
  elements.catalogStatus.textContent = "Sincronizzazione temi LEGO...";
  const themeNames = await loadThemeNames(apiKey);

  while (nextUrl) {
    elements.catalogStatus.textContent = `Sincronizzazione Rebrickable: pagina ${page}...`;
    const data = await fetchRebrickableJson(nextUrl, apiKey);
    expectedCount = data.count || expectedCount;
    importedSets = importedSets.concat((data.results || []).map((set) => makeImportedSet(set, themeNames)));
    elements.catalogStatus.textContent = `Sincronizzati ${importedSets.length.toLocaleString("it-IT")} di ${expectedCount.toLocaleString("it-IT")} set...`;
    nextUrl = data.next;
    page += 1;

    if (nextUrl) {
      await sleep(1100);
    }
  }

  await saveCatalog(importedSets);
  state.sets = importedSets;
  catalogImported = true;
  selectedCode = state.sets[0].code;
  activeFilter = "all";
  elements.searchInput.value = "";
  saveSyncMeta({ lastSync: new Date().toISOString(), count: importedSets.length, expectedCount, source: "api" });
  render();
}

function parseRebrickableSets(text) {
  const rows = parseCsv(text);
  const headers = rows.shift()?.map((header) => header.trim()) || [];
  const required = ["set_num", "name", "year"];
  const missing = required.filter((key) => !headers.includes(key));

  if (missing.length) {
    throw new Error(`CSV non riconosciuto. Mancano colonne: ${missing.join(", ")}`);
  }

  return rows
    .map((cells) =>
      headers.reduce((record, header, index) => {
        record[header] = cells[index]?.trim() || "";
        return record;
      }, {}),
    )
    .filter((row) => row.set_num && row.name)
    .map(makeImportedSet);
}

function appendSetImage(container, set) {
  container.classList.toggle("has-image", Boolean(set.imgUrl));
  container.innerHTML = "";

  if (!set.imgUrl) return;

  const image = document.createElement("img");
  image.src = set.imgUrl;
  image.alt = set.name;
  image.loading = "lazy";
  image.addEventListener("error", () => {
    container.classList.remove("has-image");
    container.innerHTML = "";
  });
  container.appendChild(image);
}

function getScore(set) {
  const retirementBoost = isRetiringThisYear(set) ? 18 : 0;
  const heatBoost = isHotThisYear(set) ? 10 : 0;
  const valueGap = getRetailPrice(set) ? Math.max(-15, Math.min(20, ((getRetailPrice(set) - getMarketPrice(set)) / getRetailPrice(set)) * 35)) : 0;
  return Math.max(
    1,
    Math.min(99, Math.round(set.change * 1.35 + set.liquidity * 0.32 + set.sealedPremium * 0.42 + retirementBoost + heatBoost + valueGap)),
  );
}

function getDetailDecision(set) {
  const retail = getRetailPrice(set);
  const market = getMarketPrice(set);
  const score = getScore(set);
  const discountPct = retail ? ((retail - market) / retail) * 100 : 0;

  if (isRetiringThisYear(set) && score >= 70) {
    return {
      label: "Ritiro da seguire",
      tone: "warn",
      text: `È nel radar ritiro ${CURRENT_YEAR}: entra solo con prezzo sotto retail o target chiaro.`,
    };
  }

  if (discountPct >= 8 && score >= 68) {
    return {
      label: "Compra sotto retail",
      tone: "good",
      text: `Il mercato è circa ${discountPct.toFixed(1)}% sotto retail stimato: può essere un ingresso interessante.`,
    };
  }

  if (market > retail * 1.18) {
    return {
      label: "Prezzo tirato",
      tone: "danger",
      text: "Il prezzo è già molto sopra retail: meglio aspettare un ribasso o usare la watchlist.",
    };
  }

  if (isHotThisYear(set)) {
    return {
      label: "Momentum alto",
      tone: "good",
      text: `Set caldo nel ${CURRENT_YEAR}: monitora velocemente, ma non inseguire se sale troppo.`,
    };
  }

  return {
    label: "Monitora",
    tone: "neutral",
    text: "Buon candidato da osservare: imposta un target e aspetta un prezzo pulito.",
  };
}

function getFilteredSets() {
  const search = elements.searchInput.value.trim().toLowerCase();
  return state.sets
    .filter((set) => {
      const matchesFilter =
        activeFilter === "all"
          ? true
          : activeFilter === "retiring"
            ? isRetiringThisYear(set)
            : activeFilter === "up"
              ? isHotThisYear(set) && set.change >= 16
              : isHotThisYear(set) || isRetiringThisYear(set);
      const haystack = `${set.code} ${set.name} ${set.theme} ${set.year || ""}`.toLowerCase();
      return matchesFilter && haystack.includes(search);
    })
    .sort((a, b) => getScore(b) - getScore(a));
}

function setArtVariables(element, set) {
  element.style.setProperty("--thumb-bg", set.colors[0]);
  element.style.setProperty("--thumb-accent", set.colors[1]);
  element.style.setProperty("--thumb-rotate", set.colors[2]);
}

function renderOptions() {
  const currentPortfolioSet = elements.portfolioSet.value;
  const currentWatchSet = elements.watchSet.value;
  const curatedCodes = new Set([
    selectedCode,
    currentPortfolioSet,
    currentWatchSet,
    ...state.portfolio.map((item) => item.code),
    ...state.watchlist.map((item) => item.code),
  ]);
  const primarySets = state.sets.slice(0, MAX_SELECT_OPTIONS);
  const pinnedSets = state.sets.filter((set) => curatedCodes.has(set.code) || curatedCodes.has(set.code.split("-")[0]));
  const optionSets = [...new Map([...pinnedSets, ...primarySets].map((set) => [set.code, set])).values()].slice(0, MAX_SELECT_OPTIONS);
  const options = optionSets.map((set) => `<option value="${set.code}">${set.name} · ${set.code}</option>`).join("");
  elements.portfolioSet.innerHTML = options;
  elements.watchSet.innerHTML = options;
  if (currentPortfolioSet && getSet(currentPortfolioSet)) {
    elements.portfolioSet.value = currentPortfolioSet;
  }
  if (currentWatchSet && getSet(currentWatchSet)) {
    elements.watchSet.value = currentWatchSet;
  }
  renderPortfolioPriceHints();
  syncSetSearchInputs();
}

function ensureSelectHasSetOption(select, set) {
  if (!set || [...select.options].some((option) => option.value === set.code)) return;

  const option = document.createElement("option");
  option.value = set.code;
  option.textContent = `${set.name} · ${set.code}`;
  select.prepend(option);
}

function renderPortfolioPriceHints() {
  const set = getSet(elements.portfolioSet.value);
  elements.portfolioRetailHint.textContent = set ? formatEuro(getRetailPrice(set)) : "-";
  elements.portfolioMarketHint.textContent = set ? formatEuro(getMarketPrice(set)) : "-";
}

function formatSetSearchLabel(set) {
  return set ? `${set.name} · ${set.code}` : "";
}

function syncSetSearchInputs() {
  const portfolioSet = getSet(elements.portfolioSet.value);
  const watchSet = getSet(elements.watchSet.value);
  if (portfolioSet && document.activeElement !== elements.portfolioSetSearch) {
    elements.portfolioSetSearch.value = formatSetSearchLabel(portfolioSet);
  }
  if (watchSet && document.activeElement !== elements.watchSetSearch) {
    elements.watchSetSearch.value = formatSetSearchLabel(watchSet);
  }
}

function searchSets(query) {
  const normalized = query.trim().toLowerCase();
  const candidates = normalized
    ? state.sets.filter((set) => `${set.name} ${set.code} ${set.theme} ${set.year || ""}`.toLowerCase().includes(normalized))
    : state.sets.filter((set) => isHotThisYear(set) || isRetiringThisYear(set));
  return candidates.sort((a, b) => getScore(b) - getScore(a)).slice(0, 8);
}

function renderSetSuggestions(kind) {
  const input = kind === "portfolio" ? elements.portfolioSetSearch : elements.watchSetSearch;
  const panel = kind === "portfolio" ? elements.portfolioSuggestions : elements.watchSuggestions;
  const results = searchSets(input.value);

  panel.innerHTML = results.length
    ? results
        .map(
          (set) => `
            <button class="set-suggestion" type="button" data-set-picker="${kind}" data-code="${set.code}">
              <span>${set.name}</span>
              <small>${set.code} · ${set.theme}${set.year ? ` · ${set.year}` : ""}</small>
            </button>
          `,
        )
        .join("")
    : `<div class="set-suggestion-empty">Nessun set trovato</div>`;
  panel.classList.add("open");
}

function selectSetForForm(kind, code) {
  const set = getSet(code);
  if (!set) return;

  if (kind === "portfolio") {
    ensureSelectHasSetOption(elements.portfolioSet, set);
    elements.portfolioSet.value = set.code;
    elements.portfolioSetSearch.value = formatSetSearchLabel(set);
    elements.portfolioPaid.value = "";
    elements.portfolioSuggestions.classList.remove("open");
    renderPortfolioPriceHints();
    return;
  }

  ensureSelectHasSetOption(elements.watchSet, set);
  elements.watchSet.value = set.code;
  elements.watchSetSearch.value = formatSetSearchLabel(set);
  elements.watchTarget.value = Math.round(getMarketPrice(set) * 0.9);
  elements.watchSuggestions.classList.remove("open");
}

function renderRows() {
  const filtered = getFilteredSets();
  const visible = filtered.slice(0, MAX_RENDERED_ROWS);
  elements.setsList.innerHTML = "";
  elements.resultNote.textContent = `${filtered.length.toLocaleString("it-IT")} risultati${filtered.length > MAX_RENDERED_ROWS ? ` · primi ${MAX_RENDERED_ROWS}` : ""}`;

  if (filtered.length === 0) {
    elements.setsList.innerHTML = `
      <div class="empty-state">
        <strong>Nessun set trovato</strong>
        <span>Prova a cambiare filtro o cerca per codice LEGO.</span>
      </div>
    `;
    return;
  }

  visible.forEach((set) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = `set-row ${set.code === selectedCode ? "active" : ""}`;
    row.dataset.code = set.code;

    const thumb = document.createElement("div");
    thumb.className = "set-thumb";
    setArtVariables(thumb, set);
    appendSetImage(thumb, set);

    row.innerHTML = `
      <div></div>
      <div class="set-title">
        <strong>${set.name}</strong>
        <span>${set.theme} · ${set.code}${set.year ? ` · ${set.year}` : ""}</span>
      </div>
      <div class="set-cell">
        <span>Pezzi</span>
        <strong>${set.parts ? set.parts.toLocaleString("it-IT") : "N/D"}</strong>
      </div>
      <div class="set-cell hide-mobile">
        <span>Mercato stimato</span>
        <strong>${formatEuro(getMarketPrice(set))}</strong>
      </div>
      <div class="set-cell hide-mobile">
        <span>Pulse score</span>
        <strong>${getScore(set)}/100</strong>
      </div>
    `;
    row.firstElementChild.replaceWith(thumb);
    row.addEventListener("click", () => {
      selectedCode = set.code;
      render();
    });
    elements.setsList.appendChild(row);
  });

  if (!filtered.some((set) => set.code === selectedCode) && filtered[0]) {
    selectedCode = filtered[0].code;
    render();
  }
}

function renderDetail() {
  const filtered = getFilteredSets();

  if (filtered.length === 0) {
    elements.detailArt.style.setProperty("--thumb-bg", "#d9dee8");
    elements.detailArt.style.setProperty("--thumb-accent", "#8a97a8");
    elements.detailArt.style.setProperty("--thumb-rotate", "0deg");
    elements.detailTheme.textContent = "Nessun risultato";
    elements.detailName.textContent = "Filtro troppo stretto";
    elements.detailCode.textContent = "Watchlist";
    elements.detailBadges.innerHTML = "";
    elements.detailRetailPrice.textContent = "-";
    elements.detailPrice.textContent = "-";
    elements.detailSpread.textContent = "-";
    elements.detailPriceSource.textContent = "Fonte prezzo: nessuna";
    elements.detailVerdict.textContent = "-";
    elements.detailDecisionText.textContent = "La ricerca non trova set dentro il segmento selezionato.";
    elements.detailSignal.textContent = "Rimuovi un filtro";
    elements.detailSignalText.textContent = "La ricerca non trova set dentro il segmento selezionato.";
    elements.detailScore.textContent = "-";
    elements.detailLiquidity.textContent = "-";
    elements.detailPremium.textContent = "-";
    elements.detailSpark.innerHTML = [28, 34, 30, 42, 38, 36, 40, 32].map((height) => `<i style="height:${height}%"></i>`).join("");
    return;
  }

  const set = filtered.find((item) => item.code === selectedCode) || filtered[0];
  selectedCode = set.code;

  setArtVariables(elements.detailArt, set);
  appendSetImage(elements.detailArt, set);
  elements.detailTheme.textContent = `${set.theme} · Pulse ${getScore(set)}/100`;
  elements.detailName.textContent = set.name;
  elements.detailCode.textContent = `Set ${set.code}`;
  const decision = getDetailDecision(set);
  const sourceBadge = getPriceSource(set) === "Stimato" ? "Prezzo stimato" : "Prezzo reale";
  elements.detailBadges.innerHTML = `
    <span class="detail-badge ${decision.tone}">${decision.label}</span>
    <span class="detail-badge">${sourceBadge}</span>
    ${isRetiringThisYear(set) ? `<span class="detail-badge warn">Ritiro ${CURRENT_YEAR}</span>` : ""}
    ${isHotThisYear(set) ? `<span class="detail-badge good">Caldo ${CURRENT_YEAR}</span>` : ""}
  `;
  elements.detailYear.textContent = set.year || "N/D";
  elements.detailParts.textContent = set.parts ? set.parts.toLocaleString("it-IT") : "N/D";
  elements.detailThemeName.textContent = set.theme;
  elements.detailRetailPrice.textContent = formatEuro(getRetailPrice(set));
  elements.detailPrice.textContent = formatEuro(getMarketPrice(set));
  const spread = getMarketPrice(set) - getRetailPrice(set);
  elements.detailSpread.textContent = `${spread >= 0 ? "+" : ""}${formatEuro(spread)}`;
  elements.detailPriceSource.textContent =
    getPriceSource(set) === "Stimato"
      ? "Fonte prezzo: stimata, in attesa di BrickLink"
      : `Fonte prezzo: ${getPriceSource(set)}`;
  elements.detailVerdict.textContent = decision.label;
  elements.detailDecisionText.textContent = decision.text;
  elements.detailSignal.textContent = set.signal;
  elements.detailSignalText.textContent = set.signalText;
  elements.detailScore.textContent = `${getScore(set)}/100`;
  elements.detailLiquidity.textContent = `${set.liquidity || 0}/100`;
  elements.detailPremium.textContent = `${set.sealedPremium || 0}%`;
  elements.detailSpark.innerHTML = set.bars.map((height) => `<i style="height:${height}%"></i>`).join("");
  hydrateRealPrice(set);
}

function normalizePortfolioCondition(condition = "") {
  const text = String(condition).toLowerCase();
  if (text.includes("sigill")) return "Sigillato nuovo";
  if (text.includes("apert")) return "Aperto completo perfetto";
  if (text.includes("montat")) return "Montato completo perfetto";
  if (text.includes("senza scatola")) return "Senza scatola";
  return "Usato completo";
}

function getConditionMultiplier(condition = "") {
  const normalized = normalizePortfolioCondition(condition);
  if (normalized === "Sigillato nuovo") return 1;
  if (normalized === "Aperto completo perfetto") return 0.92;
  if (normalized === "Montato completo perfetto") return 0.84;
  if (normalized === "Senza scatola") return 0.66;
  return 0.78;
}

function getPositionMarketValue(item, set = getSet(item.code)) {
  if (!set) return 0;
  return getMarketPrice(set) * getConditionMultiplier(item.condition) * item.qty;
}

function formatPercentValue(pct) {
  const sign = pct >= 0 ? "+" : "";
  const abs = Math.abs(pct);
  if (abs >= 1000) return `${sign}${pct.toLocaleString("it-IT", { maximumFractionDigits: 1 })}%`;
  return `${sign}${pct.toFixed(1)}%`;
}

function formatGainPercent(gain, cost) {
  if (cost > 0) return formatPercentValue((gain / cost) * 100);
  if (gain !== 0) return formatPercentValue(((gain - GIFT_COST_BASIS) / GIFT_COST_BASIS) * 100);
  return "0%";
}

function getPortfolioTotals() {
  return state.portfolio.reduce(
    (totals, item) => {
      const set = getSet(item.code);
      if (!set) return totals;
      const value = getPositionMarketValue(item, set);
      const cost = item.paid * item.qty;
      const retail = getRetailPrice(set) * item.qty;
      totals.value += value;
      totals.cost += cost;
      totals.retail += retail;
      totals.count += item.qty;
      return totals;
    },
    { value: 0, cost: 0, retail: 0, count: 0 },
  );
}

function getPortfolioSearch() {
  return activeView === "portfolio" ? elements.searchInput.value.trim().toLowerCase() : "";
}

function getPortfolioPositions() {
  const search = getPortfolioSearch();
  return state.portfolio
    .map((item, index) => {
      const set = getSet(item.code);
      if (!set) return null;
      return { ...item, index, set };
    })
    .filter(Boolean)
    .filter((item) => {
      if (activePortfolioFacet) {
        const value =
          activePortfolioFacet.type === "theme"
            ? item.set.theme
            : activePortfolioFacet.type === "year"
              ? String(item.set.year || "N/D")
              : normalizePortfolioCondition(item.condition);
        if (String(value) !== String(activePortfolioFacet.value)) return false;
      }

      if (!search) return true;
      const haystack = `${item.set.name} ${item.set.code} ${item.set.theme} ${item.set.year || ""} ${normalizePortfolioCondition(item.condition)}`.toLowerCase();
      return haystack.includes(search);
    });
}

function getPortfolioAnalysis() {
  const positions = state.portfolio
    .map((item) => ({ ...item, set: getSet(item.code) }))
    .filter((item) => item.set);
  const ownedSets = positions.reduce((sum, item) => sum + item.qty, 0);
  const uniqueSets = new Set(positions.map((item) => item.code)).size;
  const retiredSets = positions.reduce((sum, item) => sum + (item.set.retiring ? item.qty : 0), 0);
  const pieces = positions.reduce((sum, item) => sum + (item.set.parts || 0) * item.qty, 0);
  const retailValue = positions.reduce((sum, item) => sum + getRetailPrice(item.set) * item.qty, 0);
  const paidValue = positions.reduce((sum, item) => sum + item.paid * item.qty, 0);
  const currentValue = positions.reduce((sum, item) => sum + getPositionMarketValue(item, item.set), 0);
  const minifigs = Math.round(pieces / 115);
  return { positions, ownedSets, uniqueSets, retiredSets, pieces, retailValue, paidValue, currentValue, minifigs };
}

function summarizePortfolioBy(keyGetter, sortMode = "value") {
  const groups = new Map();
  getPortfolioAnalysis().positions.forEach((item) => {
    const key = keyGetter(item) || "N/D";
    const current = groups.get(key) || { label: key, qty: 0, value: 0 };
    current.qty += item.qty;
    current.value += getPositionMarketValue(item, item.set);
    groups.set(key, current);
  });
  const rows = [...groups.values()];

  if (sortMode === "alpha") {
    rows.sort((a, b) => String(a.label).localeCompare(String(b.label), "it", { sensitivity: "base" }));
  } else if (sortMode === "year-desc") {
    rows.sort((a, b) => {
      const yearA = Number(a.label);
      const yearB = Number(b.label);
      if (Number.isFinite(yearA) && Number.isFinite(yearB)) return yearB - yearA;
      if (Number.isFinite(yearA)) return -1;
      if (Number.isFinite(yearB)) return 1;
      return String(a.label).localeCompare(String(b.label), "it", { sensitivity: "base" });
    });
  } else {
    rows.sort((a, b) => b.value - a.value);
  }

  return rows.slice(0, 8);
}

function renderSummaryRows(rows, emptyText, type) {
  return rows.length
    ? rows
        .map(
          (row) => `
            <button class="summary-row ${activePortfolioFacet?.type === type && String(activePortfolioFacet.value) === String(row.label) ? "active" : ""}" type="button" data-portfolio-facet="${type}" data-portfolio-value="${encodeURIComponent(row.label)}">
              <strong>${escapeHtml(row.label)}</strong>
              <span>${row.qty}</span>
              <span>${formatEuro(row.value)}</span>
            </button>
          `,
        )
        .join("")
    : `<div class="summary-empty">${emptyText}</div>`;
}

function getThemeLeader() {
  const themes = state.sets.reduce((acc, set) => {
    acc[set.theme] = (acc[set.theme] || 0) + getScore(set);
    return acc;
  }, {});
  return Object.entries(themes).sort((a, b) => b[1] - a[1])[0]?.[0] || "Mercato";
}

function renderMarketMetrics() {
  const totals = getPortfolioTotals();
  const gain = totals.value - totals.cost;
  const gainPct = totals.cost ? (gain / totals.cost) * 100 : 0;
  const avgScore = state.sets.length ? state.sets.reduce((sum, set) => sum + getScore(set), 0) / state.sets.length : 0;
  const nearTargets = state.watchlist.filter((item) => {
    const set = getSet(item.code);
    return set && getMarketPrice(set) <= item.target * 1.12;
  }).length;
  const avgLiquidity = state.sets.length ? state.sets.reduce((sum, set) => sum + set.liquidity, 0) / state.sets.length : 0;

  elements.pulseIndex.textContent = (100 + avgScore * 0.66).toFixed(1);
  elements.pulseIndexText.textContent = `+${(avgScore / 8).toFixed(1)}% ultimi 90 giorni`;
  elements.marketGain.textContent = `${gain >= 0 ? "+" : ""}${formatEuro(gain)}`;
  elements.marketGainPct.textContent = `${gainPct >= 0 ? "+" : ""}${gainPct.toFixed(1)}%`;
  elements.marketWatched.textContent = state.watchlist.length;
  elements.marketTargets.textContent = `${nearTargets} vicini al target`;
  elements.marketRetiring.textContent = state.sets.filter(isRetiringThisYear).length.toLocaleString("it-IT");
  elements.marketLiquidity.textContent = avgLiquidity > 82 ? "Alta" : avgLiquidity > 68 ? "Media" : "Bassa";
  elements.marketLeader.textContent = `${getThemeLeader()} traina`;
}

function renderCatalogStatus() {
  const count = state.sets.length.toLocaleString("it-IT");
  const lastSync = syncMeta.lastSync ? new Date(syncMeta.lastSync).toLocaleString("it-IT", { dateStyle: "medium", timeStyle: "short" }) : "";
  elements.catalogStatus.innerHTML = catalogImported
    ? `Catalogo importato: <strong>${count}</strong> set cercabili localmente${lastSync ? ` · aggiornato ${lastSync}` : ""}. I prezzi sono stimati finché non colleghiamo BrickLink.`
    : `Modalità demo: <strong>${count}</strong> set curati. Inserisci la chiave API Rebrickable e sincronizza, oppure carica <strong>sets.csv</strong>.`;
}

function renderPortfolio() {
  const totals = getPortfolioTotals();
  const analysis = getPortfolioAnalysis();
  const filteredPositions = getPortfolioPositions();
  const gain = totals.value - totals.cost;
  const retailDeltaPct = totals.retail ? ((totals.value - totals.retail) / totals.retail) * 100 : 0;
  const retiredPct = analysis.ownedSets ? (analysis.retiredSets / analysis.ownedSets) * 100 : 0;

  elements.portfolioValue.textContent = formatEuro(totals.value);
  elements.portfolioHeadline.textContent = formatEuro(totals.value);
  elements.portfolioReturnBadge.textContent = `${retailDeltaPct >= 0 ? "+" : ""}${retailDeltaPct.toFixed(1)}% vs retail`;
  elements.portfolioReturnBadge.classList.toggle("negative", retailDeltaPct < 0);
  elements.portfolioCost.textContent = formatEuro(totals.cost);
  elements.portfolioGain.textContent = `${gain >= 0 ? "+" : ""}${formatEuro(gain)}`;
  elements.portfolioGainPct.textContent = formatGainPercent(gain, totals.cost, totals.retail);
  elements.portfolioCount.textContent = totals.count;
  elements.portfolioDetails.innerHTML = `
    <div><span>Owned sets</span><strong>${analysis.ownedSets.toLocaleString("it-IT")}</strong></div>
    <div><span>Unique sets</span><strong>${analysis.uniqueSets.toLocaleString("it-IT")}</strong></div>
    <div><span>Retired sets</span><strong>${analysis.retiredSets.toLocaleString("it-IT")} <small>${retiredPct.toFixed(1)}%</small></strong></div>
    <div><span>Pieces</span><strong>${analysis.pieces.toLocaleString("it-IT")}</strong></div>
    <div><span>Minifigs stimate</span><strong>${analysis.minifigs.toLocaleString("it-IT")}</strong></div>
    <hr />
    <div><span>Retail value</span><strong>${formatEuro(analysis.retailValue)}</strong></div>
    <div><span>Paid price</span><strong>${formatEuro(analysis.paidValue)}</strong></div>
    <div><span>Current value</span><strong>${formatEuro(analysis.currentValue)} <small class="${gain >= 0 ? "positive" : "warning"}">${formatGainPercent(gain, totals.cost, totals.retail)}</small></strong></div>
  `;
  elements.themeSummary.innerHTML = renderSummaryRows(summarizePortfolioBy((item) => item.set.theme, "alpha"), "Aggiungi set per vedere i temi.", "theme");
  elements.yearSummary.innerHTML = renderSummaryRows(summarizePortfolioBy((item) => String(item.set.year || "N/D"), "year-desc"), "Aggiungi set per vedere gli anni.", "year");
  elements.conditionSummary.innerHTML = renderSummaryRows(
    summarizePortfolioBy((item) => normalizePortfolioCondition(item.condition), "alpha"),
    "Aggiungi set per vedere le condizioni.",
    "condition",
  );
  const conditionRows = summarizePortfolioBy((item) => normalizePortfolioCondition(item.condition), "alpha");
  elements.portfolioGrowthChart.innerHTML = conditionRows.length
    ? conditionRows
        .map((row) => {
          const width = analysis.currentValue ? Math.max(8, Math.round((row.value / analysis.currentValue) * 100)) : 0;
          return `
            <button class="condition-bar" type="button" data-portfolio-facet="condition" data-portfolio-value="${encodeURIComponent(row.label)}">
              <span>${escapeHtml(row.label)}</span>
              <i><b style="width:${width}%"></b></i>
              <strong>${formatEuro(row.value)}</strong>
            </button>
          `;
        })
        .join("")
    : `<div class="summary-empty">Aggiungi set per vedere la qualita del capitale.</div>`;

  const themeRows = summarizePortfolioBy((item) => item.set.theme, "value").slice(0, 5);
  elements.allocationChart.innerHTML = themeRows.length
    ? `
        <div class="allocation-stack">
          ${themeRows
            .map((row, index) => {
              const width = totals.value ? Math.max(7, Math.round((row.value / totals.value) * 100)) : 0;
              return `<button type="button" data-portfolio-facet="theme" data-portfolio-value="${encodeURIComponent(row.label)}" style="width:${width}%; --bar-color:${["#8d3cff", "#1f7ad8", "#12805c", "#f4bd25", "#e1443f"][index % 5]}"></button>`;
            })
            .join("")}
        </div>
        <div class="allocation-legend">
          ${themeRows
            .map((row) => `<button type="button" data-portfolio-facet="theme" data-portfolio-value="${encodeURIComponent(row.label)}"><strong>${escapeHtml(row.label)}</strong><span>${formatEuro(row.value)}</span></button>`)
            .join("")}
        </div>
      `
    : `<div class="summary-empty">Aggiungi set per vedere la composizione.</div>`;

  elements.portfolioRows.innerHTML = `
    ${
      activePortfolioFacet
        ? `<div class="portfolio-filter-chip">
            <span>Filtro attivo: <strong>${escapeHtml(activePortfolioFacet.value)}</strong></span>
            <button type="button" data-clear-portfolio-filter>Mostra tutto</button>
          </div>`
        : ""
    }
    <div class="table-row header">
      <span>Set</span><span>Qta</span><span>Costo</span><span>Valore</span><span>Gain</span><span></span>
    </div>
    ${
      filteredPositions.length
        ? filteredPositions
            .map((item) => {
              const set = item.set;
              const cost = item.paid * item.qty;
              const retailReference = getRetailPrice(set) * item.qty;
              const normalizedCondition = normalizePortfolioCondition(item.condition);
              const value = getPositionMarketValue(item, set);
              const itemGain = value - cost;
              const gainLabel = formatGainPercent(itemGain, cost, retailReference);
              const pillClass = normalizedCondition === "Sigillato nuovo" ? "pill" : "pill warn";
              return `
                <div class="table-row portfolio-table-row">
                  <div class="portfolio-set-cell">
                    <div class="portfolio-thumb" data-portfolio-thumb="${set.code}"></div>
                    <div>
                      <strong>${set.name}</strong>
                      <small>${set.theme} · ${set.code}</small>
                    </div>
                  </div>
                  <div class="editable-cell">
                    <input class="portfolio-inline-input" type="number" min="1" step="1" value="${item.qty}" data-portfolio-edit="${item.index}" data-field="qty" aria-label="Quantità ${escapeHtml(set.name)}" />
                    <small>${normalizedCondition}</small>
                  </div>
                  <div class="editable-cell">
                    <input class="portfolio-inline-input" type="number" min="0" step="0.01" value="${Number(item.paid || 0)}" data-portfolio-edit="${item.index}" data-field="paid" aria-label="Prezzo pagato ${escapeHtml(set.name)}" />
                    <small>${cost === 0 ? "omaggio" : `${formatEuro(cost)} totale`}</small>
                  </div>
                  <div><strong>${formatEuro(value)}</strong><small>${Math.round(getConditionMultiplier(item.condition) * 100)}% del mercato sealed</small></div>
                  <div><span class="${pillClass}">${gainLabel}</span></div>
                  <button class="icon-action" type="button" data-remove-portfolio="${item.index}" title="Rimuovi posizione">×</button>
                </div>
              `;
            })
            .join("")
        : `<div class="empty-state"><strong>${state.portfolio.length ? "Nessuna posizione trovata" : "Portfolio vuoto"}</strong><span>${state.portfolio.length ? "Prova un'altra ricerca nel portfolio." : "Aggiungi il primo set dalla form sopra."}</span></div>`
    }
  `;

  elements.portfolioRows.querySelectorAll("[data-portfolio-thumb]").forEach((thumb) => {
    const set = getSet(thumb.dataset.portfolioThumb);
    if (!set) return;
    thumb.className = "portfolio-thumb set-thumb";
    setArtVariables(thumb, set);
    appendSetImage(thumb, set);
  });
}

function getBestMove() {
  return state.watchlist
    .map((item) => {
      const set = getSet(item.code);
      if (!set) return null;
      const distance = getMarketPrice(set) - item.target;
      const urgency = getScore(set) - Math.max(0, distance / 8);
      return { ...item, set, distance, urgency };
    })
    .filter(Boolean)
    .sort((a, b) => b.urgency - a.urgency)[0];
}

function renderSignals() {
  const signalData = state.sets
    .filter((set) => isHotThisYear(set) || isRetiringThisYear(set))
    .map((set) => ({ ...set, score: getScore(set) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
  const bestMove = getBestMove();

  elements.engineNarrative.textContent = bestMove
    ? `La mossa più interessante ora è ${bestMove.set.name}: Pulse ${getScore(bestMove.set)}/100, target ${formatEuro(bestMove.target)}, distanza ${formatEuro(Math.max(0, bestMove.distance))}.`
    : "Aggiungi target alla watchlist per far emergere la prossima mossa.";

  elements.signalGrid.innerHTML = signalData
    .map((set) => {
      const color = isRetiringThisYear(set) ? "#f4bd25" : "#12805c";
      return `
        <article class="signal-card">
          <div class="signal-score" style="--score:${set.score}%; --score-color:${color}">
            <strong>${set.score}</strong>
          </div>
          <div>
            <p class="eyebrow">${set.theme} · ${set.code}</p>
            <h2>${set.name}</h2>
          </div>
          <p>${set.signalText}</p>
          <span class="${isRetiringThisYear(set) ? "pill warn" : "pill"}">${set.signal}</span>
        </article>
      `;
    })
    .join("");
}

const formatQuantEuro = (value) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value || 0);

const formatQuantPct = (value) => `${value >= 0 ? "+" : ""}${Number(value || 0).toFixed(1)}%`;

const formatQuantUnitEuro = (value) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);

function getQuantApi() {
  return window.LegoQuantAI;
}

function getQuantData() {
  const quant = getQuantApi();
  return quant ? quant.scanOpportunities(quant.mockQuantSets.map(applyMarketSnapshotToQuantSet), { weights: quantModelWeights }) : [];
}

function getQuantMockByCode(code) {
  const quant = getQuantApi();
  const normalized = String(code || "").split("-")[0];
  return quant?.mockQuantSets.find((set) => set.setNumber === normalized);
}

function applyMarketSnapshotToQuantSet(set) {
  const snapshot = getMarketSnapshot(set.setNumber || set.code);
  if (!snapshot) return set;
  return {
    ...set,
    retailPrice: snapshot.retailPrice || set.retailPrice,
    currentMarketPrice: snapshot.currentMarketPrice || set.currentMarketPrice,
    sealedPrice: snapshot.sealedPrice || snapshot.currentMarketPrice || set.sealedPrice,
    usedPrice: snapshot.usedPrice || set.usedPrice,
    liquidityScore: snapshot.liquidityScore || set.liquidityScore,
    priceSource: snapshot.source,
    lastUpdated: snapshot.capturedAt,
  };
}

function buildQuantSetFromAppSet(set) {
  const mock = getQuantMockByCode(set.code);
  const snapshot = getMarketSnapshot(set.code);
  if (mock) {
    return applyMarketSnapshotToQuantSet({
      ...mock,
      name: set.name || mock.name,
      theme: set.theme || mock.theme,
      releaseYear: set.year || mock.releaseYear,
      retailPrice: getRetailPrice(set) || mock.retailPrice,
      currentMarketPrice: getMarketPrice(set) || mock.currentMarketPrice,
      sealedPrice: getMarketPrice(set) || mock.sealedPrice,
      pieceCount: set.parts || mock.pieceCount,
      availabilityStatus: isRetiringThisYear(set) ? "retiringSoon" : mock.availabilityStatus,
    });
  }

  const pulseScore = getScore(set);
  const liquidity = Number(set.liquidity || Math.max(45, Math.min(88, pulseScore)));
  const premium = Math.max(-30, Math.min(80, Number(set.sealedPremium || set.change || 0)));
  const currentPrice = getMarketPrice(set);
  const retailPrice = getRetailPrice(set) || currentPrice;

  return {
    setNumber: String(set.code || "").split("-")[0],
    name: set.name,
    theme: set.theme || "Unknown",
    subtheme: "",
    releaseYear: Number(set.year || CURRENT_YEAR),
    retirementYear: set.retireYear || (set.retiring ? CURRENT_YEAR : null),
    retailPrice,
    currentMarketPrice: snapshot?.currentMarketPrice || currentPrice,
    sealedPrice: snapshot?.sealedPrice || currentPrice,
    usedPrice: snapshot?.usedPrice || currentPrice * 0.82,
    pieceCount: Number(set.parts || 0),
    minifigCount: Number(set.minifigs || 0),
    exclusiveMinifigCount: 0,
    availabilityStatus: isRetiringThisYear(set) ? "retiringSoon" : set.retiring ? "retired" : "active",
    demandScore: Math.max(45, Math.min(92, pulseScore)),
    rarityScore: Math.max(42, Math.min(88, 52 + premium * 0.35 + (set.retiring ? 12 : 0))),
    liquidityScore: snapshot?.liquidityScore || liquidity,
    volatilityScore: Math.max(25, Math.min(78, 42 + Math.abs(Number(set.change || 0)) * 0.55 - liquidity * 0.08)),
    historicalPrices: [],
    priceSource: snapshot?.source || "Stimato",
    lastUpdated: snapshot?.capturedAt || new Date().toISOString().slice(0, 10),
  };
}

function getPortfolioQuantPositions() {
  return getPortfolioPositions().map((position) => ({
    set: {
      ...buildQuantSetFromAppSet(position.set),
      condition: position.condition,
    },
    qty: position.qty,
    paidPrice: position.paid,
  }));
}

function renderQuantPill(label, tone = "") {
  return `<span class="quant-pill ${tone}">${label}</span>`;
}

function getQuantActionTone(action) {
  if (action === "buy") return "good";
  if (action === "avoid") return "danger";
  return "warn";
}

function renderQuantMetric(label, value, note) {
  return `
    <article class="quant-metric">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${note}</small>
    </article>
  `;
}

function renderMiniLineChart(points, { valueKey = "value", labelKey = "label", accent = "#b05cff" } = {}) {
  const values = points.map((point) => Number(point[valueKey] || 0));
  if (!values.length) {
    return `<div class="quant-line-chart empty-state"><strong>Nessun dato grafico</strong><span>Importa snapshot o apri un set con forecast.</span></div>`;
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1, max - min);
  const coords = values.map((value, index) => {
    const x = values.length === 1 ? 50 : (index / (values.length - 1)) * 100;
    const y = 88 - ((value - min) / range) * 72;
    return `${x},${y}`;
  });
  const labels = points.map((point) => point[labelKey]).filter(Boolean);

  return `
    <div class="quant-line-chart" style="--chart-accent:${accent}">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polyline points="${coords.join(" ")}"></polyline>
      </svg>
      <div class="quant-chart-axis">
        <span>${labels[0] || ""}</span>
        <span>${labels.at(-1) || ""}</span>
      </div>
    </div>
  `;
}

function buildForecastChartPoints(set) {
  return [
    { label: "Oggi", value: set.currentMarketPrice },
    { label: "12M", value: set.forecast12M },
    { label: "3Y", value: set.forecast3Y },
    { label: "5Y", value: set.forecast5Y },
  ];
}

function buildHistoryChartPoints(set) {
  const imported = getPriceHistory(set.setNumber);
  if (imported.length) {
    return imported.map((point) => ({
      label: new Date(point.date).getFullYear().toString(),
      value: point.sealedPrice || point.usedPrice || 0,
    }));
  }
  return (set.historicalPrices || []).map((point) => ({
    label: String(point.year),
    value: point.price,
  }));
}

function renderQuantOverview(opportunities) {
  const avgScore = opportunities.length ? opportunities.reduce((sum, set) => sum + set.investmentScore, 0) / opportunities.length : 0;
  const strongBuys = opportunities.filter((set) => set.category === "Strong Buy").length;
  const avgRoi = opportunities.length ? opportunities.reduce((sum, set) => sum + set.expectedRoi, 0) / opportunities.length : 0;
  const highRisk = opportunities.filter((set) => set.riskLevel === "high").length;

  elements.quantOverview.innerHTML = [
    renderQuantMetric("Investment score medio", `${avgScore.toFixed(0)}/100`, "mock universe"),
    renderQuantMetric("Strong Buy", strongBuys, "score alto + rischio gestibile"),
    renderQuantMetric("ROI atteso 5Y", formatQuantPct(avgRoi), "forecast rule-based"),
    renderQuantMetric("High risk", highRisk, "volatilita o premium alto"),
  ].join("");

  elements.quantOverviewGrid.innerHTML = opportunities
    .slice(0, 4)
    .map(
      (set) => `
        <article class="quant-card">
          <div class="quant-card-head">
            <div>
              <p class="eyebrow">${set.theme} · ${set.setNumber}</p>
              <h2>${set.name}</h2>
            </div>
            <strong>${set.investmentScore}</strong>
          </div>
          <div class="quant-card-stats">
            <span>3Y <b>${formatQuantEuro(set.forecast3Y)}</b></span>
            <span>5Y <b>${formatQuantEuro(set.forecast5Y)}</b></span>
            <span>ROI <b>${formatQuantPct(set.expectedRoi)}</b></span>
          </div>
          <p>${set.reasons}</p>
          <div class="quant-card-footer">
            ${renderQuantPill(set.category, getQuantActionTone(set.action))}
            ${renderQuantPill(`Risk ${set.riskLevel}`, set.riskLevel)}
            ${renderQuantPill(`Liquidity ${set.liquidityScore}/100`)}
          </div>
        </article>
      `,
    )
    .join("");
}

function setQuantTab(tabName) {
  activeQuantTab = tabName;
  $$(".quant-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.quantTab === activeQuantTab));
  $$(".quant-panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.quantPanel === activeQuantTab));
}

function renderQuantCommandCenter(opportunities) {
  const quant = getQuantApi();
  if (!quant) return;
  const sets = quant.mockQuantSets.map(applyMarketSnapshotToQuantSet);
  const portfolio = quant.analyzePortfolio(getPortfolioQuantPositions());
  const deals = quant.scanDeals(sets, { weights: quantModelWeights });
  const brief = quant.generateDailyBrief({
    sets,
    positions: getPortfolioQuantPositions(),
    watchlist: state.watchlist,
  });
  const alerts = quant.generateAlerts({
    sets,
    positions: getPortfolioQuantPositions(),
    watchlist: state.watchlist,
  });
  const urgentAlerts = alerts.filter((alert) => alert.severity === "high");
  const bestDeal = deals.find((deal) => deal.dealStatus === "below-target") || deals.find((deal) => deal.dealStatus === "near-target") || deals[0];
  const topOpportunity = opportunities[0];
  const topPortfolioRisk = portfolio.rows.find((row) => row.portfolioAction === "trim" || row.portfolioAction === "exit-watch");
  const hasRealData = Object.keys(marketSnapshots).length > 0;
  const qualityRows = getQualityRows();
  const betaReadiness = getBetaReadiness(qualityRows);

  elements.quantCommandCenter.innerHTML = `
    <div class="quant-command-hero">
      <div>
        <p class="eyebrow">AI Command Center</p>
        <h2>${brief.headline}</h2>
        <p>${hasRealData ? "Quant AI sta usando anche snapshot prezzo importati." : "Stai ancora usando mock/stime: importa prezzi reali per rendere i segnali verificabili."}</p>
      </div>
      <div class="quant-score-orb command-orb">
        <span>Portfolio</span>
        <strong>${portfolio.totals.portfolioScore || 0}</strong>
        <small>${portfolio.totals.riskLevel || "risk"}</small>
      </div>
    </div>
    <div class="quant-metrics">
      ${renderQuantMetric("Alert urgenti", urgentAlerts.length, "da guardare ora")}
      ${renderQuantMetric("Miglior deal", bestDeal ? bestDeal.dealLabel : "-", bestDeal ? bestDeal.setNumber : "nessun dato")}
      ${renderQuantMetric("Rischio portfolio", portfolio.totals.riskLevel || "-", `score ${portfolio.totals.riskScore || 0}/100`)}
      ${renderQuantMetric("Top score", topOpportunity ? `${topOpportunity.investmentScore}/100` : "-", topOpportunity ? topOpportunity.setNumber : "mock universe")}
    </div>
    <div class="quant-briefing">
      <article>
        <p class="eyebrow">Private beta readiness</p>
        <h2>${betaReadiness.score}/100 · ${betaReadiness.label}</h2>
        <p>${betaReadiness.message}</p>
        <div class="beta-checklist">
          ${betaReadiness.items
            .map(
              (item) => `
                <div class="beta-check ${item.done ? "done" : ""}">
                  <span>${item.done ? "OK" : "TODO"}</span>
                  <strong>${item.label}</strong>
                  <small>${item.detail}</small>
                </div>
              `,
            )
            .join("")}
        </div>
      </article>
      <article>
        <p class="eyebrow">Regola beta</p>
        <h2>Forecast bloccato se i dati sono deboli.</h2>
        <p>Per il test amici: usa Portfolio, Data Sources, Quality Gate e Backup. Le raccomandazioni sono operative solo quando fonte, confidence e ultimo update sono visibili.</p>
        <button class="ghost-action compact-action" type="button" data-command-jump="quality">Apri Quality Gate</button>
      </article>
    </div>
    <div class="quant-command-grid">
      <article class="quant-command-card priority">
        <p class="eyebrow">Prima cosa da fare</p>
        <h2>${alerts[0]?.title || "Importa dati prezzo reali"}</h2>
        <p>${alerts[0]?.message || "Carica un CSV in Data Sources per passare da demo intelligente a segnali verificabili."}</p>
        <button class="primary-action compact-action" type="button" data-command-jump="${alerts[0] ? "alerts" : "sources"}">${alerts[0] ? "Apri alert" : "Apri Data Sources"}</button>
      </article>
      <article class="quant-command-card">
        <p class="eyebrow">Daily Brief</p>
        <h2>${brief.actions[0] || "Costruisci dati reali"}</h2>
        <p>${brief.actions.slice(1).join(" · ") || brief.notes[0]}</p>
        <button class="ghost-action compact-action" type="button" data-command-jump="alerts">Apri Alert Center</button>
      </article>
      <article class="quant-command-card">
        <p class="eyebrow">Deal operativo</p>
        <h2>${bestDeal ? `${bestDeal.setNumber} ${bestDeal.name}` : "Nessun deal"}</h2>
        <p>${bestDeal ? `${bestDeal.dealLabel}: prezzo ${formatQuantEuro(bestDeal.currentMarketPrice)}, target ${formatQuantEuro(bestDeal.targetBuyPrice)}.` : "Aggiungi prezzi reali per far emergere occasioni."}</p>
        <button class="ghost-action compact-action" type="button" data-command-jump="deals">Apri Deal Scanner</button>
      </article>
      <article class="quant-command-card">
        <p class="eyebrow">Portfolio</p>
        <h2>${topPortfolioRisk ? `${topPortfolioRisk.setNumber} da rivedere` : "Portfolio sotto controllo"}</h2>
        <p>${topPortfolioRisk ? `${topPortfolioRisk.name}: rischio ${topPortfolioRisk.riskLevel}, azione ${formatPortfolioAction(topPortfolioRisk.portfolioAction)}.` : `Score ${portfolio.totals.portfolioScore || 0}/100, rischio ${portfolio.totals.riskLevel || "n/d"}.`}</p>
        <button class="ghost-action compact-action" type="button" data-command-jump="portfolio">Apri Portfolio AI</button>
      </article>
      <article class="quant-command-card">
        <p class="eyebrow">Idea investimento</p>
        <h2>${topOpportunity ? `${topOpportunity.setNumber} ${topOpportunity.name}` : "Nessun candidato"}</h2>
        <p>${topOpportunity ? `Score ${topOpportunity.investmentScore}/100, ROI 5Y ${formatQuantPct(topOpportunity.expectedRoi)}, rischio ${topOpportunity.riskLevel}.` : "Il motore non ha candidati da mostrare."}</p>
        <button class="ghost-action compact-action" type="button" data-command-jump="opportunities">Apri Top Opportunities</button>
      </article>
    </div>
  `;
}

function getBetaReadiness(qualityRows = getQualityRows()) {
  const realCoverage = qualityRows.length ? (qualityRows.filter((row) => !/mock|stima|unknown/i.test(row.source)).length / qualityRows.length) * 100 : 0;
  const historyCoverage = qualityRows.length ? (qualityRows.filter((row) => row.historyPoints >= 3).length / qualityRows.length) * 100 : 0;
  const avgQuality = qualityRows.length ? qualityRows.reduce((sum, row) => sum + row.qualityScore, 0) / qualityRows.length : 0;
  const hasPortfolio = state.portfolio.length > 0;
  const hasBackup = Boolean(localStorage.getItem(STORAGE_KEY));
  const items = [
    { label: "Portfolio caricato", done: hasPortfolio, detail: hasPortfolio ? `${state.portfolio.length} posizioni` : "aggiungi/importa holdings" },
    { label: "Prezzi reali importati", done: realCoverage >= 50, detail: `${Math.round(realCoverage)}% copertura` },
    { label: "Storico prezzi", done: historyCoverage >= 30, detail: `${Math.round(historyCoverage)}% con 3+ punti` },
    { label: "Qualita media", done: avgQuality >= 55, detail: `${Math.round(avgQuality)}/100` },
    { label: "Backup locale pronto", done: hasBackup, detail: "Data Vault esporta JSON prima del test" },
  ];
  const score = Math.round((items.filter((item) => item.done).length / items.length) * 100);
  return {
    score,
    label: score >= 80 ? "pronta per amici" : score >= 60 ? "testabile con disclaimer" : "serve dati",
    message:
      score >= 80
        ? "Puoi farla provare: i tester vedranno fonti e limiti dei segnali."
        : score >= 60
          ? "Falla testare, ma chiedi feedback su UX e importa piu dati prezzo prima di giudicare i forecast."
          : "Prima del test importa prezzi reali o usa CSV sold comps sui set principali.",
    items,
  };
}

function renderQuantProMode(opportunities) {
  const quant = getQuantApi();
  if (!quant) return;
  const portfolio = quant.analyzePortfolio(getPortfolioQuantPositions());
  const sets = quant.mockQuantSets.map(applyMarketSnapshotToQuantSet);
  const deals = quant.scanDeals(sets, { weights: quantModelWeights });
  const trimCandidates = portfolio.rows
    .filter((row) => row.portfolioAction === "trim" || row.portfolioAction === "exit-watch")
    .slice(0, 4);
  const concentrationNotes = portfolio.totals.themeExposure
    ?.filter((row) => row.share >= 30)
    .slice(0, 3) || [];
  const buyCandidates = deals
    .filter((deal) => deal.dealStatus === "below-target" || deal.dealStatus === "near-target")
    .slice(0, 4);
  const avoidCandidates = opportunities
    .filter((set) => set.action === "avoid" && (set.riskLevel === "high" || set.investmentScore < 55))
    .slice(0, 5);
  const capitalToFree = trimCandidates.reduce((sum, row) => sum + row.currentTotal, 0);
  const buyBudget = buyCandidates.reduce((sum, deal) => sum + deal.targetBuyPrice, 0);
  const upgradeDelta = buyCandidates.reduce((sum, deal) => sum + deal.expectedRoi, 0) / Math.max(1, buyCandidates.length);

  elements.quantProMode.innerHTML = `
    <div class="quant-command-hero">
      <div>
        <p class="eyebrow">Pro Mode</p>
        <h2>Rotazione capitale: proteggi i flagship, taglia solo il debole.</h2>
        <p>Questa vista separa veri candidati exit da set core da tenere. Titanic, Colosseo, UCS e Icons non vengono messi in vendita solo perche pesano tanto.</p>
      </div>
      <div class="quant-score-orb command-orb">
        <span>ROI</span>
        <strong>${Math.round(upgradeDelta || 0)}</strong>
        <small>avg 5Y</small>
      </div>
    </div>
    <div class="quant-metrics">
      ${renderQuantMetric("Capitale liberabile", formatQuantEuro(capitalToFree), trimCandidates.length ? "solo trim/exit reali" : "nessuna uscita critica")}
      ${renderQuantMetric("Budget buy list", formatQuantEuro(buyBudget), "target ingresso")}
      ${renderQuantMetric("Rischio portfolio", portfolio.totals.riskLevel || "-", `score ${portfolio.totals.riskScore || 0}`)}
      ${renderQuantMetric("Copertura dati", Object.keys(marketSnapshots).length ? "Import attivo" : "Mock/Stime", "qualita segnali")}
    </div>
    <div class="quant-pro-grid">
      <article class="quant-pro-card">
        <p class="eyebrow">Exit reali / rivedi</p>
        <h2>Solo posizioni deboli, non flagship.</h2>
        ${trimCandidates.length ? trimCandidates.map((row) => `
          <div class="quant-pro-row">
            <span><strong>${row.setNumber}</strong> ${row.name}</span>
            <small>${formatPortfolioAction(row.portfolioAction)} · ${formatQuantEuro(row.currentTotal)}</small>
          </div>
        `).join("") : `
          <p class="muted-text">Nessuna uscita critica con i dati attuali. I set grandi possono aumentare concentrazione, ma restano hold se score e liquidita sono buoni.</p>
          ${concentrationNotes.map((row) => `
            <div class="quant-pro-row">
              <span><strong>${row.theme}</strong></span>
              <small>Concentrazione ${row.share}% · monitora, non vendere automaticamente</small>
            </div>
          `).join("")}
        `}
      </article>
      <article class="quant-pro-card">
        <p class="eyebrow">Compra / watch aggressiva</p>
        <h2>Set con miglior ingresso.</h2>
        ${buyCandidates.length ? buyCandidates.map((deal) => `
          <div class="quant-pro-row">
            <span><strong>${deal.setNumber}</strong> ${deal.name}</span>
            <small>${deal.dealLabel} · target ${formatQuantEuro(deal.targetBuyPrice)}</small>
          </div>
        `).join("") : `<p class="muted-text">Nessun buy sotto/near target. Importa prezzi reali per scanner piu utile.</p>`}
      </article>
      <article class="quant-pro-card">
        <p class="eyebrow">Non inseguire</p>
        <h2>Evita solo i segnali deboli.</h2>
        ${avoidCandidates.map((set) => `
          <div class="quant-pro-row">
            <span><strong>${set.setNumber}</strong> ${set.name}</span>
            <small>Risk ${set.riskLevel} · score ${set.investmentScore}/100</small>
          </div>
        `).join("") || `<p class="muted-text">Nessun avoid forte nel campione attuale. I set con score buono restano watch/hold, non avoid.</p>`}
      </article>
    </div>
  `;
}

function formatPortfolioAction(action) {
  return {
    "hold-add": "Hold / accumula",
    hold: "Tieni",
    trim: "Alleggerisci",
    "exit-watch": "Valuta uscita",
    watch: "Monitora",
  }[action] || action;
}

function getPortfolioActionTone(action) {
  if (action === "hold-add" || action === "hold") return "good";
  if (action === "trim" || action === "exit-watch") return "danger";
  return "warn";
}

function renderQuantPortfolio() {
  const quant = getQuantApi();
  if (!quant) return;
  const analysis = quant.analyzePortfolio(getPortfolioQuantPositions());

  if (!analysis.rows.length) {
    elements.quantPortfolioAi.innerHTML = `<div class="empty-state"><strong>Portfolio AI vuoto</strong><span>Aggiungi set al portfolio per generare raccomandazioni personali.</span></div>`;
    return;
  }

  elements.quantPortfolioAi.innerHTML = `
    <div class="quant-metrics">
      ${renderQuantMetric("Portfolio score", `${analysis.totals.portfolioScore}/100`, "pesato per valore")}
      ${renderQuantMetric("Rischio portfolio", analysis.totals.riskLevel, `concentrazione ${analysis.totals.concentrationRisk}`)}
      ${renderQuantMetric("Valore 5Y stimato", formatQuantEuro(analysis.totals.forecast5Y), formatQuantPct(analysis.totals.expectedRoi5Y))}
      ${renderQuantMetric("Gain su costo", formatQuantPct(analysis.totals.gainOnCost), "valore attuale vs pagato")}
      ${renderQuantMetric("Rendimento annuale", formatQuantPct(analysis.totals.annualizedReturn), "annualizzato stimato")}
      ${renderQuantMetric("Diversificazione", `${analysis.totals.diversificationScore}/100`, "piu alto = meno concentrazione")}
      ${renderQuantMetric("Best performer", analysis.totals.bestPerformer?.setNumber || "-", analysis.totals.bestPerformer ? formatQuantPct(analysis.totals.bestPerformer.unrealizedRoi) : "nessun dato")}
      ${renderQuantMetric("Worst performer", analysis.totals.worstPerformer?.setNumber || "-", analysis.totals.worstPerformer ? formatQuantPct(analysis.totals.worstPerformer.unrealizedRoi) : "nessun dato")}
    </div>
    <div class="quant-briefing">
      <article>
        <p class="eyebrow">AI Portfolio Brief</p>
        <h2>Le prossime mosse sulla tua collezione.</h2>
        ${analysis.recommendations.map((note) => `<p>${note}</p>`).join("")}
      </article>
      <article>
        <p class="eyebrow">Esposizione temi</p>
        <h2>Dove sei piu concentrato.</h2>
        ${analysis.themeExposure
          .slice(0, 5)
          .map(
            (theme) => `
              <div class="quant-exposure-row">
                <span>${theme.theme}</span>
                <strong>${theme.share}%</strong>
                <i style="--exposure:${theme.share}%"></i>
              </div>
            `,
          )
          .join("")}
      </article>
    </div>
    <div class="quant-table portfolio-quant-table">
      <div class="quant-table-row header">
        <span>Set nel portfolio</span><span>Qta</span><span>Score</span><span>Valore oggi</span><span>Forecast 5Y</span><span>Azione</span>
      </div>
      ${analysis.rows
        .map(
          (row) => `
            <button class="quant-table-row" type="button" data-quant-detail="${row.setNumber}">
              <span><strong>${row.name}</strong><small>${row.theme} · ${row.decision} · ROI costo ${formatQuantPct(row.forecastRoiOnCost)}</small></span>
              <span>${row.qty}</span>
              <span>${row.investmentScore}/100</span>
              <span>${formatQuantEuro(row.currentTotal)}</span>
              <span>${formatQuantEuro(row.forecast5YTotal)}</span>
              <span>${renderQuantPill(formatPortfolioAction(row.portfolioAction), getPortfolioActionTone(row.portfolioAction))}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderQuantDataSources() {
  const snapshots = Object.values(marketSnapshots).sort((a, b) => a.setNumber.localeCompare(b.setNumber));
  const realCount = snapshots.length;
  const matchedPortfolio = getPortfolioPositions().filter((position) => getMarketSnapshot(position.code)).length;
  const soldCompCount = snapshots.reduce((sum, snapshot) => sum + Number(snapshot.soldCount || 0), 0);
  const avgConfidence = snapshots.length
    ? Math.round(snapshots.reduce((sum, snapshot) => sum + getSnapshotConfidence(snapshot).score, 0) / snapshots.length)
    : 0;
  const newest = snapshots
    .map((snapshot) => snapshot.capturedAt)
    .filter(Boolean)
    .sort()
    .at(-1);

  elements.quantDataSources.innerHTML = `
    <div class="quant-metrics">
      ${renderQuantMetric("Snapshot prezzo", realCount, realCount ? "CSV/import locale" : "nessun prezzo importato")}
      ${renderQuantMetric("Match portfolio", matchedPortfolio, "set coperti da prezzo importato")}
      ${renderQuantMetric("Sold comps", soldCompCount, "vendite reali aggregate")}
      ${renderQuantMetric("Confidence media", realCount ? `${avgConfidence}/100` : "-", newest || "nessun update")}
    </div>
    <div class="quant-briefing">
      <article>
        <p class="eyebrow">Market Data Hub</p>
        <h2>Carica prezzi reali senza aspettare le API.</h2>
        <p>Importa un CSV esportato o preparato da BrickLink, BrickEconomy, eBay o foglio manuale. Quant AI usera questi prezzi per forecast, portfolio e opportunity scanner quando il codice set coincide.</p>
        <p>Colonne accettate: setNumber, retailPrice, currentMarketPrice, sealedPrice, usedPrice, soldCount, listingCount, source, capturedAt.</p>
        <p>Per vendite reali usa Sold Comps CSV: setNumber, soldPrice/price, condition, shipping, source, soldAt/date.</p>
        <div class="quant-card-footer">
          <button class="primary-action" type="button" id="importMarketSnapshot">Importa CSV prezzi</button>
          <button class="ghost-action" type="button" id="importSoldComps">Importa vendite reali</button>
          <button class="ghost-action" type="button" id="downloadSoldCompsTemplate">Template sold comps</button>
          <button class="ghost-action" type="button" id="downloadSnapshotTemplate">Template prezzi</button>
          <button class="ghost-action" type="button" id="clearMarketSnapshots">Cancella snapshot</button>
        </div>
      </article>
      <article>
        <p class="eyebrow">Qualita dati</p>
        <h2>${realCount ? "Prezzi importati attivi" : "Ancora in modalita demo"}</h2>
        <p>${realCount ? "I set coperti dal CSV mostrano fonte e prezzi importati. Gli altri continuano a usare stime o dati mock." : "Per rendere Quant AI verificabile serve almeno una fonte prezzo reale o un CSV di snapshot."}</p>
        <p id="marketSnapshotStatus"></p>
      </article>
    </div>
    <div class="quant-table">
      <div class="quant-table-row header">
        <span>Set</span><span>Retail</span><span>Sealed</span><span>Used</span><span>Volume</span><span>Fonte</span>
      </div>
      ${
        snapshots.length
          ? snapshots
              .slice(0, 80)
              .map(
                (snapshot) => `
                  <div class="quant-table-row">
                    <span><strong>${snapshot.setNumber}</strong><small>${snapshot.capturedAt || "-"}</small></span>
                    <span>${formatQuantEuro(snapshot.retailPrice)}</span>
                    <span>${formatQuantEuro(snapshot.sealedPrice || snapshot.currentMarketPrice)}</span>
                    <span>${formatQuantEuro(snapshot.usedPrice)}</span>
                    <span>${snapshot.soldCount || 0} sold<small>${snapshot.compLow ? `${formatQuantEuro(snapshot.compLow)}-${formatQuantEuro(snapshot.compHigh)}` : `${snapshot.liquidityScore || 0}/100 liq`}</small></span>
                    <span>${renderQuantPill(`${getSnapshotConfidence(snapshot).label} ${getSnapshotConfidence(snapshot).score}`, getSnapshotConfidenceTone(snapshot))}<small>${snapshot.source}</small></span>
                  </div>
                `,
              )
              .join("")
          : `<div class="empty-state"><strong>Nessuno snapshot importato</strong><span>Carica un CSV prezzi per attivare dati mercato nel motore Quant.</span></div>`
      }
    </div>
  `;
}

function daysSince(dateValue) {
  if (!dateValue) return Infinity;
  const time = new Date(dateValue).getTime();
  if (!Number.isFinite(time)) return Infinity;
  return Math.max(0, Math.floor((Date.now() - time) / (24 * 60 * 60 * 1000)));
}

function getSnapshotConfidence(snapshot) {
  if (!snapshot) return { score: 0, label: "No data" };
  const soldCount = Number(snapshot.soldCount || 0);
  const age = daysSince(snapshot.capturedAt);
  const sealed = Number(snapshot.sealedPrice || snapshot.currentMarketPrice || 0);
  const spread = snapshot.compLow && snapshot.compHigh && sealed ? ((snapshot.compHigh - snapshot.compLow) / sealed) * 100 : 0;
  let score = 20;
  score += Math.min(35, soldCount * 5);
  score += age <= 7 ? 20 : age <= 30 ? 14 : age <= 90 ? 7 : 0;
  score += sealed > 0 ? 10 : 0;
  score += snapshot.usedPrice > 0 ? 8 : 0;
  score += /sold|bricklink|ebay|brickeconomy/i.test(snapshot.source || "") ? 12 : 4;
  if (spread > 0) score += spread <= 18 ? 15 : spread <= 35 ? 8 : 2;
  return {
    score: Math.round(Math.max(0, Math.min(100, score))),
    label: score >= 78 ? "Alta" : score >= 55 ? "Media" : "Bassa",
  };
}

function getSnapshotConfidenceTone(snapshot) {
  const score = getSnapshotConfidence(snapshot).score;
  if (score >= 78) return "good";
  if (score >= 55) return "warn";
  return "danger";
}

function getQualityRows() {
  const quant = getQuantApi();
  if (!quant) return [];
  const portfolioSets = getPortfolioPositions().map((position) => buildQuantSetFromAppSet(position.set));
  const baseSets = portfolioSets.length ? portfolioSets : quant.mockQuantSets.map(applyMarketSnapshotToQuantSet);
  const unique = new Map();
  baseSets.forEach((set) => unique.set(normalizeSetNumber(set.setNumber || set.code), set));

  return [...unique.values()].map((set) => {
    const snapshot = getMarketSnapshot(set.setNumber || set.code);
    const history = getPriceHistory(set.setNumber || set.code);
    const confidence = getSnapshotConfidence(snapshot);
    const qualityScore = quant.calculateDataQualityScore({
      ...set,
      historicalPrices: history.length ? history.map((point) => ({ year: Number(String(point.date).slice(0, 4)), price: point.sealedPrice || point.value || 0 })) : set.historicalPrices,
      priceSource: snapshot?.source || set.priceSource,
    });
    const missing = [];
    if (!snapshot) missing.push("prezzo reale");
    if (!history.length && !set.historicalPrices?.length) missing.push("storico");
    if (!set.usedPrice) missing.push("used price");
    if (!set.liquidityScore) missing.push("liquidita");
    if (snapshot && (snapshot.soldCount || 0) < 3) missing.push("pochi sold comps");
    if (snapshot && daysSince(snapshot.capturedAt) > 30) missing.push("snapshot vecchio");

    return {
      setNumber: set.setNumber || set.code,
      name: set.name,
      theme: set.theme,
      qualityScore,
      confidence,
      source: snapshot?.source || set.priceSource || "mock/stima",
      historyPoints: history.length || set.historicalPrices?.length || 0,
      ageDays: snapshot ? daysSince(snapshot.capturedAt) : null,
      missing,
    };
  }).sort((a, b) => a.qualityScore - b.qualityScore);
}

function getQualityTone(score) {
  if (score >= 78) return "good";
  if (score >= 55) return "warn";
  return "danger";
}

function renderQuantQualityGate() {
  const rows = getQualityRows();
  const averageQuality = rows.length ? rows.reduce((sum, row) => sum + row.qualityScore, 0) / rows.length : 0;
  const realCoverage = rows.length ? (rows.filter((row) => !/mock|stima|unknown/i.test(row.source)).length / rows.length) * 100 : 0;
  const historyCoverage = rows.length ? (rows.filter((row) => row.historyPoints >= 3).length / rows.length) * 100 : 0;
  const staleRows = rows.filter((row) => row.ageDays !== null && row.ageDays > 30).length;
  const averageConfidence = rows.length ? rows.reduce((sum, row) => sum + row.confidence.score, 0) / rows.length : 0;

  elements.quantQualityGate.innerHTML = `
    <div class="quant-metrics">
      ${renderQuantMetric("Qualita media", `${Math.round(averageQuality)}/100`, averageQuality >= 78 ? "dati buoni" : "serve piu storico")}
      ${renderQuantMetric("Prezzi reali", `${Math.round(realCoverage)}%`, "copertura non mock")}
      ${renderQuantMetric("Storico 3+ punti", `${Math.round(historyCoverage)}%`, "base per trend")}
      ${renderQuantMetric("Confidence prezzo", `${Math.round(averageConfidence)}/100`, "sold comps + recenza")}
    </div>
    <div class="quant-briefing">
      <article>
        <p class="eyebrow">Quality Gate</p>
        <h2>${averageQuality >= 78 ? "Segnali abbastanza solidi" : "Segnali ancora da validare"}</h2>
        <p>Questa pagina misura quanto puoi fidarti dei forecast. Prezzi importati, storico, used price e liquidita aumentano la qualita; dati mock o vecchi la abbassano.</p>
      </article>
      <article>
        <p class="eyebrow">Prossima azione dati</p>
        <h2>${realCoverage < 70 ? "Aumenta copertura prezzi" : historyCoverage < 70 ? "Aggiungi storico" : "Mantieni aggiornato"}</h2>
        <p>${realCoverage < 70 ? "Importa CSV o collega BrickLink/eBay sold per i set principali." : historyCoverage < 70 ? "Salva snapshot periodici per creare una curva reale." : "Aggiorna snapshot almeno ogni 30 giorni."}</p>
      </article>
    </div>
    <div class="quant-table quality-table">
      <div class="quant-table-row header">
        <span>Set</span><span>Qualita</span><span>Confidence</span><span>Storico</span><span>Eta</span><span>Manca</span>
      </div>
      ${
        rows.length
          ? rows
              .map(
                (row) => `
                  <div class="quant-table-row">
                    <span><strong>${row.setNumber} ${row.name}</strong><small>${row.theme}</small></span>
                    <span>${renderQuantPill(`${row.qualityScore}/100`, getQualityTone(row.qualityScore))}</span>
                    <span>${renderQuantPill(`${row.confidence.label} ${row.confidence.score}/100`, getQualityTone(row.confidence.score))}<small>${row.source}</small></span>
                    <span>${row.historyPoints}</span>
                    <span>${row.ageDays === null ? "-" : `${row.ageDays}g`}</span>
                    <span>${row.missing.length ? row.missing.join(", ") : "OK"}</span>
                  </div>
                `,
              )
              .join("")
          : `<div class="empty-state"><strong>Nessun dato da controllare</strong><span>Aggiungi portfolio o importa prezzi per attivare il Quality Gate.</span></div>`
      }
    </div>
  `;
}

function renderQuantPriceHistory() {
  const rows = Object.entries(priceHistory)
    .map(([setNumber, history]) => {
      const set = getSet(setNumber) || getQuantMockByCode(setNumber) || { name: `Set ${setNumber}`, theme: "Quant" };
      const sorted = Array.isArray(history) ? [...history].sort((a, b) => a.date.localeCompare(b.date)) : [];
      const trend = getHistoryTrend(sorted);
      return {
        setNumber,
        name: set.name,
        theme: set.theme,
        history: sorted,
        trend,
        last: sorted.at(-1),
      };
    })
    .filter((row) => row.history.length)
    .sort((a, b) => b.history.length - a.history.length);
  const totalPoints = getPriceHistoryPointCount();
  const coveredSets = rows.length;
  const upTrends = rows.filter((row) => row.trend.direction === "up").length;
  const downTrends = rows.filter((row) => row.trend.direction === "down").length;

  elements.quantPriceHistory.innerHTML = `
    <div class="quant-metrics">
      ${renderQuantMetric("Set con storico", coveredSets, "curve salvate")}
      ${renderQuantMetric("Punti prezzo", totalPoints, "snapshot totali")}
      ${renderQuantMetric("Trend positivi", upTrends, "oltre +2%")}
      ${renderQuantMetric("Trend negativi", downTrends, "sotto -2%")}
    </div>
    <div class="quant-briefing">
      <article>
        <p class="eyebrow">Price History Center</p>
        <h2>Costruiamo memoria prezzo nel tempo.</h2>
        <p>Ogni import CSV, sold comps o sync BrickLink alimenta lo storico. Lo snapshot giornaliero salva un punto al giorno per ogni set con prezzo reale importato.</p>
        <div class="quant-card-footer">
          <button class="primary-action" type="button" id="recordDailySnapshots">Crea snapshot oggi</button>
          <button class="ghost-action" type="button" id="exportPriceHistoryCsv">Esporta storico CSV</button>
        </div>
      </article>
      <article>
        <p class="eyebrow">Copertura</p>
        <h2>${coveredSets ? `${coveredSets} set tracciati` : "Nessuno storico ancora"}</h2>
        <p>${coveredSets ? "Apri un set nel dettaglio per vedere la curva storico/forecast insieme." : "Importa prezzi o vendite reali per iniziare a costruire storico."}</p>
        <p id="priceHistoryStatus"></p>
      </article>
    </div>
    <div class="quant-table history-table">
      <div class="quant-table-row header">
        <span>Set</span><span>Punti</span><span>Ultimo prezzo</span><span>Trend</span><span>Ultima fonte</span><span>Dettaglio</span>
      </div>
      ${
        rows.length
          ? rows
              .slice(0, 80)
              .map(
                (row) => `
                  <button class="quant-table-row" type="button" data-quant-detail="${row.setNumber}">
                    <span><strong>${row.setNumber} ${row.name}</strong><small>${row.theme}</small></span>
                    <span>${row.history.length}</span>
                    <span>${formatQuantEuro(row.last?.sealedPrice || 0)}<small>${row.last?.date || "-"}</small></span>
                    <span>${renderQuantPill(formatQuantPct(row.trend.change), row.trend.direction === "up" ? "good" : row.trend.direction === "down" ? "danger" : "warn")}</span>
                    <span>${row.last?.source || "-"}</span>
                    <span>Apri forecast</span>
                  </button>
                `,
              )
              .join("")
          : `<div class="empty-state"><strong>Nessuno storico prezzi</strong><span>Importa sold comps o snapshot prezzi per creare le prime curve.</span></div>`
      }
    </div>
  `;
}

function renderQuantDataVault() {
  const snapshots = Object.values(marketSnapshots);
  const historyPoints = Object.values(priceHistory).reduce((sum, rows) => sum + (Array.isArray(rows) ? rows.length : 0), 0);
  const portfolioValue = getPortfolioTotals().value;
  const lastSync = syncMeta.lastSync ? new Date(syncMeta.lastSync).toLocaleString("it-IT", { dateStyle: "medium", timeStyle: "short" }) : "-";
  const lastSnapshot = snapshots
    .map((snapshot) => snapshot.capturedAt)
    .filter(Boolean)
    .sort()
    .at(-1) || "-";
  const cloudSaved = marketCloudMeta.lastSavedAt
    ? new Date(marketCloudMeta.lastSavedAt).toLocaleString("it-IT", { dateStyle: "medium", timeStyle: "short" })
    : "-";
  const cloudStatus = currentUser
    ? marketCloudMeta.error
      ? "Errore cloud"
      : marketCloudMeta.loaded
        ? "Cloud attivo"
        : "Login attivo"
    : "Solo locale";

  elements.quantDataVault.innerHTML = `
    <div class="quant-metrics">
      ${renderQuantMetric("Portfolio", state.portfolio.length, `${getPortfolioTotals().count} pezzi totali`)}
      ${renderQuantMetric("Valore salvato", formatQuantEuro(portfolioValue), "stima locale attuale")}
      ${renderQuantMetric("Prezzi salvati", snapshots.length, `${historyPoints} punti storico`)}
      ${renderQuantMetric("Ultimo sync", lastSync, `snapshot ${lastSnapshot}`)}
    </div>
    <div class="quant-vault-grid">
      <article class="quant-vault-card">
        <p class="eyebrow">Backup completo</p>
        <h2>Porta via tutto in un file JSON.</h2>
        <p>Esporta portfolio, watchlist, snapshot prezzi e storico locale. Non include API key, password o segreti.</p>
        <div class="quant-card-footer">
          <button class="primary-action" type="button" data-vault-action="export-backup">Scarica backup JSON</button>
          <button class="ghost-action" type="button" data-vault-action="export-server">Export account server</button>
          <button class="ghost-action" type="button" data-vault-action="import-backup">Importa backup JSON</button>
        </div>
      </article>
      <article class="quant-vault-card">
        <p class="eyebrow">Export operativo</p>
        <h2>CSV pronti per fogli, GitHub o Streamlit.</h2>
        <p>Usali per analisi esterne, controlli manuali, import futuri o per popolare una versione online senza rifare tutto a mano.</p>
        <div class="quant-card-footer">
          <button class="ghost-action" type="button" data-vault-action="export-portfolio">Esporta portfolio CSV</button>
          <button class="ghost-action" type="button" data-vault-action="export-prices">Esporta prezzi CSV</button>
        </div>
      </article>
      <article class="quant-vault-card quant-vault-wide">
        <p class="eyebrow">Stato dati</p>
        <h2 id="dataVaultStatus">Vault pronto.</h2>
        <div class="quant-vault-checks">
          <span>${renderQuantPill(state.portfolio.length ? "Portfolio OK" : "Portfolio vuoto", state.portfolio.length ? "good" : "warn")}</span>
          <span>${renderQuantPill(snapshots.length ? "Prezzi importati" : "Prezzi mock", snapshots.length ? "good" : "warn")}</span>
          <span>${renderQuantPill(currentUser ? "Login attivo" : "Solo locale", currentUser ? "good" : "warn")}</span>
          <span>${renderQuantPill(cloudStatus, marketCloudMeta.error ? "danger" : currentUser ? "good" : "warn")}</span>
        </div>
        <p>Market data account: ultimo salvataggio ${cloudSaved}. ${marketCloudMeta.error || "Snapshot, storico prezzi e pesi modello vengono sincronizzati sul server quando sei loggato."}</p>
      </article>
    </div>
  `;
}

function getStrategyCandidates(opportunities) {
  const riskLimit = {
    defensive: ["low"],
    balanced: ["low", "medium"],
    aggressive: ["low", "medium", "high"],
  }[quantStrategy.profile] || ["low", "medium"];

  return opportunities
    .filter((set) => set.action !== "avoid")
    .filter((set) => riskLimit.includes(set.riskLevel))
    .map((set) => {
      const targetBuyPrice = Math.max(1, Number(set.targetBuyPrice || set.currentMarketPrice || 0));
      const horizonValue = quantStrategy.horizon === "3y" ? set.forecast3Y : set.forecast5Y;
      const expectedGain = Math.max(0, horizonValue - targetBuyPrice);
      const strategyScore = set.investmentScore + Math.min(20, expectedGain / targetBuyPrice * 30) + (set.liquidityScore || 0) * 0.08;
      return { ...set, targetBuyPrice, horizonValue, expectedGain, strategyScore };
    })
    .sort((a, b) => b.strategyScore - a.strategyScore);
}

function buildStrategyPlan(opportunities) {
  const budget = Math.max(0, Number(quantStrategy.budget || 0));
  const candidates = getStrategyCandidates(opportunities);
  let remaining = budget;
  const picks = [];

  candidates.forEach((set) => {
    if (picks.length >= 6 || set.targetBuyPrice > remaining) return;
    const maxQty = Math.max(1, Math.floor(remaining / set.targetBuyPrice));
    const qty = Math.min(maxQty, set.riskLevel === "high" ? 1 : 2);
    const cost = qty * set.targetBuyPrice;
    if (cost <= 0 || cost > remaining) return;
    remaining -= cost;
    picks.push({
      ...set,
      qty,
      cost,
      forecastValue: qty * set.horizonValue,
      expectedGainTotal: qty * set.expectedGain,
    });
  });

  const spent = picks.reduce((sum, pick) => sum + pick.cost, 0);
  const forecastValue = picks.reduce((sum, pick) => sum + pick.forecastValue, 0);
  const expectedGain = forecastValue - spent;
  const riskWeight = picks.reduce((sum, pick) => sum + ({ low: 1, medium: 2, high: 3 }[pick.riskLevel] || 2) * pick.cost, 0);
  const avgRisk = spent ? riskWeight / spent : 0;
  const riskLabel = avgRisk >= 2.45 ? "high" : avgRisk >= 1.55 ? "medium" : "low";

  return { budget, remaining, candidates, picks, spent, forecastValue, expectedGain, riskLabel };
}

function renderQuantStrategyLab(opportunities) {
  const plan = buildStrategyPlan(opportunities);
  const horizonLabel = quantStrategy.horizon === "3y" ? "3 anni" : "5 anni";

  elements.quantStrategyLab.innerHTML = `
    <div class="quant-strategy-hero">
      <div>
        <p class="eyebrow">Strategy Lab</p>
        <h2>Simula un piano acquisti LEGO con budget reale.</h2>
        <p>Il modello sceglie set con score, liquidita e rischio coerenti con il profilo scelto. Per ora usa dati mock/importati: quando collegheremo prezzi reali diventera un vero motore operativo.</p>
      </div>
      <div class="quant-strategy-controls">
        <label>
          Budget
          <input id="strategyBudget" type="number" min="0" step="50" value="${quantStrategy.budget}" />
        </label>
        <label>
          Profilo
          <select id="strategyProfile">
            <option value="defensive" ${quantStrategy.profile === "defensive" ? "selected" : ""}>Difensivo</option>
            <option value="balanced" ${quantStrategy.profile === "balanced" ? "selected" : ""}>Bilanciato</option>
            <option value="aggressive" ${quantStrategy.profile === "aggressive" ? "selected" : ""}>Aggressivo</option>
          </select>
        </label>
        <label>
          Orizzonte
          <select id="strategyHorizon">
            <option value="3y" ${quantStrategy.horizon === "3y" ? "selected" : ""}>3 anni</option>
            <option value="5y" ${quantStrategy.horizon === "5y" ? "selected" : ""}>5 anni</option>
          </select>
        </label>
      </div>
    </div>
    <div class="quant-metrics">
      ${renderQuantMetric("Budget usato", formatQuantEuro(plan.spent), `${formatQuantEuro(plan.remaining)} libero`)}
      ${renderQuantMetric(`Valore ${horizonLabel}`, formatQuantEuro(plan.forecastValue), "scenario base")}
      ${renderQuantMetric("Gain atteso", formatQuantEuro(plan.expectedGain), plan.spent ? formatQuantPct((plan.expectedGain / plan.spent) * 100) : "nessun capitale")}
      ${renderQuantMetric("Rischio piano", plan.riskLabel, "media ponderata")}
    </div>
    <div class="quant-table strategy-table">
      <div class="quant-table-row header">
        <span>Set</span><span>Qta</span><span>Target buy</span><span>Capitale</span><span>${horizonLabel}</span><span>Azione</span>
      </div>
      ${
        plan.picks.length
          ? plan.picks
              .map(
                (pick) => `
                  <button class="quant-table-row" type="button" data-quant-detail="${pick.setNumber}">
                    <span><strong>${pick.name}</strong><small>${pick.theme} · score ${pick.investmentScore}/100 · risk ${pick.riskLevel}</small></span>
                    <span>${pick.qty}</span>
                    <span>${formatQuantEuro(pick.targetBuyPrice)}</span>
                    <span>${formatQuantEuro(pick.cost)}</span>
                    <span>${formatQuantEuro(pick.forecastValue)}</span>
                    <span>${renderQuantPill(pick.category, getQuantActionTone(pick.action))}</span>
                  </button>
                `,
              )
              .join("")
          : `<div class="empty-state"><strong>Nessun set entra nel budget</strong><span>Aumenta il budget o passa a un profilo piu aggressivo per vedere candidati.</span></div>`
      }
    </div>
    <div class="quant-briefing">
      <article>
        <p class="eyebrow">Metodo</p>
        <h2>Prima protezione, poi upside.</h2>
        <p>Il piano usa target buy invece del prezzo pieno, limita la concentrazione su singoli set e taglia candidati troppo rischiosi nei profili difensivo e bilanciato.</p>
      </article>
      <article>
        <p class="eyebrow">Prossimo salto</p>
        <h2>Serve prezzo venduto reale.</h2>
        <p>Con eBay sold, BrickLink sales e storico BrickEconomy potremo trasformare questa simulazione in allocazione verificabile.</p>
      </article>
    </div>
  `;
}

function formatWeightPct(value) {
  return `${Math.round(Number(value || 0) * 100)}%`;
}

function renderQuantModelLab(opportunities) {
  const quant = getQuantApi();
  if (!quant) return;
  const normalizedWeights = quant.normalizeScoreWeights(quantModelWeights);
  const selected = opportunities.find((set) => set.setNumber === normalizeSetNumber(selectedCode)) || opportunities[0];
  const breakdown = selected?.scoreBreakdown || quant.calculateScoreBreakdown(selected || quant.mockQuantSets[0], quantModelWeights);
  const weightLabels = {
    demand: "Domanda",
    rarity: "Rarita",
    theme: "Tema",
    minifigures: "Minifig",
    retirement: "Ritiro",
    liquidity: "Liquidita",
    scarcity: "Scarsita",
  };

  elements.quantModelLab.innerHTML = `
    <div class="quant-model-hero">
      <div>
        <p class="eyebrow">Model Lab</p>
        <h2>Regola il cervello Quant senza nasconderlo.</h2>
        <p>Questi pesi cambiano lo score e le classifiche. Non rendono reali i dati mock: servono a testare strategie e preparare il modello quando arriveranno fonti prezzo reali.</p>
      </div>
      <div class="quant-card-footer">
        <button class="ghost-action" type="button" data-model-action="reset">Reset pesi</button>
      </div>
    </div>
    <div class="quant-model-grid">
      <article class="quant-model-card">
        <p class="eyebrow">Pesi modello</p>
        <h2>Fattori dello score</h2>
        <div class="quant-weight-list">
          ${Object.entries(normalizedWeights)
            .map(
              ([key, value]) => `
                <label class="quant-weight-row">
                  <span>${weightLabels[key] || key}</span>
                  <input type="range" min="0" max="40" step="1" value="${Math.round(value * 100)}" data-model-weight="${key}" />
                  <strong>${formatWeightPct(value)}</strong>
                </label>
              `,
            )
            .join("")}
        </div>
      </article>
      <article class="quant-model-card">
        <p class="eyebrow">${selected?.setNumber || ""}</p>
        <h2>${selected?.name || "Set selezionato"}</h2>
        <div class="quant-score-orb model-orb">
          <span>Score</span>
          <strong>${breakdown.score}</strong>
          <small>qualita dati ${breakdown.dataQualityScore}/100</small>
        </div>
        <p>Base ${breakdown.baseScore}/100, boost sconto ${breakdown.adjustments.discountBoost}, penalita premium ${breakdown.adjustments.overpayPenalty}, penalita volatilita ${breakdown.adjustments.volatilityPenalty}.</p>
      </article>
    </div>
    <div class="quant-table model-breakdown-table">
      <div class="quant-table-row header">
        <span>Fattore</span><span>Valore</span><span>Peso</span><span>Contributo</span><span>Note</span><span>Tipo</span>
      </div>
      ${breakdown.factors
        .sort((a, b) => b.contribution - a.contribution)
        .map(
          (factor) => `
            <div class="quant-table-row">
              <span><strong>${factor.label}</strong><small>${factor.key}</small></span>
              <span>${Math.round(factor.value)}/100</span>
              <span>${formatWeightPct(factor.weight)}</span>
              <span>${factor.contribution}</span>
              <span>${factor.value >= 80 ? "spinge forte" : factor.value >= 60 ? "supporta" : "debole"}</span>
              <span>${renderQuantPill(factor.contribution >= 12 ? "core" : "secondario", factor.contribution >= 12 ? "good" : "")}</span>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function getDealTone(status) {
  if (status === "below-target") return "good";
  if (status === "near-target") return "warn";
  if (status === "overheated") return "danger";
  return "";
}

function renderQuantDealScanner() {
  const quant = getQuantApi();
  if (!quant) return;
  const deals = quant.scanDeals(quant.mockQuantSets.map(applyMarketSnapshotToQuantSet), { weights: quantModelWeights });
  const importedDeals = deals.filter((deal) => deal.priceSource || deal.source !== "mock/stima");
  const activeDeals = importedDeals.length ? importedDeals : deals;
  const belowTarget = activeDeals.filter((deal) => deal.dealStatus === "below-target").length;
  const nearTarget = activeDeals.filter((deal) => deal.dealStatus === "near-target").length;
  const overheated = activeDeals.filter((deal) => deal.dealStatus === "overheated").length;

  elements.quantDealScanner.innerHTML = `
    <div class="quant-metrics">
      ${renderQuantMetric("Sotto target", belowTarget, "buy immediato se dati validi")}
      ${renderQuantMetric("Quasi a target", nearTarget, "da mettere in watchlist")}
      ${renderQuantMetric("Prezzi tirati", overheated, "evitare o vendere")}
      ${renderQuantMetric("Fonte scanner", importedDeals.length ? "CSV/import" : "Mock/Stime", importedDeals.length ? "prezzi importati" : "carica CSV per real data")}
    </div>
    <div class="quant-briefing">
      <article>
        <p class="eyebrow">Deal Scanner</p>
        <h2>Trasforma forecast in azioni di acquisto.</h2>
        <p>Il sistema confronta il prezzo corrente con il target buy stimato dal motore Quant. Se importi un CSV prezzi, questa vista diventa il primo scanner operativo per occasioni reali.</p>
      </article>
      <article>
        <p class="eyebrow">Regola operativa</p>
        <h2>Compra solo con margine.</h2>
        <p>Sotto target buy significa margine di sicurezza positivo. Quasi a target significa che vale la pena creare un alert/watchlist. Prezzo tirato significa che il mercato ha gia scontato molto ottimismo.</p>
      </article>
    </div>
    <div class="quant-table">
      <div class="quant-table-row header">
        <span>Set</span><span>Prezzo</span><span>Target buy</span><span>Margine</span><span>Status</span><span>Azione</span>
      </div>
      ${activeDeals
        .map(
          (deal) => `
            <div class="quant-table-row">
              <span><strong>${deal.name}</strong><small>${deal.theme} · ${deal.setNumber} · ${deal.source}</small></span>
              <span>${formatQuantEuro(deal.currentMarketPrice)}</span>
              <span>${formatQuantEuro(deal.targetBuyPrice)}</span>
              <span>${deal.marginOfSafety ? formatQuantPct(deal.marginOfSafety) : `${formatQuantEuro(Math.abs(deal.distanceToBuy))} sopra`}</span>
              <span>${renderQuantPill(deal.dealLabel, getDealTone(deal.dealStatus))}</span>
              <span><button class="ghost-action compact-action" type="button" data-add-deal-watch="${deal.setNumber}" data-target="${deal.targetBuyPrice}">Watch</button></span>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function getQuantAlertTone(severity) {
  if (severity === "high") return "danger";
  if (severity === "medium") return "warn";
  return "";
}

function renderQuantAlertCenter() {
  const quant = getQuantApi();
  if (!quant) return;
  const sets = quant.mockQuantSets.map(applyMarketSnapshotToQuantSet);
  const alerts = quant.generateAlerts({
    sets,
    positions: getPortfolioQuantPositions(),
    watchlist: state.watchlist,
  });
  const high = alerts.filter((alert) => alert.severity === "high").length;
  const medium = alerts.filter((alert) => alert.severity === "medium").length;
  const buyAlerts = alerts.filter((alert) => alert.type === "buy" || alert.type === "target-hit").length;
  const riskAlerts = alerts.filter((alert) => alert.type.includes("risk") || alert.type === "sell-risk").length;

  elements.quantAlertCenter.innerHTML = `
    <div class="quant-metrics">
      ${renderQuantMetric("Alert urgenti", high, "priorita alta")}
      ${renderQuantMetric("Alert medi", medium, "da monitorare")}
      ${renderQuantMetric("Buy signals", buyAlerts, "target o sotto target")}
      ${renderQuantMetric("Risk signals", riskAlerts, "portfolio o prezzo tirato")}
    </div>
    <div class="quant-briefing">
      <article>
        <p class="eyebrow">Alert Center</p>
        <h2>La lista cose da fare del tuo LEGO desk.</h2>
        <p>Gli alert combinano Deal Scanner, watchlist, prezzo importato e rischio portfolio. Quando carichi CSV reali, questa pagina diventa il centro operativo giornaliero.</p>
      </article>
      <article>
        <p class="eyebrow">Priorita</p>
        <h2>${high ? `${high} alert da guardare ora` : "Nessun alert critico"}</h2>
        <p>${high ? "Controlla prima i target raggiunti e i rischi portfolio alti." : "Il sistema non vede urgenze alte con i dati attuali."}</p>
      </article>
    </div>
    <div class="quant-alert-list">
      ${
        alerts.length
          ? alerts
              .map(
                (alert) => `
                  <article class="quant-alert-card">
                    <div>
                      <p class="eyebrow">${alert.type}${alert.setNumber ? ` · ${alert.setNumber}` : ""}</p>
                      <h2>${alert.title}</h2>
                      <p>${alert.message}</p>
                    </div>
                    <div class="quant-alert-side">
                      ${renderQuantPill(alert.severity, getQuantAlertTone(alert.severity))}
                      <strong>${alert.action}</strong>
                    </div>
                  </article>
                `,
              )
              .join("")
          : `<div class="empty-state"><strong>Nessun alert</strong><span>Aggiungi watchlist o importa prezzi reali per generare segnali operativi.</span></div>`
      }
    </div>
  `;
}

function renderQuantOpportunities(opportunities) {
  elements.quantOpportunities.innerHTML = `
    <div class="quant-table-row header">
      <span>Set</span><span>Score</span><span>Forecast 5Y</span><span>ROI</span><span>Risk</span><span>Azione</span>
    </div>
    ${opportunities
      .map(
        (set) => `
          <button class="quant-table-row" type="button" data-quant-detail="${set.setNumber}">
            <span><strong>${set.name}</strong><small>${set.theme} · ${set.setNumber}</small></span>
            <span>${set.investmentScore}/100</span>
            <span>${formatQuantEuro(set.forecast5Y)}</span>
            <span>${formatQuantPct(set.expectedRoi)}</span>
            <span>${renderQuantPill(set.riskLevel, set.riskLevel)}</span>
            <span>${renderQuantPill(set.category, getQuantActionTone(set.action))}</span>
          </button>
        `,
      )
      .join("")}
  `;
}

function renderQuantDetail(opportunities) {
  const selected = opportunities.find((set) => set.setNumber === selectedCode || set.setNumber === String(selectedCode).split("-")[0]) || opportunities[0];
  if (!selected) {
    elements.quantSetDetail.innerHTML = `<div class="empty-state"><strong>Nessun dato Quant</strong><span>Il motore non ha set da analizzare.</span></div>`;
    return;
  }

  elements.quantSetDetail.innerHTML = `
    <article class="quant-detail-card">
      <div>
        <p class="eyebrow">${selected.theme} · ${selected.subtheme}</p>
        <h2>${selected.setNumber} ${selected.name}</h2>
        <p>${selected.reasons}</p>
        <div class="quant-card-footer">
          ${renderQuantPill(selected.category, getQuantActionTone(selected.action))}
          ${renderQuantPill(`Confidence ${selected.confidenceLevel} ${selected.valuation?.confidence || 0}/100`)}
          ${renderQuantPill(`Risk ${selected.riskLevel}`, selected.riskLevel)}
          ${selected.forecastGate?.blocked ? renderQuantPill("Forecast bloccato", "danger") : renderQuantPill("Forecast attivo", "good")}
        </div>
      </div>
      <div class="quant-score-orb">
        <span>Score</span>
        <strong>${selected.investmentScore}</strong>
        <small>/100</small>
      </div>
    </article>
    <div class="quant-detail-grid">
      ${renderQuantMetric("Forecast 12 mesi", formatQuantEuro(selected.forecast12M), "stima breve")}
      ${renderQuantMetric("Forecast 3 anni", formatQuantEuro(selected.forecast3Y), "scenario base")}
      ${renderQuantMetric("Forecast 5 anni", formatQuantEuro(selected.forecast5Y), "scenario base")}
      ${renderQuantMetric("Range 5Y", `${formatQuantEuro(selected.forecastIntervals?.fiveYears?.low)} - ${formatQuantEuro(selected.forecastIntervals?.fiveYears?.high)}`, `band ${selected.forecastIntervals?.fiveYears?.bandPct || 0}%`)}
      ${renderQuantMetric("Expected ROI", formatQuantPct(selected.expectedRoi), "su 5 anni")}
      ${renderQuantMetric("Fonte valore", selected.valuation?.source || "-", `${selected.valuation?.observations || 0} osservazioni`)}
      ${renderQuantMetric("Ultimo update", selected.valuation?.lastUpdated || "-", `fresh ${selected.valuation?.freshnessScore || 0}/100`)}
      ${renderQuantMetric("Target buy", formatQuantEuro(selected.targetBuyPrice), "prezzo ingresso")}
      ${renderQuantMetric("Target sell", formatQuantEuro(selected.targetSellPrice), "uscita stimata")}
      ${renderQuantMetric("Price premium", formatQuantPct(selected.premiumVsRetail), "vs retail")}
      ${renderQuantMetric("Price per piece", formatQuantUnitEuro(selected.pricePerPiece), "efficienza prezzo")}
    </div>
    <div class="quant-chart-grid">
      <article class="quant-chart-card">
        <div>
          <p class="eyebrow">Forecast curve</p>
          <h2>Scenario prezzo 5 anni</h2>
        </div>
        ${renderMiniLineChart(buildForecastChartPoints(selected), { accent: "#b05cff" })}
      </article>
      <article class="quant-chart-card">
        <div>
          <p class="eyebrow">${getPriceHistory(selected.setNumber).length ? "Imported history" : "Mock history"}</p>
          <h2>Storico prezzo sealed</h2>
        </div>
        ${renderMiniLineChart(buildHistoryChartPoints(selected), { accent: "#52e56b" })}
      </article>
    </div>
  `;
}

function renderQuantThemes(opportunities) {
  const groups = new Map();
  opportunities.forEach((set) => {
    const current = groups.get(set.theme) || { theme: set.theme, count: 0, score: 0, roi: 0, liquidity: 0 };
    current.count += 1;
    current.score += set.investmentScore;
    current.roi += set.expectedRoi;
    current.liquidity += set.liquidityScore;
    groups.set(set.theme, current);
  });

  elements.quantThemeAnalysis.innerHTML = `
    <div class="quant-table-row header">
      <span>Tema</span><span>Set</span><span>Score medio</span><span>ROI 5Y</span><span>Liquidita</span>
    </div>
    ${[...groups.values()]
      .map((group) => ({
        ...group,
        avgScore: group.score / group.count,
        avgRoi: group.roi / group.count,
        avgLiquidity: group.liquidity / group.count,
      }))
      .sort((a, b) => b.avgScore - a.avgScore)
      .map(
        (group) => `
          <div class="quant-table-row">
            <span><strong>${group.theme}</strong><small>${group.count > 1 ? "campione mock" : "singolo set mock"}</small></span>
            <span>${group.count}</span>
            <span>${group.avgScore.toFixed(0)}/100</span>
            <span>${formatQuantPct(group.avgRoi)}</span>
            <span>${group.avgLiquidity.toFixed(0)}/100</span>
          </div>
        `,
      )
      .join("")}
  `;
}

function renderQuantRetirement(opportunities) {
  const radar = opportunities.filter((set) => set.availabilityStatus === "retiringSoon");
  elements.quantRetirementRadar.innerHTML = radar.length
    ? radar
        .map(
          (set) => `
            <article class="quant-card compact">
              <p class="eyebrow">${set.theme} · retirement ${set.retirementYear || "stimato"}</p>
              <h2>${set.setNumber} ${set.name}</h2>
              <div class="quant-card-stats">
                <span>Score <b>${set.investmentScore}/100</b></span>
                <span>Buy <b>${formatQuantEuro(set.targetBuyPrice)}</b></span>
                <span>5Y <b>${formatQuantEuro(set.forecast5Y)}</b></span>
              </div>
              <p>${set.reasons}</p>
            </article>
          `,
        )
        .join("")
    : `<div class="empty-state"><strong>Nessun retirement radar</strong><span>I dati mock non contengono set in ritiro imminente.</span></div>`;
}

function renderQuantBacktest() {
  const quant = getQuantApi();
  const backtest = quant?.runBacktest();
  if (!backtest) return;

  elements.quantBacktest.innerHTML = `
    <div class="quant-backtest-head">
      ${renderQuantMetric("Accuracy score", `${backtest.accuracyScore}%`, "mock storico")}
      ${renderQuantMetric("Missed opportunities", backtest.topMissedOpportunities.length, "buy non intercettati")}
      ${renderQuantMetric("False positives", backtest.falsePositives.length, "buy deboli")}
    </div>
    <div class="quant-backtest-grid">
      <article>
        <h3>Top missed opportunities</h3>
        ${backtest.topMissedOpportunities.length ? backtest.topMissedOpportunities.map((row) => `<p>${row.setNumber} ${row.name} · ${formatQuantPct(row.actualRoi)}</p>`).join("") : "<p>Nessuna nel campione mock.</p>"}
      </article>
      <article>
        <h3>False positives</h3>
        ${backtest.falsePositives.length ? backtest.falsePositives.map((row) => `<p>${row.setNumber} ${row.name} · ${formatQuantPct(row.actualRoi)}</p>`).join("") : "<p>Nessuno nel campione mock.</p>"}
      </article>
      <article>
        <h3>Best performing themes</h3>
        ${backtest.bestPerformingThemes.map((row) => `<p>${row.theme} · ${formatQuantPct(row.avgRoi)}</p>`).join("")}
      </article>
      <article>
        <h3>Model notes</h3>
        ${backtest.modelNotes.map((note) => `<p>${note}</p>`).join("")}
      </article>
    </div>
  `;
}

function renderQuant() {
  const quant = getQuantApi();
  if (!quant) return;
  const opportunities = getQuantData();
  renderQuantCommandCenter(opportunities);
  renderQuantProMode(opportunities);
  renderQuantOverview(opportunities);
  renderQuantPortfolio();
  renderQuantDataSources();
  renderQuantPriceHistory();
  renderQuantQualityGate();
  renderQuantDataVault();
  renderQuantStrategyLab(opportunities);
  renderQuantModelLab(opportunities);
  renderQuantDealScanner();
  renderQuantAlertCenter();
  renderQuantOpportunities(opportunities);
  renderQuantDetail(opportunities);
  renderQuantThemes(opportunities);
  renderQuantRetirement(opportunities);
  renderQuantBacktest();
}

function renderWatchlist() {
  elements.watchlistGrid.innerHTML = state.watchlist.length
    ? state.watchlist
        .map((item, index) => {
          const set = getSet(item.code);
          if (!set) return "";
          const distance = getMarketPrice(set) - item.target;
          const dealScore = Math.max(6, Math.min(100, Math.round((item.target / getMarketPrice(set)) * 100)));
          const status = distance <= 0 ? "Compra ora" : `${formatEuro(distance)} sopra target`;
          return `
            <article class="watch-card">
              <p class="eyebrow">${set.theme} · ${set.code}</p>
              <h2>${set.name}</h2>
              <p>${item.note || "Nessuna nota."}</p>
              <div class="watch-meta">
                <div>
                  <span>Prezzo</span>
                  <strong>${formatEuro(getMarketPrice(set))}</strong>
                </div>
                <div>
                  <span>Target</span>
                  <strong>${formatEuro(item.target)}</strong>
                </div>
              </div>
              <div class="deal-meter" aria-label="Distanza dal target">
                <i style="--deal-width:${dealScore}%"></i>
              </div>
              <div class="card-footer">
                <p><strong>${status}</strong></p>
                <button class="icon-action" type="button" data-remove-watch="${index}" title="Rimuovi target">×</button>
              </div>
            </article>
          `;
        })
        .join("")
    : `<div class="empty-state"><strong>Watchlist vuota</strong><span>Aggiungi un target per iniziare il radar.</span></div>`;
}

function switchView(view) {
  activeView = view;
  $$(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === view);
  });
  $$(".view-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === view);
  });
  elements.viewEyebrow.textContent = viewCopy[view].eyebrow;
  elements.viewTitle.textContent = viewCopy[view].title;
  elements.searchInput.disabled = !["market", "portfolio"].includes(view);
  elements.searchInput.placeholder =
    view === "portfolio"
      ? "Cerca nel portfolio"
      : view === "market"
        ? "Cerca set, tema o codice"
        : view === "quant"
          ? "Quant AI usa scanner e tab dedicate"
          : "Ricerca disponibile nel mercato";
}

function render() {
  renderCatalogStatus();
  renderBrickLinkStatus();
  renderOptions();
  renderRows();
  renderDetail();
  renderMarketMetrics();
  renderPortfolio();
  renderSignals();
  renderQuant();
  renderWatchlist();
}

function addPortfolioPosition(code, qty, paid, condition) {
  state.portfolio.push({ code, qty, paid, condition });
  saveState();
  render();
}

function upsertWatchTarget(code, target, note) {
  const existing = state.watchlist.find((item) => item.code === code);
  if (existing) {
    existing.target = target;
    existing.note = note || existing.note;
  } else {
    state.watchlist.push({ code, target, note });
  }
  saveState();
  render();
}

async function importCatalogText(text) {
  const importedSets = parseRebrickableSets(text);

  if (!importedSets.length) {
    throw new Error("Nessun set trovato nel CSV.");
  }

  await saveCatalog(importedSets);
  state.sets = importedSets;
  catalogImported = true;
  selectedCode = state.sets[0].code;
  activeFilter = "all";
  elements.searchInput.value = "";
  saveState();
  render();
  return importedSets.length;
}

async function restoreDemoCatalog() {
  await clearCatalogDb();
  state.sets = structuredClone(defaultState.sets);
  catalogImported = false;
  selectedCode = state.sets[0].code;
  elements.searchInput.value = "";
  render();
}

function loadBrickLinkSyncMeta() {
  try {
    return JSON.parse(localStorage.getItem(BRICKLINK_SYNC_META) || "{}");
  } catch {
    return {};
  }
}

function saveBrickLinkSyncMeta(meta) {
  localStorage.setItem(BRICKLINK_SYNC_META, JSON.stringify({ ...loadBrickLinkSyncMeta(), ...meta }));
}

function shouldAutoSyncMarketPrices() {
  if (!serverFeatures.hasBrickLinkKey) return false;
  if (!state.portfolio.length && !state.watchlist.length) return false;
  const meta = loadBrickLinkSyncMeta();
  if (!meta.lastSync) return true;
  return Date.now() - new Date(meta.lastSync).getTime() > AUTO_PRICE_SYNC_MAX_AGE_MS;
}

async function syncPortfolioMarketPrices() {
  if (!serverFeatures.hasBrickLinkKey) {
    elements.catalogStatus.textContent = "BrickLink non configurato: usa Data Sources CSV o aggiungi credenziali server.";
    return;
  }

  const codes = [...new Set([...state.portfolio.map((item) => item.code), ...state.watchlist.map((item) => item.code)])];
  const sets = codes.map(getSet).filter(Boolean).slice(0, 40);
  if (!sets.length) {
    elements.catalogStatus.textContent = "Nessun set in portfolio/watchlist da aggiornare.";
    return;
  }

  elements.syncMarketPrices.disabled = true;
  let updated = 0;
  for (const set of sets) {
    elements.catalogStatus.textContent = `Aggiornamento prezzi mercato: ${updated}/${sets.length}...`;
    try {
      const price = await fetchBrickLinkMarketPrice(set);
      if (price?.price > 0) {
        applyRealPrice(set, price.price, price.source);
        const snapshot = {
          setNumber: normalizeSetNumber(set.code),
          retailPrice: getRetailPrice(set),
          currentMarketPrice: Math.round(price.price),
          sealedPrice: Math.round(price.price),
          usedPrice: Math.round(price.price * 0.82),
          soldCount: 0,
          listingCount: 0,
          liquidityScore: set.liquidity || 60,
          source: price.source,
          capturedAt: new Date().toISOString().slice(0, 10),
        };
        marketSnapshots[snapshot.setNumber] = snapshot;
        addPriceHistorySnapshot(snapshot);
        updated += 1;
      }
    } catch {
      // Keep syncing other sets if one marketplace request fails.
    }
    await sleep(350);
  }
  persistMarketData();
  saveBrickLinkSyncMeta({ lastSync: new Date().toISOString(), updated });
  elements.catalogStatus.textContent = `Prezzi aggiornati: ${updated}/${sets.length}.`;
  elements.syncMarketPrices.disabled = false;
  render();
}

$$(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".segment").forEach((segment) => segment.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    render();
  });
});

$$(".nav-item").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

$$(".quant-tab").forEach((button) => {
  button.addEventListener("click", () => {
    setQuantTab(button.dataset.quantTab);
  });
});

elements.quantOpportunities.addEventListener("click", (event) => {
  const row = event.target.closest("[data-quant-detail]");
  if (!row) return;
  selectedCode = row.dataset.quantDetail;
  setQuantTab("detail");
  renderQuant();
});

elements.quantPortfolioAi.addEventListener("click", (event) => {
  const row = event.target.closest("[data-quant-detail]");
  if (!row) return;
  selectedCode = row.dataset.quantDetail;
  setQuantTab("detail");
  renderQuant();
});

elements.quantCommandCenter.addEventListener("click", (event) => {
  const button = event.target.closest("[data-command-jump]");
  if (!button) return;
  setQuantTab(button.dataset.commandJump);
});

elements.quantDataSources.addEventListener("click", (event) => {
  if (event.target.closest("#importMarketSnapshot")) {
    elements.marketSnapshotFile.click();
    return;
  }
  if (event.target.closest("#importSoldComps")) {
    elements.soldCompsFile.click();
    return;
  }
  if (event.target.closest("#downloadSoldCompsTemplate")) {
    downloadTextFile(
      "lego-sold-comps-template.csv",
      [
        "setNumber,soldPrice,shipping,condition,source,soldAt",
        "75313,799.99,18.00,sealed,eBay sold,2026-06-10",
        "75313,710.00,15.00,used,BrickLink sold,2026-06-09",
        "10294,725.00,24.00,sealed,BrickEconomy export,2026-06-10",
      ].join("\n"),
      "text/csv",
    );
    return;
  }
  if (event.target.closest("#downloadSnapshotTemplate")) {
    downloadTextFile(
      "lego-market-snapshot-template.csv",
      [
        "setNumber,retailPrice,currentMarketPrice,sealedPrice,usedPrice,soldCount,listingCount,source,capturedAt",
        "75313,849.99,812.00,812.00,690.00,12,18,BrickLink Price Guide,2026-06-10",
        "10294,679.99,725.00,725.00,590.00,8,14,eBay sold summary,2026-06-10",
      ].join("\n"),
      "text/csv",
    );
    return;
  }
  if (event.target.closest("#clearMarketSnapshots")) {
    marketSnapshots = {};
    persistMarketData();
    render();
  }
});

elements.quantPriceHistory.addEventListener("click", (event) => {
  if (event.target.closest("#recordDailySnapshots")) {
    const added = recordDailyMarketSnapshots();
    render();
    setQuantTab("history");
    const status = $("#priceHistoryStatus");
    if (status) status.textContent = added ? `Snapshot creati: ${added}.` : "Snapshot di oggi gia presenti.";
    return;
  }

  if (event.target.closest("#exportPriceHistoryCsv")) {
    exportPriceHistoryCsv();
    return;
  }

  const row = event.target.closest("[data-quant-detail]");
  if (!row) return;
  selectedCode = row.dataset.quantDetail;
  setQuantTab("detail");
  renderQuant();
});

elements.quantDataVault.addEventListener("click", (event) => {
  const button = event.target.closest("[data-vault-action]");
  if (!button) return;

  if (button.dataset.vaultAction === "export-backup") {
    const payload = createBackupPayload();
    downloadTextFile(`lego-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(payload, null, 2));
    return;
  }

  if (button.dataset.vaultAction === "import-backup") {
    elements.backupImportFile.click();
    return;
  }

  if (button.dataset.vaultAction === "export-server") {
    if (!currentUser) {
      const status = $("#dataVaultStatus");
      if (status) status.textContent = "Fai login per esportare i dati server.";
      return;
    }
    fetch("/api/user/export")
      .then((response) => {
        if (!response.ok) throw new Error("Export server non disponibile");
        return response.json();
      })
      .then((payload) => {
        downloadTextFile(`lego-tracker-server-export-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(payload, null, 2));
      })
      .catch((error) => {
        const status = $("#dataVaultStatus");
        if (status) status.textContent = error.message;
      });
    return;
  }

  if (button.dataset.vaultAction === "export-portfolio") {
    exportPortfolioCsv();
    return;
  }

  if (button.dataset.vaultAction === "export-prices") {
    exportMarketSnapshotsCsv();
  }
});

elements.quantStrategyLab.addEventListener("change", (event) => {
  if (event.target.id === "strategyBudget") {
    quantStrategy.budget = Math.max(0, Number(event.target.value || 0));
    renderQuant();
    setQuantTab("strategy");
    return;
  }

  if (event.target.id === "strategyProfile") {
    quantStrategy.profile = event.target.value;
    renderQuant();
    setQuantTab("strategy");
    return;
  }

  if (event.target.id === "strategyHorizon") {
    quantStrategy.horizon = event.target.value;
    renderQuant();
    setQuantTab("strategy");
    return;
  }

  const row = event.target.closest("[data-quant-detail]");
  if (!row) return;
  selectedCode = row.dataset.quantDetail;
  setQuantTab("detail");
  renderQuant();
});

elements.quantStrategyLab.addEventListener("click", (event) => {
  const row = event.target.closest("[data-quant-detail]");
  if (!row) return;
  selectedCode = row.dataset.quantDetail;
  setQuantTab("detail");
  renderQuant();
});

elements.quantModelLab.addEventListener("input", (event) => {
  const input = event.target.closest("[data-model-weight]");
  if (!input) return;
  quantModelWeights[input.dataset.modelWeight] = Number(input.value || 0) / 100;
  persistMarketData();
  renderQuant();
  setQuantTab("model");
});

elements.quantModelLab.addEventListener("click", (event) => {
  if (!event.target.closest("[data-model-action='reset']")) return;
  quantModelWeights = getDefaultQuantWeights();
  persistMarketData();
  renderQuant();
  setQuantTab("model");
});

elements.quantDealScanner.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add-deal-watch]");
  if (!button) return;
  const code = button.dataset.addDealWatch;
  const target = Number(button.dataset.target || 0);
  upsertWatchTarget(code, Math.round(target), "Target creato da LEGO Quant AI Deal Scanner");
  button.textContent = "Aggiunto";
});

elements.marketSnapshotFile.addEventListener("change", async () => {
  const file = elements.marketSnapshotFile.files?.[0];
  if (!file) return;
  const text = await file.text();
  const snapshots = parseMarketSnapshotCsv(text);
  snapshots.forEach((snapshot) => {
    marketSnapshots[snapshot.setNumber] = snapshot;
    addPriceHistorySnapshot(snapshot);
  });
  persistMarketData();
  elements.marketSnapshotFile.value = "";
  render();
});

elements.soldCompsFile.addEventListener("change", async () => {
  const file = elements.soldCompsFile.files?.[0];
  if (!file) return;
  const text = await file.text();
  const snapshots = parseSoldCompsCsv(text);
  snapshots.forEach((snapshot) => {
    marketSnapshots[snapshot.setNumber] = snapshot;
    addPriceHistorySnapshot(snapshot);
  });
  persistMarketData();
  elements.soldCompsFile.value = "";
  render();
});

elements.backupImportFile.addEventListener("change", async () => {
  const file = elements.backupImportFile.files?.[0];
  if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    restoreBackupPayload(payload);
    elements.backupImportFile.value = "";
    render();
    setQuantTab("vault");
    const status = $("#dataVaultStatus");
    if (status) status.textContent = "Backup importato correttamente.";
  } catch (error) {
    elements.backupImportFile.value = "";
    const status = $("#dataVaultStatus");
    if (status) status.textContent = error.message || "Backup non valido.";
  }
});

$$("[data-jump]").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.jump));
});

elements.sortDeals.addEventListener("click", () => {
  state.watchlist = [...state.watchlist].sort((a, b) => {
    const setA = getSet(a.code);
    const setB = getSet(b.code);
    if (!setA || !setB) return 0;
    return getMarketPrice(setA) - a.target - (getMarketPrice(setB) - b.target);
  });
  saveState();
  renderWatchlist();
});

elements.resetData.addEventListener("click", async () => {
  state = structuredClone(defaultState);
  catalogImported = false;
  syncMeta = {};
  selectedCode = state.sets[0].code;
  await clearCatalogDb();
  localStorage.removeItem(SYNC_META_STORAGE);
  saveState();
  render();
});

elements.importPortfolioCsv.addEventListener("click", () => {
  elements.portfolioCsvFile.click();
});

elements.portfolioCsvFile.addEventListener("change", async () => {
  const file = elements.portfolioCsvFile.files?.[0];
  if (!file) return;
  const text = await file.text();
  const imported = parsePortfolioCsv(text);
  if (imported.length) {
    state.portfolio = [...state.portfolio, ...imported];
    saveState();
    render();
  }
  elements.portfolioCsvFile.value = "";
});

elements.syncMarketPrices.addEventListener("click", syncPortfolioMarketPrices);

elements.syncApi.addEventListener("click", async () => {
  const apiKey = elements.apiKeyInput.value.trim() || getStoredApiKey();

  if (!apiKey) {
    elements.catalogStatus.textContent = "Inserisci prima la chiave API Rebrickable.";
    return;
  }

  if (elements.apiKeyInput.value.trim()) {
    localStorage.setItem(API_KEY_STORAGE, apiKey);
    await saveRebrickableServerKey(apiKey);
    setApiKeySavedUi(true);
  }

  try {
    await syncRebrickableCatalog(apiKey);
  } catch (error) {
    elements.catalogStatus.textContent = error.message;
  } finally {
    elements.syncApi.disabled = false;
  }
});

elements.saveBricklinkConfig.addEventListener("click", async () => {
  elements.saveBricklinkConfig.disabled = true;
  elements.bricklinkStatus.textContent = "Salvataggio BrickLink...";
  try {
    await saveBrickLinkServerConfig();
    elements.bricklinkStatus.textContent = "BrickLink salvato. Aggiorno i prezzi del portfolio...";
    renderBrickLinkStatus();
    await syncPortfolioMarketPrices();
  } catch (error) {
    elements.bricklinkStatus.textContent = error.message;
  } finally {
    elements.saveBricklinkConfig.disabled = false;
  }
});

elements.testBricklinkConfig.addEventListener("click", async () => {
  elements.testBricklinkConfig.disabled = true;
  elements.bricklinkStatus.textContent = "Test BrickLink in corso...";
  try {
    const payload = await testBrickLinkServerConfig();
    const price = payload?.data?.avg_price || payload?.data?.max_price || payload?.data?.min_price;
    elements.bricklinkStatus.textContent = price
      ? `BrickLink OK. Test AT-AT prezzo medio: ${formatQuantEuro(Number(price))}.`
      : "BrickLink OK. Risposta ricevuta dalla Price Guide.";
    serverFeatures.hasBrickLinkKey = true;
  } catch (error) {
    elements.bricklinkStatus.textContent = error.message;
  } finally {
    elements.testBricklinkConfig.disabled = false;
  }
});

elements.runApiDoctor.addEventListener("click", async () => {
  elements.runApiDoctor.disabled = true;
  elements.bricklinkStatus.textContent = "Diagnostica API in corso...";
  try {
    const payload = await runApiDiagnostics();
    renderApiDoctor(payload);
    elements.bricklinkStatus.textContent = payload.hasBrickLinkKey
      ? "Diagnostica completata: BrickLink configurato."
      : "Diagnostica completata: mancano una o piu credenziali BrickLink.";
  } catch (error) {
    elements.bricklinkStatus.textContent = error.message;
  } finally {
    elements.runApiDoctor.disabled = false;
  }
});

elements.catalogFile.addEventListener("change", async () => {
  const file = elements.catalogFile.files[0];
  if (!file) return;

  elements.catalogStatus.textContent = "Importazione in corso...";

  try {
    const text = await file.text();
    await importCatalogText(text);
  } catch (error) {
    elements.catalogStatus.textContent = error.message;
  } finally {
    elements.catalogFile.value = "";
  }
});

elements.clearCatalog.addEventListener("click", async () => {
  await restoreDemoCatalog();
});

elements.portfolioForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const code = elements.portfolioSet.value;
  const set = getSet(code);
  if (!set) return;
  const qty = Math.max(1, Number(elements.portfolioQty.value) || 1);
  const paid = elements.portfolioPaid.value.trim() === "" ? getRetailPrice(set) : Math.max(0, Number(elements.portfolioPaid.value) || 0);
  addPortfolioPosition(code, qty, paid, elements.portfolioCondition.value);
  elements.portfolioPaid.value = "";
});

elements.watchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const code = elements.watchSet.value;
  const set = getSet(code);
  if (!set) return;
  const target = Math.max(0, Number(elements.watchTarget.value) || Math.round(getMarketPrice(set) * 0.9));
  upsertWatchTarget(code, target, elements.watchNote.value.trim());
  elements.watchNote.value = "";
});

elements.quickPortfolio.addEventListener("click", () => {
  const set = getSet(selectedCode);
  if (!set) return;
  switchView("portfolio");
  renderOptions();
  selectSetForForm("portfolio", selectedCode);
  elements.portfolioPaid.value = "";
  elements.portfolioPaid.focus();
});

elements.quickWatch.addEventListener("click", () => {
  const set = getSet(selectedCode);
  if (!set) return;
  upsertWatchTarget(selectedCode, Math.round(getMarketPrice(set) * 0.9), "Aggiunto dal dettaglio mercato");
  switchView("watchlist");
});

document.addEventListener("click", (event) => {
  const portfolioIndex = event.target.dataset.removePortfolio;
  const watchIndex = event.target.dataset.removeWatch;
  const facetButton = event.target.closest("[data-portfolio-facet]");
  const clearPortfolioFilter = event.target.closest("[data-clear-portfolio-filter]");

  if (facetButton) {
    const nextFacet = {
      type: facetButton.dataset.portfolioFacet,
      value: decodeURIComponent(facetButton.dataset.portfolioValue || ""),
    };
    const isSame =
      activePortfolioFacet?.type === nextFacet.type && String(activePortfolioFacet.value) === String(nextFacet.value);
    activePortfolioFacet = isSame ? null : nextFacet;
    renderPortfolio();
    return;
  }

  if (clearPortfolioFilter) {
    activePortfolioFacet = null;
    renderPortfolio();
    return;
  }

  if (portfolioIndex !== undefined) {
    state.portfolio.splice(Number(portfolioIndex), 1);
    saveState();
    render();
  }

  if (watchIndex !== undefined) {
    state.watchlist.splice(Number(watchIndex), 1);
    saveState();
    render();
  }
});

elements.portfolioSet.addEventListener("change", () => {
  elements.portfolioPaid.value = "";
  renderPortfolioPriceHints();
  syncSetSearchInputs();
});

elements.portfolioRows.addEventListener("change", (event) => {
  const input = event.target.closest("[data-portfolio-edit]");
  if (!input) return;

  const index = Number(input.dataset.portfolioEdit);
  const item = state.portfolio[index];
  if (!item) return;

  if (input.dataset.field === "qty") {
    item.qty = Math.max(1, Math.round(Number(input.value) || 1));
  }

  if (input.dataset.field === "paid") {
    item.paid = Math.max(0, Number(input.value) || 0);
  }

  saveState();
  render();
});

elements.watchSet.addEventListener("change", () => {
  elements.watchTarget.value = Math.round((getSet(elements.watchSet.value) ? getMarketPrice(getSet(elements.watchSet.value)) : 0) * 0.9);
  syncSetSearchInputs();
});

elements.searchInput.addEventListener("input", render);

elements.portfolioSetSearch.addEventListener("focus", () => renderSetSuggestions("portfolio"));
elements.portfolioSetSearch.addEventListener("input", () => renderSetSuggestions("portfolio"));
elements.watchSetSearch.addEventListener("focus", () => renderSetSuggestions("watch"));
elements.watchSetSearch.addEventListener("input", () => renderSetSuggestions("watch"));

document.addEventListener("click", (event) => {
  const pickerButton = event.target.closest("[data-set-picker]");
  if (pickerButton) {
    selectSetForForm(pickerButton.dataset.setPicker, pickerButton.dataset.code);
    return;
  }

  if (!event.target.closest(".set-search-field")) {
    elements.portfolioSuggestions.classList.remove("open");
    elements.watchSuggestions.classList.remove("open");
  }
});

$$("[data-auth-open]").forEach((button) => {
  button.addEventListener("click", () => openAuth(button.dataset.authOpen));
});

elements.authClose.addEventListener("click", closeAuth);

elements.authModal.addEventListener("click", (event) => {
  if (event.target === elements.authModal) closeAuth();
});

elements.authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = elements.authEmail.value.trim();
  const password = elements.authPassword.value.trim();

  if (!email || !password) return;

  elements.authSubmit.disabled = true;
  elements.authError.textContent = "";

  try {
    await submitAuthRequest(email, password);
    elements.authForm.reset();
  } catch (error) {
    elements.authError.textContent = error.message;
  } finally {
    elements.authSubmit.disabled = false;
  }
});

elements.logoutButton.addEventListener("click", async () => {
  await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
  currentUser = null;
  setAuthVisible(false);
});

window.BrickPulse = {
  importCatalogText,
  restoreDemoCatalog,
  catalogCount: () => state.sets.length,
  findCatalogCodes: (codes) =>
    codes.map((code) => {
      const set = getSet(String(code));
      return set
        ? { code: String(code), found: true, name: set.name, storedCode: set.code, theme: set.theme, year: set.year || null }
        : { code: String(code), found: false };
    }),
};

async function init() {
  const serverConfig = await getServerConfig();
  serverFeatures = {
    hasRebrickableKey: Boolean(serverConfig.hasRebrickableKey),
    hasBrickLinkKey: Boolean(serverConfig.hasBrickLinkKey),
  };
  const storedApiKey = getStoredApiKey();
  const autoApiKey = serverConfig.hasRebrickableKey ? "server" : storedApiKey;
  setApiKeySavedUi(Boolean(autoApiKey));

  try {
    const catalog = await loadCatalog();
    if (catalog.length) {
      state.sets = catalog;
      catalogImported = true;
      selectedCode = state.sets[0].code;
    }
  } catch {
    catalogImported = false;
  }

  currentUser = await fetchSession();
  if (currentUser) {
    applyUserState(await fetchUserState());
    await loadUserMarketData();
    await saveUserMarketData();
  }

  recordDailyMarketSnapshots();

  render();
  elements.portfolioPaid.value = "";
  elements.watchTarget.value = Math.round((getSet(elements.watchSet.value) ? getMarketPrice(getSet(elements.watchSet.value)) : 0) * 0.9);
  switchView(activeView);
  setAuthVisible(Boolean(currentUser));

  if (shouldAutoSyncMarketPrices()) {
    syncPortfolioMarketPrices().catch(() => {
      elements.catalogStatus.textContent = "Auto-sync prezzi BrickLink non riuscito: controlla credenziali o rate limit.";
    });
  }

  if (AUTO_SYNC_ON_START && autoApiKey && shouldAutoSyncCatalog()) {
    elements.catalogStatus.textContent = catalogImported
      ? "Catalogo locale caricato. Aggiornamento API automatico in corso..."
      : "Sincronizzazione API automatica in corso...";

    try {
      await syncRebrickableCatalog(autoApiKey);
    } catch (error) {
      elements.catalogStatus.textContent = `Aggiornamento automatico non riuscito: ${error.message}`;
    } finally {
      elements.syncApi.disabled = false;
    }
  }
}

init();
