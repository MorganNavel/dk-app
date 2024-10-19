"use client";
import { ControlledSelect } from "@/components/fields/ControlledSelect";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import LNGS from "@/types/languages";
import { SubmitHandler, useForm } from "react-hook-form";
import { ControlledInput } from "@/components/fields/ControlledInput";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { ControlledMultiSelect } from "@/components/fields/ControlledMultiSelect";

interface SignUpFields {
  email: string;
  name: string;
  firstname: string;
  password: string;
  confirmPassword: string;
  links: string;
  languages: string;
}

export default function SignUp() {
  const methods = useForm<SignUpFields>({
    defaultValues: {
      email: "",
      name: "",
      firstname: "",
      password: "",
      confirmPassword: "",
      languages: "",
      links: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpFields> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#F4F4F4]">
      <Card className="max-w-sm w-full">
        <CardHeader className="text-center text-2xl font-bold text-primary">
          Sign Up
        </CardHeader>
        <CardContent>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="bg-[#F9F9F9] px-4 py-6 rounded-lg"
            >
              <ControlledInput
                label={"Email"}
                name={"email"}
                control={methods.control}
              />
              <ControlledInput
                label={"Firstname"}
                name={"firstname"}
                control={methods.control}
              />
              <ControlledInput
                label={"Name"}
                name={"name"}
                control={methods.control}
              />
              <ControlledInput
                label={"Password"}
                name={"password"}
                control={methods.control}
                type="password"
              />
              <ControlledInput
                label={"Confirm Password"}
                name={"confirmPassword"}
                control={methods.control}
                type="password"
              />

              <ControlledMultiSelect
                control={methods.control}
                name="languages"
                options={LNGS}
                label="Languages"
                placeholder="Select your speaking languages"
              />

              <Button
                variant={"round-outline"}
                type={"submit"}
                className="w-full mt-4"
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center">Sign In</CardFooter>
      </Card>
    </div>
  );
}
