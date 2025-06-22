import { EarningsComparison, Lesson } from "@/types/type";
import LessonTable from "./LessonTable";
import {
  deleteLessonsAndRevalidate,
  cancelLessonsAndRevalidate,
} from "./actions";
import { getUpcomingLessons } from "@/queries/lessons/lessons-queries";
import { PreviousMonthsStats, TotalRevenueMonth } from "./stats";
import { getEarningsComparison } from "@/queries/lessons/earnings.service";

export default async function LessonsContent() {
  const lessons = (await getUpcomingLessons()) as unknown as Lesson[];
  const revenue =
    (await getEarningsComparison()) as unknown as EarningsComparison;

  return (
    <div className='snap-start snap-always h-screen'>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mb-8 p-15'>
        <PreviousMonthsStats />
        <PreviousMonthsStats />
        <PreviousMonthsStats />
        <PreviousMonthsStats />
        <TotalRevenueMonth />
      </div>

      <LessonTable
        lessons={lessons}
        onDelete={deleteLessonsAndRevalidate}
        onCancel={cancelLessonsAndRevalidate}
      />
    </div>
  );
}
