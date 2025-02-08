import { z } from "zod";

export const SignUpScheme = (t: Function) => {
  return z
    .object({
      firstname: z
        .string()
        .trim()
        .min(3, { message: t("signup.min.firstname") }),
      name: z
        .string()
        .trim()
        .min(3, { message: t("signup.min.name") }),
      email: z.string().email({ message: t("signup.emailFormat") }),
      password: z.string().min(6, { message: t("signup.min.password") }),
      confirmPassword: z.string(),
      nationality: z.array(z.string()).optional(),
      languages: z.array(z.string()).optional(),
      description: z.string().optional(),
      links: z.record(z.string()).optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("signup.passwordMissmatch"),
      path: ["confirmPassword", "password"],
    });
};

export const SignInScheme = (t: Function) => {
  return z.object({
    email: z.string().email({ message: t("signup.emailFormat") }),
    password: z.string().min(6, { message: t("signup.min.password") }),
  });
};
