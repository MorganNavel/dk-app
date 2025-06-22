import { Lesson } from "./type";

export interface LessonEventDetails extends Event {
  resource: Lesson;
}
