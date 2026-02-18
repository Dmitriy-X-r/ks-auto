import { Metadata } from "next";
import { getCatalogSeo, catalogSeoToMetadata } from "@/lib/seo/catalogSeo";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";

export const revalidate = 300;

type Props = {
  params: Promise<{ category: string }> | { category: string };
  searchParams: Promise<Record<string, string | undefined>> | Record<string, string | undefined>;
};

async function resolveParams(p: Promise<{ category: string }> | { category: string }) {
  return await Promise.resolve(p);
}
async function resolveSearchParams(p: Promise<Record<string, string | undefined>> | Record<string, string | undefined>) {
  return await Promise.resolve(p);
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { category } = await resolveParams(params);
  const sp = await resolveSearchParams(searchParams);
  const page = sp.page ? Number(sp.page) : undefined;
  const payload = await getCatalogSeo("moto", { category });
  return catalogSeoToMetadata(payload, { page });
}

export default async function MotoCategoryPage(props: Props) {
  const { category } = await resolveParams(props.params);
  const searchParams = await resolveSearchParams(props.searchParams);
  const payload = await getCatalogSeo("moto", { category });

  return (
    <div className="catalog-moto-page catalog-page__inner">
      <h1 className="catalog-page__title">{payload.h1 ?? decodeURIComponent(category)}</h1>

      <div className="catalog-page__content">
        <CatalogFilters
          searchParams={searchParams as import("@/components/catalog/CatalogFilters/types").CatalogSearchParams}
          variant="moto"
        />
        <main className="catalog-page__main">
          <div className="catalog-grid">
            {/* TODO: getMotoByCategory(category, searchParams) */}
          </div>
        </main>
      </div>
    </div>
  );
}
