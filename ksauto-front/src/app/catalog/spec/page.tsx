import { Metadata } from "next";
import { getCatalogSeo, catalogSeoToMetadata } from "@/lib/seo/catalogSeo";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";

export const revalidate = 300;

type SearchParams = {
  brand?: string;
  year?: string;
  year_from?: string;
  year_to?: string;
  price_from?: string;
  price_to?: string;
  sort?: string;
  page?: string;
};

type Props = {
  searchParams: Promise<SearchParams> | SearchParams;
};

async function resolveSearchParams(p: Promise<SearchParams> | SearchParams): Promise<SearchParams> {
  return await Promise.resolve(p);
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await resolveSearchParams(searchParams);
  const page = params.page ? Number(params.page) : undefined;
  const payload = await getCatalogSeo("spec");
  return catalogSeoToMetadata(payload, { page });
}

export default async function SpecPage(props: Props) {
  const searchParams = await resolveSearchParams(props.searchParams);
  const payload = await getCatalogSeo("spec");

  return (
    <div className="catalog-spec-page catalog-page__inner">
      <h1 className="catalog-page__title">{payload.h1 ?? "Спецтехника"}</h1>

      <div className="catalog-page__content">
        <CatalogFilters
          searchParams={searchParams}
          variant="spec"
        />
        <main className="catalog-page__main">
          <div className="catalog-grid">
            {/* TODO: данные из getSpec(searchParams) */}
          </div>
        </main>
      </div>
    </div>
  );
}
