"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { ControlledInput } from "@/components/fields/ControlledInput";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { useTranslations } from "next-intl";

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
    },
  });
  const t = useTranslations();

  const onSubmit: SubmitHandler<SignUpFields> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#F4F4F4]">
      <Card className="lg:max-w-md max-w-sm w-full">
        <CardHeader className="text-center text-2xl font-bold text-primary">
          {t("generals.signin")}
        </CardHeader>
        <CardContent>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="bg-[#F9F9F9] px-4 py-6 rounded-lg"
            >
              <ControlledInput
                label={t("generals.user-profile.email")}
                name={"email"}
                control={methods.control}
                required
              />

              <ControlledInput
                label={t("generals.user-profile.password")}
                name={"password"}
                control={methods.control}
                type="password"
                required
              />

              <Button
                variant={"round-outline"}
                type={"submit"}
                className="w-full mt-4"
              >
                {t("generals.submit")}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm">
            {t("generals.noAccount")}{" "}
            <Link
              href="/sign-up"
              className="hover:underline text-primary font-semibold"
            >
              {t("generals.signup")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
