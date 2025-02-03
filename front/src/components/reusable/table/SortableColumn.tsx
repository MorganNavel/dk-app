import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

import { Column } from "@tanstack/react-table";

interface SortableColumnProps {
  column: Column<any, any>;
  children: React.ReactNode;
  [key: string]: any;
}

export function SortableColumn({
  column,
  children,
  ...props
}: Readonly<SortableColumnProps>) {
  return (
    <Button
      className='flex items-center gap-2 group'
      variant={"ghost"}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      {...props}
    >
      {children}
      <ArrowUpDown className={"h-4 w-4 group-hover:text-black"} />
    </Button>
  );
}
