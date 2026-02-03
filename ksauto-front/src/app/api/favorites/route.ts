import { NextRequest, NextResponse } from "next/server";
import { getFavoriteList, addToFavorite, removeFromFavorite } from "@/lib/api/favorite";
import { getAuthToken } from "@/lib/auth/getAuthToken";

export async function GET() {
    try {
        const token = getAuthToken();
        if (!token) return NextResponse.json({ items: [] });

        const favorites = await getFavoriteList();
        return NextResponse.json({ items: favorites });
    } catch (e) {
        console.error("Route /api/favorites GET error:", e);
        return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action, productId } = body;

        if (!action || !productId) return NextResponse.json({ error: "Missing action or productId" }, { status: 400 });

        const token = getAuthToken();
        if (!token) return NextResponse.json({ error: "No auth token" }, { status: 401 });

        if (action === "add") await addToFavorite(productId,token);
        else if (action === "delete") await removeFromFavorite(productId,token);

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error("Route /api/favorites POST error:", e);
        return NextResponse.json({ error: "Failed to update favorite" }, { status: 500 });
    }
}
