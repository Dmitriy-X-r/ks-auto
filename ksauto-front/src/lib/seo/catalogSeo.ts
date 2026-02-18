import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_MAIN_DOMAIN || "https://ks-auto.ru";

export type CatalogType = "cars" | "moto" | "spec";

/**
 * Ответ будущего SEO endpoint.
 * Когда будет готов API — заменить вызов в getCatalogSeo на fetch этого формата.
 */
export interface CatalogSeoPayload {
  title: string;
  description: string;
  /** Относительный путь для canonical, например /catalog/cars/ */
  canonicalPath: string;
  /** H1 на странице */
  h1?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
  };
  /** Доп. мета (keywords и т.д.) */
  meta?: Record<string, string>;
}

/**
 * Строит canonical URL без query (фильтры не попадают в canonical).
 */
function buildCanonical(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`.replace(/\/$/, "") + "/";
}

/**
 * Возвращает SEO-данные для каталога.
 * Сейчас — статические заглушки. Когда будет готов endpoint (API_ENDPOINTS.catalog_seo):
 *
 *   import { API_ENDPOINTS } from '@/lib/api/endpoints';
 *   const url = `${API_ENDPOINTS.catalog_seo}?type=${type}&category=${category ?? ''}`;
 *   const res = await fetch(url);
 *   if (!res.ok) return { ...defaults[type], canonicalPath: path, ... };
 *   const payload: CatalogSeoPayload = await res.json();
 *   return { ...payload, canonicalPath: payload.canonicalPath ?? path };
 */
export async function getCatalogSeo(
  type: CatalogType,
  options?: {
    category?: string | null;
    searchParams?: Record<string, string | string[] | undefined>;
  }
): Promise<CatalogSeoPayload> {
  const { category = null } = options ?? {};
  const path = category
    ? `/catalog/${type}/${encodeURIComponent(category)}`
    : `/catalog/${type}`;

  // Статические заглушки; после подключения API — удалить и брать из ответа
  const defaults: Record<CatalogType, { title: string; description: string; h1: string }> = {
    cars: {
      title: "Купить автомобиль в России",
      description: "Каталог автомобилей с ценами, фильтрацией и актуальными предложениями.",
      h1: "Автомобили",
    },
    moto: {
      title: "Купить мототехнику",
      description: "Каталог мотоциклов и мототехники с ценами и актуальными объявлениями.",
      h1: "Мототехника",
    },
    spec: {
      title: "Спецтехника — каталог",
      description: "Каталог спецтехники: строительная, дорожная, сельхозтехника и др.",
      h1: "Спецтехника",
    },
  };

  const d = defaults[type];
  const categoryLabel = category ? ` — ${decodeURIComponent(category)}` : "";

  return {
    title: d.title + categoryLabel,
    description: d.description,
    canonicalPath: path,
    h1: d.h1 + categoryLabel,
    openGraph: {
      title: d.title + categoryLabel,
      description: d.description,
    },
  };
}

/**
 * Преобразует CatalogSeoPayload в Next.js Metadata для generateMetadata.
 */
export function catalogSeoToMetadata(
  payload: CatalogSeoPayload,
  options?: { page?: number }
): Metadata {
  const pageSuffix = options?.page && options.page > 1 ? ` — страница ${options.page}` : "";
  const title = payload.title + pageSuffix;

  return {
    title,
    description: payload.description,
    alternates: {
      canonical: buildCanonical(payload.canonicalPath),
    },
    openGraph: payload.openGraph
      ? {
          title: payload.openGraph.title ?? title,
          description: payload.openGraph.description ?? payload.description,
          images: payload.openGraph.image ? [payload.openGraph.image] : undefined,
        }
      : undefined,
    ...(payload.meta &&
      Object.keys(payload.meta).length > 0 && {
        other: payload.meta,
      }),
  };
}
