"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
interface FilterConfig {
  columnId: string;
  render: (
    value: string,
    setFilterValue: ((arg: any) => void) | undefined
  ) => JSX.Element;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filtersConfig?: FilterConfig[];
  isLoading: boolean;
}
function DataTable<TData, TValue>({
  data,
  columns,
  filtersConfig,
  isLoading,
}: Readonly<DataTableProps<TData, TValue>>) {
  const t = useTranslations();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterableColumns, setFilterableColumns] = useState<
    ColumnDef<TData, TValue>[]
  >([]);
  const [filter, setFilter] = useState<FilterConfig | null>(null);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
    },
  });
  useEffect(() => {
    columns.forEach((column) => {
      if (column.filterFn) {
        setFilterableColumns((prev) => [...prev, column]);
      }
    });
  }, []);
  useEffect(() => {
    console.log(filter?.columnId);
  }, [filter]);
  return (
    <div>
      {!!filterableColumns.length && (
        <div className='flex items-center justify-between space-x-4 p-4'>
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
              <SelectValue
                placeholder={t("lessons.data-table.filters.title")}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                  {t("lessons.data-table.filters.label")}
                </SelectLabel>
                <SelectItem value='-1'>
                  {" "}
                  {t("lessons.data-table.filters.none")}
                </SelectItem>
                {filtersConfig?.map((filter, index) => {
                  const column = table.getColumn(filter.columnId);
                  if (!column) return null;

                  return (
                    <SelectItem key={column.id} value={index.toString()}>
                      {t(`lessons.data-table.columns.${column.id}`)}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          {filter?.render(
            (table.getColumn(filter.columnId)?.getFilterValue() as string) ??
              "",
            table.getColumn(filter.columnId)?.setFilterValue
          )}
        </div>
      )}

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading && (
              <>
                {Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={columns.length} className='h-5'>
                      <Skeleton className='h-5' />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
            {!isLoading && !table.getRowModel().rows?.length && (
              <TableRow key='no-data'>
                <TableCell colSpan={columns.length} className='text-center'>
                  No data
                </TableCell>
              </TableRow>
            )}
            {!!table.getRowModel().rows?.length &&
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className='hover:bg-primary-light'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-center space-x-2 py-4'>
        <Button
          variant='outline'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className='hover:bg-primary hover:text-white'
        >
          Previous
        </Button>
        <Button
          variant='outline'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className='hover:bg-primary hover:text-white'
        >
          Next
        </Button>
      </div>
    </div>
  );
}
export default DataTable;
