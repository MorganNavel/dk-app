import { createAuthClient } from "better-auth/react";
import { customSessionClient } from "better-auth/client/plugins";
import { auth } from "./auth";
export const authClient = createAuthClient({
  plugins: [customSessionClient<typeof auth>()],
});
export const signInGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};
export const { signOut, signUp, signIn, useSession } = authClient;
