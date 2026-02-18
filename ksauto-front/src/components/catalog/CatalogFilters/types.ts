/**
 * Параметры фильтров каталога (из URL searchParams).
 */
export interface CatalogSearchParams {
  brand?: string;
  year?: string;
  year_from?: string;
  year_to?: string;
  price_from?: string;
  price_to?: string;
  sort?: string;
  page?: string;
  /** Для spec/moto — категория уже в path */
  [key: string]: string | undefined;
}

/**
 * Опция в селекте фильтра (будут подставляться с API).
 */
export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

/**
 * Секция фильтра (блок: марка, год, цена, сортировка).
 */
export interface FilterSection {
  key: keyof CatalogSearchParams | string;
  label: string;
  options?: FilterOption[];
  type: "select" | "range" | "sort";
  /** для range: min/max придут с API */
  min?: number;
  max?: number;
}
