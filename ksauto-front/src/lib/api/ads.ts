import {apiFetch} from "@/lib/api/http";
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { CatalogCard, mapTop100 } from '@/lib/mappers/mapTop100';

export interface GetAdsParams {
    page?: number;
    pageSize?: number;
    premium?: boolean;
}

export async function getLastAds({
                                     page = 1,
                                     pageSize = 11,
                                     premium = false,
                                 }: GetAdsParams = {}): Promise<CatalogCard[]> {
    // базовые параметры
    const params: Record<string, any> = {
        type: 'car',
        device_: 'next',
        app_version: '0.9.0',
        'nav[iNumPage]': page,
        'nav[nPageSize]': pageSize,
    };

    // фильтр и сортировка
    let url = API_ENDPOINTS.get_last_ads;
    if (premium) {
        url += '?filter[!PROPERTY_PRODVIGENIE_I]=false';
        params['order[PROPERTY_PRODVIGENIE_I]'] = 'desc';
    } else {
        params['filter[PROPERTY_PRODVIGENIE_I]'] = 'false';
        params['order[ACTIVE_FROM]'] = 'desc';
    }

    const response = await apiFetch<{ result: { products: any[] } }>(url, { params });

    return response.result.products.map(mapTop100);
}
export async function getLastAdsClient({
                                           page = 1,
                                           pageSize = 11,
                                           premium = false
                                       }) {

    const res = await fetch(`/next_main/api/last-ads?page=${page}&pageSize=${pageSize}&premium=${premium}`);
    // /next_main
    if (!res.ok) throw new Error("Failed to fetch last ads from proxy");
    return res.json();
}