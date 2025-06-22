import { UserProfile } from "./User";
import { Lesson } from "./Lesson";
interface Booking {
  idBooking: number;
  user: UserProfile;
  lesson: Lesson;
}
export type { Booking };
