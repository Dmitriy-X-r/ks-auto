import {apiFetch} from "@/lib/api/http";
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { CatalogCard, mapTop100 } from '@/lib/mappers/mapTop100';

export interface GetAdsParams {
    page?: number;
    pageSize?: number;
    premium?: boolean;
}

export async function getLastAds({ page = 1, pageSize = 11, premium = false }: GetAdsParams = {}): Promise<CatalogCard[]> {
    const response = await apiFetch<{ result: { products: any[] } }>(API_ENDPOINTS.get_last_ads, {
        params: {
            type: 'car',
            device_: 'next',
            app_version: '0.9.0',
            'nav[iNumPage]': page,
            'nav[nPageSize]': pageSize,
            ...(premium
                ? { 'filter[!PROPERTY_PRODVIGENIE_I]': 'false', 'order[PROPERTY_PRODVIGENIE_I]': 'desc' }
                : { 'filter[PROPERTY_PRODVIGENIE_I]': 'false', 'order[ACTIVE_FROM]': 'desc' }),
        },
    });

    // Универсальный маппер
    return response.result.products.map(mapTop100);
}
