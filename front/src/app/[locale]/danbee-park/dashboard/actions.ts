"use server";

import {
  deleteLessonsBulk,
  changeLessonStatusBulk,
  createLesson,
  rescheduleLessons,
} from "@/queries/lessons/lessons-queries";
import { revalidatePath } from "next/cache";

export async function deleteLessonsAndRevalidate(ids: number[]) {
  const res = await deleteLessonsBulk(ids);
  revalidatePath("/lessons");
  return res;
}

export async function cancelLessonsAndRevalidate(ids: number[]) {
  const res = await changeLessonStatusBulk(ids, "cancelled");
  revalidatePath("/lessons");
  return res;
}
interface CreateLessonData {
  title: string;
  description?: string;
  startDate: Date;
  duration?: number;
}

export async function createLessonAndRevalidate(data: CreateLessonData) {
  const res = await createLesson(data);
  revalidatePath("/lessons");
  return res;
}
export async function rescheduleLessonsAndRevalidate(
  ids: number[],
  startDate: Date
) {
  const res = await rescheduleLessons(ids, startDate);
  revalidatePath("/lessons");
  return res;
}
