"use client";

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
  VisibilityState,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { DataTablePagination } from "./Pagination";
import { DataTableViewOptions } from "./ColumnView";
import { RowFiltering } from "./RowFiltering";
export interface FilterConfig {
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
  name: String;
}
function DataTable<TData, TValue>({
  data,
  columns,
  filtersConfig,
  isLoading,
  name,
}: Readonly<DataTableProps<TData, TValue>>) {
  const t = useTranslations();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className='flex items-center  space-x-4 p-4'>
        <DataTableViewOptions table={table} name={name} />
        <RowFiltering
          table={table}
          name={name}
          columns={columns}
          filtersConfig={filtersConfig}
          setColumnFilters={setColumnFilters}
        />
      </div>

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
                  {t(`generals.no-data`)}
                </TableCell>
              </TableRow>
            )}
            {!!table.getRowModel().rows?.length &&
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
      <DataTablePagination table={table} />
    </div>
  );
}
export default DataTable;
