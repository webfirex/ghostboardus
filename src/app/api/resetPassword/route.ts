import { NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { id, password } = await req.json();

    if (!id || !password) {
      return NextResponse.json({ error: `All fields are required ${id} ${password}` }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery = `
      UPDATE users SET password = $1 WHERE id = $2
    `;
    await db.query(insertUserQuery, [hashedPassword, id]);

    return NextResponse.json({ message: 'Password Changed successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
