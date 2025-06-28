"use server";

import { getUser } from "@/lib/auth-server";
import { BookingCodes } from "@/queries/bookings/bookings-codes";
import {
  createBooking,
  deleteBookingById,
} from "@/queries/bookings/bookings-queries";
import { revalidatePath } from "next/cache";

export interface BookingResponse {
  code: number;
  key: string;
  data?: any;
  redirectTo?: string;
}
export async function createBookingAction(
  idLesson: number
): Promise<BookingResponse> {
  const r = await createBooking(idLesson);
  revalidatePath("/danbee-park/schedule");
  return r;
}

export async function cancelBookingAction(
  idBooking: number
): Promise<BookingResponse> {
  const user = await getUser();
  if (!user) {
    return {
      code: BookingCodes.NOT_AUTHENTICATED,
      key: "codes.user.not_authenticated",
      redirectTo: "/auth/sign-in",
    };
  }
  const r = await deleteBookingById(idBooking);
  revalidatePath("/danbee-park/schedule");
  return r;
}
