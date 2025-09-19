"use server";

import { getUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addCredits(credits: number): Promise<void> {
  const user = await getUser();
  if (!user) return;
  if (user.role !== "student") return;
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        nbLessons: {
          increment: credits,
        },
      },
    });
    revalidatePath("/pricing");
  } catch (error) {
    console.error("Error adding credits:", error);
  }
}

export async function saveBillingInfo(price: number): Promise<void> {
  const user = await getUser();
  if (!user) return;

  try {
    await prisma.billing.create({
      data: {
        idUser: user.id,
        price,
        status: "done",
      },
    });
  } catch (error) {
    console.error("Error saving billing info:", error);
  }
}
