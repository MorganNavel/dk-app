import { auth } from "./auth";
import { headers } from "next/headers";

export async function getSession() {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  return session;
}

export async function getUser() {
  const session = await getSession();
  return session?.user;
}
