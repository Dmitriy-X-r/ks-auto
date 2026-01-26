// src/lib/mappers/mapNews.ts
import { NewsApiItemRaw } from '@/lib/api/news'

export interface NewsUIItem {
    id: number
    title: string
    date: string
    views: number
    image: string
    link: string
}

export function mapNews(item: NewsApiItemRaw): NewsUIItem {
    return {
        id: Number(item.ID),
        title: item.NAME,
        date: item.DATE_ACTIVE_FROM,
        views: Number(item.SHOW_COUNTER ?? 0),
        image: item.PREVIEW_PICTURE
            ? `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}${item.PREVIEW_PICTURE}`
            : '/images/placeholder.jpg',
        link: `/news/${item.CODE}`,
    }
}
