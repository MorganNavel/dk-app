import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CustomButtonPrimary } from "@/components/reusable/Button/CustomRoundButton";
import { ControllableInput } from "@/components/ControllableInput";
import { SignInInput } from "@/types/User";

export const SignInForm = () => {
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: SignInInput) => {
    console.log(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-4">
          <ControllableInput
            name="email"
            label="Email"
            required
            className="w-full rounded-md bg-white"
          />
        </div>

        <div className="mb-6">
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
        </div>
        <CustomButtonPrimary text="Sign In" type="submit" className="p-3" />
      </form>
    </FormProvider>
  );
};
