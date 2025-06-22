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
    <div>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mb-8 p-15'>
        <PreviousMonthsStats />
        <PreviousMonthsStats />
        <PreviousMonthsStats />
        <PreviousMonthsStats />
        <TotalRevenueMonth />

        {/* <p>col1</p>
        <p>col2</p>
        <p>col3</p>
        <p>col4</p>
        <p>col5</p>
        <p>col6</p> */}
      </div>

      <LessonTable
        lessons={lessons}
        onDelete={deleteLessonsAndRevalidate}
        onCancel={cancelLessonsAndRevalidate}
      />
    </div>
  );
}
