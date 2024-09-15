import joi from "joi";
/**
 * @openapi
 * components:
 *   schemas:
 *     SignUpInput:
 *       type: object
 *       required:
 *        - firstname
 *        - name
 *        - email
 *        - password
 *        - confirmPassword
 *       example:
 *        firstname: "john"
 *        name: "doe"
 *        email: "john.doe@email.com"
 *        password: "johndoepassword"
 *        confirmPassword: "johndoepassword"
 *        languages: ["French", "English"]
 *        description: "I am a language lover"
 *        links: {"LinkedIn": "https://www.linkedin.com/in/johndoe", "Instagram": "https://www.instagram.com/johndoe"}
 *        nationality: ["French", "English"]
 *       properties:
 *         firstname:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         confirmPassword:
 *           type: string
 *         nationality:
 *           type: array
 *           items:
 *             type: string
 *           example: ["French", "English"]
 *         languages:
 *           type: object
 *           additionalProperties:
 *             type: string
 *           example: {"LinkedIn": "https://www.linkedin.com/in/johndoe", "Instagram": "https://www.instagram.com/johndoe"}
 *         description:
 *           type: string
 *           example: "I am a language lover"
 */

export const SignUpScheme = joi.object({
  firstname: joi.string().min(3).required(),
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
  nationality: joi.array().items(joi.string()),
  languages: joi.array().items(joi.string()),
  description: joi.string(),
  links: joi.object().pattern(joi.string(), joi.string()),
});
/**
 * @openapi
 * components:
 *   schemas:
 *     SignInInput:
 *       type: object
 *       required:
 *        - email
 *        - password
 *       example:
 *        email: "john.doe@email.com"
 *        password: "johndoepassword"
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 */
export const SignInScheme = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});
