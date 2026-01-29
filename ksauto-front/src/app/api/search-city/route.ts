import { NextRequest, NextResponse } from "next/server";
import { getCities, CityResponse } from "@/lib/api/searchCity"; // импортируем функцию получения данных о городах

export async function GET(req: NextRequest) {
    try {
        const data: CityResponse = await getCities();
        return NextResponse.json(data);  // возвращаем данные о городах
    } catch (e) {
        console.error("Route /api/search-city error:", e);
        return NextResponse.json(
            { error: "Failed to fetch cities" },  // ошибка, если не удалось подгрузить города
            { status: 500 }
        );
    }
}