"use client";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { SignInForm } from "./signin-form";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";
import { signInGoogle } from "@/lib/auth-client";

export default function SignIn() {
  const [isMounted, setIsMounted] = useState(false);

  const t = useTranslations();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <SkeletonSignIn />;
  }

  return (
    <div className='flex items-center justify-center min-h-screen snap-start snap-always '>
      <Card className='lg:max-w-md max-w-sm lg:w-full p-4'>
        <CardHeader className='text-center text-2xl font-bold text-primary'>
          <CardTitle>{t("generals.signin.title")}</CardTitle>
          <CardDescription>{t("generals.signin.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className='flex flex-3 justify-center mb-4 gap-5'>
              <Button
                variant='outline'
                onClick={signInGoogle}
                className='flex-1 flex items-center justify-center gap-2'
              >
                <FcGoogle size={20} />
                Google
              </Button>
            </div>
            <div className=' flex flex-4 text-center items-center text-sm text-muted-foreground'>
              <Separator className='flex-1' />
              <p className='flex-2 mx-5'>{t("generals.orContinueWith")}</p>
              <Separator className='flex-1' />
            </div>
          </div>
          <SignInForm />
        </CardContent>
        <CardFooter className='justify-center py-4 border-t'>
          <p className='text-sm text-center'>
            {t("generals.noAccount")}{" "}
            <Link
              href='/auth/sign-up'
              className='text-primary font-semibold hover:underline'
            >
              {t("generals.signup.title")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

const SkeletonSignIn = () => {
  return (
    <div className='flex items-center justify-center min-h-screen p-6'>
      <Card className='lg:max-w-md max-w-sm w-full p-4'>
        <CardHeader className='items-center text-center space-y-2'>
          <Skeleton className='h-6 w-1/2' />
          <Skeleton className='h-4 w-3/4' />
        </CardHeader>

        <CardContent className='space-y-4'>
          <Skeleton className='h-10 w-full rounded-md' />

          <div className='flex items-center gap-4 text-sm text-muted-foreground'>
            <Skeleton className='h-px flex-1' />
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-px flex-1' />
          </div>

          {[...Array(2)].map((_, i) => (
            <div key={i}>
              <Skeleton className='h-4 w-24 mb-1' />
              <Skeleton className='h-9 w-full' />
            </div>
          ))}

          <Skeleton className='h-10 w-full rounded-md' />
        </CardContent>

        <CardFooter className='justify-center py-4 border-t'>
          <Skeleton className='h-4 w-3/4' />
        </CardFooter>
      </Card>
    </div>
  );
};
