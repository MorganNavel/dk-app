"use client";
import { apiCall } from "@/utils/apiCall";
import { useQuery } from "@tanstack/react-query";
import { LessonDetails, LessonEventDetails } from "@/types/types";
import { Calendar, momentLocalizer, Event, View } from "react-big-calendar";
import moment from "moment";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import { SetStateAction, useCallback, useState } from "react";
import "@/styles/CalendarStyles.css";
import EventSheet from "./CalendarEventSheet";

const localizer = momentLocalizer(moment);

const fetchLessons = async () => {
  return await apiCall<LessonDetails[]>(`/lesson/all`);
};

const formatLesson = (lessons: LessonDetails[]) => {
  return lessons.map((lesson, index) => {
    const startDate = new Date(lesson.startDate);
    const endDate = new Date(lesson.startDate);
    endDate.setMinutes(startDate.getMinutes() + lesson.duration);
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
  const [view, setView] = useState<View>("week");
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<LessonEventDetails | null>(
    null
  );

  const onView = useCallback(
    (newView: SetStateAction<View>) => setView(newView),
    [setView]
  );

  if (error) return toast.error("Erreur lors du chargement des données");
  if (isLoading) {
    return <Skeleton className='w-full h-[500px] rounded-lg' />;
  }
  if (!lessons || lessons.length === 0) {
    return <div className='text-center py-4'>Aucune leçon disponible.</div>;
  }

  return (
    <div>
      <Calendar
        className='my-5 mx-5'
        dayLayoutAlgorithm={"no-overlap"}
        localizer={localizer}
        events={formatLesson(lessons)}
        startAccessor='start'
        endAccessor='end'
        views={["month", "week", "day"]}
        view={view}
        date={date}
        defaultView='week'
        onView={onView}
        onNavigate={(date) => setDate(date)}
        popup={true}
        onSelectEvent={(event) => setSelectedEvent(event)}
      />
      <EventSheet
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />
    </div>
  );
}
