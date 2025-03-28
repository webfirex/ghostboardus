import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
    const topwatch = await db.query("SELECT * FROM topwatch");

  return NextResponse.json({ totalStocks: topwatch.rows.length, topwatch: topwatch.rows });
}