"use client";
import DataTable, { ActionConfig } from "@/components/reusable/table/DataTable";
import { Lesson } from "@/types/lesson";
import { apiCall } from "@/utils/apiCall";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { columns } from "../../../../components/lesson-table/columns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/providers/Profile";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, Trash, XCircle } from "lucide-react";
import { RowSelectionState } from "@tanstack/react-table";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useLessonTableActions } from "@/hooks/useActions";

type Action = "delete" | "cancel" | "add";

const fetchLessons = async () => {
  return await apiCall<Lesson[]>(`/lesson/all`);
};

export default function LessonsPage() {
  const t = useTranslations();
  const cols = columns(t);
  const queryClient = useQueryClient();
  const [action, setAction] = useState<Action | null>(null);
  const [selected, setSelected] = useState<RowSelectionState>({});
  const selectedCount = Object.keys(selected).length;
  const configActions = useLessonTableActions();

  const handleAddLesson = () => {
    toast.info("Ajouter un nouveau cours");
  };

  // Fonction pour supprimer un cours
  const handleDeleteLessons = async (idLessons: number[]) => {
    await apiCall<Lesson>("/lesson/bulk", "DELETE", { idLessons });
    queryClient.invalidateQueries({ queryKey: ["lessons"] });
  };

  // Fonction pour annuler un cours
  const handleCancelLessons = async (idLessons: number[]) => {
    await apiCall<Lesson>("/lesson/status/bulk", "PATCH", {
      idLessons,
      status: "cancelled",
    });
  };
  const handleConfirm = async () => {
    if (!lessons) return;
    try {
      const idLessons = Object.keys(selected).map((value) => Number(value));
      if (action && configActions[action].type === "dialog") {
        if (
          "onConfirm" in configActions[action] &&
          typeof configActions[action].onConfirm === "function"
        ) {
          await configActions[action].onConfirm(idLessons);
          setSelected({});
        }
      }
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    } catch {
      return;
    }
  };

  const {
    profile,
    isLoading: isLoadingProfile,
    isError: isErrorProfile,
  } = useProfile();
  const {
    data: lessons,
    isError,
    isLoading: isLoadingLessons,
  } = useQuery({
    queryKey: ["lessons"],
    queryFn: fetchLessons,
  });

  if (isError) {
    toast.error("Erreur lors du chargement des données");
  }

  useEffect(() => {
    if (isErrorProfile) {
      toast.error("Erreur lors du chargement du profil");
    }
  }, [isErrorProfile]);

  if (!isLoadingProfile && (profile?.role == "student" || !profile)) notFound();
  const isLoading = isLoadingProfile || isLoadingLessons;
  function getSelectedLessons(selected: RowSelectionState | undefined) {
    if (!selected || !lessons) return [];
    const selectedIndex = Object.keys(selected);
    const selectedLessons = lessons?.filter((lesson) =>
      selectedIndex.includes(lesson.idLesson.toString())
    );
    return selectedLessons;
  }
  const actions: ActionConfig[] = [
    {
      name: t("generals.add"),
      actionFn: () => setAction("add"),
      render: () => <Plus className='w-4 h-4 text-primary' />,
      isDisable: (_) => false,
    },
    {
      name: t("generals.delete"),
      actionFn: async (selected: RowSelectionState) => {
        setAction("delete");
        console.log(selected);
        setSelected(selected);
      },
      render: () => <Trash className='w-5 h-5 text-destructive' />,
      isDisable: (selected: RowSelectionState) => {
        if (!lessons) return true;
        const selectedLessons = getSelectedLessons(selected);
        return (
          selectedLessons.length === 0 ||
          selectedLessons.some((lesson) => lesson.status !== "cancelled")
        );
      },
    },
    {
      name: t("generals.cancel"),
      actionFn: (selected: RowSelectionState) => {
        setAction("cancel");
        setSelected(selected);
      },
      render: () => <XCircle className='w-5 h-5 text-destructive' />,
      isDisable: (selected: RowSelectionState) => {
        if (!lessons) return true;
        const selectedLessons = getSelectedLessons(selected);
        return (
          selectedLessons.length === 0 ||
          selectedLessons.some((lesson) => lesson.status !== "planned")
        );
      },
    },
  ];

  return (
    <div className='p-15 h-full'>
      <DataTable<Lesson, any>
        name='lessons'
        isLoading={isLoading}
        data={isLoading ? [] : lessons ?? []}
        columns={cols}
        actions={actions}
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
    </div>
  );
}
