import { cn } from "@/lib/utils";
import { Lesson } from "@/types/lesson";
import { Teacher } from "@/types/User";
import { tsToLocaleDate } from "@/utils/dateUtils";
import { ColumnDef } from "@tanstack/react-table";
import LessonActions from "./LessonsActions";
import EditableCell from "@/components/reusable/table/EditableCell";
import { SortableColumn } from "@/components/reusable/table/SortableColumn";

const statusColors = {
  planned: "bg-blue-100 text-blue-600",
  done: "bg-green-100 text-green-600",
  cancelled: "bg-red-100 text-red-600",
  "in progress": "bg-yellow-100 text-yellow-600",
};
export function columns(t: any): ColumnDef<Lesson>[] {
  return [
    {
      accessorKey: "idLesson",
      header: ({ column }) => (
        <SortableColumn column={column}>#ID</SortableColumn>
      ),
      cell: ({ row }) => {
        return row.id;
      },
      sortingFn: "alphanumeric",
    },
    {
      accessorKey: "status",
      header: () => "Status",
      cell: ({ row }) => {
        let status = row.getValue("status") as string;

        const startDate = row.getValue("startDate") as number;
        const duration = row.getValue("duration") as number;
        const endDate = new Date(startDate).setMinutes(duration);
        const now = Date.now();
        if (status === "planned" && endDate > now && startDate < now) {
          status = "in progress";
        }

        const statusText =
          {
            planned: "Planned",
            done: "Done",
            cancelled: "Cancelled",
            "in progress": "In Progress",
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
    },

    {
      accessorKey: "title",
      header: () => "Title",
      cell: ({ row }) => {
        const title = row.getValue("title") as string;

        return (
          <EditableCell
            initialText={title}
            onSave={(title) => {
              console.log("title", title);
            }}
          />
        );
      },
    },
    {
      accessorKey: "nbParticipants",
      header: () => "Participants",
      cell: ({ row }) => {
        const nbParticipants = row.getValue("nbParticipants") as string;

        return `${nbParticipants}/2`;
      },
    },
    {
      accessorKey: "teacher",
      header: () => "Teacher",
      cell: ({ row }) => {
        const teacher = row.getValue("teacher") as Teacher;
        if (!teacher) return null;

        return `${teacher.firstname} ${teacher.name}`;
      },
      filterFn: "equalsString",
    },
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <SortableColumn column={column}>Start Date</SortableColumn>
      ),

      cell: ({ row }) => {
        const startDate = row.getValue("startDate") as number;

        return tsToLocaleDate(startDate, true);
      },
      sortingFn: "datetime",
    },
    {
      accessorKey: "duration",
      header: () => "Duration",
      cell: ({ row }) => {
        const duration = row.getValue("duration") as string;

        return `${duration} min`;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const lesson = row.original;

        return <LessonActions lesson={lesson} />;
      },
    },
  ];
}
