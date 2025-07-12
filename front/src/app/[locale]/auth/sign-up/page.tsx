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
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";

export default function SignUp() {
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <SkeletonSignUp />;

  return (
    <div className='flex items-center justify-center min-h-screen pt-32 lg:pt-15 mx-3'>
      <Card className='lg:max-w-md max-w-sm w-full'>
        <CardHeader className='text-center text-2xl font-bold text-primary'>
          <CardTitle>{t("generals.signup.title")}</CardTitle>
          <CardDescription>{t("generals.signup.description")}</CardDescription>
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
          <SignUpForm />
        </CardContent>
        <CardFooter className='justify-center py-4 border-t'>
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
    <div className='flex items-center justify-center min-h-screen pt-32 lg:pt-15 mx-3'>
      <Card className='lg:max-w-md max-w-sm w-full'>
        <CardHeader className='flex flex-col justify-center items-center text-2xl font-bold text-primary'>
          <Skeleton className='h-7 w-32' />
          <Skeleton className='h-3 w-2/3' />
        </CardHeader>
        <CardContent className='space-y-3'>
          <div>
            <div className='flex flex-3 justify-center mb-4 gap-5'>
              <Button
                variant='outline'
                className='flex-1 flex items-center justify-center gap-2'
              >
                <FcGoogle size={20} />
                Google
              </Button>
            </div>
            <div className='flex flex-4 text-center items-center text-sm text-muted-foreground'>
              <Separator className='flex-1' />
              <Skeleton className='h-7 w-1/2 flex-2 mx-3' />
              <Separator className='flex-1' />
            </div>
          </div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className='mb-6'>
              <Skeleton className='h-3 w-48 mb-2' />
              <Skeleton className='h-8 w-full ' />
            </div>
          ))}
          <div className=' flex justify-center'>
            <Skeleton className='h-16  w-4/5 my-5 ' />
          </div>
          <Skeleton className='h-9 w-full mt-9' />
        </CardContent>
        <div className='flex justify-center py-4 border-t'>
          <Skeleton className='h-3 w-1/2 ' />
        </div>
      </Card>
    </div>
  );
};
