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
import { Lesson } from "@/types/type";
import { useSession } from "@/lib/auth-client";
import {
  BookingResponse,
  cancelBookingAction,
  createBookingAction,
} from "./actions";
import { useRouter } from "@/i18n/routing";
import { BookingCodes } from "@/queries/bookings/bookings-codes";

interface EventSheetProps {
  selectedEvent: CalendarEvent<Lesson> | null;
  setSelectedEvent: (event: CalendarEvent<Lesson> | null) => void;
}

function formatTime(date: Date | undefined): string {
  return date ? moment(date).format("HH:mm") : "N/A";
}

const EventSheet = ({ selectedEvent, setSelectedEvent }: EventSheetProps) => {
  const user = useSession();
  const t = useTranslations();
  const router = useRouter();

  const renderLanguages = (languages: string | string[] | undefined) => {
    if (!languages || (Array.isArray(languages) && languages.length === 0)) {
      return "Pas de langue";
    }

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
  const { name, languages } = teacher ?? {};
  const isParticipating = resource?.bookings?.find(
    (booking) => booking.idUser === user.data?.user.id
  );
  const handleError = (error: Error) => {
    const json = JSON.parse(error.message);
    if (json.code !== BookingCodes.SUCCESS) {
      toast.error(t(json.key));
      if (json.redirectTo) router.push(json.redirectTo);
      return;
    }
    toast.error(t(json.key));
  };
  const handleSuccess = (data: BookingResponse) => {
    if (data.code !== BookingCodes.SUCCESS) {
      toast.error(t(data.key));
      if (data.redirectTo) router.push(data.redirectTo);
      return;
    }
    toast.success(t(data.key));
    setSelectedEvent(null);
  };
  const reservationMutation = useMutation({
    mutationFn: createBookingAction,
    onError: handleError,
    onSuccess: handleSuccess,
  });
  const cancelMutation = useMutation({
    mutationFn: async (idBooking: number) =>
      await cancelBookingAction(idBooking),
    onError: handleError,
    onSuccess: handleSuccess,
  });
  const isLoading = reservationMutation.isPending || cancelMutation.isPending;

  function onSubmit() {
    if (!user) {
      toast.error(t("generals.signin.required"));
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
                <span className='font-bold'>Participants</span>:{" "}
                {resource?.bookings.length} / {groupSize}
              </span>
            </p>
            <p className='flex items-center space-x-2 text-md mt-2'>
              <FaBook className='text-primary text-xl' />
              <span>
                <span className='font-bold'>Enseignant</span>: {name}
              </span>
            </p>
          </div>

          <div className='pt-4'>
            <div className='flex items-center space-x-2 text-md'>
              <FaLanguage className='text-primary text-4xl' />
              <span className='font-bold'>Langues</span>:
            </div>

            <span className='flex  space-x-2 text-md'>
              {renderLanguages(languages)}
            </span>
          </div>

          <div className='pt-4'>
            <p className='flex items-center space-x-2 text-lg font-semibold text-gray-800'>
              <FaClock className='text-primary' />
              <span>
                Horaire: {formatTime(start)} - {formatTime(end)}
              </span>
            </p>
          </div>
        </div>
        {isParticipating && (
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
              "Annuler la réservation"
            )}
          </Button>
        )}
        <Button
          type={"submit"}
          className='w-full mt-4'
          disabled={isLoading || !!isParticipating}
          variant={"default"}
          onClick={onSubmit}
        >
          {isLoading ? <Spinner size='sm' color='white' /> : "Réserver"}
        </Button>
        {isParticipating && (
          <p className='mt-4 text-sm text-gray-500'>
            Vous participez déjà à cet événement.
          </p>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EventSheet;
