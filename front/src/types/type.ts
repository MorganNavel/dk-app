import { Prisma } from "@prisma/client";
import {
  SELECT_BOOKING_FIELDS,
  SELECT_LESSON_FIELDS,
  SELECT_PRICING_FIELDS,
  SELECT_USER_FIELDS,
} from "@/queries/select-fields";
export type UserProfile = Prisma.UserGetPayload<{
  select: typeof SELECT_USER_FIELDS;
}>;
export type Booking = Prisma.BookingGetPayload<{
  select: typeof SELECT_BOOKING_FIELDS;
}>;
export type Pricing = Prisma.PricingsGetPayload<{
  select: typeof SELECT_PRICING_FIELDS;
}>;
export type Lesson = Prisma.LessonGetPayload<{
  select: typeof SELECT_LESSON_FIELDS;
}>;
