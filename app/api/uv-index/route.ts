import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    const response = await fetch(url, {
      next: { revalidate: 900 },
    });

    const uvData = await response.json();

    return NextResponse.json(uvData);
  } catch (error) {
    console.log("Error Fetching UV Index");
    return new Response("Error Fetching UV Data", { status: 500 });
  }
}
