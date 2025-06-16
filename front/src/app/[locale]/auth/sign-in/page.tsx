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
    <div className='flex items-center justify-center min-h-screen snap-start snap-always'>
      <Card className='lg:max-w-md max-w-sm w-full'>
        <CardHeader className='text-center text-2xl font-bold text-primary'>
          <CardTitle>{t("generals.signin")}</CardTitle>
          <CardDescription>{t("generals.signin.description")}</CardDescription>
        </CardHeader>
        <CardContent>
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
