"use server";

import { redirect } from "@/i18n/routing";

export async function createBooking(idLesson: number) {
  const response = await fetch(
    `http://localhost:3000/api/lesson/${idLesson}/booking`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    if (errorData.redirectTo) {
      redirect({ href: errorData.redirectTo, locale: "fr" });
      throw new Error(`Redirection to ${errorData.redirectTo} failed`);
    }
  }

  return await response.json();
}
