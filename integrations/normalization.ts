import { LegoSetRecord, PriceSnapshot } from "./types";

export interface NormalizedQuantRecord extends LegoSetRecord {
  retailPrice: number;
  currentMarketPrice: number;
  sealedPrice: number;
  usedPrice: number;
  liquidityScore: number;
  priceSource: string;
  lastUpdated: string;
}

export function normalizePriceSnapshot(catalog: LegoSetRecord, snapshot?: PriceSnapshot): NormalizedQuantRecord {
  const retailPrice = Number(snapshot?.retailPrice ?? catalog.retailPrice ?? 0);
  const sealedPrice = Number(snapshot?.sealedPrice ?? snapshot?.currentMarketPrice ?? retailPrice);
  const usedPrice = Number(snapshot?.usedPrice ?? sealedPrice * 0.82);
  const soldCount = Number(snapshot?.soldCount ?? 0);
  const listingCount = Number(snapshot?.listingCount ?? 0);
  const liquidityScore = Math.max(0, Math.min(100, soldCount * 4 + listingCount * 1.2));

  return {
    ...catalog,
    retailPrice,
    currentMarketPrice: sealedPrice,
    sealedPrice,
    usedPrice,
    liquidityScore,
    priceSource: snapshot?.source || catalog.source,
    lastUpdated: snapshot?.capturedAt || catalog.lastUpdated,
  };
}
