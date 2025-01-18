import { Event } from "react-big-calendar";
type LessonStatus = "planned" | "done" | "cancelled";
type UserRole = "teacher" | "student" | "admin";
export interface LessonDetails {
  idLesson: number;
  startDate: number;
  duration: number;
  status: LessonStatus;
  title: string;
  description: string | null;
  groupSize: number;
  nbParticipants: number;
  createdAt: string;
  teacher: {
    idUser: number;
    name: string;
    firstname: string;
    email: string;
    languages?: string;
    role: UserRole;
    rating?: number | null;
  };
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
    teacher: {
      idUser: number;
      name: string;
      firstname: string;
      email: string;
      languages?: string;
      role: UserRole;
      rating?: number | null;
    };
  };
}
