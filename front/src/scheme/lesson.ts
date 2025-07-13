import { z } from "zod";

export const LessonScheme = (t: Function) => {
  return z.object({
    title: z.string().refine((val) => val.trim().length > 0, {
      message: t("generals.requiredField"),
    }),
    description: z.string(),
    startDate: z
      .date()
      .optional()
      .superRefine((val, ctx) => {
        if (!val) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("generals.requiredField"),
          });
          return;
        }

        const isGtNow = val.getTime() > new Date().getTime();
        if (!isGtNow)
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("generals.dateGtNow"),
          });
        return isGtNow;
      }),
    duration: z.number().refine((val) => val > 15, {
      message: t("generals.requiredField"),
    }),
    languages: z.array(z.string()).refine((val) => val.length > 0, {
      message: t("generals.requiredField"),
    }),
  });
};
