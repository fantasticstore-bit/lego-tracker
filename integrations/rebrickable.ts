import {
  ConnectorConfig,
  ConnectorError,
  FetchPricesOptions,
  FetchSetsOptions,
  LegoMarketConnector,
  LegoSetRecord,
  MarketHistoryPoint,
  PriceSnapshot,
  waitForRateLimit,
} from "./types";

export class RebrickableConnector implements LegoMarketConnector {
  private readonly source = "rebrickable";
  private readonly apiKey?: string;
  private readonly baseUrl: string;
  private readonly rateLimitMs: number;

  constructor(config: ConnectorConfig = {}) {
    this.apiKey = config.apiKey || process.env.REBRICKABLE_API_KEY;
    this.baseUrl = config.baseUrl || "https://rebrickable.com/api/v3/lego";
    this.rateLimitMs = config.rateLimitMs ?? 1100;
  }

  async fetchSets(_options: FetchSetsOptions = {}): Promise<LegoSetRecord[]> {
    if (!this.apiKey) throw new ConnectorError("Missing REBRICKABLE_API_KEY", this.source);
    await waitForRateLimit(this.rateLimitMs);
    throw new ConnectorError("Rebrickable catalog fetch is not wired yet. Map /sets responses here.", this.source);
  }

  async fetchPrices(_options: FetchPricesOptions): Promise<PriceSnapshot[]> {
    throw new ConnectorError("Rebrickable does not provide pricing data. Use BrickEconomy, BrickLink, BrickOwl, eBay or CSV.", this.source);
  }

  async fetchMarketHistory(_setNumber: string): Promise<MarketHistoryPoint[]> {
    throw new ConnectorError("Rebrickable does not provide market history.", this.source);
  }
}
