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
  idTeacher: string,
  startDate?: Date,
  endDate?: Date
) {
  const res = await prisma.billing.aggregate({
    _sum: {
      price: true,
    },
    where: {
      idTeacher,
      status: "done",
      createdAt: {
        gte: startDate ?? new Date(0),
        lte: endDate ?? new Date(),
      },
    },
  });
  return res._sum.price ?? 0;
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
  function getPercentageChange(
    current: number,
    previous: number
  ): number | null {
    if (previous === 0) {
      return current === 0 ? 0 : null; // null pour "indéfini" ou "new"
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
export async function getEarningsChartData(
  startDate: Date,
  endDate: Date
): Promise<{ date: string; earnings: number }[]> {
  const user = await getUser();
  if (!user || user.role !== "teacher") {
    return [];
  }
  const idTeacher = user.id;
  const rawData = await prisma.$queryRaw<
    { year: number; month: number; earnings: number }[]
  >`
    SELECT
      EXTRACT(YEAR FROM "createdAt") AS year,
      EXTRACT(MONTH FROM "createdAt") AS month,
      SUM(price) AS earnings
    FROM "Billing"
    WHERE
      "idTeacher" = ${idTeacher}
      AND status = 'done'
      AND "createdAt" BETWEEN ${startDate} AND ${endDate}
    GROUP BY year, month
    ORDER BY year, month;
  `;
  let result: { [date: string]: { date: string; earnings: number } } = {};
  for (const row of rawData) {
    const date = `${row.year}-${String(row.month).padStart(2, "0")}`;
    if (result[date]) {
      result[date].earnings += row.earnings;
      break;
    }
    result[date] = { date, earnings: row.earnings };
  }
  return Object.values(result);
}
