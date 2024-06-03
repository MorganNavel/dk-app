import { FormEvent, useState } from "react";
import emailLogo from "../../assets/images/email.png";
import passwordLogo from "../../assets/images/password.png";
import userLogo from "../../assets/images/user.png";
import phoneLogo from "../../assets/images/phone.png";
import Joi from "joi";
import styles from "./SignUpForm.module.css";
import { SignUpInput, User } from "../../types/User";
import { Toaster, toast } from "sonner";

interface SignUpFormProps {
  onSignUp: (credentials: SignUpInput) => User | undefined;
  onSwitchToSignIn: () => void;
}

const signUpSchemeValidator = Joi.object({
  firstname: Joi.string().required().label("First name"),
  lastname: Joi.string().required().label("Last name"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().min(6).required().label("Password"),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm password"),
  phone: Joi.string().required().label("Phone number"),
});

interface SignUpErrors {
  [key: string]: string | undefined;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
}

function SignUpForm({ onSignUp, onSwitchToSignIn }: SignUpFormProps) {
  const validateWithJoi = (formData: SignUpInput) => {
    const { error } = signUpSchemeValidator.validate(formData, {
      abortEarly: false,
    });
    if (!error) return {};

    const errors: SignUpErrors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleError = (errors: SignUpErrors) => {
    const formContainer = document.querySelector(`.${styles.formContainer}`);

    formContainer?.classList.add(styles.errorShake);
    setTimeout(() => {
      formContainer?.classList.remove(styles.errorShake);
    }, 500);
    for (let [key, value] of Object.entries(errors)) {
      if (value) {
        toast.error(value);
        return;
      }
    }
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const form = new FormData(event.target as HTMLFormElement);
    const formData: SignUpInput = {
      firstname: form.get("firstname") as string,
      lastname: form.get("lastname") as string,
      email: form.get("email") as string,
      password: form.get("password") as string,
      confirmPassword: form.get("confirmPassword") as string,
      phone: form.get("phone") as string,
    };

    const validationErrors: SignUpErrors = validateWithJoi(formData);
    if (Object.keys(validationErrors).length > 0) {
      handleError(validationErrors);
      return;
    }
    submitFormData(formData);
  };

  const submitFormData = (formData: SignUpInput) => {
    const user = onSignUp(formData);
    if (user) {
      toast.success(
        `User ${user.firstname} ${user.lastname} created successfully !`
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
              src={userLogo}
              alt="firstname"
              className={styles.icon}
            />
            <input
              type="text"
              name="firstname"
              placeholder="Enter firstname *"
              className={styles.input}
            />
          </div>

          <div className={styles.inputContainer}>
            <img
              src={userLogo}
              alt="lastname"
              className={styles.icon}
            />
            <input
              type="text"
              name="lastname"
              placeholder="Enter lastname *"
              className={styles.input}
            />
          </div>

          <div className={styles.inputContainer}>
            <img
              src={emailLogo}
              alt="email"
              className={styles.icon}
            />
            <input
              type="text"
              placeholder="Enter email *"
              name="email"
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <img
              src={phoneLogo}
              alt="phone"
              className={styles.icon}
            />
            <input
              type="text"
              placeholder="Enter phone"
              name="phone"
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
              placeholder="Enter password *"
              name="password"
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <img
              src={passwordLogo}
              alt="confirm password"
              className={styles.icon}
            />
            <input
              type="password"
              placeholder="Confirm password *"
              name="confirmPassword"
              className={styles.input}
            />
          </div>
        </div>
        <button
          type="submit"
          className={styles.button}
        >
          Sign Up
        </button>
        <p className="mt-2 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-500"
            onClick={onSwitchToSignIn}
          >
            Sign In
          </button>
        </p>
      </form>
    </>
  );
}

export { SignUpForm };
