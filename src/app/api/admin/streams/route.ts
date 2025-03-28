import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`https://testapi.webepex.com/ghostboard/dashboard/stream/stream.php`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}