import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OWM_KEY;

    const lat = 40.7128;
    const lon = -74.006;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const response = await axios.get(url);

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("Error Fetching Forecast Data");
    return new Response("Error Fetching Forecast Data", { status: 500 });
  }
}
