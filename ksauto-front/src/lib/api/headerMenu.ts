import { apiFetch } from './http'
import { API_ENDPOINTS } from './endpoints'

/**
 * RAW-структуры — как приходит с бэка
 */
export interface HeaderMenuChildRaw {
    TEXT: string
    LINK: string
    PICTURE: string | null
}

export interface HeaderMenuItemRaw {
    TEXT: string
    LINK: string
    PARAMS?: {
        SECTION_CODE?: string
        CHILDS_TITLE?: string
        PICTURE?: string | null
    }
    CHILDS?: HeaderMenuChildRaw[]
}

export interface HeaderMenuResponse {
    result: HeaderMenuItemRaw[]
}

export function getHeaderMenu() {
    return apiFetch<HeaderMenuResponse>(API_ENDPOINTS.header_menu, {
        params: {
            device_: 'next',
            app_version: '0.9.0',
        },
    })
}