import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ControllableInput } from "@/components/ControllableInput";
import { SignInInput } from "@/types/User";
import { ControllableDatePicker } from "../ControllableDatePicker";
import { Button } from "../ui/button";

export const SignUpForm = () => {
  const methods = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: SignInInput) => {
    console.log(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-4">
          <ControllableInput
            name="firstname"
            label="First Name"
            required
            className="w-full rounded-md bg-white"
          />
        </div>
        <div className="mb-4">
          <ControllableInput
            name="lastname"
            label="Last Name"
            required
            className="w-full rounded-md bg-white"
          />
        </div>

        <div className="mb-4">
          <ControllableInput
            name="email"
            label="Email"
            required
            className="w-full rounded-md bg-white"
          />
        </div>

        <div className="mb-4">
          <ControllableDatePicker
            name="birthday"
            label="Birthday"
            required
            className="w-full"
          />
        </div>

        <div className="mb-6 space-y-5">
          <ControllableInput
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            required
            className="w-full border rounded-md bg-white"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff className="text-primary" />
                    ) : (
                      <Visibility className="text-primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <ControllableInput
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            required
            className="w-full border rounded-md bg-white"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOff className="text-primary" />
                    ) : (
                      <Visibility className="text-primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <Button type="submit" variant={"round-outline"}>
          Sign Up
        </Button>
      </form>
    </FormProvider>
  );
};
