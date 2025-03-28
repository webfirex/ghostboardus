import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get("image");
  const userId = formData.get("id");

  if (!image || !userId) {
    return NextResponse.json(
      { success: false, message: "Missing information" },
      { status: 400 }
    );
  }

  try {
    // Upload the image to imgbb
    const imgbbResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=3f6e83c8546b982727ada71053dd995c`,
      {
        method: "POST",
        body: formData,
      }
    );

    const imgbbData = await imgbbResponse.json();

    if (!imgbbData.success) {
      return NextResponse.json({success: false, message: 'Error uploading image' });
    }

    const imageUrl = imgbbData.data.url;

    try {
      const updateQuery = `
        UPDATE users
        SET pfpic = $1
        WHERE id = $2
        RETURNING id, pfpic;
      `;
      const result = await db.query(updateQuery, [imageUrl, userId]);

      if (result.rowCount === 0) {
        return NextResponse.json(
          { success: false, message: "User not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Profile picture updated successfully"
      });
    } finally {

    }
  } catch (error) {
    return NextResponse.json(
      {success: true, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
