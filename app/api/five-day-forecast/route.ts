import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OWM_KEY;

    const lat = 40.7128;
    const lon = -74.006;

    const fiveDayForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const fiveDayForecastResponse = await fetch(fiveDayForecastUrl, {
      next: { revalidate: 3600 },
    });

    const fiveDayForecastData = await fiveDayForecastResponse.json();

    return NextResponse.json(fiveDayForecastData);
  } catch (error) {
    console.log("Error In Fetching Daily Weather Data");
    return new Response("Error In Fetching Daily Weather Data", {
      status: 500,
    });
  }
}
