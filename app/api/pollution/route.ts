import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OWM_KEY;

    const lat = 40.7128;
    const lon = -74.006;

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const response = await axios.get(url);

    return NextResponse.json(response.data);
  } catch (error) {
     console.log("Error Fetching Pollution Data");
     return new Response("Error Fetching Pollution Data", { status: 500 });
  }
}
