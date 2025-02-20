import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OWM_KEY;

    const searchParams = req.nextUrl.searchParams;

    const city = searchParams.get('search');

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    const response = await axios.get(url);

    return NextResponse.json(response.data);

  } catch (error) {
    console.log("Error Fetching Geocoded Data");
    return new Response("Error Fetching Geocoded Data", { status: 500 });
  }
}
