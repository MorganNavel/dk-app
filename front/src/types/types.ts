export interface LessonDetails {
  startDate: number;
  duration: number;
  title: string;
  description: string | null;
  groupSize: number;
  nbParticipants: number;
  teacher: {
    idUser: number;
    name: string;
    firstname: string;
    email: string;
    languages?: string;
  };
}
export interface LessonEventDetails {
  description: string | null;
  groupSize: number;
  nbParticipants: number;
  teacher: {
    idUser: number;
    name: string;
    firstname: string;
    email: string;
    languages?: string;
  };
}
