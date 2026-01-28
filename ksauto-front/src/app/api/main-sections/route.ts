import { NextRequest, NextResponse } from "next/server";
import { getMainSection, MainSectionResponse } from "@/lib/api/mainSection";

export async function GET(req: NextRequest) {
  try {
    const data: MainSectionResponse = await getMainSection();
    return NextResponse.json(data);
  } catch (e) {
    console.error("Route /api/main-sections error:", e);
    return NextResponse.json(
      { error: "Failed to fetch main sections" },
      { status: 500 }
    );
  }
}