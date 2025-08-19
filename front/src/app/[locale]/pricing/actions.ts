"use server";

import { getUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export async function addCredits(credits: number): Promise<void> {
  const user = await getUser();
  if (!user) return;
  if (user.role !== "student") return;
  prisma.user.update({
    where: { id: user.id },
    data: {
      nbLessons: {
        increment: credits,
      },
    },
  });
}
