import { format } from "date-fns";
import { CalendarEventProps } from "@/components/calendar/Calendar";

export function EventComponent<T>({ event }: Readonly<CalendarEventProps<T>>) {
  return (
    <>
      <div className='text-xs font-bold'>
        {format(event.start, "HH:mm")} - {format(event.end, "HH:mm")}
      </div>
      <div>
        <span>{event.title}</span>
      </div>
    </>
  );
}
