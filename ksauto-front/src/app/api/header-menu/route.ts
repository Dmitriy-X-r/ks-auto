import { NextRequest, NextResponse } from "next/server";
import { getHeaderMenu, HeaderMenuResponse } from "@/lib/api/headerMenu";

export async function GET(req: NextRequest) {
  try {
    const data: HeaderMenuResponse = await getHeaderMenu();
    return NextResponse.json(data);
  } catch (e) {
    console.error("Route /api/header-menu error:", e);
    return NextResponse.json(
      { error: "Failed to fetch header menu" },
      { status: 500 }
    );
  }
}