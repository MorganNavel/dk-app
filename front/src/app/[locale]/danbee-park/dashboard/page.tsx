import { EarningsComparison, Lesson } from "@/types/type";
import LessonTable from "./LessonTable";
import {
  deleteLessonsAndRevalidate,
  cancelLessonsAndRevalidate,
} from "./actions";
import { getUpcomingLessons } from "@/queries/lessons/lessons-queries";
import {
  getEarningsChartData,
  getEarningsComparison,
} from "@/queries/lessons/earnings.service";
import { ChartEarnings, ComparisionStats } from "./stats";

export default async function LessonsContent() {
  const lessons = (await getUpcomingLessons()) as unknown as Lesson[];
  const revenue =
    await (getEarningsComparison() as unknown as EarningsComparison);
  const date3yearsAgo = new Date();
  date3yearsAgo.setFullYear(date3yearsAgo.getFullYear() - 3);
  const now = new Date();
  const chartData = await getEarningsChartData(date3yearsAgo, now);

  return (
    <div className='mx-5 lg:mx-15 min-h-screen pt-32 flex flex-col gap-6'>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 '>
        <ComparisionStats earnings={revenue?.month} type='monthly' />
        <ComparisionStats earnings={revenue?.year} type='yearly' />
      </div>
      <ChartEarnings chartData={chartData} />
      <LessonTable
        lessons={lessons}
        onDelete={deleteLessonsAndRevalidate}
        onCancel={cancelLessonsAndRevalidate}
      />
    </div>
  );
}
