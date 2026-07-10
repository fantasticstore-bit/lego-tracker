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

export class BrickEconomyConnector implements LegoMarketConnector {
  private readonly source = "brickeconomy";
  private readonly apiKey?: string;
  private readonly baseUrl: string;
  private readonly rateLimitMs: number;

  constructor(config: ConnectorConfig = {}) {
    this.apiKey = config.apiKey || process.env.BRICKECONOMY_API_KEY;
    this.baseUrl = config.baseUrl || "https://api.brickeconomy.com";
    this.rateLimitMs = config.rateLimitMs ?? 1500;
  }

  async fetchSets(_options: FetchSetsOptions = {}): Promise<LegoSetRecord[]> {
    if (!this.apiKey) throw new ConnectorError("Missing BRICKECONOMY_API_KEY", this.source);
    await waitForRateLimit(this.rateLimitMs);
    throw new ConnectorError("BrickEconomy set lookup is a future integration placeholder.", this.source);
  }

  async fetchPrices(_options: FetchPricesOptions): Promise<PriceSnapshot[]> {
    if (!this.apiKey) throw new ConnectorError("Missing BRICKECONOMY_API_KEY", this.source);
    await waitForRateLimit(this.rateLimitMs);
    throw new ConnectorError("BrickEconomy price snapshots are not wired yet.", this.source);
  }

  async fetchMarketHistory(_setNumber: string): Promise<MarketHistoryPoint[]> {
    if (!this.apiKey) throw new ConnectorError("Missing BRICKECONOMY_API_KEY", this.source);
    await waitForRateLimit(this.rateLimitMs);
    throw new ConnectorError("BrickEconomy historical price mapping is not wired yet.", this.source);
  }
}
