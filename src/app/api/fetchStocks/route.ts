import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { symbol, page, limit } = await req.json();

    // Construct the external API URL
    const url = `https://testapi.webepex.com/ghostboard/dashboard/stocks/stocks.php?symbol=${symbol}&page=${page}&limit=${limit}`;

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
