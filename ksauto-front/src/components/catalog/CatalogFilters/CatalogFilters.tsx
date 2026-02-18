"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { CatalogSearchParams, FilterOption } from "./types";
import "./CatalogFilters.css";

const SORT_OPTIONS: FilterOption[] = [
  { value: "", label: "По дате" },
  { value: "price_asc", label: "Сначала дешевле" },
  { value: "price_desc", label: "Сначала дороже" },
  { value: "year_desc", label: "Сначала новее" },
  { value: "year_asc", label: "Сначала старше" },
];

function buildQueryString(
  current: URLSearchParams,
  updates: Partial<Record<string, string>>
): string {
  const next = new URLSearchParams(current.toString());
  for (const [k, v] of Object.entries(updates)) {
    if (v === undefined || v === "") {
      next.delete(k);
    } else {
      next.set(k, v);
    }
  }
  next.delete("page"); // при смене фильтра — на первую страницу
  const q = next.toString();
  return q ? `?${q}` : "";
}

interface CatalogFiltersProps {
  /** Текущие значения из searchParams страницы */
  searchParams: CatalogSearchParams;
  /** Опции для фильтра "Марка" (пока заглушка, потом с API) */
  brandOptions?: FilterOption[];
  /** Годы для фильтра (пока заглушка) */
  yearOptions?: FilterOption[];
  /** Скрыть часть секций для moto/spec при необходимости */
  variant?: "cars" | "moto" | "spec";
}

export function CatalogFilters({
  searchParams,
  brandOptions = [],
  yearOptions = [],
  variant = "cars",
}: CatalogFiltersProps) {
  const pathname = usePathname();
  const current = useSearchParams();
  const router = useRouter();

  const base = pathname ?? "/catalog/cars";
  const brand = searchParams.brand ?? "";
  const year = searchParams.year ?? "";
  const priceFrom = searchParams.price_from ?? "";
  const priceTo = searchParams.price_to ?? "";
  const sort = searchParams.sort ?? "";

  const query = (updates: Partial<Record<string, string>>) =>
    base + buildQueryString(current, updates);

  return (
    <aside className="catalog-filters" aria-label="Фильтры каталога">
      <div className="catalog-filters__sections">
        {/* Марка */}
        {(variant === "cars" && brandOptions.length > 0) && (
          <section className="catalog-filters__section">
            <h3 className="catalog-filters__section-title">Марка</h3>
            <div className="catalog-filters__section-body">
              <select
                className="catalog-filters__select"
                value={brand}
                onChange={(e) => {
                  router.push(query({ brand: e.target.value || undefined }));
                }}
                aria-label="Выберите марку"
              >
                <option value="">Все марки</option>
                {brandOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                    {opt.count != null ? ` (${opt.count})` : ""}
                  </option>
                ))}
              </select>
            </div>
          </section>
        )}

        {/* Год */}
        <section className="catalog-filters__section">
          <h3 className="catalog-filters__section-title">Год</h3>
          <div className="catalog-filters__section-body">
            {yearOptions.length > 0 ? (
              <select
                className="catalog-filters__select"
                value={year}
                onChange={(e) => {
                  router.push(query({ year: e.target.value || undefined }));
                }}
                aria-label="Выберите год"
              >
                <option value="">Любой год</option>
                {yearOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <div className="catalog-filters__range">
                <input
                  type="number"
                  className="catalog-filters__input"
                  placeholder="От"
                  min={1990}
                  max={new Date().getFullYear() + 1}
                  value={searchParams.year_from ?? ""}
                  onChange={(e) => {
                    router.push(query({
                      year_from: e.target.value || undefined,
                      year: undefined,
                    }));
                  }}
                  aria-label="Год от"
                />
                <input
                  type="number"
                  className="catalog-filters__input"
                  placeholder="До"
                  min={1990}
                  max={new Date().getFullYear() + 1}
                  value={searchParams.year_to ?? ""}
                  onChange={(e) => {
                    router.push(query({
                      year_to: e.target.value || undefined,
                      year: undefined,
                    }));
                  }}
                  aria-label="Год до"
                />
              </div>
            )}
          </div>
        </section>

        {/* Цена */}
        <section className="catalog-filters__section">
          <h3 className="catalog-filters__section-title">Цена, ₽</h3>
          <div className="catalog-filters__section-body catalog-filters__range">
            <input
              type="number"
              className="catalog-filters__input"
              placeholder="От"
              min={0}
              value={priceFrom}
              onChange={(e) => {
                router.push(query({ price_from: e.target.value || undefined }));
              }}
              aria-label="Цена от"
            />
            <input
              type="number"
              className="catalog-filters__input"
              placeholder="До"
              min={0}
              value={priceTo}
              onChange={(e) => {
                router.push(query({ price_to: e.target.value || undefined }));
              }}
              aria-label="Цена до"
            />
          </div>
        </section>

        {/* Сортировка */}
        <section className="catalog-filters__section">
          <h3 className="catalog-filters__section-title">Сортировка</h3>
          <div className="catalog-filters__section-body">
            <select
              className="catalog-filters__select"
              value={sort}
              onChange={(e) => {
                router.push(query({ sort: e.target.value || undefined }));
              }}
              aria-label="Сортировка"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value || "default"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </section>
      </div>

      {/* Сброс фильтров */}
      {(brand || year || priceFrom || priceTo || sort || searchParams.year_from || searchParams.year_to) && (
        <Link
          href={base}
          className="catalog-filters__reset"
          scroll={false}
        >
          Сбросить фильтры
        </Link>
      )}
    </aside>
  );
}
