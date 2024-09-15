import joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateUserInput:
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
