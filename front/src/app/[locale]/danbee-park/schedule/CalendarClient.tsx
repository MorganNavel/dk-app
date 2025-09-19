"use client";
import "moment/locale/fr";
import "moment/locale/ko";
import { createElement, useState } from "react";
import "@/styles/CalendarStyles.css";
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
import { Lesson, UserProfile } from "@/types/type";
import { useSession } from "@/lib/auth-client";

const formatLesson = (lessons: Lesson[]): CalendarEvent<Lesson>[] => {
  return lessons.map((lesson) => {
    const startDate = new Date(lesson.startDate);
    const endDate = addMinutes(startDate, lesson.duration);
    return {
      title: lesson.title ?? "",
      start: startDate,
      end: endDate,
      resource: lesson,
    };
  });
};
type Action = "add";
export function CalendarClient({
  lessons,
}: Readonly<{
  lessons: Lesson[] | null;
}>) {
  const { isMobile } = useSidebar();
  const t = useTranslations();
  const configActions = useLessonTableActions();
  const [action, setAction] = useState<Action | null>(null);
  const [selectedEvent, setSelectedEvent] =
    useState<CalendarEvent<Lesson> | null>(null);
  const locale = useLocale();
  const user = useSession();
  const profile = user.data?.user as UserProfile | undefined;

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
          eventStyle(event) {
            const isParticipating = event.resource.bookings?.some(
              (booking: any) => booking.idUser === profile?.id
            );
            const maxCapacity = event.resource.groupSize || 0;
            const currentBookings = event.resource.bookings?.length || 0;
            const isFull = currentBookings >= maxCapacity;
            if (isParticipating) {
              return {
                backgroundColor: "gray",
              };
            }
            if (isFull) {
              return {
                backgroundColor: "red",
              };
            }
            return {};
          },

          actions: [
            profile && hasPermission(profile, "lessons", "create") && (
              <Button
                key='add'
                variant={"ghost"}
                onClick={() => setAction("add")}
              >
                <Plus className='size-6 text-primary' />
                <p className='hidden sm:inline'>{t("generals.add")}</p>
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
            "left-auto mt-0 w-full lg:w-1/2 xl:w-1/4 rounded-md",
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
