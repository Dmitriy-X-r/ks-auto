import { apiFetch } from './http';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { mapTop100, CatalogCard } from '@/lib/mappers/mapTop100';

export interface Top100ApiItemRaw {
    NAME: string;
    CREATED_BY: string;
    ACTIVE_FROM: string;
    DETAIL_PAGE_URL: string | null;
    PRICE: string;
    CITY?: string | null;
    PHONE?: string | null;
    PRODVIGENIE?: boolean;
    DISPLAY_NAME: string | null;
    TIME_JOB?: string | null;
    CARD_DISPLAY_PROPERTY: string | null;
    PICTURES?: string[] | null;
    CLUB_SERVICE?:string | null;
    CLUB_SERVICE_TEXT?: string | null;
}
interface Top100ApiResponse {
    result: {
        products: Top100ApiItemRaw[];
    };
}

export async function getTop100(params?: {
    iNumPage?: number;
    nPageSize?: number;
    device_?: string;
    app_version?: string;
}): Promise<CatalogCard[]> {
    const response = await apiFetch<Top100ApiResponse>(API_ENDPOINTS.top100, {
        params: {
            'nav[iNumPage]': params?.iNumPage ?? 1,
            'nav[nPageSize]': params?.nPageSize ?? 10,
            device_: params?.device_ ?? 'next',
            app_version: params?.app_version ?? '0.9.0',
        },
    });
    return response.result.products.map(mapTop100);
}
