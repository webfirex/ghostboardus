import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { ticker, title, trend, body, img, id, action } = await req.json();

    if (id && action && action === 'delete') {
      const query = `
      DELETE FROM topwatch WHERE id = $1
      RETURNING id;`;

      await db.query(query, [id]);

      return NextResponse.json({
        success: true,
        message: `Entry with ID ${id} deleted successfully.`
      });
    } else if (!ticker || !title || !trend || !body || !img) {
      return NextResponse.json(
        { success: false, message: "Missing Information" },
        { status: 400 }
      );
    }

    const checkQuery = `
      SELECT id FROM topwatch WHERE stock = $1;
    `;
    const checkResult = await db.query(checkQuery, [ticker]);

    if (checkResult.rows.length > 0) {
      return NextResponse.json(
        { success: false, message: `Ticker ${ticker} already exists.` },
        { status: 409 }
      );
    }

    const insertQuery = `
      INSERT INTO topwatch (stock, trend, title, body, img)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;
    const insertResult = await db.query(insertQuery, [ticker, trend, title, body, img]);

    return NextResponse.json({
      success: true,
      message: `Top Watch - ${ticker} - Added successfully.`,
      id: insertResult.rows[0].id,
    });
  } catch (error) {
    console.error("Error adding top watch:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
