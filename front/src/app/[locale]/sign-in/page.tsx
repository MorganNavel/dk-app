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
import { apiCall } from "@/utils/apiCall";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { SignInScheme } from "@/scheme/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorToasts } from "@/utils/toast";
import { useRouter, Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";

import { ApiResponse } from "@/types/ApiResponse";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
  return await apiCall<ApiResponse<any>>("/auth/signin", "POST", data);
};
export default function SignIn() {
  const [isMounted, setIsMounted] = useState(false);

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
  const locale = useLocale();
  const mutation = useMutation({
    mutationFn: signIn,
    onError: (error) => {
      const err: ApiResponse<any> = JSON.parse(error.message);
      if (err.code === 400) {
        toast.error(t("signin.message.error"));
        return;
      }
      errorToasts(t, err);
    },
    onSuccess: (data) => {
      toast.success(t("signin.message.success"));
      router.push(`/`);
    },
  });
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <SkeletonSignIn />;
  }
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
              />
              <ControlledInput
                label={t("generals.user-profile.label.password")}
                name={"password"}
                placeholder={t("generals.user-profile.placeholder.password")}
                control={methods.control}
                type='password'
                required
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
              href={`/sign-up`}
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

const SkeletonSignIn = () => {
  return (
    <div className='flex items-center justify-center min-h-screen p-6 '>
      <Card className='lg:max-w-md max-w-sm w-full p-4'>
        <CardHeader className='lg:max-w-md max-w-sm w-full items-center '>
          <Skeleton className='h-7 w-1/2'></Skeleton>
        </CardHeader>
        <CardContent className='space-y-3'>
          {[...Array(2)].map((_, i) => (
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
