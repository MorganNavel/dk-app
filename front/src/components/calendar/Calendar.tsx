import {
  addDays,
  addMonths,
  addWeeks,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import React, { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import { MonthView } from "./views/month";
import { WeekView } from "./views/week";
import { DayView } from "./views/day";
import { cn } from "@/lib/utils";
interface LocaleProps {
  locale: string;
}
export interface CalendarEventProps<T> {
  event: CalendarEvent<T>;
}

export interface CalendarEvent<T> {
  title: string;
  start: Date;
  end: Date;
  resource: T;
}
export type CalendarView = "day" | "week" | "month";
interface ComponentsProps<T> {
  event?: React.ComponentType<CalendarEventProps<T>>;
  eventStyle?: (event: CalendarEvent<T>) => React.CSSProperties;
}
export interface CalendarProps<T> extends LocaleProps {
  events: CalendarEvent<T>[];
  onEventClick?: (event: CalendarEvent<T>) => void;
  view?: CalendarView;
  views?: CalendarView[];
  mondayFirst?: boolean;
  className?: string;
  isMobile?: boolean;
  onDateChange?: (date: Date) => void;
  date?: Date;
  components?: {
    event?: React.ComponentType<CalendarEventProps<T>>;
    eventStyle?: (event: CalendarEvent<T>) => React.CSSProperties;
    actions?: ReactNode[];
  };
}
export function Calendar<T>({
  events,
  onEventClick,
  view = "week",
  views = ["day", "week", "month"],
  mondayFirst = true,
  isMobile = false,
  components = {},
  date,
  onDateChange,
  className = "",
  locale = "en",
}: Readonly<CalendarProps<T>>) {
  const [currentView, setCurrentView] = useState<CalendarView>(view);
  const [currentDate, setCurrentDate] = useState(date ?? new Date());
  function handleDateChange(date: Date) {
    setCurrentDate(date);
    onDateChange && onDateChange(date);
  }
  return (
    <div className={cn("flex flex-col justify-center  gap-5", className)}>
      <CalendarHeader
        view={currentView}
        views={views}
        date={currentDate}
        onViewChange={setCurrentView}
        isMobile={isMobile}
        setCurrentDate={setCurrentDate}
        actions={components.actions}
        locale={locale}
        onNext={handleDateChange}
        onPrevious={handleDateChange}
      />
      <CalendarBody<T>
        view={currentView}
        date={currentDate}
        events={events}
        onEventClick={onEventClick}
        mondayFirst={mondayFirst}
        components={components}
        onViewChange={setCurrentView}
        onDayClick={(date: Date) => setCurrentDate(date)}
        locale={locale}
      />
    </div>
  );
}

interface CalendarHeaderProps extends LocaleProps {
  view: CalendarView;
  views: CalendarView[];
  date: Date;
  onViewChange: (view: CalendarView) => void;
  mondayFirst?: boolean;
  isMobile: boolean;
  setCurrentDate: (date: Date) => void;
  onNext: (date: Date) => void;
  onPrevious: (date: Date) => void;

  actions?: ReactNode[];
}
function CalendarHeader({
  date,
  view,
  views,
  mondayFirst = true,
  actions,
  locale,
  onViewChange,
  setCurrentDate,
  onNext,
  onPrevious,
}: Readonly<CalendarHeaderProps>) {
  function getFormattedDate(date: Date) {
    switch (view) {
      case "day":
        return format(date, "dd MMMM yyyy");
      case "week":
        return `${format(
          startOfWeek(date, {
            weekStartsOn: mondayFirst ? 1 : 0,
          }),
          "dd MMMM yyyy"
        )} - ${format(
          endOfWeek(date, { weekStartsOn: mondayFirst ? 1 : 0 }),
          "dd MMMM yyyy"
        )}`;
      case "month":
        return `${format(startOfMonth(date), "dd MMMM yyyy")} - ${format(
          endOfMonth(date),
          "dd MMMM yyyy"
        )}`;
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <span className='text-center font-bold text-xl text-foreground'>
        {getFormattedDate(date)}
      </span>
      <CalendarPagination
        date={date}
        view={view}
        onNext={onNext}
        onPrevious={onPrevious}
        locale={locale}
        className=' justify-center'
      />
      <div className='flex justify-between items-center '>
        <div className='flex gap-2'>
          {views.includes("month") && (
            <Button variant={"outline"} onClick={() => onViewChange("month")}>
              Month
            </Button>
          )}
          {views.includes("week") && (
            <Button variant={"outline"} onClick={() => onViewChange("week")}>
              Week
            </Button>
          )}
          {views.includes("day") && (
            <Button variant={"outline"} onClick={() => onViewChange("day")}>
              Day
            </Button>
          )}
          <Button variant='outline' onClick={() => setCurrentDate(new Date())}>
            Today
          </Button>
        </div>

        {actions && actions.length > 0 && (
          <div className='flex gap-2'>{actions}</div>
        )}
      </div>
    </div>
  );
}
interface CalendarPaginationProps extends LocaleProps {
  date: Date;
  view: CalendarView;
  onNext: (date: Date) => void;
  onPrevious: (date: Date) => void;
  className?: string;
}

function CalendarPagination({
  date,
  view,
  onNext,
  onPrevious,
  className,
}: Readonly<CalendarPaginationProps>) {
  function getNextDate() {
    switch (view) {
      case "day":
        return addDays(date, 1);
      case "week":
        return addWeeks(date, 1);
      case "month":
        return addMonths(date, 1);
    }
  }
  function getPreviousDate() {
    switch (view) {
      case "day":
        return addDays(date, -1);
      case "week":
        return addWeeks(date, -1);
      case "month":
        return addMonths(date, -1);
    }
  }
  return (
    <div className={cn("flex gap-2", className)}>
      <Button variant={"outline"} onClick={() => onPrevious(getPreviousDate())}>
        Previous
      </Button>
      <Button variant={"outline"} onClick={() => onNext(getNextDate())}>
        Next
      </Button>
    </div>
  );
}
interface CalendarBodyProps<T> extends LocaleProps {
  view: CalendarView;
  date: Date;
  events: CalendarEvent<T>[];
  onEventClick?: (event: CalendarEvent<T>) => void;
  onDayClick: (date: Date) => void;
  onViewChange: (view: CalendarView) => void;
  mondayFirst: boolean;
  components?: ComponentsProps<T>;
}

function CalendarBody<T>({
  view,
  onEventClick,
  mondayFirst = true,
  onViewChange,
  onDayClick,
  ...props
}: Readonly<CalendarBodyProps<T>>) {
  return (
    <div>
      {view === "month" && (
        <MonthView<T>
          onMonthChange={(newDate) => {}}
          onViewChange={onViewChange}
          onDayClick={onDayClick}
          {...props}
        />
      )}
      {view === "week" && (
        <WeekView<T>
          mondayFirst={mondayFirst}
          onEventClick={onEventClick}
          {...props}
        />
      )}
      {view === "day" && <DayView<T> onEventClick={onEventClick} {...props} />}
    </div>
  );
}
export interface ViewProps<T> extends LocaleProps {
  date: Date;
  events: CalendarEvent<T>[];
  components?: ComponentsProps<T>;
  onEventClick?: (event: CalendarEvent<T>) => void;
  onViewChange?: (view: CalendarView) => void;
}

export function CalendarSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={cn("animate-pulse flex flex-col gap-5", className)}>
      {/* Header Skeleton */}
      <div className='flex flex-col gap-2 items-center'>
        <div className='h-6 w-1/3 bg-muted rounded' />
        <div className='flex gap-2 flex-wrap justify-center'>
          <div className='h-8 w-20 bg-muted rounded' />
          <div className='h-8 w-20 bg-muted rounded' />
          <div className='h-8 w-20 bg-muted rounded' />
          <div className='h-8 w-20 bg-muted rounded' />
        </div>
      </div>

      {/* Body Skeleton (Week/Grid) */}
      <div className='grid grid-cols-7 gap-2 px-2'>
        {Array.from({ length: 7 * 5 }).map((_, i) => (
          <div key={i} className='h-20 bg-muted rounded' />
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className='flex justify-center gap-2'>
        <div className='h-8 w-24 bg-muted rounded' />
        <div className='h-8 w-24 bg-muted rounded' />
      </div>
    </div>
  );
}
