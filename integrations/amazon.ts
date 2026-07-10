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

export class AmazonConnector implements LegoMarketConnector {
  private readonly source = "amazon";
  private readonly accessKey?: string;
  private readonly secretKey?: string;
  private readonly partnerTag?: string;
  private readonly baseUrl: string;
  private readonly rateLimitMs: number;

  constructor(config: ConnectorConfig = {}) {
    this.accessKey = config.apiKey || process.env.AMAZON_ACCESS_KEY;
    this.secretKey = config.apiSecret || process.env.AMAZON_SECRET_KEY;
    this.partnerTag = process.env.AMAZON_PARTNER_TAG;
    this.baseUrl = config.baseUrl || "https://webservices.amazon.it/paapi5";
    this.rateLimitMs = config.rateLimitMs ?? 1600;
  }

  async fetchSets(_options: FetchSetsOptions = {}): Promise<LegoSetRecord[]> {
    throw new ConnectorError("Amazon is not an official LEGO catalog source. Use it for retail availability and price checks.", this.source);
  }

  async fetchPrices(_options: FetchPricesOptions): Promise<PriceSnapshot[]> {
    if (!this.accessKey || !this.secretKey || !this.partnerTag) {
      throw new ConnectorError("Missing Amazon Product Advertising credentials", this.source);
    }
    await waitForRateLimit(this.rateLimitMs);
    throw new ConnectorError("Amazon retail price adapter is not wired yet.", this.source);
  }

  async fetchMarketHistory(_setNumber: string): Promise<MarketHistoryPoint[]> {
    throw new ConnectorError("Amazon does not provide reliable historical sold-price data through this adapter.", this.source);
  }
}
