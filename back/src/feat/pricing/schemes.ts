import joi from "joi";

export const CreateScheme = joi.object({
  currency: joi.string().required(),
  price: joi.number().required(),
  nbLessons: joi.number().min(1).default(1).required(),
});

export const UpdateScheme = joi.object({
  currency: joi.string(),
  price: joi.number(),
  nbLessons: joi.number().min(1),
});
