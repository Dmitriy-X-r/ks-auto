// src/app/api/news/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getNews, NewsApiResponse } from '@/lib/api/news';

export async function GET(req: NextRequest) {
    try {
        // Можно добавить параметры из запроса, если нужно пагинировать
        const url = new URL(req.url);
        const page = Number(url.searchParams.get('page') || 1);
        const pageSize = Number(url.searchParams.get('pageSize') || 5);

        const data: NewsApiResponse = await getNews(); // здесь можно передавать page и pageSize, если getNews поддерживает

        return NextResponse.json(data);
    } catch (e) {
        console.error('Route /api/news error:', e);
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}
