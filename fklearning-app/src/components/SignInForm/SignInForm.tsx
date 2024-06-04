import { FormEvent } from "react";
import styles from "./SignInForm.module.css";
import emailLogo from "../../assets/images/email.png";
import passwordLogo from "../../assets/images/password.png";
import { SignInInput, User } from "../../types/User";
import Joi from "joi";
import { Toaster, toast } from "sonner";

const signUpSchemeValidator = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().min(6).required().label("Password"),
});

interface SignInErrors {
  [key: string]: string | undefined;
  email?: string;
  password?: string;
}
interface SignInFormProps {
  onSignIn: (user: SignInInput) => User | undefined;
  onSwitchToSignUp: () => void;
}

function SignInForm({ onSignIn, onSwitchToSignUp }: SignInFormProps) {
  const validateWithJoi = (formData: SignInInput) => {
    const { error } = signUpSchemeValidator.validate(formData, {
      abortEarly: false,
    });
    if (!error) return {};

    const errors: SignInErrors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleError = (errors: SignInErrors) => {
    const formContainer = document.querySelector(`.${styles.formContainer}`);

    formContainer?.classList.add(styles.errorShake);
    setTimeout(() => {
      formContainer?.classList.remove(styles.errorShake);
    }, 500);
    for (let [, value] of Object.entries(errors)) {
      if (value) {
        toast.error(value);
        return;
      }
    }
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const form = new FormData(event.target as HTMLFormElement);
    const formData: SignInInput = {
      email: form.get("email") as string,
      password: form.get("password") as string,
    };
    console.log(formData);

    const validationErrors: SignInErrors = validateWithJoi(formData);
    if (Object.keys(validationErrors).length > 0) {
      handleError(validationErrors);
      return;
    }
    submitFormData(formData);
  };

  const submitFormData = (formData: SignInInput) => {
    const user = onSignIn(formData);
    if (user) {
      toast.success(
        `User ${user.firstname} ${user.lastname} signed in successfully !`
      );
    }
  };
  return (
    <>
      <Toaster richColors />
      <form
        onSubmit={handleSubmit}
        className={styles.formContainer}
      >
        <div className="space-y-4">
          <div className={styles.inputContainer}>
            <img
              src={emailLogo}
              alt="email"
              className={styles.icon}
            />
            <input
              type="text"
              placeholder="Enter email"
              name="email"
              className={styles.input}
            />
          </div>

          <div className={styles.inputContainer}>
            <img
              src={passwordLogo}
              alt="password"
              className={styles.icon}
            />
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              className={styles.input}
            />
          </div>
        </div>
        <button
          type="submit"
          className={styles.button}
        >
          Login
        </button>
        <p className="mt-2 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-blue-500"
            onClick={onSwitchToSignUp}
          >
            Sign Up
          </button>
        </p>
      </form>
    </>
  );
}

export { SignInForm };
