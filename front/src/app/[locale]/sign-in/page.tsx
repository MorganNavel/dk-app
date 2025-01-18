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
import { apiCall } from "@/utils/apiCall";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { SignInScheme } from "@/scheme/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorToasts } from "@/utils/toast";
import { useRouter } from "next/navigation";

interface SignInFields {
  email: string;
  name: string;
  firstname: string;
  password: string;
  confirmPassword: string;
  links: string;
  languages: string;
}
const signIn = async (data: SignInFields): Promise<any> => {
  return await apiCall("/auth/signin", "POST", data);
};
export default function SignIn() {
  const t = useTranslations();
  const methods = useForm<SignInFields>({
    resolver: zodResolver(SignInScheme(t)),
    defaultValues: {
      email: "",
      name: "",
      firstname: "",
      password: "",
      confirmPassword: "",
      languages: "",
    },
  });
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: signIn,
    onError: (error) => {
      if (error.message === "400") {
        toast.error(t("signin.message.error"));
        return;
      }
      errorToasts(t, error);
    },
    onSuccess: (data) => {
      toast.success(t("signin.message.success"));
      router.push("/");
    },
  });
  const onSubmit: SubmitHandler<SignInFields> = async (data) => {
    await mutation.mutateAsync(data);
  };

  return (
    <div className='flex items-center justify-center min-h-screen p-4 '>
      <Card className='lg:max-w-md max-w-sm w-full'>
        <CardHeader className='text-center text-2xl font-bold text-primary'>
          {t("generals.signin")}
        </CardHeader>
        <CardContent>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className=' px-4 py-6 rounded-lg'
            >
              <ControlledInput
                label={t("generals.user-profile.label.email")}
                name={"email"}
                placeholder={t("generals.user-profile.placeholder.email")}
                control={methods.control}
                required
                className='bg-background'
              />
              <ControlledInput
                label={t("generals.user-profile.label.password")}
                name={"password"}
                placeholder={t("generals.user-profile.placeholder.password")}
                control={methods.control}
                type='password'
                required
                className='bg-background'
              />

              <Button
                variant={"round-outline"}
                type={"submit"}
                className='w-full mt-4'
              >
                {t("generals.submit")}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='justify-center'>
          <p className='text-sm'>
            {t("generals.noAccount")}{" "}
            <Link
              href='/sign-up'
              className='hover:underline text-primary font-semibold'
            >
              {t("generals.signup")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
