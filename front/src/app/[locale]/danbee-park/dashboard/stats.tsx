"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocale, useTranslations } from "next-intl";
import { IoTrendingDown, IoTrendingUp } from "react-icons/io5";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo, useState } from "react";
interface ComparisionEarnings {
  earnings:
    | {
        current: number;
        previous: number;
        percentageChange: number | null;
      }
    | undefined;
  type: "monthly" | "yearly";
}

function formatPercentageChange(value: number | null): string {
  if (value === null) return "N/A";
  if (value === 0) return "0%";
  return `${value > 0 ? "+" : ""}${value}%`;
}

export function ComparisionStats({
  earnings,
  type,
}: Readonly<ComparisionEarnings>) {
  const t = useTranslations(`dashboard.stats.${type}`);
  if (!earnings) return null;

  const isNew = earnings.percentageChange === null;
  const isPositive =
    earnings.percentageChange !== null && earnings.percentageChange >= 0;
  const TrendIcon = isPositive ? IoTrendingUp : IoTrendingDown;

  return (
    <Card>
      <CardHeader>
        <CardDescription>{t("title")}</CardDescription>
        <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
          $ {earnings.current}
        </CardTitle>
        <CardAction>
          <Badge variant='outline' className='flex items-center gap-1'>
            {!isNew && (
              <TrendIcon
                className={
                  isPositive ? "text-green-500 size-4" : "text-red-500 size-4"
                }
              />
            )}
            {formatPercentageChange(earnings.percentageChange)}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className='flex-col items-start gap-1.5 text-sm'>
        <div className='line-clamp-1 flex gap-2 font-medium items-center'>
          {isNew ? (
            t("noRevenue")
          ) : (
            <>
              {isPositive ? t("trendingUp") : t("trendingDown")}
              <TrendIcon className='size-4' />
            </>
          )}
        </div>
        <div className='text-muted-foreground'>{t("description")}</div>
      </CardFooter>
    </Card>
  );
}

interface ChartEarnings {
  date: string;
  earnings: number;
}

export function ChartEarnings({
  chartData,
  className = "",
}: Readonly<{
  chartData: ChartEarnings[];
  className?: string;
}>) {
  const t = useTranslations("dashboard.stats.chartEarnings");

  const locale = useLocale();
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
  });
  const primaryColor = "#58a774";

  const chartConfig = {
    visitors: {
      label: t("chartConfig.visitorsLabel"),
    },
    earnings: {
      label: t("chartConfig.earningsLabel"),
      color: primaryColor,
    },
  } satisfies ChartConfig;
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState("12m");

  const startDate = useMemo(() => {
    const ref = new Date();
    let monthsToSubtract = 12;
    if (timeRange === "24m") {
      monthsToSubtract = 24;
    } else if (timeRange === "36m") {
      monthsToSubtract = 36;
    }
    ref.setMonth(ref.getMonth() - monthsToSubtract);
    return ref;
  }, [timeRange]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    return date >= startDate;
  });
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>
          <span className='hidden @[540px]/card:block'>
            {t("descriptionDesktop")}
          </span>
          <span className='@[540px]/card:hidden'>{t("descriptionMobile")}</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type='single'
            value={timeRange}
            onValueChange={setTimeRange}
            variant='outline'
            className='hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex'
          >
            <ToggleGroupItem value='12m'>
              {t("toggleGroup.12m")}
            </ToggleGroupItem>
            <ToggleGroupItem value='24m'>
              {t("toggleGroup.24m")}
            </ToggleGroupItem>
            <ToggleGroupItem value='36m'>
              {t("toggleGroup.36m")}
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className='flex lg:w-40 w-30 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden'
              aria-label='Select a value'
            >
              <SelectValue placeholder='Last 3 months' />
            </SelectTrigger>
            <SelectContent className='rounded-xl'>
              <SelectItem value='12m'>{t("selectItems.12m")}</SelectItem>

              <SelectItem value='24m' className='rounded-lg'>
                {t("selectItems.24m")}
              </SelectItem>
              <SelectItem value='36m' className='rounded-lg'>
                {t("selectItems.36m")}
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id='fillDesktop' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor={primaryColor} stopOpacity={1.0} />
                <stop offset='95%' stopColor={primaryColor} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id='fillMobile' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor={primaryColor} stopOpacity={0.8} />
                <stop offset='95%' stopColor={primaryColor} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return dateFormatter.format(date);
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    if (
                      typeof value === "string" ||
                      typeof value === "number" ||
                      value instanceof Date
                    ) {
                      const date = new Date(value);
                      if (!isNaN(date.getTime())) {
                        return dateFormatter.format(date);
                      }
                    }
                    return "";
                  }}
                  indicator='dot'
                />
              }
            />
            <Area
              dataKey='earnings'
              type='natural'
              fill='url(#fillMobile)'
              stroke={primaryColor}
              stackId='a'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
