import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { reffcode } = await req.json();

    if (!reffcode) {
      return NextResponse.json({ success: false, message: "Reffcode is required" }, { status: 400 });
    }

    // Use parameterized queries to prevent SQL injection
    const refferals = await db.query(`SELECT * FROM users WHERE reffcode = $1`, [reffcode]);
    const PremiumUsers = await db.query(`SELECT * FROM users WHERE premium = true AND reffcode = $1`, [reffcode]);

    return NextResponse.json({
      success: true,
      totalRefferals: refferals.rows.length,
      totalPremium: PremiumUsers.rows.length
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Server error", error: error.message }, { status: 500 });
  }
}