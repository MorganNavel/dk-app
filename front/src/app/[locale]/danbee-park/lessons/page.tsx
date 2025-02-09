"use client";
import DataTable from "@/components/reusable/table/DataTable";
import { Lesson } from "@/types/lesson";
import { apiCall } from "@/utils/apiCall";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { columns } from "./columns";
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

const fetchLessons = async () => {
  return await apiCall<Lesson[]>(`/lesson/all`);
};
export default function LessonsPage() {
  const t = useTranslations();
  const cols = columns(t);

  const {
    data: lessons,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["lessons"],
    queryFn: fetchLessons,
  });
  if (error) {
    toast.error("Erreur lors du chargement des données");
  }

  return (
    <div className='p-15 h-full'>
      <DataTable<Lesson, any>
        isLoading={isLoading}
        data={isLoading ? [] : lessons ?? []}
        columns={cols}
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
    </div>
  );
}
