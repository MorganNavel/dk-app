import { format, getHours, getMinutes, isSameDay } from "date-fns";
import { CalendarEvent, ViewProps } from "@/components/calendar/Calendar";
import { EventComponent } from "@/components/calendar/event/default";
import { CurrentTimeIndicator } from "./indicator";
import { cn } from "@/lib/utils";

export function DayView<T>({
  date,
  events,
  components = {},
  onEventClick,
}: Readonly<ViewProps<T>>) {
  const hourHeight = 64;
  const hourWidth = 50;
  return (
    <div className='w-full overflow-hidden' aria-label='Day View'>
      <div className='relative overflow-y-auto'>
        {/* En-tête avec le jour */}
        <div className='sticky top-0 z-10 bg-white shadow-md border-b border-gray-300 p-2 text-center font-bold'>
          {format(date, "EEEE, dd MMMM yyyy")}
        </div>

        <div className='relative h-[500px]'>
          {/* Indicateur de l'heure actuelle */}
          <CurrentTimeIndicator hourHeight={hourHeight} hourWidth={hourWidth} />

          <div className={`grid grid-cols-[50px_1fr]`}>
            {/* Colonne des heures */}
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

            {/* Colonne des événements */}
            <div className='relative border-l border-gray-300'>
              {/* Lignes horaires */}
              {Array.from({ length: 24 }).map((_, hour) => (
                <div
                  key={hour}
                  className='h-[64px] border-b border-gray-200'
                ></div>
              ))}

              {/* Événements positionnés */}
              {events
                .filter((event: CalendarEvent<T>) =>
                  isSameDay(event.start, date)
                )
                .map((event: CalendarEvent<T>) => {
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
                    <button
                      key={format(event.start, "HH:mm")}
                      className={cn(
                        "text-left absolute left-1 right-1 bg-primary text-primary-foreground rounded-lg p-1 text-xs shadow-md"
                      )}
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                        ...components.eventStyle?.(event),
                      }}
                      onClick={() => onEventClick?.(event)}
                    >
                      {components.event ? (
                        <components.event event={event} />
                      ) : (
                        <EventComponent event={event} />
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
