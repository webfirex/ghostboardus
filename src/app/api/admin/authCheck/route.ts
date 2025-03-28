import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decodeUserId } from "@/utils/tools/idEncoder";
import db from "@/lib/db";

export async function GET() {
  const cookieStore = cookies();
  const userIdEncoded = (await cookieStore).get("admin_id")?.value;

  if (!userIdEncoded) {
    return NextResponse.json({ isAuthenticated: false });
  }

  const userId = decodeUserId(userIdEncoded);

  if (!userId) {
    return NextResponse.json({ isAuthenticated: false });
  }

  const user = await db.query("SELECT id, name, email, created_at, status, role, commission1, commission2, reffcode, balance, paid FROM admins WHERE id = $1 AND status = true", [userId])

  if (user.rows.length === 0) {
    const response = NextResponse.json({ isAuthenticated: false });
    response.cookies.set("admin_id", "", { maxAge: -1 });
    return response;
  }

  return NextResponse.json({ isAuthenticated: true, admin: user.rows[0] });
}
