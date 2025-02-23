"use client";
import { apiCall } from "@/utils/apiCall";
import { useQuery } from "@tanstack/react-query";
import { Lesson } from "@/types/Lesson";
import "moment/locale/fr";
import "moment/locale/ko";
import { toast } from "sonner";
import { useState } from "react";
import "@/styles/CalendarStyles.css";
import { Skeleton } from "@ui/skeleton";
import EventSheet from "@/app/[locale]/danbee-park/schedule/CalendarEventSheet";
import { Calendar, CalendarEvent } from "@/components/calendar/Calendar";
import { addMinutes } from "date-fns";

const fetchLessons = async () => {
  return await apiCall<Lesson[]>(`/lesson/all`);
};

const formatLesson = (lessons: Lesson[]): CalendarEvent<Lesson>[] => {
  return lessons.map((lesson) => {
    const startDate = new Date(lesson.startDate);
    const endDate = addMinutes(startDate, lesson.duration);
    return {
      title: lesson.title,
      start: startDate,
      end: endDate,
      resource: lesson,
    };
  });
};

export default function SchedulePage() {
  const {
    data: lessons,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["lessons"],
    queryFn: fetchLessons,
  });

  const [selectedEvent, setSelectedEvent] =
    useState<CalendarEvent<Lesson> | null>(null);

  if (error) {
    toast.error("Erreur lors du chargement des données");
    return (
      <div className='text-center py-4'>
        Erreur lors du chargement des données
      </div>
    );
  }
  if (isLoading) {
    return <CalendarSkeleton />;
  }
  if (!lessons || lessons.length === 0) {
    return <div className='text-center py-4'>Aucune leçon disponible.</div>;
  }
  return (
    <div className='my-5 mx-5'>
      <Calendar<Lesson>
        events={formatLesson(lessons)}
        view='week'
        onEventClick={(event) => setSelectedEvent(event)}
        views={["month", "day", "week"]}
      />
      {selectedEvent && (
        <EventSheet
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      )}
    </div>
  );
}

const CalendarSkeleton = () => {
  return (
    <div className='my-5 mx-5 overflow-auto h-[80vh]'>
      {Array.from({ length: 24 }).map((_, hour) => (
        <div key={hour} className='flex mb-2'>
          {Array.from({ length: 7 }).map((_, day) => (
            <Skeleton key={day} className='w-full h-10 mx-1' />
          ))}
        </div>
      ))}
    </div>
  );
};
