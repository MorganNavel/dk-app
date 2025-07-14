import { CalendarClient } from "./CalendarClient";
import { getUpcomingLessons } from "@/queries/lessons/lessons-queries";

export default async function Schedule() {
  const lessons = await getUpcomingLessons();
  return <CalendarClient lessons={lessons.data} />;
}
