import joi from "joi";

export const UpdateScheme = joi.object({
  firstname: joi.string().min(3),
  name: joi.string().min(3),
  email: joi.string().email(),
  password: joi.string().min(6),
  confirmPassword: joi.string().valid(joi.ref("password")),
  nationality: joi.array().items(joi.string()),
  languages: joi.array().items(joi.string()),
  description: joi.string(),
  links: joi.array().items(joi.string()),
});
