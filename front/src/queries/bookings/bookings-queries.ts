import { prisma } from "@/lib/prisma";
import { SELECT_BOOKING_FIELDS } from "../select-fields";
import { BookingCodes, BookingKeys } from "./bookings-codes";
import { getUser } from "@/lib/auth-server";
interface BookingResponse {
  code: number;
  key: BookingKeys;
  data?: any;
  redirectTo?: string;
}

export async function createBooking(
  idLesson: number
): Promise<BookingResponse> {
  const user = await getUser();
  if (!user) {
    return {
      code: BookingCodes.NOT_AUTHENTICATED,
      key: "codes.user.not_authenticated",
      redirectTo: "/auth/sign-in",
    };
  }
  const idUser = user.id;
  const credits = await prisma.user.findUnique({
    where: { id: idUser },
    select: { nbLessons: true },
  });
  if (!credits?.nbLessons || credits.nbLessons < 0) {
    return {
      code: BookingCodes.CREDIT_NOT_ENOUGH,
      key: "codes.booking.credit_not_enough",
      redirectTo: "/pricing",
    };
  }

  const lesson = await prisma.lesson.findUnique({ where: { idLesson } });
  if (!lesson) {
    return {
      code: BookingCodes.LESSON_NOT_FOUND,
      key: "codes.lesson.not_found",
    };
  }

  if (lesson.startDate < new Date()) {
    return {
      code: BookingCodes.LESSON_ALREADY_PAST,
      key: "codes.lesson.past",
    };
  }

  if (lesson.status !== "planned") {
    return {
      code: BookingCodes.LESSON_NOT_PLANNED,
      key: "codes.lesson.not_planned",
    };
  }

  if (!lesson.groupSize || lesson.groupSize <= 0) {
    return {
      code: BookingCodes.LESSON_NO_CAPACITY,
      key: "codes.lesson.no_capacity",
    };
  }

  const count = await prisma.booking.count({ where: { idLesson } });
  if (count >= lesson.groupSize) {
    return {
      code: BookingCodes.LESSON_NO_CAPACITY,
      key: "codes.lesson.no_capacity",
    };
  }

  try {
    await prisma.booking.create({
      data: {
        idUser,
        idLesson,
      },
      select: SELECT_BOOKING_FIELDS,
    });
    await prisma.user.update({
      where: { id: idUser },
      data: {
        nbLessons: {
          decrement: 1,
        },
      },
    });

    return {
      code: BookingCodes.SUCCESS,
      key: "codes.booking.success",
    };
  } catch (error: any) {
    if (
      error.code === "P2002" &&
      error.meta?.target?.includes("idUser_idLesson")
    ) {
      return {
        code: BookingCodes.BOOKING_ALREADY_EXISTS,
        key: "codes.booking.exists",
      };
    }

    return {
      code: BookingCodes.UNKNOWN_ERROR,
      key: "codes.booking.unknown",
    };
  }
}
export async function deleteBookingById(
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
  try {
    await prisma.booking.findUniqueOrThrow({
      where: { idBooking, idUser: user.id },
    });
    const result = await prisma.booking.delete({
      where: { idBooking, idUser: user.id },
      select: SELECT_BOOKING_FIELDS,
    });
    await prisma.user.update({
      where: { id: user.id },
      data: {
        nbLessons: {
          increment: 1,
        },
      },
    });
    return {
      code: BookingCodes.SUCCESS,
      key: "codes.booking.delete.success",
      data: result,
    };
  } catch (error) {
    return {
      code: BookingCodes.UNKNOWN_ERROR,
      key: "codes.booking.unknown",
    };
  }
}
export async function deleteBooking(
  idUser: string,
  idLesson: number
): Promise<BookingResponse> {
  try {
    const result = await prisma.booking.deleteMany({
      where: { idUser, idLesson },
    });

    return {
      code: BookingCodes.SUCCESS,
      key: "codes.booking.success",
      data: result,
    };
  } catch (error) {
    return {
      code: BookingCodes.UNKNOWN_ERROR,
      key: "codes.booking.unknown",
    };
  }
}

export async function deleteBookingsUserBulk(
  idUser: string,
  idLessons: number[]
): Promise<BookingResponse> {
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
      key: "codes.booking.unknown",
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
    key: "codes.booking.unknown",
    data: deleted,
  };
}

export async function getBookingsByUser(
  idUser: string
): Promise<BookingResponse> {
  const data = await prisma.booking.findMany({
    where: { idUser },
    select: SELECT_BOOKING_FIELDS,
  });

  return {
    code: BookingCodes.SUCCESS,
    key: "codes.booking.success",
    data,
  };
}

export async function getBookingsByLesson(
  idLesson: number
): Promise<BookingResponse> {
  const data = await prisma.booking.findMany({
    where: { idLesson },
    select: SELECT_BOOKING_FIELDS,
  });

  return {
    code: BookingCodes.SUCCESS,
    key: "codes.booking.success",
    data,
  };
}

export async function countBookingByLesson(
  idLesson: number
): Promise<BookingResponse> {
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
    key: "codes.booking.success",
    data: result?._count.bookings ?? 0,
  };
}
