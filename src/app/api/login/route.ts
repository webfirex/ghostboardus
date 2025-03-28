import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { encodeUserId } from "@/utils/tools/idEncoder";
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';


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

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Missing" }, { status: 400 });
    }

    const csvData = await checkEmailInCsv(email);

    // Check if the user exists
    const user = await db.query(
      `
      SELECT id, password, status 
      FROM users 
      WHERE email = $1 LIMIT 1
      `,
      [email]
    );

    if (user.rows.length === 0) {
      if (csvData) {
        return NextResponse.json({ success: false, message: "Premium" }, { status: 400 });
      } else {
      return NextResponse.json({ success: false, message: "Invalid" }, { status: 401 }); }
    }

    console.log(user.rows[0])

    const { id, password: hashedPassword, status } = user.rows[0];

    // Verify account status
    if (!status) {
      return NextResponse.json({ success: false, message: "Banned" }, { status: 403 });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Invalid" }, { status: 401 });
    }

    // Generate encoded user ID for cookie
    const encodedUserId = encodeUserId(id);

    // Set the cookie
    const response = NextResponse.json({ success: true, message: "Login successful." });
    response.cookies.set("user_id", encodedUserId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error." + error }, { status: 500 });
  }
}
