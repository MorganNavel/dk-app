import joi from "joi";

export const CreateScheme = joi.object({
  title: joi.string().required(),
  description: joi.string(),
  duration: joi.number(),
  startDate: joi.date().greater("now").required(),
});

export const UpdateScheme = joi.object({
  title: joi.string(),
  description: joi.string(),
  duration: joi.number(),
  startDate: joi.date().greater("now"),
  earned: joi.number(),
});

export const UpdateStatusScheme = joi.object({
  status: joi.string().valid("planned", "done", "cancelled").required(),
});
