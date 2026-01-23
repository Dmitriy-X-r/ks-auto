// src/lib/api/news.ts
import { apiFetch } from './http'
import { API_ENDPOINTS } from './endpoints'

export interface NewsApiItemRaw {
    ID: string
    NAME: string
    CODE: string
    SHOW_COUNTER: string | null
    PREVIEW_TEXT: string
    PREVIEW_PICTURE: string
    DATE_ACTIVE_FROM: string
    TIME_READING: string
    CARS: string[]
}

export interface NewsApiResponse {
    result: NewsApiItemRaw[]
}

export async function getNews() {
    return apiFetch<NewsApiResponse>(API_ENDPOINTS.news, {
        params: {
            'nav[iNumPage]': 1,
            'nav[nPageSize]': 5,
            'order[name]': 'asc',
            app_version: '0.9',
        },
    })
}