import { SheetContent, SheetHeader, SheetTitle, Sheet } from "@ui/sheet";
import { LessonEventDetails } from "@/types/types";
import moment from "moment";
import LNGS from "@/types/languages";
import { Button } from "@ui/button";
import { apiCall } from "@/utils/apiCall";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { errorToasts } from "@/utils/toast";

interface EventSheetProps {
  selectedEvent: LessonEventDetails | null;
  setSelectedEvent: (event: LessonEventDetails | null) => void;
}

function formatTime(date: Date | undefined): string {
  return date ? moment(date).format("HH:mm") : "N/A";
}

const EventSheet = ({ selectedEvent, setSelectedEvent }: EventSheetProps) => {
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
      <ul>
        {langs.map((lang, index) => (
          <li key={index} className=' list-disc list-inside '>
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
      if (err.code === 401) {
        return;
      }

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
      <SheetContent className='max-w-md mx-auto bg-background p-6 rounded-xl shadow-xl '>
        <SheetHeader>
          <SheetTitle className='font-bold text-3xl text-primary mb-4'>
            {selectedEvent?.title}
          </SheetTitle>
        </SheetHeader>

        <div className='space-y-3'>
          <p className='text-md text-gray-600'>
            {description ?? "Pas de description disponible"}
          </p>

          <p>
            <span className='font-bold text-md'>Participants</span> :{" "}
            {nbParticipants} / {groupSize}
          </p>
          <p>
            <span className='font-bold text-md'>Enseignant</span> : {firstname}{" "}
            {name}
          </p>
          <p>
            <span className='font-bold text-md'>Langues</span> :{" "}
            {renderLanguages(languages)}
          </p>

          <p className='text-xl font-semibold text-gray-800'>
            Horaire : {formatTime(start)} - {formatTime(end)}
          </p>
        </div>

        <Button
          variant={"round-outline"}
          type={"submit"}
          className='w-full mt-4'
        >
          Rejoindre
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default EventSheet;
