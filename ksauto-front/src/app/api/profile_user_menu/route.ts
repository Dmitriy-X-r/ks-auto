import {NextRequest, NextResponse} from "next/server";
import { getProfileMenu } from "@/lib/api/get_profile_menu";

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");

        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ item: null });
        }
        const token = authHeader.replace("Bearer ", "");
        const menu = await getProfileMenu(token);

        return NextResponse.json({ item: menu });
    } catch (e) {
        console.error("Route /api/profile_user_menu GET error:", e);
        return NextResponse.json(
            { error: "Failed to fetch profile menu" },
            { status: 500 }
        );
    }
}