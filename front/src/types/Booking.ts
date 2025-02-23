import { Lesson } from "./Lesson";
import { UserProfile } from "./User";

interface Booking {
  idBooking: number;
  user: UserProfile;
  lesson: Lesson;
}
export type { Booking };
