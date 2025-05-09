import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Parse query parameters from the request URL
    const { searchParams } = new URL(request.url);

    const symbol = searchParams.get('symbol')?.toLocaleLowerCase() || 'spx';

    // Construct the external API URL
    const url = `https://testapi.webepex.com/ghostboard/dashboard/gamma/exp/fetch.php?symbol=${symbol}`;

    // Fetch data from the external API
    const externalResponse = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (externalResponse.status === 204) {
      return NextResponse.json({
        result: [],
        success: true,
        errors: null,
        result_info: {
          page: 1,
          pages: 0,
          per_page: 100,
          total_count: 0,
        },
      });
    }

    const data = await externalResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
