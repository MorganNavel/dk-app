import { prisma } from "@/lib/prisma";
import { getLessonSelectByUser } from "../select-fields";
import { getUser } from "@/lib/auth-server";
import { LessonCodes, LessonKeys } from "./lessons-codes";
import { ResponseType } from "../reponse-type";
export type LessonStatus = "planned" | "done" | "cancelled";

export interface LessonResponse extends ResponseType<LessonKeys> {}

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

async function isOverlappingLesson(
  idTeacher: string,
  startDate: Date
): Promise<boolean> {
  const overlappingLesson = await prisma.lesson.findFirst({
    where: {
      idTeacher: idTeacher,
      startDate: {
        lt: startDate,
      },
      endDate: {
        gt: startDate,
      },
    },
  });
  return !!overlappingLesson;
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

export async function getLessonsAsTeacher() {
  const user = await getUser();
  if (!user || user.role !== "teacher") return [];

  const select = await getLessonSelectByUser(true);

  return prisma.lesson.findMany({
    where: {
      teacher: { id: user.id },
      status: "planned",
      startDate: { gte: new Date() },
    },
    select,
  });
}

export async function getUpcomingLessons() {
  const user = await getUser();
  const isTeacher = user?.role === "teacher";
  const select = await getLessonSelectByUser(isTeacher);

  return await prisma.lesson.findMany({
    where: {
      ...(isTeacher ? { teacher: { id: user.id } } : {}),
      status: isTeacher ? { in: ["planned", "cancelled"] } : "planned",
      startDate: { gte: new Date() },
    },
    select,
  });
}
export async function createLesson(data: {
  title: string;
  description?: string;
  startDate: Date;
  duration?: number;
  groupSize?: number;
}): Promise<LessonResponse> {
  const user = await getUser();
  if (!user || user.role !== "teacher")
    return {
      code: LessonCodes.NOT_AUTHENTICATED,
      key: "codes.user.not_authenticated",
      redirectTo: "/auth/sign-in",
    };
  const isOverlap = await isOverlappingLesson(user.id, data.startDate);
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
      endDate: new Date(
        data.startDate.getTime() + (data.duration ?? 50) * 60000
      ),
    },
    select: await getLessonSelectByUser(true),
  });

  return {
    code: LessonCodes.SUCCESS,
    key: "codes.lesson.create.success",
    data: r,
  };
}

export async function rescheduleLessons(
  ids: number[],
  startDate: Date
): Promise<LessonResponse | undefined> {
  if (!startDate || startDate < new Date()) return;
  const user = await getUser();
  if (!user || user.role !== "teacher")
    return {
      code: LessonCodes.NOT_AUTHENTICATED,
      key: "codes.user.not_authenticated",
      redirectTo: "/auth/sign-in",
    };

  const isOwner = await verifyOwnership(ids, user.id);
  if (!isOwner) return;
  const isOverlap = await isOverlappingLesson(user.id, startDate);
  if (isOverlap) {
    return {
      code: LessonCodes.LESSON_ALREADY_EXISTS,
      key: "codes.lesson.create.already_exists",
    };
  }
  const r = await prisma.lesson.updateMany({
    where: { idLesson: { in: ids } },
    data: { startDate, status: "planned" },
  });

  return handleManyChanges(r.count, 0, {
    code: LessonCodes.SUCCESS,
    key: "codes.lesson.success",
  });
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
