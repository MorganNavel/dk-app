"use client";

import { createElement, useState, useTransition } from "react";
import { toast } from "sonner";
import DataTable from "@/components/reusable/table/DataTable";
import { Plus, Trash, XCircle } from "lucide-react";
import { RowSelectionState } from "@tanstack/react-table";
import { hasPermission } from "@/utils/permissions";
import { useTranslations } from "next-intl";
import { useLessonTableActions } from "@/hooks/useActions";
import { useSidebar } from "@/components/ui/sidebar";
import { columns } from "@/components/lesson-table/columns";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";
import { Lesson, UserProfile } from "@/types/type";
import { LessonResponse } from "@/queries/lessons/lessons-queries";
import { FaEdit } from "react-icons/fa";

type Action = "delete" | "cancel" | "add" | "update";
interface LessonTableProps {
  lessons: Lesson[] | null;
  onDelete: (ids: number[]) => Promise<LessonResponse>;
  onCancel: (ids: number[]) => Promise<LessonResponse>;
  className?: string;
}
export default function LessonTable({
  lessons,
  onDelete,
  onCancel,
  className = "",
}: Readonly<LessonTableProps>) {
  const t = useTranslations();
  const [action, setAction] = useState<Action | null>(null);
  const [selected, setSelected] = useState<RowSelectionState>({});
  const selectedCount = Object.keys(selected).length;
  const configActions = useLessonTableActions();
  const { isMobile } = useSidebar();
  const [isPending, startTransition] = useTransition();
  const user = useSession();
  const profile = user.data?.user as UserProfile | undefined;
  if (!profile) return null;
  const cols = columns(t, profile);

  const handleDelete = (ids: number[]) => {
    startTransition(async () => {
      try {
        await onDelete(ids);
        toast.success("Leçons supprimées");
      } catch {
        toast.error("Erreur lors de la suppression");
      }
    });
  };

  const handleCancel = (ids: number[]) => {
    startTransition(async () => {
      try {
        await onCancel(ids);
        toast.success("Leçons annulées");
      } catch {
        toast.error("Erreur lors de l'annulation");
      }
    });
  };

  const handleConfirm = async () => {
    if (!lessons) return;

    const idLessons = Object.keys(selected).map((value) => Number(value));
    switch (action) {
      case "delete":
        handleDelete(idLessons);
        break;
      case "cancel":
        handleCancel(idLessons);
        break;
      default:
        return;
    }
  };
  function getSelectedLessons(
    selected: RowSelectionState | undefined
  ): Lesson[] {
    if (!selected || !lessons) return [];
    const selectedIndex = Object.keys(selected);
    const selectedLessons = lessons?.filter((lesson) =>
      selectedIndex.includes(lesson.idLesson.toString())
    );
    return selectedLessons;
  }

  const actions = [
    {
      name: t("generals.add"),
      actionFn: () => setAction("add"),
      render: () => <Plus size={18} className=' text-primary' />,
      isDisable: () => false,
    },
    {
      name: t("generals.edit"),
      actionFn: (selected: RowSelectionState) => {
        setAction("update");
        setSelected(selected);
      },
      render: () => <FaEdit size={18} className='text-warning' />,
      isDisable: (selected: RowSelectionState) => {
        if (!lessons) return true;
        const selectedLessons = getSelectedLessons(selected);
        if (selectedLessons.length !== 1) return true;
        return !hasPermission(profile, "lessons", "update", selectedLessons);
      },
    },
    {
      name: t("generals.cancel"),
      actionFn: (selected: RowSelectionState) => {
        setAction("cancel");
        setSelected(selected);
      },
      render: () => <XCircle size={18} className='text-warning' />,
      isDisable: (selected: RowSelectionState) => {
        if (!lessons) return true;
        const selectedLessons = getSelectedLessons(selected);
        if (!hasPermission(profile, "lessons", "update", selectedLessons))
          return true;

        return (
          selectedLessons.length === 0 ||
          selectedLessons.some(
            (lesson) =>
              lesson.status !== "planned" || lesson.endDate < new Date()
          )
        );
      },
    },
    {
      name: t("generals.delete"),
      actionFn: (selected: RowSelectionState) => {
        setAction("delete");
        setSelected(selected);
      },
      render: () => <Trash size={18} className='text-destructive' />,
      isDisable: (selected: RowSelectionState) => {
        if (!lessons) return true;
        const selectedLessons = getSelectedLessons(selected);
        if (!hasPermission(profile, "lessons", "delete", selectedLessons))
          return true;

        return (
          selectedLessons.length === 0 ||
          selectedLessons.some((lesson) => lesson.status !== "cancelled")
        );
      },
    },
  ];

  return (
    <div className={className}>
      <DataTable
        name='lessons'
        data={lessons || []}
        isLoading={isPending}
        actions={actions}
        columns={cols}
        getRowId={(row) => row.idLesson.toString()}
        filtersConfig={[
          {
            columnId: "status",
            render: (value, setFilterValue) => (
              <Select
                onValueChange={(value) =>
                  setFilterValue == undefined ? null : setFilterValue(value)
                }
                value={value}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={t("lessons.data-table.columns.status")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      {t("lessons.data-table.columns.status")}
                    </SelectLabel>
                    <SelectItem value='cancelled'>
                      {t("lesson.cancelled")}
                    </SelectItem>
                    <SelectItem value='planned'>
                      {t("lesson.planned")}
                    </SelectItem>
                    <SelectItem value='in progress'>
                      {t("lesson.in-progress")}
                    </SelectItem>
                    <SelectItem value='done'>{t("lesson.done")}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            ),
          },
          {
            columnId: "teacher",
            render: (value, setFilterValue) => (
              <Input
                type='text'
                placeholder={t("lessons.data-table.columns.teacher")}
                value={value}
                onChange={(e) =>
                  setFilterValue == undefined
                    ? null
                    : setFilterValue(e.target.value)
                }
              />
            ),
          },
          {
            columnId: "title",
            render: (value, setFilterValue) => (
              <Input
                type='text'
                placeholder={t("lessons.data-table.columns.title")}
                value={value}
                onChange={(e) =>
                  setFilterValue == undefined
                    ? null
                    : setFilterValue(e.target.value)
                }
              />
            ),
          },
        ]}
      />
      {action && configActions[action].type == "dialog" && (
        <ConfirmDialog
          open={action && configActions[action].type === "dialog"}
          title={
            !action
              ? ""
              : t(`lessons.data-table.actions.dialog.${action}.title`, {
                  selected: selectedCount,
                })
          }
          description={
            !action
              ? ""
              : t(`lessons.data-table.actions.dialog.${action}.content`, {
                  selected: selectedCount,
                })
          }
          onConfirm={handleConfirm}
          onClose={() => setAction(null)}
        />
      )}
      <Drawer
        direction={isMobile ? "bottom" : "right"}
        open={(action && configActions[action].type === "modal") ?? false}
        onOpenChange={(open) => !open && setAction(null)}
      >
        <DrawerContent
          className={cn(
            "left-auto mt-0 w-full lg:w-1/4 rounded-md",
            isMobile ? "h-3/4 overflow-hidden" : "h-full"
          )}
        >
          {!isMobile && (
            <DrawerHeader className='mt-5'>
              <DrawerTitle className='text-center lg:text-2xl text-xl font-semibold'>
                {action && configActions[action].type === "modal"
                  ? t(`lessons.data-table.actions.modal.${action}.title`)
                  : ""}
              </DrawerTitle>
            </DrawerHeader>
          )}
          {action &&
            configActions[action].type === "modal" &&
            createElement(configActions[action].component, {
              onFinish: () => {
                setAction(null);
              },
              lesson:
                action === "add" ? undefined : getSelectedLessons(selected)[0],
            })}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
