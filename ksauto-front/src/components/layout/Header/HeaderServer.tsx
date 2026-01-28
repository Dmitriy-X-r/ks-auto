import Header from "./Header";
import { mapHeaderMenu } from "@/lib/mappers/mapHeaderMenu";
import type { HeaderMenuResponse } from "@/lib/api/headerMenu";
import { headers } from "next/headers";
import { BASE_PATH } from "@/lib/basePath";

export const dynamic = "force-dynamic";

function getOrigin(h: Headers) {
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const fallbackHost = `localhost:${process.env.PORT || 3000}`;
  return `${proto}://${host ?? fallbackHost}`;
}

export default async function HeaderServer() {
  const h = await headers();
  const origin = getOrigin(h);

  const url = new URL(`/next_main/api/header-menu`, origin);

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) return <Header catalogsData={[]} />;

  const data: HeaderMenuResponse = await res.json();
  const catalogsData = (data.result || []).map(mapHeaderMenu);

  return <Header catalogsData={catalogsData} />;
}