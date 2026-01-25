import {API_ENDPOINTS} from "@/lib/api/endpoints";
import {apiFetch} from "@/lib/api/http";

export interface MangoPhoneResponseResult {
    status: 'success' | 'error';
    type: string;
    phone: string | null;
}

export interface MangoPhoneResponse {
    result: MangoPhoneResponseResult;
    time: {
        start: number;
        finish: number;
        duration: number;
        processing: number;
        date_start: string;
        date_finish: string;
    };
}


export async function getMangoPhone(r_num_string: string, user_id: number | string) {
    return apiFetch<MangoPhoneResponse>(API_ENDPOINTS.get_mano, {
        params: {
            r_num_string,
            user_id,
            device_: 'next',
            app_version: '0.9.0',
        },
    });
}