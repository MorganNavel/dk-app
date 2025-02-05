"use client";
import { apiCall } from "@/utils/apiCall";
import { useQuery } from "@tanstack/react-query";
import { Lesson, LessonEventDetails } from "@/types/lesson";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr";
import "moment/locale/ko";
import { toast } from "sonner";
import { SetStateAction, useCallback, useState, useEffect } from "react";
import "@/styles/CalendarStyles.css";
import { Skeleton } from "@ui/skeleton";
import { usePathname } from "next/dist/client/components/navigation";
import EventSheet from "@/components/calendar/CalendarEventSheet";

const fetchLessons = async () => {
  return await apiCall<Lesson[]>(`/lesson/all`);
};

const formatLesson = (lessons: Lesson[]) => {
  return lessons.map((lesson) => {
    const { startDate, ...lessonInfo } = lesson;
    const startDateObj = new Date(startDate);
    const endDate = new Date(startDate);
    endDate.setMinutes(startDateObj.getMinutes() + lesson.duration);
    return {
      title: lesson.title,
      start: startDateObj,
      end: endDate,
      resource: lessonInfo,
    };
  });
};

export default function SchedulePage() {
  const path = usePathname();
  const currentLang = path.split("/")[1];
  const [localizer, setLocalizer] = useState(momentLocalizer(moment));

  const getBrowserLocale = () => {
    if (currentLang === "fr") {
      return "fr";
    } else if (currentLang === "en") {
      return "en";
    } else {
      return "ko";
    }
  };

  useEffect(() => {
    const locale = getBrowserLocale();
    moment.locale(locale);
    setLocalizer(momentLocalizer(moment));
    console.log("currentLang", currentLang);
  }, [currentLang]);

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
    <div>
      <Calendar
        culture={currentLang}
        className='my-5 mx-5 bg-white rounded-lg shadow-md'
        dayLayoutAlgorithm='no-overlap'
        localizer={localizer}
        events={formatLesson(lessons)}
        startAccessor='start'
        endAccessor='end'
        views={["week", "day"]}
        view={view}
        date={date}
        defaultView='week'
        onView={onView}
        onNavigate={(date) => setDate(date)}
        popup={true}
        onSelectEvent={(event: any) => {
          setSelectedEvent(event);
        }}
        style={{
          height: "80vh",
        }}
      />
      <EventSheet
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />
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
