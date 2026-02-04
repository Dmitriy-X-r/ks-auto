import { apiFetch } from "@/lib/api/http";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { getAuthToken } from "@/lib/auth/getAuthToken";

export type ProfileMenuApiResponse = {
    status: "auth" | "guest";
    auth_url: string;
    avatar: string;
    user: string;
    type: string;
    id: string;
    data_register: string;
    ads: {
        link: string;
        name: string;
        img: string;
    };
    report: {
        link: string;
        name: string;
        img: string;
    };
    profile: {
        link: string;
        name: string;
        img: string;
    };
    logout: {
        link: string;
        name: string;
        img: string;
    };
    new_car_link: string;
    new_moto_link: string;
    new_spec_link: string;
};

export async function getProfileMenu(token_?: string): Promise<ProfileMenuApiResponse | null> {
    const t = token_ ?? getAuthToken();
    if (!t || t === "not_found") return null;

    const response = await apiFetch<{ result: ProfileMenuApiResponse }>(
        API_ENDPOINTS.get_menu_info,
        {
            params: {
                token_: t,
                app_version: "0.9.0",
                device_: "next",
            },
        }
    );

    return response.result ?? null;
}
