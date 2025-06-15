import { Lesson } from "@/types/type";
import CalendarClient from "./CalendarClient";
import { getUpcomingLessons } from "@/queries/lessons/lessons-queries";

export default async function Schedule() {
  const lessons = (await getUpcomingLessons()) as unknown as Lesson[];
  return <CalendarClient lessons={lessons} />;
}
