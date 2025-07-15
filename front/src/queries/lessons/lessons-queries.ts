import { prisma } from "@/lib/prisma";
import { getLessonSelectByUser } from "../select-fields";
import { getUser } from "@/lib/auth-server";
import { LessonCodes, LessonKeys } from "./lessons-codes";
import { ResponseType } from "../reponse-type";
import { addMinutes } from "date-fns";
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

  const l = await prisma.lesson.findUnique({
    where: { idLesson },
  });
  if (!l)
    return {
      code: LessonCodes.NOT_FOUND,
      key: "codes.lesson.not_found",
    };
  let endDate = data.endDate ?? undefined;

  if (data.startDate) {
    const duration = data.duration ?? l.duration;
    endDate = data.endDate ?? addMinutes(data.startDate, duration);
    const overlap = await isOverlappingLesson(
      user.id,
      data.startDate,
      endDate,
      idLesson
    );
    if (overlap) {
      return {
        code: LessonCodes.LESSON_ALREADY_EXISTS,
        key: "codes.lesson.create.already_exists",
      };
    }
  } else if (data.duration) {
    endDate = data.endDate ?? addMinutes(l.startDate, data.duration);
    const overlap = await isOverlappingLesson(
      user.id,
      l.startDate,
      endDate,
      idLesson
    );
    if (overlap) {
      return {
        code: LessonCodes.LESSON_ALREADY_EXISTS,
        key: "codes.lesson.create.already_exists",
      };
    }
  }
  const r = await prisma.lesson.update({
    where: { idLesson },
    data: {
      ...data,
      endDate,
    },
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
      startDate: { gte: new Date() },
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
  const lessons = await prisma.lesson.findMany({
    where: {
      ...(isTeacher ? { teacher: { id: user.id } } : {}),
      status: "planned",
      startDate: { gte: new Date() },
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
