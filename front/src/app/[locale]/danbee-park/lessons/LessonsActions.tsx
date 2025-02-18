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
import { Lesson } from "@/types/lesson";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { DateTimePicker } from "@/components/DatePicker";
import { apiCall } from "@/utils/apiCall";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { errorToasts } from "@/utils/toast";
import { ApiResponse } from "@/types/ApiResponse";
import { ConfirmDialog } from "@/components/ConfirmDialog";
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
}: {
  readonly lesson: Lesson;
  readonly action: string | null;
  readonly setAction: (action: string | null) => void;
}) {
  const t = useTranslations();
  const [reschedule, setReschedule] = useState<Date | null>(null);
  const queryClient = useQueryClient();
  const refetchLesson = async (lessonId: number) => {
    if (action === "delete") {
      queryClient.setQueryData(["lessons"], (oldData: Lesson[] | undefined) => {
        if (!oldData) return [updatedLesson];
        return oldData.filter((lesson) => lesson.idLesson !== lessonId);
      });
      return;
    }
    const updatedLesson = await apiCall<Lesson>(`/lesson/${lessonId}`);
    queryClient.setQueryData(["lessons"], (oldData: Lesson[] | undefined) => {
      if (!oldData) return [updatedLesson];
      return oldData.map((lesson) =>
        lesson.idLesson === lessonId ? updatedLesson : lesson
      );
    });
  };
  const handleConfirm = async () => {
    try {
      if (action === "reschedule") await handleReschedule();
      if (action === "cancel") await handleCancel();
      if (action === "delete") await handleDelete();

      toast.success(t(`lessons.data-table.actions.dialog.${action}.success`));
      await refetchLesson(lesson.idLesson);
    } catch (error: any) {
      const err: ApiResponse<any> = JSON.parse(error.message);
      errorToasts(t, err);
    }
  };
  const onClose = () => {
    setAction(null);
    setReschedule(null);
  };
  const handleReschedule = async () => {
    if (!reschedule) return;
    await apiCall(`/lesson/${lesson.idLesson}`, "PATCH", {
      startDate: reschedule,
    });
  };
  const handleCancel = async () => {
    await apiCall(`/lesson/${lesson.idLesson}/status`, "PATCH", {
      status: "cancelled",
    });
  };
  const handleDelete = async () => {
    await apiCall(`/lesson/${lesson.idLesson}`, "DELETE");
  };

  return (
    <ConfirmDialog
      open={!!action}
      title={
        action
          ? t(`lessons.data-table.actions.dialog.${action}.title`, {
              selected: 1,
            })
          : ""
      }
      description={
        action
          ? t(`lessons.data-table.actions.dialog.${action}.content`, {
              selected: 1,
            })
          : ""
      }
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
