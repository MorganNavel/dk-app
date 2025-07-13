import { z } from "zod";

export const LessonScheme = (t: Function) => {
  return z.object({
    title: z.string().refine((val) => val.trim().length > 0, {
      message: t("generals.requiredField"),
    }),
    description: z.string(),
    startDate: z.date().refine(
      (val) => {
        if (isNaN(val.getTime())) {
          return false; // Invalid date
        }
        return val.getTime() > new Date().getTime();
      },
      {
        message: t("generals.requiredField"),
      }
    ),
    duration: z.number().refine((val) => val > 15, {
      message: t("generals.requiredField"),
    }),
    languages: z.array(z.string()).refine((val) => val.length > 0, {
      message: t("generals.requiredField"),
    }),
  });
};
