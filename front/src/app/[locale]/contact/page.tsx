"use client";
import { ControlledInput } from "@/components/fields/ControlledInput";
import { ControlledSelect } from "@/components/fields/ControlledSelect";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import "@/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { ContactScheme } from "@/scheme/contact";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Captcha } from "@/components/captcha/Captcha";
import { ControlledTextarea } from "@/components/fields/ControlledTextarea";
import { Skeleton } from "@/components/ui/skeleton";

interface ContactFields {
  email: string;
  subject: string;
  question: string;
  description: string;
  token: string;
}
interface Option {
  label: string;
  value: string;
}

export default function Contact() {
  const [isMounted, setIsMounted] = useState(false);

  const t = useTranslations();
  const methods = useForm<ContactFields>({
    resolver: zodResolver(ContactScheme(t)),
    defaultValues: {
      email: "",
      subject: "",
      question: "",
      description: "",
      token: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <SkeletonContact />;
  }

  const onSubmit: SubmitHandler<ContactFields> = (data: ContactFields) => {
    const { token, ...contactData } = data;
    if (!token) {
      toast.error(t("captcha_required"));
      return;
    }
    console.log("Contact data:", contactData);
  };

  function getSubject(): Option[] {
    return [
      { label: t("contact.technical_support"), value: "1" },
      { label: t("contact.billing_payments"), value: "2" },
      { label: t("contact.subscription_offers"), value: "3" },
      { label: t("contact.access_issue"), value: "4" },
      { label: t("contact.other"), value: "-1" },
    ];
  }

  function getQuestion(subject: string): Option[] {
    let questions: Option[] = [];
    switch (subject) {
      case "1":
        questions = [
          { label: t("contact.resolve_technical_error"), value: "1" },
          { label: t("contact.contact_support"), value: "2" },
          { label: t("contact.remote_assistance"), value: "3" },
        ];
        break;
      case "2":
        questions = [
          { label: t("contact.check_payments"), value: "4" },
          { label: t("contact.payment_methods"), value: "5" },
          { label: t("contact.detailed_invoice"), value: "6" },
        ];
        break;
      case "3":
        questions = [
          { label: t("contact.available_subscriptions"), value: "7" },
          { label: t("contact.modify_subscription"), value: "8" },
          { label: t("contact.cancel_subscription"), value: "9" },
        ];
        break;
      case "4":
        questions = [
          { label: t("contact.cannot_login"), value: "10" },
          { label: t("contact.account_suspended"), value: "11" },
          { label: t("contact.reset_password"), value: "12" },
        ];
        break;
    }
    questions.push({ label: t("contact.other"), value: "-1" });
    return questions;
  }

  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <Card className='w-full max-w-lg shadow-lg rounded-2xl'>
        <CardHeader className='text-center py-6'>
          <h1 className='text-2xl font-bold text-primary'>
            {t("contact.contact_us")}
          </h1>
        </CardHeader>
        <Separator />
        <CardContent className='p-6'>
          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <ControlledInput
                label={t("contact.email")}
                name={"email"}
                placeholder={t("contact.enter_email")}
                control={methods.control}
                required
              />
              <ControlledSelect
                control={methods.control}
                name='subject'
                placeholder={t("contact.subject")}
                label={t("contact.subject")}
                options={getSubject()}
                className='mb-4'
                required
              />
              {methods.watch("subject") !== "-1" &&
                !!methods.watch("subject") && (
                  <ControlledSelect
                    control={methods.control}
                    label={t("contact.question")}
                    name='question'
                    placeholder={t("contact.question")}
                    options={getQuestion(methods.watch("subject"))}
                    className='mb-4'
                    required
                  />
                )}
              <ControlledTextarea
                control={methods.control}
                name='description'
                label={t("contact.description")}
                placeholder={t("contact.describe_issue")}
                className='mb-4'
                required
              />
              <div className='flex justify-center my-5'>
                <Captcha
                  onChange={(token) => methods.setValue("token", token ?? "")}
                />
              </div>
              <Button variant={"default"} type='submit' className='w-full'>
                {t("generals.submit")}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='text-center text-sm text-gray-500 py-4 border-t border-gray-200'>
          {t("contact.we_will_respond")}
        </CardFooter>
      </Card>
    </div>
  );
}
const SkeletonContact = () => {
  return (
    <div className='flex items-center justify-center min-h-screen p-6 '>
      <Card className='lg:max-w-md max-w-sm w-full p-4'>
        <CardHeader className='lg:max-w-md max-w-sm w-full items-center '>
          <Skeleton className='h-7 w-1/2'></Skeleton>
        </CardHeader>
        <Separator />

        <CardContent className='space-y-3'>
          {[...Array(2)].map((_, i) => (
            <div key={i} className='mb-4'>
              <Skeleton className='h-3 w-48 mb-2' />
              <Skeleton className='h-8 w-full ' />
            </div>
          ))}
          <div className='mb-6'>
            <Skeleton className='h-3 w-48 mb-2' />
            <Skeleton className='h-15 w-full ' />
          </div>
          <div className=' flex justify-center'>
            <Skeleton className='h-16  w-4/5 my-5 ' />
          </div>

          <Skeleton className='h-9  w-full mt-9 ' />
        </CardContent>
        <Skeleton className='h-3 w-2/3 ' />
      </Card>
    </div>
  );
};
