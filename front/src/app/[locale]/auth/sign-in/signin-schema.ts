import { z } from "zod";

export const SignInScheme = (t: Function) => {
  return z.object({
    credentials: z.object({
      email: z.string().email({ message: t("generals.emailFormat") }),
      password: z.string().min(6, { message: t("generals.passwordLength") }),
    }),
    token: z
      .string()
      .trim()
      .min(1, { message: t("generals.captcha_required") })
      .refine((val) => val.trim().length > 0, {
        message: t("generals.captcha_required"),
      }),
  });
};
