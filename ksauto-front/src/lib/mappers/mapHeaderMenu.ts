import { HeaderMenuItemRaw } from "@/lib/api/headerMenu";

export interface CatalogChildUI {
  href: string;
  label: string;
  picture?: string;
}

export interface CatalogItemUI {
  id: string;
  href: string;
  label: string;
  picture?: string;
  childsTitle?: string;
  childs?: CatalogChildUI[];
}

const MAIN_DOMAIN = process.env.NEXT_PUBLIC_MAIN_DOMAIN || "";

function withDomain(path?: string | null) {
  if (!path) return undefined;
  // если вдруг бэк начнет отдавать абсолютные урлы — не ломаем
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${MAIN_DOMAIN}${path}`;
}

export function mapHeaderMenu(item: HeaderMenuItemRaw): CatalogItemUI {
  return {
    id: item.PARAMS?.SECTION_CODE || item.TEXT,
    href: item.LINK,
    label: item.TEXT,
    picture: withDomain(item.PARAMS?.PICTURE),
    childsTitle: item.PARAMS?.CHILDS_TITLE,
    childs: item.CHILDS?.map((child) => ({
      href: child.LINK,
      label: child.TEXT,
      picture: withDomain(child.PICTURE),
    })),
  };
}