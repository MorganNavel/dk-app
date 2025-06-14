"use client";
import { apiCall } from "@/utils/apiCall";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Lesson } from "@/types/Lesson";
import "moment/locale/fr";
import "moment/locale/ko";
import { toast } from "sonner";
import { createElement, useState } from "react";
import "@/styles/CalendarStyles.css";
import { Skeleton } from "@ui/skeleton";
import EventSheet from "@/app/[locale]/danbee-park/schedule/CalendarEventSheet";
import { Calendar, CalendarEvent } from "@/components/calendar/Calendar";
import { addMinutes } from "date-fns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useLessonTableActions } from "@/hooks/useActions";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useSidebar } from "@/components/ui/sidebar";
import { hasPermission } from "@/utils/permissions";
import { cn } from "@/lib/utils";
import { useProfile } from "@/providers/Profile";

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
type Action = "add";
export default function SchedulePage() {
  const {
    data: lessons,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["lessons"],
    queryFn: fetchLessons,
  });
  const { isMobile } = useSidebar();
  const t = useTranslations();
  const configActions = useLessonTableActions();
  const [action, setAction] = useState<Action | null>(null);
  const queryClient = useQueryClient();
  const { profile } = useProfile();
  const locale = useLocale();

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

  return (
    <>
      <Calendar<Lesson>
        events={!lessons ? [] : formatLesson(lessons)}
        view='week'
        onEventClick={(event) => setSelectedEvent(event)}
        views={["day", "week"]}
        className='m-5 h-screen'
        locale={locale}
        components={{
          actions: [
            hasPermission(profile, "lessons", "create") && (
              <Button
                key='add'
                variant={"ghost"}
                onClick={() => setAction("add")}
              >
                <Plus className='w-4 h-4 text-primary' /> {t("generals.add")}
              </Button>
            ),
          ],
        }}
      />
      <Drawer
        direction={isMobile ? "bottom" : "right"}
        open={(action && configActions[action].type === "modal") ?? false}
        onOpenChange={(open) => !open && setAction(null)}
      >
        <DrawerContent
          className={cn(
            "left-auto mt-0 w-full lg:w-1/4 rounded-md",
            isMobile ? "h-3/4 overflow-hidden" : "h-full"
          )}
        >
          {!isMobile && (
            <DrawerHeader className='mt-5'>
              <DrawerTitle className='text-center lg:text-2xl text-xl font-semibold'>
                {action && configActions[action].type === "modal"
                  ? t(`lessons.data-table.actions.modal.${action}.title`)
                  : ""}
              </DrawerTitle>
            </DrawerHeader>
          )}
          {action &&
            configActions[action].type === "modal" &&
            createElement(configActions[action].component, {
              onFinish: () => {
                setAction(null);
              },
            })}
        </DrawerContent>
      </Drawer>
      {selectedEvent && (
        <EventSheet
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      )}
    </>
  );
}

const CalendarSkeleton = () => {
  return (
    <div className='my-5 mx-5 overflow-auto h-screen'>
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
