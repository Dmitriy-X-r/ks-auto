import { NextRequest, NextResponse } from "next/server";
import {deleteNotification, getNotifications, updateNotificationRead} from "@/lib/api/notification";

export async function GET(req: NextRequest) {
    try {

        const authHeader = req.headers.get("authorization");

        if (!authHeader?.startsWith("Bearer ")) {
            console.log(12321312);
            return NextResponse.json({ items: [] });
        }
        const token = authHeader.replace("Bearer ", "");
        const notifications = await getNotifications(token);

        return NextResponse.json({ items: notifications });
    } catch (e) {
        console.error("Route /api/notifications GET error:", e);
        return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
    }
}
export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) return NextResponse.json({ success: false });
        const token = authHeader.replace("Bearer ", "");

        const body = await req.json();
        const { action, id, ids, all, read } = body;

        switch (action) {
            case "markAsRead":
                if (id) await updateNotificationRead(id, true, token);
                if (ids?.length) {
                    for (const i of ids) await updateNotificationRead(i, true, token);
                }
                break;

            case "deleteOne":
                if (!id) return NextResponse.json({ success: false }, { status: 400 });
                await deleteNotification(id, false, token);
                break;

            case "deleteAll":
                await deleteNotification(undefined, true, token);
                break;

            default:
                return NextResponse.json({ success: false, error: "Unknown action" }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error("Route /api/notifications POST error:", e);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
