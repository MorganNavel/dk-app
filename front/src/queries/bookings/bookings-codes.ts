export const BookingCodes = {
  SUCCESS: 0,

  NOT_AUTHENTICATED: 1000,

  LESSON_NOT_FOUND: 1001,
  LESSON_ALREADY_PAST: 1002,
  LESSON_NOT_PLANNED: 1003,
  LESSON_NO_CAPACITY: 1004,
  LESSON_FULL: 1005,

  BOOKING_ALREADY_EXISTS: 1101,
  UNKNOWN_ERROR: 1999,
} as const;

export type BookingKeys =
  | "user.not_authenticated"
  | "success"
  | "lesson.not_found"
  | "lesson.past"
  | "lesson.not_planned"
  | "lesson.no_capacity"
  | "lesson.full"
  | "booking.exists"
  | "booking.unknown";
