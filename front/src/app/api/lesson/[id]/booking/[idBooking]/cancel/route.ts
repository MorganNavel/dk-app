import { NextRequest, NextResponse } from "next/server";
import { deleteBooking } from "@/queries/bookings/bookings-queries";
import { BookingCodes } from "@/queries/bookings/bookings-codes";
import { getUser } from "@/lib/auth-server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string; idBooking: string } }
) {
  try {
    const id = Number(params.id);
    const idBooking = Number(params.idBooking);

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { code: BookingCodes.UNKNOWN_ERROR, key: "codes.booking.unknown" },
        { status: 400 }
      );
    }
    if (Number.isNaN(idBooking)) {
      return NextResponse.json(
        { code: BookingCodes.UNKNOWN_ERROR, key: "codes.booking.unknown" },
        { status: 400 }
      );
    }
    const user = await getUser();
    console.log(user);
    if (!user) {
      return NextResponse.json(
        {
          code: BookingCodes.NOT_AUTHENTICATED,
          key: "codes.user.not_authenticated",
          redirectTo: "/auth/sign-in",
        },
        { status: 401 }
      );
    }
    const result = await deleteBooking(user.id, idBooking);

    if (result.code !== BookingCodes.SUCCESS) {
      return NextResponse.json(
        { code: result.code, key: result.key },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (e) {
    console.error("POST /api/lesson/[id]/booking error:", e);
    return NextResponse.json(
      { code: "UNKNOWN_ERROR", key: "codes.booking.unknown" },
      { status: 500 }
    );
  }
}
