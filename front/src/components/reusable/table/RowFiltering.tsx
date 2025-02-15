import { columns } from "@/app/[locale]/danbee-park/lessons/columns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { FilterConfig } from "./DataTable";
import { ColumnDef, ColumnFiltersState, Table } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

interface RowFilteringProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  filtersConfig?: FilterConfig[];
  table: Table<TData>;
  name: String;
  setColumnFilters: (arg: ColumnFiltersState) => void;
}

export function RowFiltering<TData, TValue>({
  columns,
  filtersConfig,
  table,
  name,
  setColumnFilters,
}: Readonly<RowFilteringProps<TData, TValue>>) {
  const [filterableColumns, setFilterableColumns] = useState<
    ColumnDef<TData, TValue>[]
  >([]);
  const [filter, setFilter] = useState<FilterConfig | null>(null);
  const t = useTranslations();

  useEffect(() => {
    columns.forEach((column) => {
      if (column.filterFn) {
        setFilterableColumns((prev) => [...prev, column]);
      }
    });
  }, []);
  if (!filterableColumns.length) return null;
  return (
    <>
      <Select
        onValueChange={(value) => {
          setColumnFilters([]);
          if (value === "-1") {
            setFilter(null);
            return;
          }
          setFilter(filtersConfig?.[parseInt(value)] ?? null);
        }}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder={t(`${name}.data-table.filters.title`)} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t(`${name}.data-table.filters.label`)}</SelectLabel>
            <SelectItem value='-1'>
              {" "}
              {t("lessons.data-table.filters.none")}
            </SelectItem>
            {filtersConfig?.map((filter, index) => {
              const column = table.getColumn(filter.columnId);
              if (!column) return null;

              return (
                <SelectItem key={column.id} value={index.toString()}>
                  {t(`${name}.data-table.columns.${column.id}`)}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      {filter?.render(
        (table.getColumn(filter.columnId)?.getFilterValue() as string) ?? "",
        table.getColumn(filter.columnId)?.setFilterValue
      )}
    </>
  );
}
