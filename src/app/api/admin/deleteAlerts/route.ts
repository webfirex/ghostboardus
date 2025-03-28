import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST() {
  try {
      await db.query('DELETE FROM alerts');

      return NextResponse.json({success: true, message: 'All alerts deleted successfully.' });
  } catch (error) {
      console.error('Error deleting alerts:', error);
      return NextResponse.json(
          {success: false, message: 'Failed to delete alerts. Please try again later.' },
          { status: 500 }
      );
  }
}