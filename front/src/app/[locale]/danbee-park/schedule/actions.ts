"use server";
export async function createBooking(idLesson: number) {
  const response = await fetch(`/api/lesson/${idLesson}/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.key ?? "Booking failed");
  }

  return await response.json();
}
