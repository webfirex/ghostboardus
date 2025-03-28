import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
    const alerts = await db.query("SELECT * FROM alerts");

  return NextResponse.json({ alerts: alerts.rows });
}