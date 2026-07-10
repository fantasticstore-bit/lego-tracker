(function (global) {
  const CURRENT_YEAR = new Date().getFullYear();

  const mockQuantSets = [
    {
      setNumber: "75313",
      name: "AT-AT",
      theme: "Star Wars",
      subtheme: "Ultimate Collector Series",
      releaseYear: 2021,
      retirementYear: 2025,
      retailPrice: 849.99,
      currentMarketPrice: 812,
      sealedPrice: 812,
      usedPrice: 690,
      pieceCount: 6785,
      minifigCount: 9,
      exclusiveMinifigCount: 2,
      availabilityStatus: "retiringSoon",
      demandScore: 92,
      rarityScore: 78,
      liquidityScore: 86,
      volatilityScore: 42,
      historicalPrices: [
        { year: 2021, price: 799 },
        { year: 2022, price: 779 },
        { year: 2023, price: 805 },
        { year: 2024, price: 820 },
        { year: 2025, price: 812 },
      ],
      lastUpdated: "2026-06-09",
    },
    {
      setNumber: "75192",
      name: "Millennium Falcon",
      theme: "Star Wars",
      subtheme: "Ultimate Collector Series",
      releaseYear: 2017,
      retirementYear: null,
      retailPrice: 849.99,
      currentMarketPrice: 849.99,
      sealedPrice: 849.99,
      usedPrice: 720,
      pieceCount: 7541,
      minifigCount: 8,
      exclusiveMinifigCount: 1,
      availabilityStatus: "active",
      demandScore: 95,
      rarityScore: 62,
      liquidityScore: 94,
      volatilityScore: 36,
      historicalPrices: [
        { year: 2021, price: 799 },
        { year: 2022, price: 820 },
        { year: 2023, price: 845 },
        { year: 2024, price: 849 },
        { year: 2025, price: 850 },
      ],
      lastUpdated: "2026-06-09",
    },
    {
      setNumber: "10294",
      name: "Titanic",
      theme: "Icons",
      subtheme: "Vehicles",
      releaseYear: 2021,
      retirementYear: null,
      retailPrice: 679.99,
      currentMarketPrice: 679.99,
      sealedPrice: 679.99,
      usedPrice: 590,
      pieceCount: 9090,
      minifigCount: 0,
      exclusiveMinifigCount: 0,
      availabilityStatus: "active",
      demandScore: 84,
      rarityScore: 58,
      liquidityScore: 82,
      volatilityScore: 28,
      historicalPrices: [
        { year: 2021, price: 629 },
        { year: 2022, price: 650 },
        { year: 2023, price: 675 },
        { year: 2024, price: 679 },
        { year: 2025, price: 680 },
      ],
      lastUpdated: "2026-06-09",
    },
    {
      setNumber: "10307",
      name: "Eiffel Tower",
      theme: "Icons",
      subtheme: "Landmarks",
      releaseYear: 2022,
      retirementYear: 2026,
      retailPrice: 629.99,
      currentMarketPrice: 629.99,
      sealedPrice: 629.99,
      usedPrice: 540,
      pieceCount: 10001,
      minifigCount: 0,
      exclusiveMinifigCount: 0,
      availabilityStatus: "retiringSoon",
      demandScore: 79,
      rarityScore: 66,
      liquidityScore: 74,
      volatilityScore: 31,
      historicalPrices: [
        { year: 2022, price: 599 },
        { year: 2023, price: 610 },
        { year: 2024, price: 628 },
        { year: 2025, price: 630 },
      ],
      lastUpdated: "2026-06-09",
    },
    {
      setNumber: "76417",
      name: "Gringotts Wizarding Bank",
      theme: "Harry Potter",
      subtheme: "Diagon Alley",
      releaseYear: 2023,
      retirementYear: 2026,
      retailPrice: 429.99,
      currentMarketPrice: 429.99,
      sealedPrice: 429.99,
      usedPrice: 360,
      pieceCount: 4815,
      minifigCount: 13,
      exclusiveMinifigCount: 4,
      availabilityStatus: "retiringSoon",
      demandScore: 81,
      rarityScore: 72,
      liquidityScore: 76,
      volatilityScore: 39,
      historicalPrices: [
        { year: 2023, price: 410 },
        { year: 2024, price: 425 },
        { year: 2025, price: 430 },
      ],
      lastUpdated: "2026-06-09",
    },
    {
      setNumber: "75331",
      name: "The Razor Crest",
      theme: "Star Wars",
      subtheme: "Ultimate Collector Series",
      releaseYear: 2022,
      retirementYear: 2025,
      retailPrice: 599.99,
      currentMarketPrice: 589.56,
      sealedPrice: 589.56,
      usedPrice: 480,
      pieceCount: 6187,
      minifigCount: 4,
      exclusiveMinifigCount: 1,
      availabilityStatus: "retired",
      demandScore: 77,
      rarityScore: 69,
      liquidityScore: 81,
      volatilityScore: 46,
      historicalPrices: [
        { year: 2022, price: 580 },
        { year: 2023, price: 610 },
        { year: 2024, price: 602 },
        { year: 2025, price: 590 },
      ],
      lastUpdated: "2026-06-09",
    },
    {
      setNumber: "21330",
      name: "Home Alone",
      theme: "Ideas",
      subtheme: "Seasonal",
      releaseYear: 2021,
      retirementYear: 2025,
      retailPrice: 299.99,
      currentMarketPrice: 346,
      sealedPrice: 346,
      usedPrice: 275,
      pieceCount: 3955,
      minifigCount: 5,
      exclusiveMinifigCount: 5,
      availabilityStatus: "retired",
      demandScore: 83,
      rarityScore: 75,
      liquidityScore: 78,
      volatilityScore: 48,
      historicalPrices: [
        { year: 2021, price: 249 },
        { year: 2022, price: 285 },
        { year: 2023, price: 310 },
        { year: 2024, price: 328 },
        { year: 2025, price: 346 },
      ],
      lastUpdated: "2026-06-09",
    },
    {
      setNumber: "42115",
      name: "Lamborghini Sian FKP 37",
      theme: "Technic",
      subtheme: "Ultimate Car Concept",
      releaseYear: 2020,
      retirementYear: 2024,
      retailPrice: 399.99,
      currentMarketPrice: 452,
      sealedPrice: 452,
      usedPrice: 330,
      pieceCount: 3696,
      minifigCount: 0,
      exclusiveMinifigCount: 0,
      availabilityStatus: "retired",
      demandScore: 72,
      rarityScore: 70,
      liquidityScore: 71,
      volatilityScore: 52,
      historicalPrices: [
        { year: 2020, price: 339 },
        { year: 2021, price: 360 },
        { year: 2022, price: 390 },
        { year: 2023, price: 420 },
        { year: 2024, price: 452 },
      ],
      lastUpdated: "2026-06-09",
    },
  ];

  const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value));
  const round = (value, digits = 1) => Number(value.toFixed(digits));
  const DEFAULT_SCORE_WEIGHTS = {
    demand: 0.19,
    rarity: 0.15,
    theme: 0.17,
    minifigures: 0.1,
    retirement: 0.14,
    liquidity: 0.15,
    scarcity: 0.1,
  };

  function normalizeScoreWeights(weights = {}) {
    const merged = { ...DEFAULT_SCORE_WEIGHTS, ...weights };
    const total = Object.values(merged).reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0) || 1;
    return Object.fromEntries(Object.entries(merged).map(([key, value]) => [key, Math.max(0, Number(value) || 0) / total]));
  }

  function normalizeSet(input) {
    return {
      setNumber: input.setNumber || input.code || "",
      name: input.name || "Unknown LEGO Set",
      theme: input.theme || "Unknown",
      subtheme: input.subtheme || "",
      releaseYear: Number(input.releaseYear || input.year || 0),
      retirementYear: input.retirementYear ? Number(input.retirementYear) : null,
      retailPrice: Number(input.retailPrice || input.retail || 0),
      currentMarketPrice: Number(input.currentMarketPrice || input.marketPrice || input.price || 0),
      sealedPrice: Number(input.sealedPrice || input.currentMarketPrice || input.marketPrice || 0),
      usedPrice: Number(input.usedPrice || 0),
      pieceCount: Number(input.pieceCount || input.parts || 0),
      minifigCount: Number(input.minifigCount || 0),
      exclusiveMinifigCount: Number(input.exclusiveMinifigCount || 0),
      availabilityStatus: input.availabilityStatus || "active",
      demandScore: Number(input.demandScore || 50),
      rarityScore: Number(input.rarityScore || 50),
      liquidityScore: Number(input.liquidityScore || 50),
      volatilityScore: Number(input.volatilityScore || 45),
      historicalPrices: Array.isArray(input.historicalPrices) ? input.historicalPrices : [],
      priceSource: input.priceSource || input.source || "mock/stima",
      observations: Number(input.observations || input.soldCount || input.listingCount || 0),
      sourceConfidence: Number(input.sourceConfidence || input.confidence || 0),
      condition: normalizeCondition(input.condition || input.itemCondition || "sealed"),
      lastUpdated: input.lastUpdated || new Date().toISOString().slice(0, 10),
    };
  }

  function daysSince(dateValue) {
    if (!dateValue) return 9999;
    const time = new Date(dateValue).getTime();
    if (!Number.isFinite(time)) return 9999;
    return Math.max(0, Math.floor((Date.now() - time) / (24 * 60 * 60 * 1000)));
  }

  function getSourceType(source = "") {
    const key = String(source).toLowerCase();
    if (key.includes("bricklink")) return "BrickLink";
    if (key.includes("brickeconomy")) return "BrickEconomy";
    if (key.includes("ebay")) return "eBay sold";
    if (key.includes("rebrickable") || key.includes("lego official")) return "LEGO catalog";
    if (key.includes("csv")) return "CSV import";
    if (key.includes("mock") || key.includes("stima")) return "Mock/Stima";
    return source || "Unknown";
  }

  function calculateFreshnessScore(lastUpdated) {
    const age = daysSince(lastUpdated);
    if (age <= 7) return 100;
    if (age <= 30) return 82;
    if (age <= 90) return 58;
    if (age <= 180) return 35;
    return 12;
  }

  function calculateSourceConfidence(rawSet) {
    const set = normalizeSet(rawSet);
    const source = getSourceType(set.priceSource);
    const observations = Number(set.observations || 0);
    let score = 10;
    if (source === "BrickLink") score += 30;
    else if (source === "eBay sold") score += 28;
    else if (source === "BrickEconomy") score += 25;
    else if (source === "CSV import") score += 16;
    else if (source === "LEGO catalog") score += 12;
    else if (source === "Mock/Stima") score += 0;
    score += Math.min(28, observations * 4);
    score += calculateFreshnessScore(set.lastUpdated) * 0.22;
    if (set.sealedPrice > 0 && set.usedPrice > 0) score += 10;
    return round(clamp(score));
  }

  function buildValuationMeta(rawSet) {
    const set = normalizeSet(rawSet);
    const confidence = set.sourceConfidence || calculateSourceConfidence(set);
    const freshnessScore = calculateFreshnessScore(set.lastUpdated);
    return {
      source: getSourceType(set.priceSource),
      rawSource: set.priceSource,
      confidence,
      freshnessScore,
      lastUpdated: set.lastUpdated,
      observations: Number(set.observations || 0),
      isFallback: /mock|stima|unknown/i.test(set.priceSource || ""),
      qualityLabel: confidence >= 78 ? "high" : confidence >= 55 ? "medium" : "low",
    };
  }

  function normalizeCondition(value = "sealed") {
    const key = String(value).toLowerCase();
    if (key.includes("incomplete") || key.includes("incompleto")) return "used-incomplete";
    if (key.includes("damaged") || key.includes("danneggiata") || key.includes("box")) return "sealed-damaged-box";
    if (key.includes("used") || key.includes("usato")) return "used-complete";
    if (key.includes("new") || key.includes("sealed") || key.includes("sigill")) return "sealed-mint";
    return "sealed-mint";
  }

  function getConditionValueFactor(condition = "sealed-mint") {
    const normalized = normalizeCondition(condition);
    if (normalized === "sealed-damaged-box") return 0.92;
    if (normalized === "used-complete") return 0.78;
    if (normalized === "used-incomplete") return 0.55;
    return 1;
  }

  function normalizePriceSnapshot(catalogSet, snapshot = {}) {
    const set = normalizeSet(catalogSet);
    const retailPrice = Number(snapshot.retailPrice ?? set.retailPrice ?? 0);
    const sealedPrice = Number(snapshot.sealedPrice ?? snapshot.currentMarketPrice ?? set.currentMarketPrice ?? retailPrice);
    const usedPrice = Number(snapshot.usedPrice ?? sealedPrice * 0.82);
    const soldCount = Number(snapshot.soldCount || 0);
    const listingCount = Number(snapshot.listingCount || 0);
    const liquidityScore = clamp(soldCount * 4 + listingCount * 1.2);

    return {
      ...set,
      retailPrice,
      currentMarketPrice: sealedPrice,
      sealedPrice,
      usedPrice,
      liquidityScore: round(liquidityScore),
      priceSource: snapshot.source || set.priceSource || "unknown",
      observations: soldCount || listingCount,
      sourceConfidence: snapshot.confidence || 0,
      condition: normalizeCondition(snapshot.condition || set.condition),
      lastUpdated: snapshot.capturedAt || set.lastUpdated,
    };
  }

  function calculateCagr(historicalPrices) {
    if (!historicalPrices || historicalPrices.length < 2) return 0;
    const first = historicalPrices[0];
    const last = historicalPrices[historicalPrices.length - 1];
    const years = Math.max(1, Number(last.year) - Number(first.year));
    if (!first.price || !last.price) return 0;
    return round((Math.pow(last.price / first.price, 1 / years) - 1) * 100, 2);
  }

  function calculateFeatures(rawSet) {
    const set = normalizeSet(rawSet);
    const cagr = calculateCagr(set.historicalPrices);
    const premiumVsRetail = set.retailPrice ? ((set.currentMarketPrice - set.retailPrice) / set.retailPrice) * 100 : 0;
    const pricePerPiece = set.pieceCount ? set.currentMarketPrice / set.pieceCount : 0;
    const yearsSinceRetirement = set.retirementYear ? Math.max(0, CURRENT_YEAR - set.retirementYear) : 0;
    const yearsToRetirement = set.retirementYear ? set.retirementYear - CURRENT_YEAR : 99;
    const retirementProximityScore = set.availabilityStatus === "retiringSoon" ? 92 : set.availabilityStatus === "retired" ? 70 : clamp(55 - yearsToRetirement * 12);
    const themeStrengthScore = getThemeStrengthScore(set.theme, set.subtheme);
    const minifigureExclusivityScore = set.minifigCount ? clamp((set.exclusiveMinifigCount / set.minifigCount) * 100) : 35;
    const scarcityScore = clamp(set.rarityScore * 0.55 + retirementProximityScore * 0.35 + yearsSinceRetirement * 2);
    const liquidityScore = clamp(set.liquidityScore);
    const volatilityScore = clamp(set.volatilityScore);
    const conditionValueFactor = getConditionValueFactor(set.condition);
    const valuation = buildValuationMeta(set);

    return {
      ...set,
      valuation,
      cagr,
      premiumVsRetail: round(premiumVsRetail, 2),
      pricePerPiece: round(pricePerPiece, 3),
      yearsSinceRetirement,
      retirementProximityScore: round(retirementProximityScore),
      themeStrengthScore,
      minifigureExclusivityScore: round(minifigureExclusivityScore),
      liquidityScore,
      volatilityScore,
      conditionValueFactor,
      conditionAdjustedMarketPrice: round(set.currentMarketPrice * conditionValueFactor),
      scarcityScore: round(scarcityScore),
      dataQualityScore: calculateDataQualityScore(set),
    };
  }

  function calculateDataQualityScore(rawSet) {
    const set = normalizeSet(rawSet);
    let score = 20;
    if (set.priceSource && !/mock|stima|unknown/i.test(set.priceSource)) score += 22;
    if (set.currentMarketPrice > 0 && set.retailPrice > 0) score += 15;
    if (set.sealedPrice > 0 && set.usedPrice > 0) score += 12;
    if (set.liquidityScore > 0) score += 12;
    if (set.observations >= 5) score += 10;
    if (set.historicalPrices.length >= 3) score += 14;
    if (set.lastUpdated) score += 5;
    return round(clamp(score));
  }

  function getThemeStrengthScore(theme, subtheme = "") {
    const key = `${theme} ${subtheme}`.toLowerCase();
    if (key.includes("star wars") && key.includes("ultimate")) return 94;
    if (key.includes("star wars")) return 88;
    if (key.includes("icons") || key.includes("modular")) return 84;
    if (key.includes("harry potter")) return 78;
    if (key.includes("technic")) return 73;
    if (key.includes("ideas")) return 76;
    if (key.includes("architecture")) return 72;
    return 60;
  }

  function calculateScoreBreakdown(rawSet, weights = DEFAULT_SCORE_WEIGHTS) {
    const set = calculateFeatures(rawSet);
    const normalizedWeights = normalizeScoreWeights(weights);
    const discountBoost = set.premiumVsRetail < 0 ? Math.min(12, Math.abs(set.premiumVsRetail) * 0.7) : 0;
    const overpayPenalty = set.premiumVsRetail > 35 ? Math.min(18, (set.premiumVsRetail - 35) * 0.45) : 0;
    const volatilityPenalty = set.volatilityScore * 0.14;
    const factors = [
      { key: "demand", label: "Domanda", value: set.demandScore, weight: normalizedWeights.demand },
      { key: "rarity", label: "Rarita", value: set.rarityScore, weight: normalizedWeights.rarity },
      { key: "theme", label: "Forza tema", value: set.themeStrengthScore, weight: normalizedWeights.theme },
      { key: "minifigures", label: "Minifigure", value: set.minifigureExclusivityScore, weight: normalizedWeights.minifigures },
      { key: "retirement", label: "Retirement", value: set.retirementProximityScore, weight: normalizedWeights.retirement },
      { key: "liquidity", label: "Liquidita", value: set.liquidityScore, weight: normalizedWeights.liquidity },
      { key: "scarcity", label: "Scarsita", value: set.scarcityScore, weight: normalizedWeights.scarcity },
    ].map((factor) => ({ ...factor, contribution: round(factor.value * factor.weight, 2) }));
    const baseScore = factors.reduce((sum, factor) => sum + factor.contribution, 0);
    const finalScore = round(clamp(baseScore + discountBoost - overpayPenalty - volatilityPenalty));
    return {
      score: finalScore,
      baseScore: round(baseScore),
      factors,
      adjustments: {
        discountBoost: round(discountBoost, 2),
        overpayPenalty: round(overpayPenalty, 2),
        volatilityPenalty: round(volatilityPenalty, 2),
      },
      dataQualityScore: set.dataQualityScore,
    };
  }

  function calculateInvestmentScore(rawSet, weights = DEFAULT_SCORE_WEIGHTS) {
    return calculateScoreBreakdown(rawSet, weights).score;
  }

  function calculateRiskLevel(rawSet) {
    const set = calculateFeatures(rawSet);
    const riskScore = set.volatilityScore * 0.45 + Math.max(0, set.premiumVsRetail) * 0.25 + (100 - set.liquidityScore) * 0.3;
    if (riskScore >= 58) return "high";
    if (riskScore >= 35) return "medium";
    return "low";
  }

  function buildForecastInterval(value, rawSet, years = 1) {
    const set = calculateFeatures(rawSet);
    const confidencePenalty = (100 - set.valuation.confidence) / 100;
    const volatilityBand = (set.volatilityScore / 100) * Math.sqrt(years) * 0.22;
    const band = clamp(0.08 + confidencePenalty * 0.18 + volatilityBand, 0.08, 0.55);
    return {
      low: round(value * (1 - band)),
      base: round(value),
      high: round(value * (1 + band)),
      bandPct: round(band * 100),
    };
  }

  function shouldBlockForecast(rawSet) {
    const set = calculateFeatures(rawSet);
    const blockers = [];
    if (set.valuation.confidence < 35) blockers.push("price confidence too low");
    if (set.dataQualityScore < 45) blockers.push("data quality too low");
    if (!set.currentMarketPrice) blockers.push("missing market price");
    if (set.valuation.isFallback) blockers.push("fallback/mock pricing");
    return {
      blocked: blockers.length > 0,
      blockers,
    };
  }

  function forecastSet(rawSet, options = {}) {
    const set = calculateFeatures(rawSet);
    const scoreBreakdown = calculateScoreBreakdown(set, options.weights);
    const investmentScore = scoreBreakdown.score;
    const riskLevel = calculateRiskLevel(set);
    const baseGrowth =
      3.5 +
      investmentScore * 0.09 +
      set.themeStrengthScore * 0.025 +
      set.retirementProximityScore * 0.03 -
      set.volatilityScore * 0.035;
    const annualGrowth = clamp(baseGrowth, -4, 18) / 100;
    const forecast12M = set.currentMarketPrice * (1 + annualGrowth);
    const forecast3Y = set.currentMarketPrice * Math.pow(1 + annualGrowth, 3);
    const forecast5Y = set.currentMarketPrice * Math.pow(1 + annualGrowth, 5);
    const expectedRoi = set.currentMarketPrice ? ((forecast5Y - set.currentMarketPrice) / set.currentMarketPrice) * 100 : 0;
    const forecastGate = shouldBlockForecast(set);
    const confidenceLevel = forecastGate.blocked ? "low" : set.valuation.confidence >= 78 && investmentScore >= 75 ? "high" : set.valuation.confidence >= 55 ? "medium" : "low";
    const action = forecastGate.blocked ? "avoid" : investmentScore >= 80 && riskLevel !== "high" ? "buy" : investmentScore >= 62 ? "watch" : "avoid";
    const targetBuyPrice = set.retailPrice
      ? set.availabilityStatus === "retired"
        ? Math.min(set.currentMarketPrice * 0.9, set.retailPrice * 1.15)
        : set.retailPrice * 0.98
      : set.currentMarketPrice * 0.9;
    const targetSellPrice = forecast5Y * (riskLevel === "high" ? 0.9 : 1);

    return {
      ...set,
      investmentScore,
      forecast12M: round(forecast12M),
      forecast3Y: round(forecast3Y),
      forecast5Y: round(forecast5Y),
      expectedRoi: round(expectedRoi),
      forecastIntervals: {
        oneYear: buildForecastInterval(forecast12M, set, 1),
        threeYears: buildForecastInterval(forecast3Y, set, 3),
        fiveYears: buildForecastInterval(forecast5Y, set, 5),
      },
      confidenceLevel,
      forecastGate,
      riskLevel,
      action,
      targetBuyPrice: round(targetBuyPrice),
      targetSellPrice: round(targetSellPrice),
      scoreBreakdown,
      dataQualityScore: set.dataQualityScore,
      modelType: "rule-based mock forecast",
    };
  }

  function scanOpportunities(sets = mockQuantSets, options = {}) {
    return sets
      .map((set) => forecastSet(set, options))
      .map((set) => ({
        ...set,
        category:
          set.action === "buy" && set.riskLevel === "high"
            ? "High Risk / High Reward"
            : set.action === "buy"
              ? "Strong Buy"
              : set.action === "watch"
                ? "Watchlist"
                : "Avoid",
        reasons: explainSet(set),
      }))
      .sort((a, b) => b.investmentScore - a.investmentScore);
  }

  function generateDecision(rawSet, options = {}) {
    const set = forecastSet(rawSet, options);
    const upside = set.currentMarketPrice ? ((set.forecastIntervals.fiveYears.high - set.currentMarketPrice) / set.currentMarketPrice) * 100 : 0;
    const downside = set.currentMarketPrice ? ((set.currentMarketPrice - set.forecastIntervals.fiveYears.low) / set.currentMarketPrice) * 100 : 0;
    const risks = [];
    if (set.riskLevel === "high") risks.push("rischio prezzo alto");
    if (set.volatilityScore >= 55) risks.push("volatilita elevata");
    if (set.valuation.confidence < 55) risks.push("dati prezzo deboli");
    if (set.premiumVsRetail > 35) risks.push("premium gia alto vs retail");
    if (set.valuation.isFallback) risks.push("prezzo fallback/non verificato");
    const decision =
      set.forecastGate.blocked || set.investmentScore < 50
        ? "AVOID"
        : set.premiumVsRetail > 45 && set.expectedRoi < 20
          ? "SELL"
          : set.action === "buy"
            ? "BUY"
            : "HOLD";
    const explanation = {
      BUY: `Interessante per score ${set.investmentScore}/100, upside atteso ${round(upside)}% e rischio ${set.riskLevel}.`,
      HOLD: `Da tenere o monitorare: score ${set.investmentScore}/100, forecast positivo ma non abbastanza forte per comprare aggressivamente.`,
      SELL: `Valuta vendita: prezzo gia tirato rispetto al retail e upside limitato rispetto al rischio.`,
      AVOID: `Evita per ora: ${set.forecastGate.blockers.length ? set.forecastGate.blockers.join(", ") : "score/rischio non favorevole"}.`,
    }[decision];
    return {
      decision,
      confidence: set.valuation.confidence,
      expectedUpside: round(upside),
      expectedDownside: round(Math.max(0, downside)),
      explanation,
      risks,
      set,
    };
  }

  function scanDeals(sets = mockQuantSets, options = {}) {
    return sets
      .map((set) => forecastSet(set, options))
      .map((set) => {
        const distanceToBuy = set.currentMarketPrice - set.targetBuyPrice;
        const distancePct = set.targetBuyPrice ? (distanceToBuy / set.targetBuyPrice) * 100 : 0;
        const sellDistancePct = set.targetSellPrice ? ((set.currentMarketPrice - set.targetSellPrice) / set.targetSellPrice) * 100 : 0;
        const dealStatus =
          distanceToBuy <= 0
            ? "below-target"
            : distancePct <= 5
              ? "near-target"
              : sellDistancePct >= -8 || set.premiumVsRetail > 35
                ? "overheated"
                : "fair";
        const dealLabel =
          dealStatus === "below-target"
            ? "Sotto target buy"
            : dealStatus === "near-target"
              ? "Quasi a target"
              : dealStatus === "overheated"
                ? "Prezzo tirato"
                : "Fair watch";

        return {
          ...set,
          dealStatus,
          dealLabel,
          distanceToBuy: round(distanceToBuy),
          distancePct: round(distancePct),
          marginOfSafety: round(Math.max(0, ((set.targetBuyPrice - set.currentMarketPrice) / set.currentMarketPrice) * 100)),
          source: set.priceSource || "mock/stima",
        };
      })
      .sort((a, b) => {
        const priority = { "below-target": 0, "near-target": 1, fair: 2, overheated: 3 };
        return priority[a.dealStatus] - priority[b.dealStatus] || b.investmentScore - a.investmentScore;
      });
  }

  function runBacktest(sets = mockQuantSets) {
    const retired = sets.filter((set) => set.availabilityStatus === "retired" && set.historicalPrices?.length >= 2);
    const rows = retired.map((set) => {
      const firstHalf = { ...set, historicalPrices: set.historicalPrices.slice(0, Math.max(2, Math.floor(set.historicalPrices.length / 2))) };
      const predicted = forecastSet(firstHalf);
      const first = set.historicalPrices[0].price;
      const last = set.historicalPrices[set.historicalPrices.length - 1].price;
      const actualRoi = first ? ((last - first) / first) * 100 : 0;
      const predictedPositive = predicted.expectedRoi > 25;
      const actualPositive = actualRoi > 25;
      return {
        setNumber: set.setNumber,
        name: set.name,
        theme: set.theme,
        predictedAction: predicted.action,
        predictedRoi: predicted.expectedRoi,
        actualRoi: round(actualRoi),
        hit: predictedPositive === actualPositive,
      };
    });
    const accuracyScore = rows.length ? round((rows.filter((row) => row.hit).length / rows.length) * 100) : 0;
    const topMissedOpportunities = rows.filter((row) => row.predictedAction !== "buy" && row.actualRoi > 35).sort((a, b) => b.actualRoi - a.actualRoi);
    const falsePositives = rows.filter((row) => row.predictedAction === "buy" && row.actualRoi < 15);
    const themeTotals = {};
    rows.forEach((row) => {
      themeTotals[row.theme] = themeTotals[row.theme] || { count: 0, roi: 0 };
      themeTotals[row.theme].count += 1;
      themeTotals[row.theme].roi += row.actualRoi;
    });
    const bestPerformingThemes = Object.entries(themeTotals)
      .map(([theme, value]) => ({ theme, avgRoi: round(value.roi / value.count) }))
      .sort((a, b) => b.avgRoi - a.avgRoi);
    return {
      accuracyScore,
      rows,
      topMissedOpportunities,
      falsePositives,
      bestPerformingThemes,
      modelNotes: [
        "Backtest uses mock historical data only.",
        "Real accuracy requires BrickEconomy/BrickLink/eBay sold price history.",
        "The current model is rule-based and intentionally transparent.",
      ],
    };
  }

  function explainSet(rawSet) {
    const set = forecastSet(rawSet);
    const reasons = [];
    if (set.themeStrengthScore >= 84) reasons.push(`tema ${set.theme} storicamente forte`);
    if (set.retirementProximityScore >= 80) reasons.push("vicinanza al retirement");
    if (set.exclusiveMinifigCount > 0) reasons.push(`${set.exclusiveMinifigCount} minifigure esclusive`);
    if (set.liquidityScore >= 78) reasons.push("buona liquidita sul mercato sealed");
    if (set.premiumVsRetail < 0) reasons.push("prezzo sotto retail stimato");
    if (set.volatilityScore > 50) reasons.push("volatilita elevata da monitorare");
    return `Il set ${set.setNumber} ${set.name} ha score ${set.investmentScore}/100 per ${reasons.join(", ") || "un mix bilanciato di domanda, rarita e liquidita"}. Azione consigliata: ${set.action.toUpperCase()}.`;
  }

  function analyzePortfolio(positions = []) {
    const rows = positions
      .map((position) => {
        const set = forecastSet(position.set || position);
        const qty = Number(position.qty || 1);
        const paidPrice = Number(position.paidPrice ?? position.paid ?? set.retailPrice ?? set.currentMarketPrice ?? 0);
        const conditionFactor = getConditionValueFactor(position.condition || set.condition);
        const paidTotal = paidPrice * qty;
        const currentTotal = set.currentMarketPrice * conditionFactor * qty;
        const forecast5YTotal = set.forecast5Y * conditionFactor * qty;
        const unrealizedRoi = paidTotal ? ((currentTotal - paidTotal) / paidTotal) * 100 : 0;
        const forecastRoiOnCost = paidTotal ? ((forecast5YTotal - paidTotal) / paidTotal) * 100 : set.expectedRoi;
        const holdingYears = Math.max(1, CURRENT_YEAR - Number(set.releaseYear || CURRENT_YEAR) + 1);
        const annualizedReturn = paidTotal ? (Math.pow(Math.max(0.01, currentTotal / paidTotal), 1 / holdingYears) - 1) * 100 : 0;
        const strongCollectorTheme = /icons|star wars|ultimate collector|modular|architecture|technic|harry potter/i.test(`${set.theme || ""} ${set.subtheme || ""}`);
        const qualityHold = strongCollectorTheme && set.investmentScore >= 58 && set.liquidityScore >= 45;
        const weakExit = set.investmentScore < 48 || (set.action === "avoid" && set.riskLevel === "high" && !qualityHold);
        const trimSignal = weakExit && unrealizedRoi > 22;
        const portfolioAction = trimSignal
          ? "trim"
          : weakExit
            ? "exit-watch"
            : set.investmentScore >= 82 && set.riskLevel !== "high"
              ? "hold-add"
              : set.investmentScore >= 58 || qualityHold
                ? "hold"
                : "watch";

        return {
          ...set,
          qty,
          paidPrice: round(paidPrice),
          conditionFactor,
          paidTotal: round(paidTotal),
          currentTotal: round(currentTotal),
          forecast5YTotal: round(forecast5YTotal),
          unrealizedRoi: round(unrealizedRoi),
          annualizedReturn: round(annualizedReturn),
          forecastRoiOnCost: round(forecastRoiOnCost),
          portfolioAction,
          decision: generateDecision(set).decision,
        };
      })
      .sort((a, b) => b.currentTotal - a.currentTotal);

    const totals = rows.reduce(
      (acc, row) => {
        acc.paid += row.paidTotal;
        acc.current += row.currentTotal;
        acc.forecast5Y += row.forecast5YTotal;
        acc.weightedScore += row.investmentScore * row.currentTotal;
        acc.weightedRisk += (row.riskLevel === "high" ? 90 : row.riskLevel === "medium" ? 55 : 25) * row.currentTotal;
        return acc;
      },
      { paid: 0, current: 0, forecast5Y: 0, weightedScore: 0, weightedRisk: 0 },
    );

    const themeExposure = {};
    rows.forEach((row) => {
      themeExposure[row.theme] = (themeExposure[row.theme] || 0) + row.currentTotal;
    });
    const themeRows = Object.entries(themeExposure)
      .map(([theme, value]) => ({
        theme,
        value: round(value),
        share: totals.current ? round((value / totals.current) * 100) : 0,
      }))
      .sort((a, b) => b.value - a.value);
    const largestThemeShare = themeRows[0]?.share || 0;
    const diversificationScore = round(clamp(100 - largestThemeShare + Math.min(20, themeRows.length * 4)));
    const portfolioScore = totals.current ? round(totals.weightedScore / totals.current) : 0;
    const riskScore = totals.current ? round(totals.weightedRisk / totals.current) : 0;
    const expectedRoi5Y = totals.current ? round(((totals.forecast5Y - totals.current) / totals.current) * 100) : 0;
    const gainOnCost = totals.paid ? round(((totals.current - totals.paid) / totals.paid) * 100) : 0;
    const concentrationRisk = largestThemeShare >= 55 ? "high" : largestThemeShare >= 38 ? "medium" : "low";
    const riskLevel = riskScore >= 62 || concentrationRisk === "high" ? "high" : riskScore >= 42 || concentrationRisk === "medium" ? "medium" : "low";
    const bestPerformer = rows.length ? [...rows].sort((a, b) => b.unrealizedRoi - a.unrealizedRoi)[0] : null;
    const worstPerformer = rows.length ? [...rows].sort((a, b) => a.unrealizedRoi - b.unrealizedRoi)[0] : null;
    const annualizedReturn = totals.paid ? round(rows.reduce((sum, row) => sum + row.annualizedReturn * row.paidTotal, 0) / Math.max(1, totals.paid)) : 0;

    const recommendations = [];
    const topHold = rows.find((row) => row.portfolioAction === "hold-add" || row.portfolioAction === "hold");
    const topTrim = rows.find((row) => row.portfolioAction === "trim" || row.portfolioAction === "exit-watch");
    if (topHold) recommendations.push(`Mantieni forte ${topHold.setNumber} ${topHold.name}: score ${topHold.investmentScore}/100 e ROI 5Y stimato ${round(topHold.forecastRoiOnCost)}%.`);
    if (topTrim) recommendations.push(`Controlla ${topTrim.setNumber} ${topTrim.name}: rischio ${topTrim.riskLevel}, azione portfolio ${topTrim.portfolioAction}.`);
    if (largestThemeShare >= 45) recommendations.push(`Concentrazione alta su ${themeRows[0].theme}: ${largestThemeShare}% del valore portfolio.`);
    if (!recommendations.length) recommendations.push("Portfolio bilanciato nel campione disponibile, ma servono prezzi reali per validare il segnale.");

    return {
      rows,
      totals: {
        paid: round(totals.paid),
        current: round(totals.current),
        forecast5Y: round(totals.forecast5Y),
        portfolioScore,
        annualizedReturn,
        diversificationScore,
        riskScore,
        riskLevel,
        expectedRoi5Y,
        gainOnCost,
        concentrationRisk,
        bestPerformer,
        worstPerformer,
      },
      themeExposure: themeRows,
      recommendations,
    };
  }

  function generateAlerts({ sets = mockQuantSets, positions = [], watchlist = [] } = {}) {
    const deals = scanDeals(sets);
    const portfolio = analyzePortfolio(positions);
    const setMap = new Map(deals.map((set) => [set.setNumber, set]));
    const alerts = [];

    deals.forEach((deal) => {
      if (deal.dealStatus === "below-target") {
        alerts.push({
          id: `deal-${deal.setNumber}`,
          severity: "high",
          type: "buy",
          setNumber: deal.setNumber,
          title: `${deal.name} sotto target buy`,
          message: `Prezzo ${round(deal.currentMarketPrice)} contro target ${round(deal.targetBuyPrice)}. Margine di sicurezza ${round(deal.marginOfSafety)}%.`,
          action: "Compra / verifica listing",
        });
      } else if (deal.dealStatus === "near-target") {
        alerts.push({
          id: `near-${deal.setNumber}`,
          severity: "medium",
          type: "watch",
          setNumber: deal.setNumber,
          title: `${deal.name} quasi a target`,
          message: `Manca circa ${round(Math.max(0, deal.distancePct))}% al target buy.`,
          action: "Tieni in watchlist",
        });
      } else if (deal.dealStatus === "overheated") {
        alerts.push({
          id: `hot-${deal.setNumber}`,
          severity: "medium",
          type: "sell-risk",
          setNumber: deal.setNumber,
          title: `${deal.name} prezzo tirato`,
          message: `Premium vs retail ${round(deal.premiumVsRetail)}%. Evita inseguimento o valuta presa profitto se lo possiedi.`,
          action: "Evita / valuta vendita",
        });
      }
    });

    portfolio.rows.forEach((row) => {
      if (row.portfolioAction === "trim" || row.portfolioAction === "exit-watch") {
        alerts.push({
          id: `portfolio-risk-${row.setNumber}`,
          severity: row.portfolioAction === "trim" ? "high" : "medium",
          type: "portfolio-risk",
          setNumber: row.setNumber,
          title: `${row.name} da rivedere`,
          message: `Score ${row.investmentScore}/100, rischio ${row.riskLevel}, azione ${row.portfolioAction}.`,
          action: "Rivedi posizione",
        });
      }
    });

    if (portfolio.totals.riskLevel === "high") {
      alerts.push({
        id: "portfolio-concentration",
        severity: "high",
        type: "portfolio-risk",
        title: "Rischio portfolio alto",
        message: `Score rischio ${portfolio.totals.riskScore}/100 e concentrazione ${portfolio.totals.concentrationRisk}. Non significa vendere i flagship: controlla peso per tema e dati reali.`,
        action: "Controlla concentrazione",
      });
    }

    watchlist.forEach((item) => {
      const set = setMap.get(String(item.setNumber || item.code || "").split("-")[0]);
      if (!set || !item.target) return;
      if (set.currentMarketPrice <= Number(item.target)) {
        alerts.push({
          id: `watch-hit-${set.setNumber}`,
          severity: "high",
          type: "target-hit",
          setNumber: set.setNumber,
          title: `${set.name} ha raggiunto il tuo target`,
          message: `Prezzo ${round(set.currentMarketPrice)} <= target ${round(Number(item.target))}.`,
          action: "Controlla acquisto",
        });
      }
    });

    const priority = { high: 0, medium: 1, low: 2 };
    return alerts.sort((a, b) => priority[a.severity] - priority[b.severity]);
  }

  function generateDailyBrief({ sets = mockQuantSets, positions = [], watchlist = [] } = {}) {
    const opportunities = scanOpportunities(sets);
    const deals = scanDeals(sets);
    const alerts = generateAlerts({ sets, positions, watchlist });
    const portfolio = analyzePortfolio(positions);
    const bestDeal = deals.find((deal) => deal.dealStatus === "below-target") || deals.find((deal) => deal.dealStatus === "near-target");
    const topOpportunity = opportunities[0];
    const highAlerts = alerts.filter((alert) => alert.severity === "high");
    const actions = [];

    if (alerts[0]) actions.push(alerts[0].action);
    if (bestDeal) actions.push(`Verifica prezzo ${bestDeal.setNumber} ${bestDeal.name}`);
    if (portfolio.totals.riskLevel === "high") actions.push("Controlla concentrazione portfolio");
    if (topOpportunity) actions.push(`Studia ${topOpportunity.setNumber} ${topOpportunity.name}`);

    return {
      headline: highAlerts.length ? `${highAlerts.length} alert richiedono attenzione` : "Nessuna emergenza, lavora su target e dati",
      dataMode: sets.some((set) => set.priceSource && set.priceSource !== "mock/stima") ? "imported" : "mock",
      portfolioScore: portfolio.totals.portfolioScore,
      portfolioRisk: portfolio.totals.riskLevel,
      topSet: topOpportunity?.setNumber || "",
      bestDeal: bestDeal?.setNumber || "",
      actions: [...new Set(actions)].slice(0, 4),
      notes: [
        "Il brief e rule-based e deve essere validato con prezzi reali.",
        portfolio.totals.riskLevel === "high" ? "Rischio portfolio alto: controlla concentrazione e posizioni deboli." : "Rischio portfolio non critico con i dati attuali.",
      ],
    };
  }

  function monitorProviderHealth(snapshots = []) {
    const providers = ["BrickLink", "BrickEconomy", "eBay sold", "LEGO catalog", "CSV import", "Mock/Stima"];
    return providers.map((provider) => {
      const rows = snapshots.filter((snapshot) => getSourceType(snapshot.source || snapshot.priceSource) === provider);
      const avgConfidence = rows.length ? rows.reduce((sum, row) => sum + calculateSourceConfidence({ ...row, priceSource: row.source, lastUpdated: row.capturedAt }), 0) / rows.length : 0;
      const newest = rows.map((row) => row.capturedAt || row.lastUpdated).filter(Boolean).sort().at(-1) || "";
      const freshnessScore = newest ? calculateFreshnessScore(newest) : 0;
      return {
        provider,
        status: rows.length ? (avgConfidence >= 70 && freshnessScore >= 58 ? "healthy" : "weak") : "missing",
        observations: rows.reduce((sum, row) => sum + Number(row.soldCount || row.listingCount || row.observations || 0), 0),
        confidence: round(avgConfidence),
        freshnessScore,
        lastUpdated: newest || null,
      };
    });
  }

  function scanAdvancedOpportunities(sets = mockQuantSets, options = {}) {
    return scanOpportunities(sets, options).map((set) => ({
      ...set,
      rankingScore: round(
        set.investmentScore * 0.42 +
          set.valuation.confidence * 0.18 +
          set.liquidityScore * 0.14 +
          set.retirementProximityScore * 0.12 +
          Math.max(0, -set.premiumVsRetail) * 0.14,
      ),
      flags: [
        set.premiumVsRetail < -5 ? "undervalued" : "",
        set.availabilityStatus === "retiringSoon" ? "retiring soon" : "",
        set.cagr > 8 ? "strong historical performer" : "",
        set.demandScore >= 80 ? "high demand" : "",
        set.rarityScore >= 72 ? "low supply" : "",
      ].filter(Boolean),
    })).sort((a, b) => b.rankingScore - a.rankingScore);
  }

  const api = {
    CURRENT_YEAR,
    mockQuantSets,
    DEFAULT_SCORE_WEIGHTS,
    normalizeSet,
    normalizeCondition,
    getConditionValueFactor,
    normalizeScoreWeights,
    normalizePriceSnapshot,
    calculateCagr,
    calculateFeatures,
    calculateDataQualityScore,
    calculateFreshnessScore,
    calculateSourceConfidence,
    buildValuationMeta,
    monitorProviderHealth,
    calculateScoreBreakdown,
    calculateInvestmentScore,
    calculateRiskLevel,
    shouldBlockForecast,
    forecastSet,
    generateDecision,
    scanOpportunities,
    scanAdvancedOpportunities,
    scanDeals,
    runBacktest,
    explainSet,
    analyzePortfolio,
    generateAlerts,
    generateDailyBrief,
  };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  global.LegoQuantAI = api;
})(typeof window !== "undefined" ? window : globalThis);
