import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
    const user = await db.query("SELECT * FROM users");
    const PremiumUsers = await db.query("SELECT * FROM users WHERE premium = true");
    const OnlineUsers = await db.query("SELECT * FROM users WHERE is_online = true");

  if (user.rows.length === 0) {
    const response = NextResponse.json({ totalUsers: 0 });
    return response;
  }

  return NextResponse.json({ totalUsers: user.rows.length, user: user.rows, premiumUsers: PremiumUsers.rows, totalPremiumUsers: PremiumUsers.rows.length, onlineUsers: OnlineUsers.rows.length });
}