import { NextRequest, NextResponse } from "next/server";
import { getLastAds } from "@/lib/api/ads";

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const page = Number(url.searchParams.get("page") || 1);
        const pageSize = Number(url.searchParams.get("pageSize") || 11);
        const premium = url.searchParams.get("premium") === "true";

        // Используем getLastAds для формирования полного URL и params
        const ads = await getLastAds({ page, pageSize, premium });

        return NextResponse.json(ads);
    } catch (e) {
        console.error("Route /api/last-ads error:", e);
        return NextResponse.json({ error: "Failed to fetch ads" }, { status: 500 });
    }
}
