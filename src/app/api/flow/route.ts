import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Parse query parameters from the request URL
    const { searchParams } = new URL(request.url);

    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '50';
    const symbol = searchParams.get('symbol');
    const putOption = searchParams.get('putOption') === 'true';
    const callOption = searchParams.get('callOption') === 'true';
    const yellowColor = searchParams.get('yellowColor') === 'true';
    const whiteColor = searchParams.get('whiteColor') === 'true';
    const magentaColor = searchParams.get('magentaColor') === 'true';
    const aboveAsk = searchParams.get('aboveAsk') === 'true';
    const belowBid = searchParams.get('belowBid') === 'true';
    const atOrAboveAsk = searchParams.get('atOrAboveAsk') === 'true';
    const atOrBelowAsk = searchParams.get('atOrBelowAsk') === 'true';
    const stockSecurity = searchParams.get('stockSecurity') === 'true';
    const ETFSecurity = searchParams.get('ETFSecurity') === 'true';
    const minimumValue = searchParams.get('minimumValue');
    const minimumCValue = searchParams.get('minimumCValue');
    const maximumCValue = searchParams.get('maximumCValue');
    const strikeValue = searchParams.get('strikeValue');
    const inTheMoney = searchParams.get('inTheMoney') === 'true';
    const outTheMoney = searchParams.get('outTheMoney') === 'true';
    const sweepOnly = searchParams.get('sweepOnly') === 'true';
    const weekOnly = searchParams.get('weekOnly') === 'true';

    // Construct the external API URL
    let url = `https://testapi.webepex.com/ghostboard/dashboard/flow/flow.php?page=${page}&pageSize=${pageSize}`;

    if (symbol) url += `&symbol=${symbol}`;
    if (putOption) url += '&PUT';
    if (callOption) url += '&CALL';
    if (yellowColor) url += '&YELLOW';
    if (whiteColor) url += '&WHITE';
    if (magentaColor) url += '&MAGENTA';
    if (aboveAsk) url += '&A';
    if (belowBid) url += '&B';
    if (atOrAboveAsk) url += '&AA';
    if (atOrBelowAsk) url += '&BB';
    if (stockSecurity) url += '&STOCK';
    if (ETFSecurity) url += '&ETF';
    if (minimumValue) url += `&minimumValue=${minimumValue}`;
    if (minimumCValue) url += `&minimumCValue=${minimumCValue}`;
    if (maximumCValue) url += `&maximumCValue=${maximumCValue}`;
    if (strikeValue) url += `&strikeValue=${strikeValue}`;
    if (inTheMoney) url += '&inTheMoney';
    if (outTheMoney) url += '&outTheMoney';
    if (sweepOnly) url += '&sweepOnly';
    if (weekOnly) url += '&weekOnly';

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
