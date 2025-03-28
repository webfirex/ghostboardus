import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    const symbol = id;

    // Construct the external API URL
    const url = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=wRyvg5z5qdd5lqbs4ProV1OMkOFFDUu3`;

    // Fetch data from the external API
    const externalResponse = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (externalResponse.status === 204) {
      return NextResponse.json({
        result: [],
        success: false,
        errors: null,});
    }

    const data = await externalResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
