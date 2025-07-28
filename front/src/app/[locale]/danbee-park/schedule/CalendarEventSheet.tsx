"use client";
import { SheetContent, SheetHeader, SheetTitle, Sheet } from "@ui/sheet";
import moment from "moment";
import LNGS from "@/types/languages";
import { Button } from "@ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Spinner } from "@nextui-org/react";
import { FaUser, FaLanguage, FaClock, FaBook } from "react-icons/fa";
import { CalendarEvent } from "@/components/calendar/Calendar";
import { Booking, Lesson, UserProfile } from "@/types/type";
import { useSession } from "@/lib/auth-client";
import { cancelBookingAction, createBookingAction } from "./actions";
import { useRouter } from "@/i18n/routing";
import { hasPermission } from "@/utils/permissions";
import { ResponseType } from "@/queries/reponse-type";
import { cancelLessonsAndRevalidate } from "../dashboard/actions";

interface EventSheetProps {
  selectedEvent: CalendarEvent<Lesson>;
  setSelectedEvent: (event: CalendarEvent<Lesson> | null) => void;
}

function formatTime(date: Date | undefined): string {
  return date ? moment(date).format("HH:mm") : "N/A";
}

const EventSheet = ({ selectedEvent, setSelectedEvent }: EventSheetProps) => {
  const session = useSession();
  const t = useTranslations();
  const router = useRouter();
  const user = session.data?.user as unknown as UserProfile;

  const renderLanguages = (languages: string | string[]) => {
    const langs = Array.isArray(languages) ? languages : languages.split(",");

    return (
      <ul className='ml-4 mt-1'>
        {langs.map((lang, index) => (
          <li key={index} className='list-disc text-sm text-gray-700'>
            {LNGS.find((lng) => lng.value === lang)?.label ?? lang}
          </li>
        ))}
      </ul>
    );
  };

  const { resource, start, end } = selectedEvent ?? {};
  const { description, groupSize, teacher } = resource ?? {};
  const { name } = teacher ?? {};
  const isParticipating = resource?.bookings?.find(
    (booking: any) => booking.idUser === user?.id
  ) as Booking | undefined;
  const onError = (error: Error) => {
    const json = JSON.parse(error.message);
    if (json.code !== 0) {
      toast.error(t(json.key));
      if (json.redirectTo) router.push(json.redirectTo);
      return;
    }
    toast.error(t(json.key));
  };
  const onSuccess = (data: ResponseType<any>) => {
    if (data.code !== 0) {
      toast.error(t(data.key));
      if (data.redirectTo) router.push(data.redirectTo);
      return;
    }
    toast.success(t(data.key));
    setSelectedEvent(null);
  };
  const reservationMutation = useMutation({
    mutationFn: createBookingAction,
    onError,
    onSuccess,
  });
  const cancelMutation = useMutation({
    mutationFn: async (idBooking: number) =>
      await cancelBookingAction(idBooking),
    onError,
    onSuccess,
  });
  const cancelLessonMutation = useMutation({
    mutationFn: cancelLessonsAndRevalidate,
    onError,
    onSuccess,
  });
  const isLoading = reservationMutation.isPending || cancelMutation.isPending;

  function onSubmit() {
    if (!user) {
      toast.error(t("codes.user.not_authenticated"));
      router.push("/auth/sign-in");
      return;
    }
    if (!selectedEvent?.resource.idLesson || reservationMutation.isPending)
      return;

    reservationMutation.mutateAsync(selectedEvent.resource.idLesson);
  }
  function onCancel() {
    if (!user) {
      toast.error(t("generals.signin.required"));
      router.push("/auth/sign-in");
      return;
    }
    if (!isParticipating) return;
    if (cancelMutation.isPending) return;

    cancelMutation.mutateAsync(isParticipating.idBooking);
  }

  return (
    <Sheet open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
      <SheetContent className='max-w-lg mx-auto  p-6 rounded-xl shadow-xl border border-gray-200'>
        <SheetHeader>
          <SheetTitle className='font-bold text-2xl text-primary mb-2 text-center'>
            {selectedEvent?.title}
          </SheetTitle>
        </SheetHeader>

        <div className='space-y-4 divide-y divide-gray-200'>
          <div>
            <p className='text-md text-gray-600 italic'>
              {description ?? "Pas de description disponible"}
            </p>
          </div>

          <div className='pt-4'>
            <p className='flex items-center space-x-2 text-md'>
              <FaUser className='text-primary text-xl' />
              <span>
                <span className='font-bold'>
                  {t("lesson.create.form.participants")}
                </span>{" "}
                : {resource?.bookings.length} / {groupSize}
              </span>
            </p>
            <p className='flex items-center space-x-2 text-md mt-2'>
              <FaBook className='text-primary text-xl' />
              <span>
                <span className='font-bold'>
                  {t("lesson.create.form.teacher")}
                </span>{" "}
                : {name}
              </span>
            </p>
          </div>

          <div className='pt-4'>
            <div className='flex items-center space-x-2 text-md'>
              <FaLanguage className='text-primary text-4xl' />
              <span>
                <span className='font-bold'>
                  {t("lesson.create.form.lngs")}
                </span>{" "}
                :
              </span>
            </div>

            <span className='flex  space-x-2 text-md'>
              {renderLanguages(resource?.languages)}
            </span>
          </div>

          <div className='pt-4'>
            <p className='flex items-center space-x-2 text-lg font-semibold text-gray-800'>
              <FaClock className='text-primary' />
              <span>
                {t("lesson.create.form.time")} : {formatTime(start)} -{" "}
                {formatTime(end)}
              </span>
            </p>
          </div>
        </div>
        {user && hasPermission(user, "bookings", "delete", isParticipating) && (
          <Button
            type={"submit"}
            className='w-full mt-4'
            disabled={isLoading}
            variant={"destructive"}
            onClick={onCancel}
          >
            {isLoading ? (
              <Spinner size='sm' color='white' />
            ) : (
              <span>{t("lesson.create.form.cancel")}</span>
            )}
          </Button>
        )}
        {user &&
          hasPermission(user, "lessons", "delete", selectedEvent?.resource) && (
            <Button
              type={"submit"}
              className='w-full mt-4'
              disabled={isLoading || !!isParticipating}
              variant={"destructive"}
              onClick={() =>
                cancelLessonMutation.mutateAsync([
                  selectedEvent?.resource.idLesson as number,
                ])
              }
            >
              {isLoading ? (
                <Spinner size='sm' color='white' />
              ) : (
                <span>{t("lesson.create.form.delete")}</span>
              )}
            </Button>
          )}

        {hasPermission(user, "bookings", "create") && (
          <Button
            type={"submit"}
            className='w-full mt-4'
            disabled={isLoading || !!isParticipating}
            onClick={onSubmit}
          >
            {isLoading ? (
              <Spinner size='sm' color='white' />
            ) : (
              <span>{t("lesson.create.form.book")}</span>
            )}
          </Button>
        )}
        {isParticipating && (
          <p className='mt-4 text-sm text-gray-500'>
            {t("lesson.create.form.already_participating")}
          </p>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EventSheet;
