import { apiFetch } from "./http";
import { API_ENDPOINTS } from "./endpoints";

export interface CityResponse {
    result: string[];
}

export function getCities() {
    return apiFetch<CityResponse>(API_ENDPOINTS.search_city, {
        params: {
            device_: "next",
            app_version: "0.9.0",
        },
    });
}