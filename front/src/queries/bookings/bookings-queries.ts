import { prisma } from "@/lib/prisma";
import { SELECT_BOOKING_FIELDS } from "../select-fields";
import { BookingCodes } from "./bookings-codes";
import { getUser } from "@/lib/auth-server";

export async function createBooking(idLesson: number) {
  const user = await getUser();
  if (!user) return;
  const idUser = user.id;
  const lesson = await prisma.lesson.findUnique({ where: { idLesson } });
  if (!lesson) {
    return {
      code: BookingCodes.LESSON_NOT_FOUND,
      key: "lesson.not_found",
    };
  }

  if (lesson.startDate < new Date()) {
    return {
      code: BookingCodes.LESSON_ALREADY_PAST,
      key: "lesson.past",
    };
  }

  if (lesson.status !== "planned") {
    return {
      code: BookingCodes.LESSON_NOT_PLANNED,
      key: "lesson.not_planned",
    };
  }

  if (!lesson.groupSize || lesson.groupSize <= 0) {
    return {
      code: BookingCodes.LESSON_NO_CAPACITY,
      key: "lesson.no_capacity",
    };
  }

  const count = await prisma.booking.count({ where: { idLesson } });
  if (count >= lesson.groupSize) {
    return {
      code: BookingCodes.LESSON_FULL,
      key: "lesson.full",
    };
  }

  try {
    const booking = await prisma.booking.create({
      data: {
        idUser,
        idLesson,
      },
      select: SELECT_BOOKING_FIELDS,
    });

    return {
      code: BookingCodes.SUCCESS,
      key: "success",
      data: booking,
    };
  } catch (error: any) {
    if (
      error.code === "P2002" &&
      error.meta?.target?.includes("idUser_idLesson")
    ) {
      return {
        code: BookingCodes.BOOKING_ALREADY_EXISTS,
        key: "booking.exists",
      };
    }

    console.error("Erreur lors de la réservation :", error);
    return {
      code: BookingCodes.UNKNOWN_ERROR,
      key: "booking.unknown",
    };
  }
}
export async function deleteBooking(idUser: string, idLesson: number) {
  const result = await prisma.booking.deleteMany({
    where: { idUser, idLesson },
  });

  return {
    code: BookingCodes.SUCCESS,
    key: "success",
    data: result,
  };
}

export async function deleteUserBooking(idUser: string, idLesson: number) {
  const result = await prisma.booking.deleteMany({
    where: { idUser, idLesson },
  });

  return {
    code: BookingCodes.SUCCESS,
    key: "success",
    data: result,
  };
}

export async function deleteBookingsUserBulk(
  idUser: string,
  idLessons: number[]
) {
  const validLessonIds = await prisma.booking.findMany({
    where: {
      idUser,
      idLesson: { in: idLessons },
    },
    select: { idLesson: true },
  });

  const foundIds = new Set(validLessonIds.map((b) => b.idLesson));
  const allMatch = idLessons.every((id) => foundIds.has(id));

  if (!allMatch) {
    return {
      code: BookingCodes.UNKNOWN_ERROR,
      key: "booking.unknown",
      data: { count: 0 },
    };
  }

  const deleted = await prisma.booking.deleteMany({
    where: {
      idUser,
      idLesson: { in: idLessons },
    },
  });

  return {
    code: BookingCodes.SUCCESS,
    key: "success",
    data: deleted,
  };
}

export async function getBookingsByUser(idUser: string) {
  const data = await prisma.booking.findMany({
    where: { idUser },
    select: SELECT_BOOKING_FIELDS,
  });

  return {
    code: BookingCodes.SUCCESS,
    key: "success",
    data,
  };
}

export async function getBookingsByLesson(idLesson: number) {
  const data = await prisma.booking.findMany({
    where: { idLesson },
    select: SELECT_BOOKING_FIELDS,
  });

  return {
    code: BookingCodes.SUCCESS,
    key: "success",
    data,
  };
}

export async function countBookingByLesson(idLesson: number) {
  const result = await prisma.lesson.findUnique({
    where: { idLesson },
    select: {
      _count: {
        select: { bookings: true },
      },
    },
  });

  return {
    code: BookingCodes.SUCCESS,
    key: "success",
    data: result?._count.bookings ?? 0,
  };
}
