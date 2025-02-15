import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: Readonly<DataTablePaginationProps<TData>>) {
  const t = useTranslations("data-table.pagination");
  const totalRows = table.getFilteredRowModel().rows.length;
  const selectedRows = table.getFilteredSelectedRowModel().rows.length;
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  return (
    <div className='flex flex-col items-center gap-2 sm:flex-row sm:justify-between px-2'>
      <div className='text-sm text-muted-foreground'>
        {t("rows-selected", {
          selected: selectedRows,
          total: totalRows,
        })}
      </div>

      <div className='flex items-center space-x-4 sm:space-x-6'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium hidden sm:block'>
            {t("rows-per-page")}
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className='w-[70px] sm:w-[100px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='text-sm font-medium'>
          {t("page-of", {
            current: currentPage,
            total: totalPages,
          })}
        </div>

        <div className='flex items-center space-x-1 sm:space-x-2'>
          <Button
            variant='outline'
            className='h-8 w-8 p-0 hidden sm:flex'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            aria-label={t("first")}
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label={t("prev")}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label={t("next")}
          >
            <ChevronRight />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0 hidden sm:flex'
            onClick={() => table.setPageIndex(totalPages - 1)}
            disabled={!table.getCanNextPage()}
            aria-label={t("last")}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
