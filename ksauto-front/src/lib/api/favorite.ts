import { apiFetch } from "@/lib/api/http";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { getAuthToken } from "@/lib/auth/getAuthToken";

// Получение списка избранного
export async function getFavoriteList(token_: string): Promise<string[]> {
    if (!token_) return [];

    const response = await apiFetch<{
        result: { count: number; items: string[] };
    }>(API_ENDPOINTS.get_favorites, {
        params: {
            token_,
            action: "get_list",
            device_: "next",
            app_version: "0.9.0",
        },
    });


    return response.result.items; // уже строки, ничего мапить не нужно
}

// Добавление в избранное
export async function addToFavorite(productId: string | number, token_: string) {
    if (!token_) throw new Error("No auth token");

    return apiFetch(API_ENDPOINTS.get_favorites, {
        params: {
            token_,
            action: "add",
            product_id: productId,
            device_: "next",
            app_version: "0.9.0",
        },
    });
}

export async function removeFromFavorite(productId: string | number, token_: string) {
    if (!token_) throw new Error("No auth token");

    return apiFetch(API_ENDPOINTS.get_favorites, {
        params: {
            token_,
            action: "delete",
            product_id: productId,
            device_: "next",
            app_version: "0.9.0",
        },
    });
}
