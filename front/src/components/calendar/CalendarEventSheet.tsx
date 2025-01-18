import { SheetContent, SheetHeader, SheetTitle, Sheet } from "@ui/sheet";
import { LessonEventDetails } from "@/types/types";
import moment from "moment";
import LNGS from "@/types/languages";
import { Button } from "@ui/button";

interface EventSheetProps {
  selectedEvent: LessonEventDetails | null;
  setSelectedEvent: (event: LessonEventDetails | null) => void;
}

function formatTime(date: Date | undefined): string {
  return date ? moment(date).format("HH:mm") : "N/A";
}

const EventSheet = ({ selectedEvent, setSelectedEvent }: EventSheetProps) => {
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
