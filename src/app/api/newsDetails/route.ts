import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: `All fields are required ${id}` }, { status: 400 });
    }

    const response = await fetch(`https://app.quantdata.us/api/news/article/${id}`);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}