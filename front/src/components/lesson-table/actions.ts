"use server";

import {
  LessonResponse,
  renameLesson,
  sendJitsiInvitationLink,
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
export async function sendNotification(idLesson: number) {
  return await sendJitsiInvitationLink(idLesson);
}
