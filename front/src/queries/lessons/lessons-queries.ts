import { prisma } from "@/lib/prisma";
import { getLessonSelectByUser } from "../select-fields";
import { getUser } from "@/lib/auth-server";
export type LessonStatus = "planned" | "done" | "cancelled";
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
  const lessons = await prisma.lesson.findMany({
    where: { idLesson: { in: ids } },
    select: { idTeacher: true },
  });

  return lessons.every((lesson) => lesson.idTeacher === userId);
}

export async function changeLessonStatus(
  idLesson: number,
  status: LessonStatus
) {
  const user = await getUser();
  const isOwner = await checkTeacherOwnership(user?.id ?? "", [idLesson]);
  if (!isOwner) return;

  return prisma.lesson.update({
    where: { idLesson },
    data: { status },
  });
}

export async function changeLessonStatusBulk(
  ids: number[],
  status: LessonStatus
) {
  const user = await getUser();
  if (!user || user.role !== "teacher") return;
  const isOwner = await verifyOwnership(ids, user.id);
  if (!isOwner) return;

  return prisma.lesson.updateMany({
    where: { idLesson: { in: ids } },
    data: { status },
  });
}

export async function deleteLessonsBulk(ids: number[]) {
  const user = await getUser();
  if (!user || user.role !== "teacher") return;
  const isOwner = await verifyOwnership(ids, user.id);
  if (!isOwner) return;
  return prisma.lesson.deleteMany({
    where: { idLesson: { in: ids } },
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
}) {
  const user = await getUser();
  if (!user || user.role !== "teacher") return;

  return prisma.lesson.create({
    data: {
      ...data,
      idTeacher: user.id,
      status: "planned",
      createdAt: new Date(),
      groupSize: data.groupSize,
    },
    select: await getLessonSelectByUser(false, true),
  });
}

export async function rescheduleLessons(ids: number[], startDate: Date) {
  if (!startDate || startDate < new Date()) return;
  const user = await getUser();
  if (!user || user.role !== "teacher") return;

  const isOwner = await verifyOwnership(ids, user.id);
  if (!isOwner) return;

  return prisma.lesson.updateMany({
    where: { idLesson: { in: ids } },
    data: { startDate, status: "planned" },
  });
}
