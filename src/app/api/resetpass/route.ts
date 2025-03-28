import { NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { encodeUserId } from '@/utils/tools/idEncoder';
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
      const {email, otp} = await req.json();

      if (!email) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
      }

      const existingUserQuery = `SELECT id FROM users WHERE email = $1`;
      const user = await db.query(existingUserQuery, [email]);

      if (user.rows.length <= 0) {
        return NextResponse.json({ error: 'Invalid' }, { status: 400 });
      }

      const { id } = user.rows[0];

      const transporter = nodemailer.createTransport({
          host: "smtp.zoho.com",
          port: 465,
          secure: true,
          auth: {
              user: 'support@ghostboard.net',
              pass: '2tU5mNc613La',
          },
      });

      const mailOptions = {
          from: 'support@ghostboard.net',
          to: email,
          subject: 'GHOSTBOARD - Passowrd Reset Email',
          text: `Your Password Reset OTP is ${otp}`,
      };

      await transporter.sendMail(mailOptions);
  
      return NextResponse.json({ message: 'Email Sent Successfully' });
    } catch (error: any) {
      console.error(error);
      return NextResponse.json({ error: 'Something went wrong', message: error.message }, { status: 500 });
    }
}