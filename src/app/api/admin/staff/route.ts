import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, name, email, role, password, commission1, commission2, reffcode } = body;

    if (!action || !email) {
      return NextResponse.json({ success: false, message: "Action and email are required." });
    }

    if (action === "add") {
      const hashedPassword = await bcrypt.hash(password, 10);

      const query = `INSERT INTO admins (name, email, role, password, commission1, commission2, reffcode) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
      const values = [name, email, role, hashedPassword, commission1, commission2, reffcode];
      const result = await db.query(query, values);
      return NextResponse.json({ success: true, message: "Admin added successfully.", admin: result.rows[0] });
    }

    if (action === "delete") {
      const query = `DELETE FROM admins WHERE email = $1 RETURNING email;`;
      const result = await db.query(query, [email]);
      if (result.rowCount === 0) {
        return NextResponse.json({ success: false, message: "Admin not found." });
      }
      return NextResponse.json({ success: true, message: "Admin deleted successfully." });
    }

    if (action === "update") {
        if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);

      const query = `UPDATE admins SET name = $1, role = $2, password = $3, commission1 = $4, commission2 = $5, reffcode = $6 
                     WHERE email = $7 RETURNING *;`;
      const values = [name, role, hashedPassword, commission1, commission2, reffcode, email];
      const result = await db.query(query, values);
      if (result.rowCount === 0) {
        return NextResponse.json({ success: false, message: "Admin not found." });
      }
      return NextResponse.json({ success: true, message: "Admin updated successfully.", admin: result.rows[0] }); } else {
        const query = `UPDATE admins SET name = $1, role = $2, commission1 = $3, commission2 = $4, reffcode = $5 WHERE email = $6 RETURNING *;`;
        const values = [name, role, commission1, commission2, reffcode, email];
        const result = await db.query(query, values);
        if (result.rowCount === 0) {
          return NextResponse.json({ success: false, message: "Admin not found." });
        }
        return NextResponse.json({ success: true, message: "Admin updated successfully.", admin: result.rows[0] });
      }
    }

    return NextResponse.json({ success: false, message: "Invalid action." });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: "An error occurred.", error: error.message });
  }
}
