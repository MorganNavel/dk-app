import { SheetContent, SheetHeader, SheetTitle, Sheet } from "@ui/sheet";
import { LessonEventDetails } from "@/types/lesson";
import moment from "moment";
import LNGS from "@/types/languages";
import { Button } from "@ui/button";
import { apiCall } from "@/utils/apiCall";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { errorToasts } from "@/utils/toast";
import { Spinner } from "@nextui-org/react";
import { FaUser, FaLanguage, FaClock, FaBook } from "react-icons/fa";
import { useProfile } from "@providers/Profile";
import { ApiResponse } from "@/types/ApiResponse";

interface EventSheetProps {
  selectedEvent: LessonEventDetails | null;
  setSelectedEvent: (event: LessonEventDetails | null) => void;
}

function formatTime(date: Date | undefined): string {
  return date ? moment(date).format("HH:mm") : "N/A";
}

const EventSheet = ({ selectedEvent, setSelectedEvent }: EventSheetProps) => {
  const { profile } = useProfile();
  const bookLesson = async () => {
    return await apiCall<ApiResponse<any>>(
      `/lesson/${selectedEvent?.resource.idLesson}/booking/`,
      "POST"
    );
  };
  const t = useTranslations();

  const renderLanguages = (languages: string | string[] | undefined) => {
    if (!languages) return "Pas de langue";

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
  const { description, nbParticipants, groupSize, teacher } = resource || {};
  const { firstname, name, languages } = teacher || {};
  const mutation = useMutation({
    mutationFn: bookLesson,
    onError: (error) => {
      const err: ApiResponse<any> = JSON.parse(error.message);

      errorToasts(t, err);
    },
    onSuccess: () => {
      toast.success("Leçon réservée avec succès");
      setSelectedEvent(null);
    },
  });
  const isLoading = mutation.isPending;

  function onSubmit() {
    mutation.mutateAsync();
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
                {nbParticipants} / {groupSize}
              </span>
            </p>
            <p className='flex items-center space-x-2 text-md mt-2'>
              <FaBook className='text-primary text-xl' />
              <span>
                <span className='font-bold'>Enseignant</span>: {firstname}{" "}
                {name}
              </span>
            </p>
          </div>

          <div className='pt-4'>
            <div className='flex items-center space-x-2 text-md'>
              <FaLanguage className='text-primary text-4xl' />
              <span className='font-bold'>Langues</span>:
            </div>

            <p className='flex  space-x-2 text-md'>
              <span>{renderLanguages(languages)}</span>
            </p>
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

        {profile && profile.role == "student" && (
          <Button
            type={"submit"}
            className='w-full mt-6 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg shadow-lg'
            disabled={isLoading}
            onClick={onSubmit}
          >
            {isLoading ? <Spinner size='sm' color='white' /> : "Réserver"}
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EventSheet;
