import Header from "./Header";
import { mapHeaderMenu } from "@/lib/mappers/mapHeaderMenu";
import type { HeaderMenuResponse } from "@/lib/api/headerMenu";
import { headers } from "next/headers";

export default async function HeaderServer() {
  const h = await headers();
  const host = h.get("host");
  const proto = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${proto}://${host}/api/header-menu`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <Header catalogsData={[]} />;
  }

  const data: HeaderMenuResponse = await res.json();
  const catalogsData = (data.result || []).map(mapHeaderMenu);

  return <Header catalogsData={catalogsData} />;
}