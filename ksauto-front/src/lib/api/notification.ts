import { apiFetch } from "./http";

import { API_ENDPOINTS } from "./endpoints";
import {mapNotification, NotificationApiItemRaw, NotificationUIItem} from "@/lib/mappers/mapNotification";
import {getAuthToken} from "@/lib/auth/getAuthToken";



export async function getNotifications(token_?: string): Promise<NotificationUIItem[]> {
    const t = token_ ?? getAuthToken();
    if (!t || t === "not_found") return [];

    const response = await apiFetch<{ result: Record<string, NotificationApiItemRaw> }>(
        API_ENDPOINTS.get_notifications,
        { params: { token_: t, app_version: "0.9.0" } }
    );
    const itemsRaw = Object.values(response.result || {});
    return itemsRaw.map(mapNotification);
}
export async function updateNotificationRead(el_id: number | string, read: boolean, token_?: string) {
    const t = token_ ?? getAuthToken();
    if (!t || t === "not_found") return false;

    try {
        await apiFetch(API_ENDPOINTS.update_notification, {
            params: {
                token_: t,
                app_version: "0.9.0",
                el_id,
                read: read ? 1 : "",
            },
        });
        return true;
    } catch (err) {
        console.error("Failed to update notification read status:", err);
        return false;
    }
}
export async function deleteNotification(el_id?: number | string, all?: boolean, token_?: string) {
    const t = token_ ?? getAuthToken();
    if (!t || t === "not_found") return false;

    try {
        await apiFetch(API_ENDPOINTS.delete_notifications, {
            params: {
                token_: t,
                app_version: "0.9.0",
                ...(all ? { all: 1 } : {}),
                ...(el_id ? { el_id } : {}),
            },
        });
        return true;
    } catch (err) {
        console.error("Failed to delete notification(s):", err);
        return false;
    }
}

