import { NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { encodeUserId } from '@/utils/tools/idEncoder';
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
      const {email} = await req.json();

      if (!email) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
      }

      const existingUserQuery = `SELECT id FROM users WHERE email = $1`;
      const user = await db.query(existingUserQuery, [email]);

      if (user.rows.length <= 0) {
        return NextResponse.json({ error: 'Invalid' }, { status: 400 });
      }

      const { id } = user.rows[0];
      const encodedUserId = encodeUserId(id);

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
      };
      (await cookies()).set('user_id', encodedUserId, cookieOptions);
  
      return NextResponse.json({ message: 'User logged in successfully' });
    } catch (error: any) {
      console.error(error);
      return NextResponse.json({ error: 'Something went wrong', message: error.message }, { status: 500 });
    }
}