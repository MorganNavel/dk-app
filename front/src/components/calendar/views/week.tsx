import { ViewProps } from "@/components/calendar/Calendar";
import {
  addDays,
  format,
  getHours,
  getMinutes,
  isSameDay,
  startOfWeek,
} from "date-fns";
import { EventComponent } from "@/components/calendar/event/default";
import { CurrentTimeIndicator } from "./indicator";

interface WeekViewProps<T> extends ViewProps<T> {
  mondayFirst: boolean;
}
export function WeekView<T>({
  date,
  mondayFirst = true,
  events,
  onEventClick,
  components = {},
}: Readonly<WeekViewProps<T>>) {
  const weekStart = startOfWeek(date, { weekStartsOn: mondayFirst ? 1 : 0 });
  const hourHeight = 64;
  const hourWidth = 50;

  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const dayDate = addDays(weekStart, i);
    return {
      label: format(dayDate, "EEE"),
      fullDate: format(dayDate, "yyyy-MM-dd"),
      date: dayDate,
    };
  });

  return (
    <div className='w-full overflow-hidden' aria-label='Week View'>
      <div className='relative overflow-y-auto'>
        <div className='sticky top-0 z-10 min-w-[1200px] bg-background'>
          <div
            className={`sticky top-0 grid grid-cols-[50px_repeat(7,1fr)] gap-2 text-center font-bold border-b border-gray-300 z-50 bg-white shadow-md`}
          >
            <div />
            {weekDays.map((day) => (
              <div key={day.fullDate} className='min-w-[150px]'>
                {day.label} <br /> {format(day.date, "dd")}
              </div>
            ))}
          </div>
        </div>

        <div className='relative  h-[500px] min-w-[1200px]'>
          <CurrentTimeIndicator hourHeight={hourHeight} hourWidth={hourWidth} />

          <div className={`grid grid-cols-[50px_repeat(7,1fr)]`}>
            <div className='flex flex-col bg-gray-50 border-r border-gray-300'>
              {Array.from({ length: 24 }).map((_, hour) => (
                <div
                  key={hour}
                  className='h-[64px] flex items-center justify-center text-xs'
                >
                  {hour}:00
                </div>
              ))}
            </div>

            {weekDays.map((day) => {
              const dayEvents = events.filter((event) =>
                isSameDay(event.start, day.date)
              );

              return (
                <div
                  key={day.fullDate}
                  className='relative border-l border-gray-300 min-w-[150px]'
                >
                  {Array.from({ length: 24 }).map((_, hour) => (
                    <div
                      key={hour}
                      className='border-b border-gray-200'
                      style={{ height: `${hourHeight}px` }}
                    ></div>
                  ))}
                  {dayEvents.map((event) => {
                    const startHour = getHours(event.start);
                    const startMinutes = getMinutes(event.start);
                    const endHour = getHours(event.end);
                    const endMinutes = getMinutes(event.end);

                    const top = Math.round(
                      startHour * hourHeight + (startMinutes / 60) * hourHeight
                    );
                    const height = Math.round(
                      (endHour - startHour) * hourHeight +
                        ((endMinutes - startMinutes) / 60) * hourHeight
                    );

                    return (
                      <div
                        key={event.title}
                        className='absolute left-1 right-1 bg-primary text-primary-foreground rounded-lg p-1 text-xs shadow-md'
                        style={{ top: `${top}px`, height: `${height}px` }}
                        onClick={() => onEventClick?.(event)}
                      >
                        {components.event ? (
                          <components.event event={event} />
                        ) : (
                          <EventComponent event={event} />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
