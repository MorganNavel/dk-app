import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/queries/bookings/bookings-queries";
import { BookingCodes } from "@/queries/bookings/bookings-codes";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { code: BookingCodes.UNKNOWN_ERROR, key: "codes.booking.unknown" },
        { status: 400 }
      );
    }

    const result = await createBooking(id);

    if (!result) {
      return NextResponse.json(
        {
          code: BookingCodes.NOT_AUTHENTICATED,
          key: "booking.not_authenticated",
          redirectTo: "/auth/sign-in",
        },
        { status: 401 }
      );
    }
    return NextResponse.json(result);
  } catch (e) {
    console.error("POST /api/lesson/[id]/booking error:", e);
    return NextResponse.json(
      { code: BookingCodes.UNKNOWN_ERROR, key: "codes.booking.unknown" },
      { status: 500 }
    );
  }
}
