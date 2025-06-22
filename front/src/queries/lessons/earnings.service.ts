import { getUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import {
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subMonths,
  subYears,
} from "date-fns";

export async function getTotalEarnings(
  id: string,
  startDate?: Date,
  endDate?: Date
) {
  const res = await prisma.lesson.aggregate({
    _sum: {
      earned: true,
    },
    where: {
      teacher: { id },
      status: "done",
      ...(startDate && { startDate: { gte: startDate } }),
      ...(endDate && {
        startDate: { ...(startDate ? { gte: startDate } : {}), lte: endDate },
      }),
    },
  });
  return res._sum.earned ?? 0;
}

export async function getEarnings(startDate?: Date, endDate?: Date) {
  const user = await getUser();
  const isTeacher = user?.role === "teacher";

  if (!user || !isTeacher) {
    return;
  }
  return await getTotalEarnings(user.id, startDate, endDate);
}

export async function getEarningsComparison() {
  const user = await getUser();
  if (!user) {
    return null;
  }

  // Périodes
  const now = new Date();

  const currentMonthStart = startOfMonth(now);
  const currentMonthEnd = endOfMonth(now);
  const previousMonthStart = startOfMonth(subMonths(now, 1));
  const previousMonthEnd = subMonths(now, 1);

  const currentYearStart = startOfYear(now);
  const currentYearEnd = endOfYear(now);
  const previousYearStart = startOfYear(subYears(now, 1));
  const previousYearEnd = subYears(now, 1);

  // Récupération des données
  const [currentMonth, previousMonth, currentYear, previousYear] =
    await Promise.all([
      getTotalEarnings(user.id, currentMonthStart, currentMonthEnd),
      getTotalEarnings(user.id, previousMonthStart, previousMonthEnd),
      getTotalEarnings(user.id, currentYearStart, currentYearEnd),
      getTotalEarnings(user.id, previousYearStart, previousYearEnd),
    ]);

  // Pourcentage d’évolution
  function getPercentageChange(current: number, previous: number): number {
    if (previous === 0) {
      return current > 0 ? Math.round(current * 100) : 0;
    }
    return Math.round(((current - previous) / previous) * 100);
  }

  return {
    month: {
      current: currentMonth,
      previous: previousMonth,
      percentageChange: getPercentageChange(currentMonth, previousMonth),
    },
    year: {
      current: currentYear,
      previous: previousYear,
      percentageChange: getPercentageChange(currentYear, previousYear),
    },
  };
}
