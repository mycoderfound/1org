// src/lib/pricing.ts

const BAND = {
  starter: {
    level1: [799, 1799],
    level2: [799, 1799],
    level3: [2499, 5999],
  },
  pro: {
    level1: [799, 1799],
    level2: [799, 1799],
    level3: [2499, 5999],
  },
} as const;

type Band = typeof BAND;
type ModelKey = keyof Band;
type LevelKey<M extends ModelKey> = keyof Band[M];
type PriceTuple = readonly [number, number];

export function priceRange(
  { model, level }: { model: string; level: string }
): { min: number; max: number } {
  const tuple = (BAND as Record<string, Record<string, PriceTuple | undefined>>)
    ?. [model]?.[level];
  if (!tuple) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[pricing] Missing BAND entry for model="${model}" level="${level}". Falling back to 0–0.`);
    }
    return { min: 0, max: 0 };
  }
  const [min, max] = tuple;
  return { min, max };
}