import { Prisma } from "@prisma/client";

export const SELECT_USER_FIELDS = {
  id: true,
  name: true,
  email: true,
  role: true,
  image: true,
  description: true,
  languages: true,
  nationality: true,
  emailVerified: true,
  createdAt: true,
} satisfies Prisma.UserSelect;

export const SELECT_LESSON_FIELDS = {
  idLesson: true,
  idTeacher: true,
  title: true,
  description: true,
  createdAt: true,
  groupSize: true,
  bookings: {
    select: {
      idBooking: true,
      idUser: true,
      user: { select: SELECT_USER_FIELDS },
    },
  },
  teacher: {
    select: SELECT_USER_FIELDS,
  },
  status: true,
  startDate: true,
  duration: true,
} satisfies Prisma.LessonSelect;

export const SELECT_LESSON_AS_PARTICIPANT = {
  ...SELECT_LESSON_FIELDS,
  url: true,
} satisfies Prisma.LessonSelect;
export const SELECT_LESSON_AS_PARTICIPANT_TEACHER = {
  ...SELECT_LESSON_AS_PARTICIPANT,
  earned: true,
} satisfies Prisma.LessonSelect;

export const SELECT_BOOKING_FIELDS = {
  idBooking: true,
  idUser: true,
  idLesson: true,
  user: { select: SELECT_USER_FIELDS },
  lesson: {
    select: {
      idLesson: true,
      title: true,
      startDate: true,
      duration: true,
      teacher: { select: SELECT_USER_FIELDS },
    },
  },
} satisfies Prisma.BookingSelect;

export const SELECT_PRICING_FIELDS = {
  idPricing: true,
  price: true,
  currency: true,
  nbLessons: true,
} satisfies Prisma.PricingsSelect;

export async function getLessonSelectByUser(
  isParticipant: boolean,
  isTeacher: boolean = false
): Promise<Prisma.LessonSelect> {
  if (isTeacher) return SELECT_LESSON_AS_PARTICIPANT_TEACHER;
  if (isParticipant) return SELECT_LESSON_AS_PARTICIPANT;
  return SELECT_LESSON_FIELDS;
}
