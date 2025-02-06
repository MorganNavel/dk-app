import { Event } from "react-big-calendar";
import { Teacher } from "./User";

type LessonStatus = "planned" | "done" | "cancelled" | "in progress";

export interface Lesson {
  idLesson: number;
  startDate: number;
  duration: number;
  status: LessonStatus;
  title: string;
  description: string | null;
  groupSize: number;
  nbParticipants: number;
  createdAt: string;
  teacher: Teacher;
}

export interface LessonEventDetails extends Event {
  resource: {
    idLesson: number;
    duration: number;
    status: LessonStatus;
    title: string;
    description: string | null;
    groupSize: number;
    nbParticipants: number;
    createdAt: string;
    teacher: Teacher;
  };
}
