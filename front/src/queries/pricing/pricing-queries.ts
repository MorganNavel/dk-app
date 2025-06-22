import { prisma } from "@/lib/prisma";
import { SELECT_PRICING_FIELDS } from "../select-fields";
import { getUser } from "@/lib/auth-server";

export async function getPricings() {
  return await prisma.pricings.findMany({
    select: SELECT_PRICING_FIELDS,
  });
}
export async function buyLesson(idPricing: number) {
  const user = await getUser();
  if (!user) return;
  if (user.role !== "student") return;

  const pricing = await prisma.pricings.findUnique({
    where: { idPricing },
    select: { price: true, nbLessons: true },
  });
  if (!pricing) return;
  const nbLessons = await prisma.user.findUnique({
    where: { id: user.id },
    select: { nbLessons: true },
  });
  return await prisma.user.update({
    where: { id: user.id },
    data: {
      nbLessons: (nbLessons?.nbLessons ?? 0) + pricing.nbLessons,
    },
  });
}
