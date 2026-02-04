import { NextRequest, NextResponse } from "next/server";
import { getFavoriteList, addToFavorite, removeFromFavorite } from "@/lib/api/favorite";
import { getAuthToken } from "@/lib/auth/getAuthToken";

export async function GET(req: NextRequest) {
    try {
        // Получаем токен из заголовка Authorization
        const authHeader = req.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ items: [] });
        }
        const token = authHeader.replace("Bearer ", "");

        const favorites = await getFavoriteList(token);
        return NextResponse.json({ items: favorites });
    } catch (e) {
        console.error("Route /api/favorites GET error:", e);
        return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { action, productId } = await req.json();

        const token = getAuthToken();
        if (!token) {
            return NextResponse.json({ success: false });
        }

        if (action === "add") {
            await addToFavorite(productId, token);
        }

        if (action === "delete") {
            await removeFromFavorite(productId, token);
        }

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json(
            { error: "Failed to update favorite" },
            { status: 500 }
        );
    }
}
