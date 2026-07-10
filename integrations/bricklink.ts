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

export class BrickLinkConnector implements LegoMarketConnector {
  private readonly source = "bricklink";
  private readonly consumerKey?: string;
  private readonly consumerSecret?: string;
  private readonly token?: string;
  private readonly tokenSecret?: string;
  private readonly baseUrl: string;
  private readonly rateLimitMs: number;

  constructor(config: ConnectorConfig = {}) {
    this.consumerKey = config.apiKey || process.env.BRICKLINK_CONSUMER_KEY;
    this.consumerSecret = config.apiSecret || process.env.BRICKLINK_CONSUMER_SECRET;
    this.token = process.env.BRICKLINK_TOKEN;
    this.tokenSecret = process.env.BRICKLINK_TOKEN_SECRET;
    this.baseUrl = config.baseUrl || "https://api.bricklink.com/api/store/v1";
    this.rateLimitMs = config.rateLimitMs ?? 1200;
  }

  async fetchSets(_options: FetchSetsOptions = {}): Promise<LegoSetRecord[]> {
    throw new ConnectorError("BrickLink is intended for marketplace data; use Rebrickable for official catalog normalization.", this.source);
  }

  async fetchPrices(_options: FetchPricesOptions): Promise<PriceSnapshot[]> {
    if (!this.consumerKey || !this.consumerSecret || !this.token || !this.tokenSecret) {
      throw new ConnectorError("Missing BrickLink OAuth credentials", this.source);
    }
    await waitForRateLimit(this.rateLimitMs);
    throw new ConnectorError("BrickLink Price Guide integration is not wired yet.", this.source);
  }

  async fetchMarketHistory(_setNumber: string): Promise<MarketHistoryPoint[]> {
    if (!this.consumerKey || !this.consumerSecret || !this.token || !this.tokenSecret) {
      throw new ConnectorError("Missing BrickLink OAuth credentials", this.source);
    }
    await waitForRateLimit(this.rateLimitMs);
    throw new ConnectorError("BrickLink order/listing history mapping is not wired yet.", this.source);
  }
}
