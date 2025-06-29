"use server";

import {
  LessonResponse,
  renameLesson,
} from "@/queries/lessons/lessons-queries";
import { revalidatePath } from "next/cache";

export async function renameLessonAction(
  idLesson: number,
  newTitle: string
): Promise<LessonResponse> {
  const r = await renameLesson(idLesson, newTitle);
  revalidatePath("/danbee-park/schedule");
  return r;
}
