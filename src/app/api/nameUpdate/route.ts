import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { id, name } = body;

    // Validate input
    if (!id || !name) {
      return NextResponse.json(
        { success: false, message: "Name is required." },
        { status: 400 }
      );
    }

    // Update the name in the PostgreSQL database
    const query = `
      UPDATE users 
      SET name = $1 
      WHERE id = $2
    `;
    const values = [name, id];

    const result = await db.query(query, values);

    // Check if any rows were updated
    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: "User not found or update failed." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Name updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating name:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
