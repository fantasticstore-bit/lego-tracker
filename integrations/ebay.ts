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

export class EbayConnector implements LegoMarketConnector {
  private readonly source = "ebay";
  private readonly clientId?: string;
  private readonly clientSecret?: string;
  private readonly baseUrl: string;
  private readonly rateLimitMs: number;

  constructor(config: ConnectorConfig = {}) {
    this.clientId = config.apiKey || process.env.EBAY_CLIENT_ID;
    this.clientSecret = config.apiSecret || process.env.EBAY_CLIENT_SECRET;
    this.baseUrl = config.baseUrl || "https://api.ebay.com";
    this.rateLimitMs = config.rateLimitMs ?? 1400;
  }

  async fetchSets(_options: FetchSetsOptions = {}): Promise<LegoSetRecord[]> {
    throw new ConnectorError("eBay is not an official catalog source. Use it for sold/listing price signals.", this.source);
  }

  async fetchPrices(_options: FetchPricesOptions): Promise<PriceSnapshot[]> {
    if (!this.clientId || !this.clientSecret) throw new ConnectorError("Missing eBay API credentials", this.source);
    await waitForRateLimit(this.rateLimitMs);
    throw new ConnectorError("eBay sold-price search is not wired yet.", this.source);
  }

  async fetchMarketHistory(_setNumber: string): Promise<MarketHistoryPoint[]> {
    if (!this.clientId || !this.clientSecret) throw new ConnectorError("Missing eBay API credentials", this.source);
    await waitForRateLimit(this.rateLimitMs);
    throw new ConnectorError("eBay sold-item history normalization is not wired yet.", this.source);
  }
}
