import { LessonEventDetails } from "@/types/types";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { Event } from "react-big-calendar";

interface ScheduleEventProps {
  event: Event & { resource: LessonEventDetails };
  open: boolean;
}

export const ScheduleEvent = ({ event, open }: ScheduleEventProps) => {
  const lessonDate = event.start ? new Date(event.start) : new Date();
  const lessonEnd = event.end ? new Date(event.end) : new Date();
  const lesson = event.resource as LessonEventDetails;

  const formatTime = (date: Date) => {
    return `${date.getUTCHours().toString().padStart(2, "0")}:${date
      .getUTCMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Popover isOpen={open}>
      <PopoverTrigger>
        <div></div>
      </PopoverTrigger>
      <PopoverContent className='p-3 bg-white shadow-md rounded-lg w-56'>
        <h4 className='text-md font-bold'>{event.title}</h4>
        <p className='text-xs text-gray-600 mb-1'>
          {lesson?.description || "Pas de description disponible"}
        </p>
        <p className='text-xs'>
          Participants : {lesson?.nbParticipants} / {lesson?.groupSize}
        </p>
        <p className='text-xs mb-2'>
          Enseignant : {lesson?.teacher.firstname} {lesson?.teacher.name}
        </p>
        <p className='text-sm font-medium mb-2'>
          {formatTime(lessonDate)} - {formatTime(lessonEnd)}
        </p>
        <Button className='w-full bg-primary text-white py-1 rounded-lg hover:bg-auto text-xs'>
          Rejoindre
        </Button>
      </PopoverContent>
    </Popover>
  );
};
