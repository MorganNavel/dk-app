import { z } from "zod";

export const ContactScheme = (t: Function) => {
  return z.object({
    email: z.string().email({ message: "generals.emailFormat" }),
    subject: z.string().refine((val) => val.trim().length > 0, {
      message: "generals.requiredField",
    }),

    question: z.string().refine((val) => val.trim().length > 0, {
      message: "generals.requiredField",
    }),

    description: z.string().refine((val) => val.trim().length > 0, {
      message: "generals.requiredField",
    }),
    token: z
      .string()
      .trim()
      .min(1, { message: "generals.captcha_required" })
      .refine((val) => val.trim().length > 0, {
        message: "generals.captcha_required",
      }),
  });
};
