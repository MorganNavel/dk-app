import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession } from "better-auth/plugins";

import { prisma } from "./prisma";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    customSession(async ({ user, session }) => {
      const role = await findUserRole(session.userId);
      return {
        user: {
          role: role?.role,
          ...user,
        },
        session,
      };
    }),
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
});

async function findUserRole(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: { role: true },
  });
}
