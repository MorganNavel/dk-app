import { Lesson } from "@/types/type";
import LessonTable from "./LessonTable";
import {
  deleteLessonsAndRevalidate,
  cancelLessonsAndRevalidate,
} from "./actions";
import { getUpcomingLessons } from "@/queries/lessons/lessons-queries";

export default async function LessonsContent() {
  const lessons = (await getUpcomingLessons()) as unknown as Lesson[];

  return (
    <LessonTable
      lessons={lessons}
      onDelete={deleteLessonsAndRevalidate}
      onCancel={cancelLessonsAndRevalidate}
    />
  );
}
