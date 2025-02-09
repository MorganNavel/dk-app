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
import { useTranslations, useLocale } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { apiCall } from "@/utils/apiCall";
import { toast } from "sonner";
import { SignUpScheme } from "@/scheme/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorToasts } from "@/utils/toast";
import { ApiResponse } from "@/types/ApiResponse";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Captcha } from "@/components/captcha/Captcha";
import { useRouter } from "@/i18n/routing";

interface SignUpFields {
  email: string;
  name: string;
  firstname: string;
  password: string;
  confirmPassword: string;
  links: string;
  languages: Array<string>;
}
const signUp = async (data: SignUpFields): Promise<any> =>
  await apiCall("/auth/signup", "POST", data);

export default function SignUp() {
  const [isMounted, setIsMounted] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
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

  const mutation = useMutation({
    mutationFn: signUp,
    onError: (error) => {
      const err: ApiResponse<any> = JSON.parse(error.message);
      errorToasts(t, err);
    },
    onSuccess: (data) => {
      toast.success(t("signup.message.success"));
      router.push(`/${locale}/sign-in`);
    },
  });
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <SkeletonSignUp />;
  }

  const onSubmit: SubmitHandler<SignUpFields> = async (data: SignUpFields) => {
    if (!token) {
      toast.error(t("generals.recaptcha"));
      return;
    }
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
                required
              />
              <ControlledInput
                label={t("generals.user-profile.label.firstname")}
                name={"firstname"}
                placeholder={t("generals.user-profile.placeholder.firstname")}
                control={methods.control}
                required
              />
              <ControlledInput
                label={t("generals.user-profile.label.name")}
                name={"name"}
                placeholder={t("generals.user-profile.placeholder.name")}
                control={methods.control}
                required
              />
              <ControlledInput
                label={t("generals.user-profile.label.password")}
                name={"password"}
                placeholder={t("generals.user-profile.placeholder.password")}
                control={methods.control}
                type='password'
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
                required
              />

              <ControlledMultiSelect
                control={methods.control}
                name='languages'
                options={LNGS}
                label={t("generals.user-profile.label.lngs")}
                placeholder={t("generals.user-profile.placeholder.lngs")}
                required
              />
              <div className='flex justify-center my-5'>
                <Captcha onChange={(token) => setToken(token)} />
              </div>

              <Button
                variant={"round-outline"}
                type={"submit"}
                className='w-full'
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
              href={`sign-in`}
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

const SkeletonSignUp = () => {
  return (
    <div className='flex items-center justify-center min-h-screen p-6 '>
      <Card className='lg:max-w-md max-w-sm w-full p-4'>
        <CardHeader className='lg:max-w-md max-w-sm w-full items-center '>
          <Skeleton className='h-7 w-1/2'></Skeleton>
        </CardHeader>
        <CardContent className='space-y-3'>
          {[...Array(6)].map((_, i) => (
            <div key={i} className='mb-6'>
              <Skeleton className='h-3 w-48 mb-2' />
              <Skeleton className='h-8 w-full ' />
            </div>
          ))}
          <Skeleton className='h-9 rounded-3xl w-full mt-9 ' />
        </CardContent>
        <div className=' flex justify-center'>
          <Skeleton className='h-3 w-1/2 ' />
        </div>
      </Card>
    </div>
  );
};
