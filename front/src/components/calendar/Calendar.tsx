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
export interface CalendarProps<T> {
  events: CalendarEvent<T>[];
  onEventClick?: (event: CalendarEvent<T>) => void;
  view?: CalendarView;
  views?: CalendarView[];
  mondayFirst?: boolean;
  className?: string;
  isMobile?: boolean;
  components?: {
    event?: React.ComponentType<CalendarEventProps<T>>;
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
}: Readonly<CalendarProps<T>>) {
  const [currentView, setCurrentView] = useState<CalendarView>(view);
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <div className='flex flex-col gap-5'>
      <CalendarHeader
        view={currentView}
        views={views}
        date={currentDate}
        onViewChange={setCurrentView}
        isMobile={isMobile}
        setCurrentDate={setCurrentDate}
        actions={components.actions}
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
      />
      <div className='flex justify-center '>
        <CalendarPagination
          date={currentDate}
          view={currentView}
          onNext={(date) => setCurrentDate(date)}
          onPrevious={(date) => setCurrentDate(date)}
        />
      </div>
    </div>
  );
}

interface CalendarHeaderProps {
  view: CalendarView;
  views: CalendarView[];
  date: Date;
  onViewChange: (view: CalendarView) => void;
  mondayFirst?: boolean;
  isMobile: boolean;
  setCurrentDate: (date: Date) => void;
  actions?: ReactNode[];
}
function CalendarHeader({
  date,
  view,
  views,
  onViewChange,
  mondayFirst = true,
  isMobile,
  setCurrentDate,
  actions,
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
      <div className='flex justify-between'>
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
        <div className='flex gap-2'>{actions}</div>
      </div>
    </div>
  );
}
interface CalendarPaginationProps {
  date: Date;
  view: CalendarView;
  onNext: (date: Date) => void;
  onPrevious: (date: Date) => void;
}

function CalendarPagination({
  date,
  view,
  onNext,
  onPrevious,
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
    <div className='flex gap-2'>
      <Button variant={"outline"} onClick={() => onPrevious(getPreviousDate())}>
        Previous
      </Button>
      <Button variant={"outline"} onClick={() => onNext(getNextDate())}>
        Next
      </Button>
    </div>
  );
}
interface CalendarBodyProps<T> {
  view: CalendarView;
  date: Date;
  events: CalendarEvent<T>[];
  onEventClick?: (event: CalendarEvent<T>) => void;
  onDayClick: (date: Date) => void;
  onViewChange: (view: CalendarView) => void;
  mondayFirst: boolean;
  components?: {
    event?: React.ComponentType<CalendarEventProps<T>>;
  };
}
function CalendarBody<T>({
  view,
  date,
  onEventClick,
  mondayFirst = true,
  events,
  components = {},
  onViewChange,
  onDayClick,
}: Readonly<CalendarBodyProps<T>>) {
  return (
    <div>
      {view === "month" && (
        <MonthView<T>
          date={date}
          components={components}
          events={events}
          onMonthChange={(newDate) => console.log(newDate)}
          onViewChange={onViewChange}
          onDayClick={onDayClick}
        />
      )}
      {view === "week" && (
        <WeekView<T>
          date={date}
          events={events}
          components={components}
          mondayFirst={mondayFirst}
          onEventClick={onEventClick}
        />
      )}
      {view === "day" && (
        <DayView<T>
          date={date}
          components={components}
          events={events}
          onEventClick={onEventClick}
        />
      )}
    </div>
  );
}
export interface ViewProps<T> {
  date: Date;
  events: CalendarEvent<T>[];
  components?: {
    event?: React.ComponentType<CalendarEventProps<T>>;
  };
  onEventClick?: (event: CalendarEvent<T>) => void;
}
