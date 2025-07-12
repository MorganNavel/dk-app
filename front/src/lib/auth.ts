import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession } from "better-auth/plugins";

import { prisma } from "./prisma";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      autoSignIn: true,
    },
  },
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
  trustedOrigins: [
    "https://dev.danbee-korean.com",
    "https://danbee-korean.com",
  ],
});

async function findUserRole(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: { role: true },
  });
}
