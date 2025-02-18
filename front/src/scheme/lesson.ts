import { z } from "zod";

export const LessonScheme = (t: Function) => {
  return z.object({
    title: z.string().refine((val) => val.trim().length > 0, {
      message: t("generals.requiredField"),
    }),
    description: z.string(),
    startDate: z.date().refine((val) => val.getTime() > new Date().getTime(), {
      message: t("generals.requiredField"),
    }),
    duration: z.number().refine((val) => val > 15, {
      message: t("generals.requiredField"),
    }),
  });
};
