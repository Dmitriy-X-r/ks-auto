import { HeaderMenuItemRaw } from '@/lib/api/headerMenu'

export interface CatalogChildUI {
    href: string
    label: string
    picture?: string
}

export interface CatalogItemUI {
    id: string
    href: string
    label: string
    picture?: string
    childsTitle?: string
    childs?: CatalogChildUI[]
}

// const API_DOMAIN = 'https://hblocks-test.ru'

const API_DOMAIN = 'https://dev.ks-auto.ru'

export function mapHeaderMenu(item: HeaderMenuItemRaw): CatalogItemUI {
    return {
        id: item.PARAMS?.SECTION_CODE || item.TEXT,
        href: item.LINK,
        label: item.TEXT,
        picture: item.PARAMS?.PICTURE
            ? `${API_DOMAIN}${item.PARAMS.PICTURE}`
            : undefined,
        childsTitle: item.PARAMS?.CHILDS_TITLE,
        childs: item.CHILDS?.map((child) => ({
            href: child.LINK,
            label: child.TEXT,
            picture: child.PICTURE
                ? `${API_DOMAIN}${child.PICTURE}`
                : undefined,
        })),
    }
}