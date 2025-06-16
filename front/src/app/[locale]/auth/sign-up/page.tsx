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
import { SignUpForm } from "./signup-form";
import { Button } from "@/components/ui/button";
import { signInGoogle } from "@/lib/auth-client";

export default function SignUp() {
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <SkeletonSignUp />;

  return (
    <div className='flex items-center justify-center min-h-screen p-4 '>
      <Card className='lg:max-w-md max-w-sm w-full'>
        <CardHeader className='text-center text-2xl font-bold text-primary'>
          <CardTitle>{t("generals.signup.title")}</CardTitle>
          <CardDescription>{t("generals.signup.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
          <div className='flex justify-center'>
            <Button
              variant='outline'
              className='w-full max-w-xs'
              onClick={() => signInGoogle()}
            >
              {t("generals.signup.signInWithGoogle")}
            </Button>
          </div>
        </CardContent>
        <CardFooter className='justify-center'>
          <p className='text-sm'>
            {t("generals.alreadyAccount")}{" "}
            <Link
              href={`sign-in`}
              className='hover:underline text-primary font-semibold'
            >
              {t("generals.signin.title")}
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
          <Skeleton className='h-7 w-1/2' />
        </CardHeader>
        <CardContent className='space-y-3'>
          {[...Array(6)].map((_, i) => (
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
        <div className=' flex justify-center'>
          <Skeleton className='h-3 w-1/2 ' />
        </div>
      </Card>
    </div>
  );
};
