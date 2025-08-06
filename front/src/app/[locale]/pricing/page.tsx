"use client";
import React from "react";
import { PricingCard, SingleCourseCard } from "./pricing";
import { Separator } from "@radix-ui/react-separator";
import { useTranslations } from "next-intl";
import { useSidebar } from "@/components/ui/sidebar";

type PlanCard = {
  title: string;
  description: string;
  price: number;
  features: string[];
  btnText: string;
  isMostUsed?: boolean;
};

export default function PricingPage() {
  const t = useTranslations("pricing");

  const plans: PlanCard[] = [
    {
      title: t("plans.discover.title"),
      description: t("plans.discover.description"),
      price: 96,
      features: [t("lessons", { count: 4 }), t("resources")],
      btnText: t("plans.discover.btnText"),
      isMostUsed: true,
    },
    {
      title: t("plans.advanced.title"),
      description: t("plans.advanced.description"),
      price: 184,
      features: [t("lessons", { count: 8 }), t("resources")],
      btnText: t("plans.advanced.btnText"),
    },
    {
      title: t("plans.expert.title"),
      description: t("plans.expert.description"),
      price: 252,
      features: [t("lessons", { count: 12 }), t("resources")],
      btnText: t("plans.expert.btnText"),
    },
  ];

  return (
    <section className='flex flex-col items-center min-h-screen pt-20 sm:pt-16 lg:pt-32 px-6'>
      <header className='flex flex-col items-center w-full lg:max-w-4xl text-center'>
        <h2 className='lg:text-3xl text-2xl font-extrabold font-mono tracking-widest text-muted-foreground'>
          {t("title")}
        </h2>
        <Separator className='w-1/2 my-4 border-1' />
        <h1 className='lg:text-5xl text-4xl font-bold mb-4 text-primary font-roboto'>
          {t("subtitle")}
        </h1>
        <p className='text-md mb-6 text-muted-foreground'>{t("description")}</p>
      </header>

      <div className='flex flex-col items-center justify-center md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl'>
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
        <SingleCourseCard
          title={t("plans.free.title")}
          description={t("plans.free.description")}
          price={25}
          btnText={t("plans.free.btnText")}
        />
      </div>
    </section>
  );
}
