import { prisma } from "@/lib/prisma";
import { getLessonSelectByUser } from "../select-fields";
import { getUser } from "@/lib/auth-server";
import { LessonCodes, LessonKeys } from "./lessons-codes";
import { ResponseType } from "../reponse-type";
import {
  addMinutes,
  differenceInMinutes,
  isSameDay,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { generateJitsiJWT } from "@/utils/jwt";
import { sendEmailStudent, sendEmailTeacher } from "@/lib/email/sendEmail";
export type LessonStatus = "planned" | "done" | "cancelled";

export interface LessonResponse<T = any> extends ResponseType<LessonKeys, T> {}

async function checkTeacherOwnership(idUser: string, ids: number[]) {
  const count = await prisma.lesson.count({
    where: {
      idLesson: { in: ids },
      idTeacher: idUser,
    },
  });
  return count === ids.length;
}

async function verifyOwnership(ids: number[], userId: string) {
  const count = await prisma.lesson.count({
    where: {
      idLesson: { in: ids },
      idTeacher: userId,
    },
  });
  return count === ids.length;
}

function handleManyChanges(
  count: number | undefined,
  min: number,
  onSuccess: LessonResponse,
  onError?: LessonResponse
): LessonResponse {
  const error: LessonResponse = {
    code: LessonCodes.UNKNOWN_ERROR,
    key: "codes.lesson.unknown_error",
  };
  if (count == undefined) return onError ?? error;
  if (count >= min) {
    return onSuccess;
  }
  return onError ?? error;
}

export async function isOverlappingLesson(
  idTeacher: string,
  startDate: Date,
  endDate: Date,
  excludeLessonId?: number
): Promise<boolean> {
  const overlappingLesson = await prisma.lesson.findFirst({
    where: {
      idTeacher,
      idLesson: { not: excludeLessonId },
      startDate: { lt: endDate },
      endDate: { gt: startDate },
      status: "planned",
    },
  });
  return Boolean(overlappingLesson);
}

export async function updateLessonFields(
  idLesson: number,
  data: {
    title?: string;
    languages?: string[];
    description?: string;
    startDate?: Date;
    endDate?: Date;
    duration?: number;
    groupSize?: number;
  }
): Promise<LessonResponse> {
  if (data.startDate && data.startDate < new Date())
    return {
      code: LessonCodes.INVALID_INPUT,
      key: "codes.lesson.invalid_input",
    };
  const user = await getUser();
  if (!user || user.role !== "teacher")
    return {
      code: LessonCodes.NOT_AUTHENTICATED,
      key: "codes.user.not_authenticated",
      redirectTo: "/auth/sign-in",
    };
  const isOwner = await checkTeacherOwnership(user.id, [idLesson]);
  if (!isOwner) {
    return {
      code: LessonCodes.UNAUTHORIZED_ACTION,
      key: "codes.lesson.unauthorized_action",
    };
  }
  const lesson = await prisma.lesson.findUnique({
    where: { idLesson },
  });
  if (!lesson)
    return {
      code: LessonCodes.UNKNOWN_ERROR,
      key: "codes.lesson.unknown_error",
    };

  let start = data.startDate ?? lesson.startDate;
  let duration = data.duration ?? lesson.duration;
  let endDate = data.endDate ?? addMinutes(start, duration);
  const isOverlap = await isOverlappingLesson(
    user.id,
    start,
    endDate,
    idLesson
  );
  if (isOverlap)
    return {
      code: LessonCodes.LESSON_ALREADY_EXISTS,
      key: "codes.lesson.create.already_exists",
    };
  const r = await prisma.lesson.update({
    where: { idLesson },
    data,
  });

  if (!r) {
    return {
      code: LessonCodes.UNKNOWN_ERROR,
      key: "codes.lesson.unknown_error",
    };
  }

  return {
    code: LessonCodes.SUCCESS,
    key: "codes.lesson.update.success",
  };
}

export async function changeLessonStatus(
  idLesson: number,
  status: LessonStatus
): Promise<LessonResponse> {
  const user = await getUser();
  const isOwner = await checkTeacherOwnership(user?.id ?? "", [idLesson]);
  if (!isOwner)
    return {
      code: LessonCodes.UNAUTHORIZED_ACTION,
      key: "codes.lesson.unauthorized_action",
    };
  const r = await prisma.lesson.update({
    where: { idLesson },
    data: { status },
  });
  if (!r) {
    return {
      code: LessonCodes.UNKNOWN_ERROR,
      key: "codes.lesson.unknown_error",
    };
  }

  return {
    code: LessonCodes.SUCCESS,
  };
}

export async function changeLessonStatusBulk(
  ids: number[],
  status: LessonStatus
): Promise<LessonResponse> {
  const user = await getUser();
  if (!user || user.role !== "teacher")
    return {
      code: LessonCodes.NOT_AUTHENTICATED,
      key: "codes.user.not_authenticated",
      redirectTo: "/auth/sign-in",
    };
  const isOwner = await verifyOwnership(ids, user.id);
  if (!isOwner)
    return {
      code: LessonCodes.UNAUTHORIZED_ACTION,
      key: "codes.lesson.unauthorized_action",
    };
  const r = await prisma.lesson.updateMany({
    where: { idLesson: { in: ids } },
    data: { status },
  });
  return handleManyChanges(r.count, 0, {
    code: LessonCodes.SUCCESS,
    key: "codes.lesson.update.success",
  });
}
export async function cancelLessonBulk(ids: number[]): Promise<LessonResponse> {
  const res = await changeLessonStatusBulk(ids, "cancelled");
  if (res.code !== LessonCodes.SUCCESS) return res;
  const d = await prisma.booking.findMany({
    select: {
      idUser: true,
    },
    where: {
      idLesson: { in: ids },
      lesson: {
        is: {
          status: "cancelled",
        },
      },
    },
  });
  const idUsers = d.flatMap(({ idUser }) => idUser);
  const r = await prisma.user.updateMany({
    where: { id: { in: idUsers } },
    data: {
      nbLessons: {
        increment: 1,
      },
    },
  });
  return handleManyChanges(r.count, idUsers.length, {
    code: LessonCodes.SUCCESS,
    key: "codes.lesson.delete.success",
  });
}

export async function deleteLessonsBulk(
  ids: number[]
): Promise<LessonResponse> {
  const user = await getUser();
  if (!user || user.role !== "teacher")
    return {
      code: LessonCodes.NOT_AUTHENTICATED,
      key: "codes.user.not_authenticated",
      redirectTo: "/auth/sign-in",
    };
  const isOwner = await verifyOwnership(ids, user.id);
  if (!isOwner)
    return {
      code: LessonCodes.UNAUTHORIZED_ACTION,
      key: "codes.lesson.unauthorized_action",
    };
  const r = await prisma.lesson.deleteMany({
    where: { idLesson: { in: ids } },
  });

  return handleManyChanges(r.count, 0, {
    code: LessonCodes.SUCCESS,
    key: "codes.lesson.delete.success",
  });
}

export async function getAllLessons(): Promise<LessonResponse> {
  const user = await getUser();
  const isTeacher = user?.role === "teacher";
  if (!isTeacher)
    return {
      code: LessonCodes.UNAUTHORIZED_ACTION,
      key: "codes.lesson.unauthorized_action",
    };
  const select = await getLessonSelectByUser(isTeacher);
  const lessons = await prisma.lesson.findMany({
    where: {
      ...(isTeacher ? { teacher: { id: user.id } } : {}),
      status: isTeacher ? { in: ["planned", "cancelled"] } : "planned",
      startDate: { gte: subMonths(new Date(), 2) },
    },
    select,
  });

  return {
    code: LessonCodes.SUCCESS,
    data: lessons,
  };
}
export async function getUpcomingLessons(): Promise<LessonResponse> {
  const user = await getUser();
  const isTeacher = user?.role === "teacher";
  const select = await getLessonSelectByUser(isTeacher);
  const minDate = isTeacher ? subMonths(new Date(), 2) : new Date();
  const lessons = await prisma.lesson.findMany({
    where: {
      ...(isTeacher ? { teacher: { id: user.id } } : {}),
      status: "planned",
      startDate: { gte: minDate },
    },
    select,
  });
  return {
    code: LessonCodes.SUCCESS,
    data: lessons,
  };
}

export async function createLesson(data: {
  title: string;
  description?: string;
  startDate: Date;
  duration: number;
  groupSize?: number;
  languages: string[];
}): Promise<LessonResponse> {
  const user = await getUser();
  if (!user || user.role !== "teacher")
    return {
      code: LessonCodes.NOT_AUTHENTICATED,
      key: "codes.user.not_authenticated",
      redirectTo: "/auth/sign-in",
    };
  let endDate = addMinutes(data.startDate, data.duration);

  const isOverlap = await isOverlappingLesson(user.id, data.startDate, endDate);
  if (isOverlap) {
    return {
      code: LessonCodes.LESSON_ALREADY_EXISTS,
      key: "codes.lesson.create.already_exists",
    };
  }
  const r = await prisma.lesson.create({
    data: {
      ...data,
      idTeacher: user.id,
      status: "planned",
      createdAt: new Date(),
      endDate,
    },
    select: await getLessonSelectByUser(true),
  });

  return {
    code: LessonCodes.SUCCESS,
    key: "codes.lesson.create.success",
    data: r,
  };
}

export async function renameLesson(
  idLesson: number,
  title: string
): Promise<LessonResponse> {
  const user = await getUser();
  if (!user || user.role !== "teacher")
    return {
      code: LessonCodes.NOT_AUTHENTICATED,
      key: "codes.user.not_authenticated",
      redirectTo: "/auth/sign-in",
    };
  const isOwner = await checkTeacherOwnership(user.id, [idLesson]);
  if (!isOwner)
    return {
      code: LessonCodes.UNAUTHORIZED_ACTION,
      key: "codes.lesson.unauthorized_action",
    };
  try {
    const r = await prisma.lesson.update({
      where: { idLesson },
      data: { title },
    });

    return {
      code: LessonCodes.SUCCESS,
      data: r,
    };
  } catch (error) {
    return {
      code: LessonCodes.UNKNOWN_ERROR,
      key: "codes.lesson.unknown_error",
    };
  }
}

export async function sendJitsiInvitationLink(
  idLesson: number
): Promise<LessonResponse> {
  const user = await getUser();
  const isTeacher = user?.role === "teacher";

  if (!user || !isTeacher) {
    return {
      code: LessonCodes.NOT_AUTHENTICATED,
      key: "codes.user.not_authenticated",
      redirectTo: "/auth/sign-in",
    };
  }

  const lesson = await prisma.lesson.findUnique({
    select: {
      teacher: {
        select: { name: true, email: true },
      },
      bookings: {
        select: {
          user: {
            select: { name: true, email: true },
          },
        },
      },
      startDate: true,
      endDate: true,
      duration: true,
    },
    where: {
      idLesson,
      idTeacher: user?.id,
      endDate: {
        gte: new Date(),
      },
    },
  });

  if (!lesson) {
    return {
      code: LessonCodes.NOT_FOUND,
      key: "codes.lesson.not_found",
    };
  }

  if (lesson.bookings.length > 0) {
    const room = `meeting-${idLesson}`;
    const link = `https://meet.danbee-korean.com/${room}`;
    const date = {
      startDate: lesson.startDate,
      endDate: lesson.endDate,
      duration: lesson.duration,
    };

    const jwt = generateJitsiJWT({
      room,
      role: "moderator",
      email: lesson.teacher.email,
      name: lesson.teacher.name,
    });
    const jitsiLink = `${link}?jwt=${jwt}`;

    await sendEmailTeacher(
      lesson.teacher.email,
      lesson.teacher.name,
      jitsiLink,
      date
    );

    for (const booking of lesson.bookings) {
      const student = booking.user;
      await sendEmailStudent(student.email, student.name, jitsiLink, date);
    }
  }
  return {
    code: LessonCodes.SUCCESS,
  };
}
interface WorkingTimeData {
  totalHours: number;
  dailyHours: Record<string, number>;
  weeklyHours: Record<string, number>;
  monthlyHours: Record<string, number>;
}
export async function getStatsWorkingTime(
  since: Date
): Promise<LessonResponse<WorkingTimeData>> {
  const user = await getUser();
  const isTeacher = user?.role === "teacher";
  if (!user || !isTeacher)
    return {
      code: LessonCodes.NOT_AUTHENTICATED,
      redirectTo: "/auth/sign-in",
    };
  const now = new Date();

  const lessons = await prisma.lesson.findMany({
    where: {
      idTeacher: user.id,
      status: "planned",
      endDate: { lte: now },
      startDate: { gte: since },
    },
  });

  let totalHours = 0;
  const weeklyHours: Record<string, number> = {};
  const monthlyHours: Record<string, number> = {};
  const dailyHours: Record<string, number> = {};
  function appendToRecord(
    record: Record<string, number>,
    date: Date,
    duration: number
  ) {
    const dateKey = date.toDateString();
    if (!record[dateKey]) record[dateKey] = 0;
    record[dateKey] += duration / 60;
  }
  function appendToRecords(date: Date, duration: number) {
    const week = startOfWeek(date);
    const month = startOfMonth(date);
    appendToRecord(dailyHours, date, duration);
    appendToRecord(weeklyHours, week, duration);
    appendToRecord(monthlyHours, month, duration);
  }
  for (const lesson of lessons) {
    totalHours += lesson.duration / 60;
    const startDay = startOfDay(lesson.startDate);
    const endDay = startOfDay(lesson.endDate);
    if (!isSameDay(lesson.endDate, lesson.startDate)) {
      const midnight = startOfDay(lesson.endDate);
      const bfMidnight = differenceInMinutes(midnight, lesson.startDate);
      const aftMidnight = lesson.duration - bfMidnight;
      appendToRecords(startDay, bfMidnight);
      appendToRecords(endDay, aftMidnight);
    } else appendToRecords(startDay, lesson.duration);
  }

  return {
    code: LessonCodes.SUCCESS,
    data: {
      totalHours,
      dailyHours,
      weeklyHours,
      monthlyHours,
    },
  };
}
