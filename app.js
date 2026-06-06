const STORAGE_KEY = "brickpulse-state-v1";
const API_KEY_STORAGE = "brickpulse-rebrickable-key";
const SYNC_META_STORAGE = "brickpulse-sync-meta";
const AUTO_SYNC_ON_START = true;
const AUTO_SYNC_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const DB_NAME = "brickpulse-catalog";
const DB_VERSION = 1;
const CATALOG_STORE = "sets";
const MAX_RENDERED_ROWS = 120;
const MAX_SELECT_OPTIONS = 800;
const CURRENT_YEAR = new Date().getFullYear();
const BRICKLINK_PRICE_CACHE = "brickpulse-bricklink-price-cache";

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
let serverFeatures = { hasRebrickableKey: false, hasBrickLinkKey: false };
let currentUser = null;
const realPriceRequests = new Set();

const formatEuro = (value) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

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
  portfolioCost: $("#portfolioCost"),
  portfolioGain: $("#portfolioGain"),
  portfolioGainPct: $("#portfolioGainPct"),
  portfolioCount: $("#portfolioCount"),
  portfolioDetails: $("#portfolioDetails"),
  portfolioGrowthChart: $("#portfolioGrowthChart"),
  themeSummary: $("#themeSummary"),
  yearSummary: $("#yearSummary"),
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
  resultNote: $("#resultNote"),
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
  return set.retailPrice || set.retail || Math.round((set.price || 0) * 0.82);
}

function getMarketPrice(set) {
  return set.realMarketPrice || set.marketPrice || set.price || getRetailPrice(set);
}

function getPriceSource(set) {
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

async function hydrateRealPrice(set) {
  if (!serverFeatures.hasBrickLinkKey || !set || realPriceRequests.has(set.code) || set.realMarketPrice) return;

  const bricklinkNo = getBrickLinkSetNumber(set);
  if (!bricklinkNo) return;

  const cache = loadBrickLinkPriceCache();
  const cached = cache[bricklinkNo];
  if (cached && Date.now() - cached.time < 12 * 60 * 60 * 1000) {
    applyRealPrice(set, cached.price, cached.source);
    render();
    return;
  }

  realPriceRequests.add(set.code);

  try {
    const response = await fetch(`/api/bricklink/price?set_num=${encodeURIComponent(bricklinkNo)}&guide_type=sold&new_or_used=N&country_code=IT`);
    if (!response.ok) return;
    const payload = await response.json();
    const price = Number(payload?.data?.avg_price || payload?.data?.unit_price || payload?.data?.max_price || 0);

    if (price > 0) {
      cache[bricklinkNo] = { price, source: "BrickLink venduti 6 mesi", time: Date.now() };
      saveBrickLinkPriceCache(cache);
      applyRealPrice(set, price, "BrickLink venduti 6 mesi");
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
  saveSyncMeta({ lastSync: new Date().toISOString(), count: importedSets.length, source: "api" });
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
        activeFilter === "retiring"
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
    elements.portfolioSet.value = set.code;
    elements.portfolioSetSearch.value = formatSetSearchLabel(set);
    elements.portfolioPaid.value = "";
    elements.portfolioSuggestions.classList.remove("open");
    renderPortfolioPriceHints();
    return;
  }

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

function getPortfolioTotals() {
  return state.portfolio.reduce(
    (totals, item) => {
      const set = getSet(item.code);
      if (!set) return totals;
      const value = getMarketPrice(set) * item.qty;
      const cost = item.paid * item.qty;
      totals.value += value;
      totals.cost += cost;
      totals.count += item.qty;
      return totals;
    },
    { value: 0, cost: 0, count: 0 },
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
      if (!search) return true;
      const haystack = `${item.set.name} ${item.set.code} ${item.set.theme} ${item.set.year || ""} ${item.condition}`.toLowerCase();
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
  const currentValue = positions.reduce((sum, item) => sum + getMarketPrice(item.set) * item.qty, 0);
  const minifigs = Math.round(pieces / 115);
  return { positions, ownedSets, uniqueSets, retiredSets, pieces, retailValue, paidValue, currentValue, minifigs };
}

function summarizePortfolioBy(keyGetter) {
  const groups = new Map();
  getPortfolioAnalysis().positions.forEach((item) => {
    const key = keyGetter(item.set) || "N/D";
    const current = groups.get(key) || { label: key, qty: 0, value: 0 };
    current.qty += item.qty;
    current.value += getMarketPrice(item.set) * item.qty;
    groups.set(key, current);
  });
  return [...groups.values()].sort((a, b) => b.value - a.value).slice(0, 8);
}

function renderSummaryRows(rows, emptyText) {
  return rows.length
    ? rows
        .map(
          (row) => `
            <div class="summary-row">
              <strong>${row.label}</strong>
              <span>${row.qty}</span>
              <span>${formatEuro(row.value)}</span>
            </div>
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
  const gainPct = totals.cost ? (gain / totals.cost) * 100 : 0;
  const retiredPct = analysis.ownedSets ? (analysis.retiredSets / analysis.ownedSets) * 100 : 0;

  elements.portfolioValue.textContent = formatEuro(totals.value);
  elements.portfolioHeadline.textContent = formatEuro(totals.value);
  elements.portfolioCost.textContent = formatEuro(totals.cost);
  elements.portfolioGain.textContent = `${gain >= 0 ? "+" : ""}${formatEuro(gain)}`;
  elements.portfolioGainPct.textContent = `${gainPct >= 0 ? "+" : ""}${gainPct.toFixed(1)}%`;
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
    <div><span>Current value</span><strong>${formatEuro(analysis.currentValue)} <small class="${gain >= 0 ? "positive" : "warning"}">${gain >= 0 ? "+" : ""}${gainPct.toFixed(1)}%</small></strong></div>
  `;
  elements.themeSummary.innerHTML = renderSummaryRows(summarizePortfolioBy((set) => set.theme), "Aggiungi set per vedere i temi.");
  elements.yearSummary.innerHTML = renderSummaryRows(summarizePortfolioBy((set) => set.year || "N/D"), "Aggiungi set per vedere gli anni.");
  const growthPoints = Array.from({ length: 7 }, (_, index) => {
    const base = analysis.currentValue || 100;
    const ratio = 0.48 + index * 0.085 + seededNumber(`growth-${index}-${analysis.ownedSets}`, -6, 9) / 100;
    return Math.max(18, Math.min(94, Math.round((base ? ratio : 0.45) * 100)));
  });
  elements.portfolioGrowthChart.innerHTML = growthPoints.map((height) => `<i style="height:${height}%"></i>`).join("");

  elements.allocationChart.innerHTML = state.portfolio.length
    ? state.portfolio
        .map((item, index) => {
          const set = getSet(item.code);
          if (!set) return "";
          const height = totals.value ? Math.max(24, Math.round(((getMarketPrice(set) * item.qty) / totals.value) * 160)) : 24;
          const color = [set.colors[0], set.colors[1], "#12805c", "#e1443f"][index % 4];
          return `<i style="height:${height}%; --bar-color:${color}"></i>`;
        })
        .join("")
    : `<i style="height:28%; --bar-color:#8a97a8"></i>`;

  elements.portfolioRows.innerHTML = `
    <div class="table-row header">
      <span>Set</span><span>Qta</span><span>Costo</span><span>Valore</span><span>Gain</span><span></span>
    </div>
    ${
      filteredPositions.length
        ? filteredPositions
            .map((item) => {
              const set = item.set;
              const cost = item.paid * item.qty;
              const value = getMarketPrice(set) * item.qty;
              const itemGain = value - cost;
              const itemGainPct = cost ? (itemGain / cost) * 100 : 0;
              const pillClass = item.condition === "Sigillato" ? "pill" : "pill warn";
              return `
                <div class="table-row portfolio-table-row">
                  <div class="portfolio-set-cell">
                    <div class="portfolio-thumb" data-portfolio-thumb="${set.code}"></div>
                    <div>
                      <strong>${set.name}</strong>
                      <small>${set.theme} · ${set.code}</small>
                    </div>
                  </div>
                  <div><strong>${item.qty}</strong><small>${item.condition}</small></div>
                  <div><strong>${formatEuro(cost)}</strong><small>${formatEuro(item.paid)} cad.</small></div>
                  <div><strong>${formatEuro(value)}</strong><small>mercato</small></div>
                  <div><span class="${pillClass}">${itemGain >= 0 ? "+" : ""}${itemGainPct.toFixed(1)}%</span></div>
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
  elements.searchInput.placeholder = view === "portfolio" ? "Cerca nel portfolio" : view === "market" ? "Cerca set, tema o codice" : "Ricerca disponibile nel mercato";
}

function render() {
  renderCatalogStatus();
  renderOptions();
  renderRows();
  renderDetail();
  renderMarketMetrics();
  renderPortfolio();
  renderSignals();
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

elements.syncApi.addEventListener("click", async () => {
  const apiKey = elements.apiKeyInput.value.trim() || getStoredApiKey();

  if (!apiKey) {
    elements.catalogStatus.textContent = "Inserisci prima la chiave API Rebrickable.";
    return;
  }

  if (elements.apiKeyInput.value.trim()) {
    localStorage.setItem(API_KEY_STORAGE, apiKey);
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
  }

  render();
  elements.portfolioPaid.value = "";
  elements.watchTarget.value = Math.round((getSet(elements.watchSet.value) ? getMarketPrice(getSet(elements.watchSet.value)) : 0) * 0.9);
  switchView(activeView);
  setAuthVisible(Boolean(currentUser));

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
