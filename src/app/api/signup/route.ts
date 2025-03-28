import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { encodeUserId } from '@/utils/tools/idEncoder';
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import Stripe from 'stripe';

interface CsvRow {
  'Customer Email': string;
  'Trial Start (UTC)': string;
  'Trial End (UTC)': string;
  'Current Period Start (UTC)': string;
  'Current Period End (UTC)': string;
  Status: string;
}

async function checkEmailInCsv(email: string): Promise<CsvRow | null> {
  const csvFilePath = path.join(process.cwd(), 'src', 'data', 'users.csv');
  return new Promise((resolve, reject) => {
    const rows: CsvRow[] = [];
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (row) => {
        if (row['Customer Email'].toLowerCase() === email) {
          rows.push(row);
        }
      })
      .on('end', () => resolve(rows[0] || null))
      .on('error', (err) => reject(err));
  });
}

const DiscordCodeGenerator = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const timestamp = Date.now().toString(36);
  const randomChars = Array.from({ length: 3 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('');

  return `${timestamp.slice(-4)}${randomChars}`;
}


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const discordCode = DiscordCodeGenerator()
    const reffcode = (await cookies()).get("reffcode")?.value;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if user exists
    const existingUserQuery = 'SELECT id FROM users WHERE email = $1';
    const existingUserResult = await pool.query(existingUserQuery, [email]);
    if (existingUserResult.rows.length > 0) {
      return NextResponse.json({ error: 'Email' }, { status: 400 });
    }

    // Check CSV for email
    const csvData = await checkEmailInCsv(email);
    let trialdate = null;
    let trialexpdate = null;
    let subdate = null;
    let expdate = null;
    let premium = false;

    if (csvData) {
      const now = new Date();
      
      const parseDate = (dateString: string) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : date;
      };
    
      trialdate = parseDate(csvData['Trial Start (UTC)']);
      trialexpdate = parseDate(csvData['Trial End (UTC)']);
      subdate = parseDate(csvData['Current Period Start (UTC)']);
      expdate = parseDate(csvData['Current Period End (UTC)']);
      premium = expdate ? expdate && expdate > now && csvData.Status === 'active' : false;
    } else {
      await stripe.customers.create({
        name,
        email,
      });
    }
    // else {
    //   return NextResponse.json({ error: 'Testing' }, { status: 400 });
    // }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const insertUserQuery = `
      INSERT INTO users (name, email, password, created_at, trialdate, trialexpdate, subdate, expdate, premium, discord_code, reffcode)
      VALUES ($1, $2, $3, NOW(), $4, $5, $6, $7, $8, $9, $10)
      RETURNING id
    `;

    const newUserResult = await pool.query(insertUserQuery, [
      name,
      email,
      hashedPassword,
      trialdate || null,
      trialexpdate || null,
      subdate || null,
      expdate || null,
      premium,
      discordCode,
      reffcode
    ]);

    const newUserId = newUserResult.rows[0].id;

    // Hash the user ID for the cookie
    const hashedId = encodeUserId(newUserId);

    // Set cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    };
    (await cookies()).set('user_id', hashedId, cookieOptions);

    return NextResponse.json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
