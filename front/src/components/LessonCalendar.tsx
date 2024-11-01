"use client";
import { apiCall } from "@/utils/apiCall";
import { useQuery } from "@tanstack/react-query";
import { LessonDetails } from "@/types/types";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import { ScheduleEvent } from "./ScheduleEvent";
import { title } from "process";
import { useState } from "react";
const localizer = momentLocalizer(moment);

const fetchLessons = async () => {
  return await apiCall<LessonDetails[]>(`/lesson/all`);
};

const formatLesson = (lessons: LessonDetails[]) => {
  return lessons.map((lesson, index) => {
    const startDate = new Date(lesson.startDate);
    const endDate = new Date(lesson.startDate);
    endDate.setMinutes(startDate.getMinutes() + lesson.duration);
    console.log(lesson);
    return {
      title: lesson.title,
      start: startDate,
      end: endDate,
      resource: {
        description: lesson.description,
        nbParticipants: lesson.nbParticipants,
        groupSize: lesson.groupSize,
        teacher: lesson.teacher,
      },
    };
  });
};
export default function LessonCalendar() {
  const {
    data: lessons,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["lessons"],
    queryFn: fetchLessons,
  });
  const [view, setView] = useState("week");

  if (error) return toast.error("Erreur lors du chargement des données");
  if (!lessons || lessons.length === 0) {
    return <div className='text-center py-4'>Aucune leçon disponible.</div>;
  }

  return (
    <div>
      {isLoading ? (
        <Skeleton className='w-full h-[500px] rounded-lg' />
      ) : (
        <Calendar
          localizer={localizer}
          events={formatLesson(lessons!!)}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 500 }}
          views={["month", "week", "day"]}
          view={view}
          onSelectEvent={(event) => console.log(event)}
          onView={(view) => setView(view)}
          popup
          toolbar={true}
          components={
            {
              // event: ScheduleEvent,
            }
          }
        />
      )}
    </div>
  );
}
