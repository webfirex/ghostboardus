import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { encodeUserId } from "@/utils/tools/idEncoder";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required." }, { status: 400 });
    }

    const admin = await db.query(
      `
      SELECT id, password, status 
      FROM admins 
      WHERE email = $1 AND status = true LIMIT 1
      `,
      [email]
    );

    if (admin.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid email or password." }, { status: 401 });
    }

    console.log(admin.rows[0])

    const { id, password: hashedPassword, status } = admin.rows[0];

    // Verify account status
    if (!status) {
      return NextResponse.json({ success: false, message: "Your account is inactive / Banned. Please contact support." }, { status: 403 });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Invalid email or password." }, { status: 401 });
    }

    // Generate encoded user ID for cookie
    const encodedUserId = encodeUserId(id);

    // Set the cookie
    const response = NextResponse.json({ success: true, message: "Login successful." });
    response.cookies.set("admin_id", encodedUserId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
