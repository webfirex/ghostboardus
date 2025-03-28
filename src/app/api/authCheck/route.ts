import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decodeUserId } from "@/utils/tools/idEncoder";
import db from "@/lib/db";

export async function GET() {
  const cookieStore = cookies();
  const userIdEncoded = (await cookieStore).get("user_id")?.value;

  if (!userIdEncoded) {
    return NextResponse.json({ isAuthenticated: false });
  }

  const userId = decodeUserId(userIdEncoded);

  if (!userId) {
    return NextResponse.json({ isAuthenticated: false });
  }

  const user = await db.query("SELECT id, pfpic, name, email, created_at, status, premium, subdate, expdate, trialdate, trialexpdate, notifications, email_stat, discord_code FROM users WHERE id = $1 AND status = true", [userId]);

  if (user.rows.length === 0) {
    const response = NextResponse.json({ isAuthenticated: false });
    response.cookies.set("user_id", "", { maxAge: -1 });
    return response;
  }

  return NextResponse.json({ isAuthenticated: true, user: user.rows[0] });
}
