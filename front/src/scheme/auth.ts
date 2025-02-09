import { z } from "zod";

export const SignUpScheme = (t: Function) => {
  return z.object({
    credentials: z
      .object({
        firstname: z
          .string()
          .trim()
          .min(1, { message: t("generals.requiredField") })
          .refine((val) => val.trim().length > 0, {
            message: t("generals.requiredField"),
          }),
        name: z
          .string()
          .trim()
          .min(1, { message: t("generals.requiredField") })
          .refine((val) => val.trim().length > 0, {
            message: t("generals.requiredField"),
          }),
        email: z.string().email({ message: t("generals.emailFormat") }),
        password: z.string().min(6, { message: t("generals.passwordLength") }),
        confirmPassword: z
          .string()
          .min(6, { message: t("generals.passwordLength") }),
        nationality: z.array(z.string()).optional(),
        languages: z.array(z.string()).refine((val) => val.length > 0, {
          message: t("generals.requiredField"),
        }),
        description: z.string().optional(),
        links: z.record(z.string()).optional(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: t("generals.passwordMissmatch"),
        path: ["confirmPassword"],
      }),

    token: z
      .string()
      .trim()
      .min(1, { message: t("generals.requiredField") })
      .refine((val) => val.trim().length > 0, {
        message: t("generals.requiredField"),
      }),
  });
};

export const SignInScheme = (t: Function) => {
  return z.object({
    credentials: z.object({
      email: z.string().email({ message: t("generals.emailFormat") }),
      password: z.string().min(6, { message: t("generals.passwordLength") }),
    }),
    token: z
      .string()
      .trim()
      .min(1, { message: t("generals.requiredField") })
      .refine((val) => val.trim().length > 0, {
        message: t("generals.requiredField"),
      }),
  });
};
