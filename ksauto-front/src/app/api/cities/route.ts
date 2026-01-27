import { NextResponse } from "next/server";
import { getCities } from "@/lib/api/cities";

export async function GET() {
  try {
    const data = await getCities();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ result: [] }, { status: 500 });
  }
}