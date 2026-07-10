const assert = require("node:assert/strict");
const test = require("node:test");
const quant = require("../quant-engine");

test("normalizes catalog and market fields into a Quant set", () => {
  const normalized = quant.normalizeSet({
    code: "99999",
    name: "Test Set",
    year: "2024",
    retail: "99.99",
    price: "120",
    parts: "1000",
  });

  assert.equal(normalized.setNumber, "99999");
  assert.equal(normalized.releaseYear, 2024);
  assert.equal(normalized.retailPrice, 99.99);
  assert.equal(normalized.currentMarketPrice, 120);
  assert.equal(normalized.pieceCount, 1000);
});

test("normalizes external price snapshots for Quant records", () => {
  const normalized = quant.normalizePriceSnapshot(
    { setNumber: "75313", name: "AT-AT", retailPrice: 849.99, currentMarketPrice: 812 },
    { sealedPrice: 900, usedPrice: 720, soldCount: 9, listingCount: 12, source: "CSV eBay sold", capturedAt: "2026-06-10" },
  );

  assert.equal(normalized.currentMarketPrice, 900);
  assert.equal(normalized.sealedPrice, 900);
  assert.equal(normalized.usedPrice, 720);
  assert.equal(normalized.priceSource, "CSV eBay sold");
  assert.equal(normalized.lastUpdated, "2026-06-10");
  assert.ok(normalized.liquidityScore > 0);
});

test("calculates an investment score between 0 and 100", () => {
  const score = quant.calculateInvestmentScore(quant.mockQuantSets[0]);
  assert.ok(score >= 0);
  assert.ok(score <= 100);
  assert.ok(score > 65);
});

test("score breakdown exposes factor contributions and normalized weights", () => {
  const breakdown = quant.calculateScoreBreakdown(quant.mockQuantSets[0], { demand: 10, liquidity: 5 });
  const weightTotal = breakdown.factors.reduce((sum, factor) => sum + factor.weight, 0);

  assert.ok(breakdown.score >= 0);
  assert.ok(breakdown.factors.length >= 5);
  assert.ok(Math.abs(weightTotal - 1) < 0.001);
  assert.ok(breakdown.factors.every((factor) => Number.isFinite(factor.contribution)));
});

test("data quality score rewards real sources and historical coverage", () => {
  const weak = quant.calculateDataQualityScore({ setNumber: "A", currentMarketPrice: 100, priceSource: "mock/stima" });
  const strong = quant.calculateDataQualityScore({
    setNumber: "B",
    retailPrice: 100,
    currentMarketPrice: 130,
    sealedPrice: 130,
    usedPrice: 95,
    liquidityScore: 80,
    priceSource: "BrickLink CSV",
    historicalPrices: [
      { year: 2023, price: 100 },
      { year: 2024, price: 115 },
      { year: 2025, price: 130 },
    ],
  });

  assert.ok(strong > weak);
  assert.ok(strong <= 100);
});

test("normalizes item condition labels", () => {
  assert.equal(quant.normalizeCondition("sealed damaged box"), "sealed-damaged-box");
  assert.equal(quant.normalizeCondition("used incomplete"), "used-incomplete");
  assert.equal(quant.normalizeCondition("Sigillato"), "sealed-mint");
  assert.ok(quant.getConditionValueFactor("used complete") < 1);
});

test("forecast engine returns horizons, ROI, action and targets", () => {
  const forecast = quant.forecastSet(quant.mockQuantSets[0]);
  assert.ok(forecast.forecast12M > 0);
  assert.ok(forecast.forecast3Y >= forecast.forecast12M);
  assert.ok(forecast.forecast5Y >= forecast.forecast3Y);
  assert.ok(forecast.forecastIntervals.oneYear.low <= forecast.forecastIntervals.oneYear.base);
  assert.ok(forecast.forecastIntervals.fiveYears.high >= forecast.forecastIntervals.fiveYears.base);
  assert.ok(forecast.valuation.source);
  assert.ok(Number.isFinite(forecast.valuation.confidence));
  assert.match(forecast.action, /buy|watch|avoid/);
  assert.ok(forecast.targetBuyPrice > 0);
  assert.ok(forecast.targetSellPrice > 0);
});

test("decision engine emits user-facing action, confidence, upside and downside", () => {
  const decision = quant.generateDecision({
    ...quant.mockQuantSets[0],
    priceSource: "BrickLink sold",
    observations: 12,
    lastUpdated: new Date().toISOString().slice(0, 10),
  });

  assert.match(decision.decision, /BUY|HOLD|SELL|AVOID/);
  assert.ok(decision.confidence >= 0);
  assert.ok(Number.isFinite(decision.expectedUpside));
  assert.ok(Number.isFinite(decision.expectedDownside));
  assert.ok(decision.explanation.length > 10);
  assert.ok(Array.isArray(decision.risks));
});

test("opportunity scanner ranks sets by investment score and labels categories", () => {
  const opportunities = quant.scanOpportunities();
  assert.ok(opportunities.length > 0);
  assert.ok(opportunities[0].investmentScore >= opportunities.at(-1).investmentScore);
  assert.match(opportunities[0].category, /Strong Buy|Watchlist|Avoid|High Risk/);
  assert.ok(opportunities[0].reasons.includes(opportunities[0].setNumber));
});

test("deal scanner classifies buy targets and overheated sets", () => {
  const deals = quant.scanDeals([
    { ...quant.mockQuantSets[0], currentMarketPrice: 700, retailPrice: 849.99, priceSource: "CSV" },
    { ...quant.mockQuantSets[1], currentMarketPrice: 1200, retailPrice: 849.99, priceSource: "CSV" },
  ]);

  assert.equal(deals[0].dealStatus, "below-target");
  assert.ok(deals[0].marginOfSafety > 0);
  assert.ok(deals.some((deal) => deal.dealStatus === "overheated"));
  assert.ok(deals.every((deal) => deal.dealLabel));
});

test("alert engine combines deals, watchlist and portfolio risk", () => {
  const sets = [
    { ...quant.mockQuantSets[0], currentMarketPrice: 700, retailPrice: 849.99, priceSource: "CSV" },
    { ...quant.mockQuantSets[1], currentMarketPrice: 1200, retailPrice: 849.99, priceSource: "CSV" },
  ];
  const alerts = quant.generateAlerts({
    sets,
    positions: [{ set: sets[1], qty: 2, paidPrice: 849.99 }],
    watchlist: [{ code: "75313", target: 720 }],
  });

  assert.ok(alerts.length > 0);
  assert.equal(alerts[0].severity, "high");
  assert.ok(alerts.some((alert) => alert.type === "target-hit"));
  assert.ok(alerts.every((alert) => alert.title && alert.message && alert.action));
});

test("daily brief returns headline, actions and portfolio posture", () => {
  const brief = quant.generateDailyBrief({
    sets: [
      { ...quant.mockQuantSets[0], currentMarketPrice: 700, retailPrice: 849.99, priceSource: "CSV" },
      { ...quant.mockQuantSets[1], currentMarketPrice: 1200, retailPrice: 849.99, priceSource: "CSV" },
    ],
    positions: [{ set: quant.mockQuantSets[1], qty: 1, paidPrice: 849.99 }],
    watchlist: [{ code: "75313", target: 720 }],
  });

  assert.ok(brief.headline);
  assert.ok(Array.isArray(brief.actions));
  assert.ok(brief.actions.length > 0);
  assert.match(brief.dataMode, /imported|mock/);
  assert.ok(brief.portfolioRisk);
});

test("backtesting returns model accuracy and diagnostics", () => {
  const backtest = quant.runBacktest();
  assert.ok(backtest.accuracyScore >= 0);
  assert.ok(backtest.accuracyScore <= 100);
  assert.ok(Array.isArray(backtest.topMissedOpportunities));
  assert.ok(Array.isArray(backtest.falsePositives));
  assert.ok(Array.isArray(backtest.bestPerformingThemes));
  assert.ok(backtest.modelNotes.length > 0);
});

test("risk calculation reacts to volatility, premium and liquidity", () => {
  const lowRisk = quant.calculateRiskLevel({
    setNumber: "LOW",
    retailPrice: 100,
    currentMarketPrice: 90,
    liquidityScore: 95,
    volatilityScore: 15,
  });
  const highRisk = quant.calculateRiskLevel({
    setNumber: "HIGH",
    retailPrice: 100,
    currentMarketPrice: 190,
    liquidityScore: 20,
    volatilityScore: 95,
  });

  assert.equal(lowRisk, "low");
  assert.equal(highRisk, "high");
});

test("portfolio analysis returns weighted score, theme exposure and recommendations", () => {
  const analysis = quant.analyzePortfolio([
    { set: quant.mockQuantSets[0], qty: 1, paidPrice: 760 },
    { set: quant.mockQuantSets[1], qty: 2, paidPrice: 849.99 },
  ]);

  assert.equal(analysis.rows.length, 2);
  assert.ok(analysis.totals.current > 0);
  assert.ok(analysis.totals.forecast5Y >= analysis.totals.current);
  assert.ok(analysis.totals.portfolioScore > 0);
  assert.ok(Number.isFinite(analysis.totals.annualizedReturn));
  assert.ok(analysis.totals.diversificationScore >= 0);
  assert.ok(analysis.totals.bestPerformer);
  assert.ok(analysis.totals.worstPerformer);
  assert.ok(analysis.themeExposure.length > 0);
  assert.ok(analysis.recommendations.length > 0);
  assert.match(analysis.rows[0].portfolioAction, /hold-add|hold|trim|exit-watch|watch/);
});

test("portfolio analysis does not trim quality flagship sets only because they are large", () => {
  const analysis = quant.analyzePortfolio([
    {
      set: {
        setNumber: "10294",
        name: "Titanic",
        theme: "Icons",
        subtheme: "Ships",
        releaseYear: 2021,
        retirementYear: 2026,
        retailPrice: 679.99,
        currentMarketPrice: 720,
        sealedPrice: 720,
        usedPrice: 560,
        pieceCount: 9090,
        liquidityScore: 72,
        demandScore: 86,
        rarityScore: 68,
        volatilityScore: 36,
        investmentScore: 70,
        riskLevel: "high",
        action: "avoid",
      },
      qty: 2,
      paidPrice: 620,
      condition: "sealed mint",
    },
  ]);

  assert.match(analysis.rows[0].portfolioAction, /hold|hold-add|watch/);
  assert.notEqual(analysis.rows[0].portfolioAction, "trim");
  assert.notEqual(analysis.rows[0].portfolioAction, "exit-watch");
});

test("provider health monitor and advanced scanner expose source status and ranking", () => {
  const health = quant.monitorProviderHealth([
    { setNumber: "75313", source: "BrickLink sold", capturedAt: new Date().toISOString().slice(0, 10), soldCount: 10, sealedPrice: 800, usedPrice: 700 },
    { setNumber: "10294", source: "eBay sold", capturedAt: "2025-01-01", soldCount: 2, sealedPrice: 700 },
  ]);
  const bricklink = health.find((row) => row.provider === "BrickLink");
  const ranked = quant.scanAdvancedOpportunities([
    { ...quant.mockQuantSets[0], priceSource: "BrickLink sold", observations: 10, lastUpdated: new Date().toISOString().slice(0, 10) },
    quant.mockQuantSets[1],
  ]);

  assert.ok(bricklink);
  assert.match(bricklink.status, /healthy|weak|missing/);
  assert.ok(ranked[0].rankingScore >= ranked.at(-1).rankingScore);
  assert.ok(Array.isArray(ranked[0].flags));
});

test("portfolio analysis discounts non-mint conditions", () => {
  const sealed = quant.analyzePortfolio([{ set: quant.mockQuantSets[0], qty: 1, paidPrice: 760, condition: "sealed mint" }]);
  const used = quant.analyzePortfolio([{ set: quant.mockQuantSets[0], qty: 1, paidPrice: 760, condition: "used complete" }]);

  assert.ok(used.totals.current < sealed.totals.current);
  assert.ok(used.rows[0].conditionFactor < sealed.rows[0].conditionFactor);
});
