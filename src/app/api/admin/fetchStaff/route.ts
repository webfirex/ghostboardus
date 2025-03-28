import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
    const staff = await db.query("SELECT * FROM admins");

  return NextResponse.json({ staff: staff.rows });
}