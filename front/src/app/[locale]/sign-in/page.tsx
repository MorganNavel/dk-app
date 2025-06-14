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
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { ApiResponse } from "@/types/ApiResponse";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ControlledCaptchat } from "@/components/captcha/ControlledCaptcha";
import { useProfile } from "@/providers/Profile";
import { Spinner } from "@nextui-org/react";

interface SignInFields {
  email: string;
  password: string;
}
interface FormProps {
  credentials: SignInFields;
  token: string;
}
const signIn = async (data: SignInFields): Promise<any> => {
  return await apiCall<ApiResponse<any>>("/auth/signin", "POST", data);
};
export default function SignIn() {
  const [isMounted, setIsMounted] = useState(false);
  const { profile } = useProfile();

  const t = useTranslations();
  const methods = useForm<FormProps>({
    resolver: zodResolver(SignInScheme(t)),
    defaultValues: {
      credentials: {
        email: "",
        password: "",
      },
      token: "",
    },
  });

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
      window.location.href = "/";
    },
  });
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (profile && profile.role !== "anonymous") {
      window.location.href = "/";
    }
  }, [profile]);

  if (!isMounted) {
    return <SkeletonSignIn />;
  }
  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    await mutation.mutateAsync(data.credentials);
  };

  return (
    <div className='flex items-center justify-center min-h-screen snap-start snap-always'>
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
                name={"credentials.email"}
                placeholder={t("generals.user-profile.placeholder.email")}
                control={methods.control}
                required
              />
              <ControlledInput
                label={t("generals.user-profile.label.password")}
                name={"credentials.password"}
                placeholder={t("generals.user-profile.placeholder.password")}
                control={methods.control}
                type='password'
                required
              />
              <div className='flex justify-center my-5'>
                <ControlledCaptchat name='token' control={methods.control} />
              </div>

              <Button
                variant={"default"}
                type={"submit"}
                className='w-full'
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <Spinner size='sm' color='white' />
                ) : (
                  t("generals.submit")
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='justify-center py-4 border-t'>
          <p className='text-sm text-center'>
            {t("generals.noAccount")}{" "}
            <Link
              href='/sign-up'
              className='text-primary font-semibold hover:underline'
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
          <Skeleton className='h-7 w-1/2' />
        </CardHeader>
        <CardContent className='space-y-3'>
          {[...Array(2)].map((_, i) => (
            <div key={i} className='mb-6'>
              <Skeleton className='h-3 w-48 mb-2' />
              <Skeleton className='h-8 w-full ' />
            </div>
          ))}
          <div className=' flex justify-center'>
            <Skeleton className='h-16  w-4/5 my-5 ' />
          </div>
          <Skeleton className='h-9 rounded-3xl w-full mt-9 ' />
        </CardContent>
        <CardFooter className='justify-center py-4 border-t'>
          <Skeleton className='h-3 w-1/2 ' />
        </CardFooter>
      </Card>
    </div>
  );
};
