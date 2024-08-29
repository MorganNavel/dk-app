import joi from "joi";

export const SignUpScheme = joi.object({
  firstname: joi.string().min(3).required(),
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
  nationality: joi.string(),
  languages: joi.array().items(joi.string()),
  description: joi.string(),
});
