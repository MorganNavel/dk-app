import { ViewProps, CalendarView } from "@/components/calendar/Calendar";
import { CardContent, Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  addDays,
  addMonths,
  format,
  getDaysInMonth,
  isSameDay,
  isSameMonth,
  startOfMonth,
} from "date-fns";
interface MonthViewProps<T> extends ViewProps<T> {
  onMonthChange: (newDate: Date) => void;
  onViewChange: (view: CalendarView) => void;
  onDayClick: (date: Date) => void;
}
export function MonthView<T>({
  date,
  events,
  onViewChange,
  onDayClick,
  onMonthChange,
}: Readonly<MonthViewProps<T>>) {
  const monthStart = startOfMonth(date);
  const monthDays = getDaysInMonth(date);

  const nextMonthStart = addMonths(monthStart, 1);
  const nextMonthDays = 31 - monthDays;

  const days = [
    ...Array.from({ length: monthDays }, (_, i) => addDays(monthStart, i)),
    ...Array.from({ length: nextMonthDays }, (_, i) =>
      addDays(nextMonthStart, i)
    ), // Jours du mois suivant
  ];

  return (
    <div className='w-full overflow-hidden' aria-label='Month View'>
      {/* En-tête avec les jours de la semaine */}
      <div className='grid grid-cols-7 text-center font-bold border-b bg-white shadow-md mb-2 '>
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
          <span key={day} className='p-2'>
            {day}
          </span>
        ))}
      </div>

      <div className='grid grid-cols-7 grid-rows-5 gap-2'>
        {days.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, date);

          const dayEvents = events.filter((event) =>
            isSameDay(event.start, day)
          );

          return (
            <Card
              key={index}
              className={cn(
                `relative p-2 border  cursor-pointer transition-all`,
                {
                  "bg-white": isCurrentMonth,
                  "bg-gray-100": !isCurrentMonth,
                }
              )}
              onClick={() => {
                if (!isCurrentMonth) {
                  onMonthChange(addMonths(date, 1));
                } else {
                  onDayClick(day);
                  onViewChange("day");
                }
              }}
            >
              <span className='text-sm font-bold'>{format(day, "d")}</span>
              <CardContent>
                <div className='mt-1 space-y-1'>
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={format(event.start, "HH:mm")}
                      className='bg-primary text-primary-foreground text-xs rounded px-1 truncate'
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className='text-xs text-gray-600'>
                      +{dayEvents.length - 3} événements
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
