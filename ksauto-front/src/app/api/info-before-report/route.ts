import { NextRequest, NextResponse } from "next/server";
import {
  getInfoBeforeReport,
  InfoBeforeReportResponse,
} from "@/lib/api/infoBeforeReport";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchPhrase = (url.searchParams.get("searchPhrase") || "").trim();

    if (!searchPhrase) {
      // возвращаем как ошибку, но в формате твоего API
      const data: InfoBeforeReportResponse = { result: { ERROR: "Пустой запрос" } };
      return NextResponse.json(data, { status: 400 });
    }

    const data: InfoBeforeReportResponse = await getInfoBeforeReport(searchPhrase);
    return NextResponse.json(data);
  } catch (e) {
    console.error("Route /api/info-before-report error:", e);
    return NextResponse.json(
      { error: "Failed to fetch info before report" },
      { status: 500 }
    );
  }
}