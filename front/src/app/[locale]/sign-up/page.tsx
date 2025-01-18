"use client";
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
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { apiCall } from "@/utils/apiCall";
import { toast } from "sonner";
import { SignUpScheme } from "@/scheme/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

interface SignUpFields {
  email: string;
  name: string;
  firstname: string;
  password: string;
  confirmPassword: string;
  links: string;
  languages: Array<string>;
}
const signUp = async (data: SignUpFields): Promise<any> => {
  console.log(data);
  const response = await apiCall("/auth/signup", "POST", data);
  console.log(response);
  return response;
};

export default function SignUp() {
  const t = useTranslations();
  const methods = useForm<SignUpFields>({
    resolver: zodResolver(SignUpScheme(t)),
    defaultValues: {
      email: "",
      name: "",
      firstname: "",
      password: "",
      confirmPassword: "",
      languages: [],
    },
  });
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: signUp,
    onError: (error) => {
      toast.error(t("signup.message.error"));
    },
    onSuccess: (data) => {
      toast.success(t("signup.message.success"));
      router.push("/sign-in");
    },
  });

  const onSubmit: SubmitHandler<SignUpFields> = async (data: SignUpFields) => {
    mutation.mutate(data);
  };
  return (
    <div className='flex items-center justify-center min-h-screen p-4 '>
      <Card className='lg:max-w-md max-w-sm w-full'>
        <CardHeader className='text-center text-2xl font-bold text-primary'>
          {t("generals.signup")}
        </CardHeader>
        <CardContent>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className=' px-4 py-6 rounded-lg '
            >
              <ControlledInput
                label={t("generals.user-profile.label.email")}
                name={"email"}
                placeholder={t("generals.user-profile.placeholder.email")}
                control={methods.control}
                className='bg-background'
                required
              />
              <ControlledInput
                label={t("generals.user-profile.label.firstname")}
                name={"firstname"}
                placeholder={t("generals.user-profile.placeholder.firstname")}
                control={methods.control}
                className='bg-background'
                required
              />
              <ControlledInput
                label={t("generals.user-profile.label.name")}
                name={"name"}
                placeholder={t("generals.user-profile.placeholder.name")}
                control={methods.control}
                className='bg-background'
                required
              />
              <ControlledInput
                label={t("generals.user-profile.label.password")}
                name={"password"}
                placeholder={t("generals.user-profile.placeholder.password")}
                control={methods.control}
                type='password'
                className='bg-background'
                required
              />
              <ControlledInput
                label={t("generals.user-profile.label.confirmPassword")}
                name={"confirmPassword"}
                placeholder={t(
                  "generals.user-profile.placeholder.confirmPassword"
                )}
                control={methods.control}
                type='password'
                className='bg-background'
                required
              />

              <ControlledMultiSelect
                control={methods.control}
                name='languages'
                options={LNGS}
                label={t("generals.user-profile.label.lngs")}
                placeholder={t("generals.user-profile.placeholder.lngs")}
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
            {t("generals.alreadyAccount")}{" "}
            <Link
              href='/sign-in'
              className='hover:underline text-primary font-semibold'
            >
              {t("generals.signin")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
