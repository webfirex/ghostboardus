import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Parse query parameters from the request URL
    const { searchParams } = new URL(request.url);

    const symbol = searchParams.get('symbol') || 'null';
    const putOption = searchParams.get('putOption') === 'true';
    const callOption = searchParams.get('callOption') === 'true';
    const repeatEtf = searchParams.get('repeatEtf') === 'true';
    const repeatOption = searchParams.get('repeatOption') === 'true';
    const heavyOption = searchParams.get('heavyOption') === 'true';
    const goldenColor = searchParams.get('goldenColor') === 'true';

    // Construct the external API URL
    let url = `https://testapi.webepex.com/ghostboard/dashboard/flowai/flowai.php?symbol=${symbol}`;

    if (putOption) url += '&PUT';
    if (callOption) url += '&CALL';
    if (repeatEtf) url += '&repeatEtf';
    if (repeatOption) url += '&repeat';
    if (heavyOption) url += '&heavy';
    if (goldenColor) url += '&golden';

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
