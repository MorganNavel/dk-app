export const LessonCodes = {
  SUCCESS: 0,

  NOT_AUTHENTICATED: 1000,
  LESSON_ALREADY_EXISTS: 1001,
  NOT_FOUND: 1002,
  PAST_LESSON: 1003,

  UNAUTHORIZED_ACTION: 1004,
  INVALID_INPUT: 1005,

  UNKNOWN_ERROR: 1999,
} as const;

export type LessonKeys =
  | "codes.user.not_authenticated"
  | "codes.lesson.unauthorized_action"
  | "codes.lesson.invalid_input"
  | "codes.lesson.success"
  | "codes.lesson.not_found"
  | "codes.lesson.past"
  | "codes.lesson.unknown_error"
  | "codes.lesson.create.success"
  | "codes.lesson.create.already_exists"
  | "codes.lesson.create.unknown_error"
  | "codes.lesson.delete.success"
  | "codes.lesson.delete.unknown_error";
