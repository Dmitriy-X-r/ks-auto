import { CatalogCard } from '@/lib/mappers/mapTop100';

export type GridSlot = 'P' | 'O';

export type GridSources = {
    premiumPool: CatalogCard[];
    regularBuffer: CatalogCard[];
};