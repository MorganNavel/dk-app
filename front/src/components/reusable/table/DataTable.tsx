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
  Row,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { ReactNode, useEffect, useState } from "react";
import { DataTablePagination } from "./Pagination";
import { DataTableViewOptions } from "./ColumnView";
import { RowFiltering, RowFilteringPopover } from "./RowFiltering";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
export interface FilterConfig {
  columnId: string;
  render: (
    value: string,
    setFilterValue: ((arg: any) => void) | undefined
  ) => JSX.Element;
}
export interface ActionConfig {
  name: string;
  render: () => ReactNode;
  actionFn: (selected: RowSelectionState) => void;
  isDisable: (selected: RowSelectionState) => boolean;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  actions?: ActionConfig[];
  filtersConfig?: FilterConfig[];
  isLoading: boolean;
  name: string;
  getRowId?: (
    originalRow: TData,
    index: number,
    parent?: Row<TData> | undefined
  ) => string;
}
function DataTable<TData, TValue>({
  data,
  columns,
  actions,
  filtersConfig,
  isLoading,
  name,
  getRowId,
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
    getRowId: getRowId || undefined,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  useEffect(() => setRowSelection({}), [data]);

  return (
    <div>
      <div className='flex gap-4 sm:flex-row justify-between my-4'>
        <div className='flex items-center gap-2'>
          <DataTableViewOptions table={table} name={name} />
          <RowFiltering
            table={table}
            name={name}
            columns={columns}
            filtersConfig={filtersConfig}
            setColumnFilters={setColumnFilters}
          />
        </div>

        <Actions actions={actions ?? []} rowSelection={rowSelection} />
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
interface ActionProps {
  actions: ActionConfig[];
  rowSelection: RowSelectionState;
}

function Actions({ actions, rowSelection }: Readonly<ActionProps>) {
  const [open, setOpen] = useState(false);
  return (
    <div className='flex '>
      <Popover open={open} onOpenChange={(open) => setOpen(open)}>
        <PopoverTrigger asChild className='lg:hidden'>
          <Button variant='ghost'>
            <MoreVertical />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-40 lg:hidden'>
          <div className='flex flex-col space-y-2'>
            {actions?.map((action) => (
              <Button
                key={action.name}
                variant='ghost'
                onClick={() => {
                  action.actionFn(rowSelection);
                  setOpen(false);
                }}
                disabled={action.isDisable(rowSelection)}
                className='w-full flex justify-start'
              >
                <div className='flex items-center gap-2'>
                  {action.render()} {action.name}
                </div>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {actions?.map((action) => (
        <Button
          key={action.name}
          variant='ghost'
          onClick={() => action.actionFn(rowSelection)}
          className='hidden lg:flex disabled:opacity-25 transition-opacity duration-250'
          disabled={action.isDisable(rowSelection)}
        >
          {action.render()}
        </Button>
      ))}
    </div>
  );
}
export default DataTable;
