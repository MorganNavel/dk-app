import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/queries/bookings/bookings-queries";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { code: "INVALID_ID", key: "lesson.invalid_id" },
        { status: 400 }
      );
    }

    const result = await createBooking(id);

    if (!result) {
      return NextResponse.json(
        { code: "UNAUTHORIZED", key: "booking.unauthorized" },
        { status: 401 }
      );
    }
    return NextResponse.json(result);
  } catch (e) {
    console.error("POST /api/lesson/[id]/booking error:", e);
    return NextResponse.json(
      { code: "UNKNOWN_ERROR", key: "booking.unknown" },
      { status: 500 }
    );
  }
}
