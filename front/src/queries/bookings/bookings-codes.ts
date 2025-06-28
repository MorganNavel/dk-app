export const BookingCodes = {
  SUCCESS: 0,

  NOT_AUTHENTICATED: 1000,

  LESSON_NOT_FOUND: 1001,
  LESSON_ALREADY_PAST: 1002,
  LESSON_NOT_PLANNED: 1003,
  LESSON_NO_CAPACITY: 1004,
  LESSON_FULL: 1005,

  CREDIT_NOT_ENOUGH: 1100,
  BOOKING_ALREADY_EXISTS: 1101,
  UNKNOWN_ERROR: 1999,
} as const;

export type BookingKeys =
  | "codes.user.not_authenticated"
  | "codes.booking.success"
  | "codes.booking.exists"
  | "codes.booking.unknown"
  | "codes.booking.delete.success"
  | "codes.booking.credit_not_enough"
  | "codes.lesson.not_found"
  | "codes.lesson.past"
  | "codes.lesson.not_planned"
  | "codes.lesson.no_capacity"
  | "codes.lesson.full";
