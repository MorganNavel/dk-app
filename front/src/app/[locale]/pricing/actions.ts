"use server";

import { getUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const PAYPAL_BASE =
  process.env.NODE_ENV === "production"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
const PAYPAL_API_VERSION = "v2";

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

export async function createOrder(amout: number, currency: string) {
  console.log("Order passing");
  const value: String = amout.toFixed(2);
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");
  console.log(process.env.PAYPAL_CLIENT_SECRET);
  const response = await fetch(
    `${PAYPAL_BASE}/${PAYPAL_API_VERSION}/checkout/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currency || "USD",
              value,
            },
          },
        ],
      }),
    }
  );

  return response.json();
}

export async function captureOrder(orderID: string) {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(
    `${PAYPAL_BASE}/${PAYPAL_API_VERSION}/checkout/orders/${orderID}/capture`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
    }
  );

  return response.json();
}
