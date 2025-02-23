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
import { Check, Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface RowFilteringProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  filtersConfig?: FilterConfig[];
  table: Table<TData>;
  name: string;
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
        <SelectTrigger>
          <div className='flex items-center space-x-2'>
            <Filter className='h-5 w-5 text-gray-500' />
            <SelectValue placeholder={t(`${name}.data-table.filters.title`)} />
          </div>
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
      <div className='w-[180px]'>
        {filter?.render(
          (table.getColumn(filter.columnId)?.getFilterValue() as string) ?? "",
          table.getColumn(filter.columnId)?.setFilterValue
        )}
      </div>
    </>
  );
}

export function RowFilteringPopover<TData, TValue>({
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    columns.forEach((column) => {
      if (column.filterFn) {
        setFilterableColumns((prev) => [...prev, column]);
      }
    });
  }, [columns]);

  if (!filterableColumns.length) return null;

  return (
    <div className='flex items-center gap-2'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='ghost'>
            <Filter className=' text-gray-500' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full bg-white border rounded-md shadow-lg'>
          <div className='flex flex-col space-y-2'>
            <Button
              key={"-1"}
              variant='ghost'
              className='w-full flex justify-start'
              onClick={() => {
                setColumnFilters([]);
                setFilter(null);
                setOpen(false);
              }}
            >
              <span className='flex items-center gap-2'>
                {t("lessons.data-table.filters.none")}
                {!filter && <Check className='text-gray-500' />}
              </span>
            </Button>

            {filtersConfig?.map((f, index) => {
              const column = table.getColumn(f.columnId);
              if (!column) return null;

              return (
                <Button
                  key={column.id}
                  variant='ghost'
                  className='w-full flex justify-start'
                  onClick={() => {
                    setColumnFilters([]);
                    setFilter(f);
                    setOpen(false);
                  }}
                >
                  <span className='flex items-center gap-2'>
                    {t(`${name}.data-table.columns.${column.id}`)}
                    {filter?.columnId === column.id && (
                      <Check className='text-gray-500' />
                    )}
                  </span>
                </Button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
      <div className='w-[180px]'>
        {filter?.render(
          (table.getColumn(filter.columnId)?.getFilterValue() as string) ?? "",
          table.getColumn(filter.columnId)?.setFilterValue
        )}
      </div>
    </div>
  );
}
