import { prisma } from "@/lib/prisma";
import { SELECT_USER_FIELDS } from "../select-fields";

export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: SELECT_USER_FIELDS,
  });
}
export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    select: SELECT_USER_FIELDS,
  });
}
export async function getUsersByIds(userIds: string[]) {
  return await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: SELECT_USER_FIELDS,
  });
}
export async function getUsersByEmail(emails: string[]) {
  return await prisma.user.findMany({
    where: { email: { in: emails } },
    select: SELECT_USER_FIELDS,
  });
}
