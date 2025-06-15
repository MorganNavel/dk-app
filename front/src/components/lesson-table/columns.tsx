import { cn } from "@/lib/utils";
import { tsToLocaleDate } from "@/utils/dateUtils";
import { ColumnDef } from "@tanstack/react-table";
import LessonActions from "./LessonsActions";
import EditableCell from "@/components/reusable/table/EditableCell";
import { SortableColumn } from "@/components/reusable/table/SortableColumn";
import { Checkbox } from "@/components/ui/checkbox";
import { hasPermission } from "@/utils/permissions";
import { User } from "@prisma/client";
import { Lesson, UserProfile } from "@/types/type";

const statusColors = {
  planned: "bg-blue-100 text-blue-600",
  done: "bg-green-100 text-green-600",
  cancelled: "bg-red-100 text-red-600",
  "in progress": "bg-yellow-100 text-yellow-600",
};

export function columns(t: any, user: UserProfile): ColumnDef<Lesson>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "idLesson",
      header: ({ column }) => (
        <SortableColumn column={column}>#ID</SortableColumn>
      ),
      cell: ({ row }) => {
        return row.id;
      },
      sortingFn: "alphanumeric",
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: () => t("lessons.data-table.columns.status"),
      cell: ({ row }) => {
        let status = row.original.status as keyof typeof statusColors;

        const startDate = row.original.startDate.getTime();
        const duration = row.original.duration;
        const endDate = new Date(startDate).setMinutes(duration);
        const now = Date.now();
        if (status === "planned" && endDate > now && startDate < now) {
          status = "in progress";
        }

        const statusText =
          {
            planned: t("lesson.planned"),
            done: t("lesson.done"),
            cancelled: t("lesson.cancelled"),
            "in progress": t("lesson.in-progress"),
          }[status] ?? "N/A";

        return (
          <span
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium",
              statusColors[status as keyof typeof statusColors] ||
                "bg-gray-100 text-gray-600"
            )}
          >
            {statusText}
          </span>
        );
      },
      filterFn: "equalsString",
      enableSorting: false,
    },

    {
      accessorKey: "title",
      header: () => t("lessons.data-table.columns.title"),
      cell: ({ row }) => {
        const title = row.original.title;
        if (!hasPermission(user, "lessons", "update", row.original)) {
          return title;
        }

        return (
          <EditableCell
            initialText={title}
            onSave={(title) => {
              console.log("title", title);
            }}
          />
        );
      },
      filterFn: "includesString",
      enableSorting: false,
    },
    {
      accessorKey: "nbParticipants",
      header: () => t("lessons.data-table.columns.nbParticipants"),
      cell: ({ row }) => {
        return `${row.original.bookings.length}/2`;
      },
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: "teacher",
      header: () => t("lessons.data-table.columns.teacher"),
      cell: ({ row }) => {
        const teacher = row.getValue("teacher") as User;
        if (!teacher) return null;

        return teacher.name;
      },
      enableSorting: false,
      filterFn: (row, columnId, filterValue) => {
        const teacher = row.getValue(columnId) as User;
        if (!teacher) return false;

        return teacher.name.toLowerCase().includes(filterValue.toLowerCase());
      },
    },
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <SortableColumn column={column}>
          {t("lessons.data-table.columns.startDate")}
        </SortableColumn>
      ),

      cell: ({ row }) => {
        const startDate = row.getValue("startDate") as number;

        return tsToLocaleDate(startDate, true);
      },
      sortingFn: "datetime",
      enableColumnFilter: false,
    },
    {
      accessorKey: "duration",
      header: () => t("lessons.data-table.columns.duration"),
      cell: ({ row }) => {
        const duration = row.original.duration;
        return `${duration} min`;
      },
      enableColumnFilter: false,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const lesson = row.original;
        if (!hasPermission(user, "lessons", "update", lesson)) return null;
        return <LessonActions lesson={lesson} />;
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
