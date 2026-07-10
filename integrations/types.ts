export type AvailabilityStatus = "active" | "retiringSoon" | "retired";

export interface LegoSetRecord {
  setNumber: string;
  name: string;
  theme: string;
  subtheme?: string;
  releaseYear?: number;
  retirementYear?: number | null;
  retailPrice?: number;
  pieceCount?: number;
  minifigCount?: number;
  exclusiveMinifigCount?: number;
  availabilityStatus?: AvailabilityStatus;
  imageUrl?: string;
  source: string;
  lastUpdated: string;
}

export interface PriceSnapshot {
  setNumber: string;
  currency: "EUR" | "USD" | "GBP";
  retailPrice?: number;
  currentMarketPrice?: number;
  sealedPrice?: number;
  usedPrice?: number;
  soldCount?: number;
  listingCount?: number;
  source: string;
  capturedAt: string;
}

export interface MarketHistoryPoint {
  setNumber: string;
  date: string;
  sealedPrice?: number;
  usedPrice?: number;
  volume?: number;
  source: string;
}

export interface FetchSetsOptions {
  query?: string;
  theme?: string;
  updatedAfter?: string;
  limit?: number;
}

export interface FetchPricesOptions {
  setNumbers: string[];
  currency?: "EUR" | "USD" | "GBP";
  condition?: "sealed" | "used" | "all";
}

export interface LegoMarketConnector {
  fetchSets(options?: FetchSetsOptions): Promise<LegoSetRecord[]>;
  fetchPrices(options: FetchPricesOptions): Promise<PriceSnapshot[]>;
  fetchMarketHistory(setNumber: string): Promise<MarketHistoryPoint[]>;
}

export interface ConnectorConfig {
  apiKey?: string;
  apiSecret?: string;
  baseUrl?: string;
  rateLimitMs?: number;
}

export class ConnectorError extends Error {
  constructor(
    message: string,
    public readonly source: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "ConnectorError";
  }
}

export async function waitForRateLimit(ms = 1000): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
