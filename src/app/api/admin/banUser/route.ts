import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User ID is required." },
        { status: 400 }
      );
    }

    // Update the user's status in the database
    const query = `UPDATE users SET status = false WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [id]);

    // Check if the user was found and updated
    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "User not found or already deactivated." },
        { status: 404 }
      );
    }

    // Return the updated user details
    return NextResponse.json({
      success: true,
      message: "User deactivated successfully.",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error deactivating user:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
