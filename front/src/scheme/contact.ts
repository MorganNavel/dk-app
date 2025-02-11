import { z } from "zod";

export const ContactScheme = (t: Function) => {
  return z.object({
    email: z.string().email({ message: t("generals.emailFormat") }),
    subject: z.string().refine((val) => val.trim().length > 0, {
      message: t("generals.requiredField"),
    }),

    question: z.string().refine((val) => val.trim().length > 0, {
      message: t("generals.requiredField"),
    }),

    description: z.string().refine((val) => val.trim().length > 0, {
      message: t("generals.requiredField"),
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
