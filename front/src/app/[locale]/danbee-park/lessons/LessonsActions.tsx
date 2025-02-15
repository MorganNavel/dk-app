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

interface LessonActions {
  lesson: Lesson;
}
const LessonActions = ({ lesson }: LessonActions) => {
  const t = useTranslations();
  return (
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
          <DropdownMenuItem className='flex items-center gap-2 font-semibold text-amber-500 focus:bg-amber-500 focus:text-white cursor-pointer'>
            <MdSchedule className='h-4 w-4' />
            {t("lessons.data-table.actions.reschedule")}
          </DropdownMenuItem>
        )}
        {lesson.status === "planned" && (
          <DropdownMenuItem className='flex items-center gap-2 text-destructive font-semibold focus:bg-destructive focus:text-destructive-foreground cursor-pointer'>
            <MdCancel className='h-4 w-4' />
            {t("lessons.data-table.actions.cancel")}
          </DropdownMenuItem>
        )}

        {lesson.status === "cancelled" && (
          <DropdownMenuItem className='flex items-center gap-2 text-destructive font-semibold focus:bg-destructive focus:text-destructive-foreground cursor-pointer'>
            <MdDelete className='h-4 w-4' />
            {t("lessons.data-table.actions.delete")}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LessonActions;
