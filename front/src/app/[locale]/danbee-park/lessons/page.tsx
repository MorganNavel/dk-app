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
  if (error) return toast.error("Erreur lors du chargement des données");

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
                  <SelectValue>Status</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value='cancelled'>Cancelled</SelectItem>
                    <SelectItem value='planned'>Planned</SelectItem>
                    <SelectItem value='in progress'>In Progress</SelectItem>
                    <SelectItem value='done'>Done</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            ),
          },

          { columnId: "teacher", render: () => <input type='text' /> },
          { columnId: "title", render: () => <input type='text' /> },
        ]}
      />
    </div>
  );
}
