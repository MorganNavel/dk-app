"use server";

import { getUser } from "@/lib/auth-server";
import { BookingCodes } from "@/queries/bookings/bookings-codes";
import {
  BookingResponse,
  createBooking,
  deleteBookingById,
} from "@/queries/bookings/bookings-queries";
import { revalidatePath } from "next/cache";
import {
  deleteLessonsBulk,
  LessonResponse,
} from "@/queries/lessons/lessons-queries";
import { prisma } from "@/lib/prisma";
import { SELECT_BOOKING_FIELDS } from "@/queries/select-fields";

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
  const b = await prisma.booking.findUnique({
    where: { idBooking },
    select: SELECT_BOOKING_FIELDS,
  });
  if (!b)
    return {
      code: BookingCodes.BOOKING_NOT_FOUND,
      key: "codes.booking.not_found",
    };
  const timeCancelLimit = 12;
  const limitToMilli = timeCancelLimit * 60 * 60 * 1000;
  if (b.lesson.startDate.getTime() - Date.now() < limitToMilli)
    return {
      code: BookingCodes.BOOKING_LIMIT_EXCEED,
      key: "codes.booking.delete.limit_exceed",
    };
  const r = await deleteBookingById(idBooking);
  revalidatePath("/danbee-park/schedule");
  return r;
}

export async function deleteLessonAction(
  idLesson: number
): Promise<LessonResponse> {
  const r = await deleteLessonsBulk([idLesson]);
  revalidatePath("/danbee-park/schedule");
  return r;
}
