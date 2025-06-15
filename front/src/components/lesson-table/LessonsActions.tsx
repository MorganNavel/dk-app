import { MoreHorizontal } from "lucide-react";
import { MdCancel, MdSchedule, MdDelete } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { DateTimePicker } from "@/components/DatePicker";
import { apiCall } from "@/utils/apiCall";
import { toast } from "sonner";
import { errorToasts } from "@/utils/toast";
import { ApiResponse } from "@/types/ApiResponse";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Lesson } from "@/types/type";
import {
  cancelLessonsAndRevalidate,
  deleteLessonsAndRevalidate,
  rescheduleLessonsAndRevalidate,
} from "@/app/[locale]/danbee-park/dashboard/actions";
interface LessonActions {
  lesson: Lesson;
}

const LessonActions = ({ lesson }: LessonActions) => {
  const t = useTranslations();
  const [action, setAction] = useState<string | null>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal className='h-5 w-5 cursor-pointer text-gray-500 focus:text-gray-700' />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='w-full bg-white shadow-lg border rounded-md p-1'
        >
          <DropdownMenuLabel className='font-semibold'>
            {t("lessons.data-table.actions.title")}
          </DropdownMenuLabel>
          <DropdownMenuItem className='flex items-center gap-2 focus:bg-primary-light focus:text-primary cursor-pointer'>
            <RiSendPlaneFill className='h-4 w-4' />
            {t("lessons.data-table.actions.notif")}
          </DropdownMenuItem>

          {lesson.status === "planned" && (
            <DropdownMenuItem
              className='flex items-center gap-2 font-semibold text-amber-500 focus:bg-amber-500 focus:text-white cursor-pointer'
              onClick={() => setAction("reschedule")}
            >
              <MdSchedule className='h-4 w-4' />
              {t("lessons.data-table.actions.reschedule")}
            </DropdownMenuItem>
          )}
          {lesson.status === "planned" && (
            <DropdownMenuItem
              className='flex items-center gap-2 text-destructive font-semibold focus:bg-destructive focus:text-destructive-foreground cursor-pointer'
              onClick={() => setAction("cancel")}
            >
              <MdCancel className='h-4 w-4' />
              {t("lessons.data-table.actions.cancel")}
            </DropdownMenuItem>
          )}

          {lesson.status === "cancelled" && (
            <DropdownMenuItem
              className='flex items-center gap-2 text-destructive font-semibold focus:bg-destructive focus:text-destructive-foreground cursor-pointer'
              onClick={() => setAction("delete")}
            >
              <MdDelete className='h-4 w-4' />
              {t("lessons.data-table.actions.delete")}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogAction lesson={lesson} action={action} setAction={setAction} />
    </>
  );
};

function DialogAction({
  lesson,
  action,
  setAction,
}: Readonly<{
  lesson: Lesson;
  action: string | null;
  setAction: (action: string | null) => void;
}>) {
  const t = useTranslations();
  const [reschedule, setReschedule] = useState<Date | null>(null);

  const refetchLesson = async (lessonId: number) => {};

  const handleConfirm = async () => {
    try {
      if (action === "reschedule" && reschedule)
        await rescheduleLessonsAndRevalidate([lesson.idLesson], reschedule);
      if (action === "cancel")
        await cancelLessonsAndRevalidate([lesson.idLesson]);
      if (action === "delete")
        await deleteLessonsAndRevalidate([lesson.idLesson]);

      toast.success(t(`lessons.data-table.actions.dialog.${action}.success`));
      await refetchLesson(lesson.idLesson);
    } catch (error: any) {
      try {
        const err: ApiResponse<any> = JSON.parse(error.message);
        errorToasts(t, err);
      } catch {
        toast.error(t("errors.unexpected"));
      }
    }
  };

  const onClose = () => {
    setAction(null);
    setReschedule(null);
  };

  if (!action) return null;

  return (
    <ConfirmDialog
      open={!!action}
      title={t(`lessons.data-table.actions.dialog.${action}.title`, {
        selected: 1,
      })}
      description={t(`lessons.data-table.actions.dialog.${action}.content`, {
        selected: 1,
      })}
      onConfirm={handleConfirm}
      onClose={onClose}
    >
      {action === "reschedule" && (
        <DateTimePicker
          disabled={{ before: new Date() }}
          onChange={(date) => setReschedule(date ?? null)}
          initialDate={new Date(lesson.startDate)}
        />
      )}
    </ConfirmDialog>
  );
}

export default LessonActions;
