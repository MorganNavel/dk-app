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
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Lesson } from "@/types/type";
import {
  cancelLessonsAndRevalidate,
  deleteLessonsAndRevalidate,
  rescheduleLessonsAndRevalidate,
} from "@/app/[locale]/danbee-park/dashboard/actions";
import { DateTimePicker } from "../ui/date-picker";
import { startOfDay } from "date-fns";
import { sendNotification } from "./actions";
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
          <DropdownMenuItem
            className='flex items-center gap-2 focus:bg-primary-light focus:text-primary cursor-pointer'
            onClick={() => {
              sendNotification(lesson.idLesson).then((r) => {
                if (r?.code === 0)
                  toast.success(t("codes.lesson.notification.success"));
              });
            }}
          >
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

  const handleConfirm = async () => {
    try {
      let r = null;
      if (action === "reschedule" && reschedule)
        r = await rescheduleLessonsAndRevalidate(lesson.idLesson, reschedule);
      if (action === "cancel")
        r = await cancelLessonsAndRevalidate([lesson.idLesson]);
      if (action === "delete")
        r = await deleteLessonsAndRevalidate([lesson.idLesson]);
      const fn = r?.code === 0 ? toast.success : toast.error;
      fn(t(r?.key));
    } catch (error: any) {
      return;
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
          label={t("lessons.data-table.columns.startDate")}
          value={reschedule ?? undefined}
          onChange={(date) => setReschedule(date ?? null)}
          disabled={(date) => date < startOfDay(new Date())}
        />
      )}
    </ConfirmDialog>
  );
}

export default LessonActions;
