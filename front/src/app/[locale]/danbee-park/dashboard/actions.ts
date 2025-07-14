"use server";

import {
  deleteLessonsBulk,
  createLesson,
  rescheduleLessons,
  cancelLessonBulk,
  updateLessonFields,
} from "@/queries/lessons/lessons-queries";
import { revalidatePath } from "next/cache";

export async function deleteLessonsAndRevalidate(ids: number[]) {
  const res = await deleteLessonsBulk(ids);
  revalidatePath("/lessons");
  return res;
}

export async function cancelLessonsAndRevalidate(ids: number[]) {
  const res = await cancelLessonBulk(ids);
  revalidatePath("/lessons");
  return res;
}
interface CreateLessonData {
  title: string;
  description?: string;
  startDate: Date;
  duration?: number;
  languages: string[];
  groupSize?: number;
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
interface UpdateLessonData {
  title?: string;
  description?: string;
  startDate?: Date;
  languages?: string[];
  duration?: number;
  groupSize?: number;
}

export async function updateLessonAndRevalidate(
  id: number,
  data: UpdateLessonData
) {
  const res = updateLessonFields(id, data);
  revalidatePath("/lessons");
  return res;
}
