import { ConfirmDialog } from "@/components/ConfirmDialog";
import { LessonForm } from "@/components/lesson-table/LessonForm";
import { apiCall } from "@/utils/apiCall";

export type TableAction<T extends (...args: any[]) => any> = {
  title?: string;
  content?: string;
  type: "modal" | "dialog";
  onConfirm?: T;
  component?: React.ComponentType<any>;
};

export const useLessonTableActions = () => {
  return {
    add: {
      type: "modal",
      component: LessonForm,
    },
    delete: {
      title: "lessons.data-table.actions.delete.title",
      content: "lessons.data-table.actions.dialog.delete.content",
      type: "dialog",
      onConfirm: async (idLessons: number[]) => {
        await apiCall("/lesson/bulk", "DELETE", { idLessons });
      },
      component: ConfirmDialog,
    } satisfies TableAction<(idLessons: number[]) => Promise<void>>,

    cancel: {
      title: "lessons.data-table.actions.dialog.cancel.title",
      content: "lessons.data-table.actions.dialog.cancel.content",
      type: "dialog",
      component: ConfirmDialog,
      onConfirm: async (idLessons: number[]) => {
        await apiCall("/lesson/status/bulk", "PATCH", {
          idLessons,
          status: "cancelled",
        });
      },
    } satisfies TableAction<(idLessons: number[]) => Promise<void>>,
  };
};
