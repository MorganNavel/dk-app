import React from "react";
import { PricingCard } from "./pricing";
import { Separator } from "@radix-ui/react-separator";
import { useTranslations } from "next-intl";
import { StudentsReviews } from "@/components/home/StudentsReviews";

export default function PricingPage() {
  const t = useTranslations("pricing");
  const cards = [
    {
      title: t("plans.discover.title"),
      description: t("plans.discover.description"),
      price: 50,
      features: [
        t("lessons", { count: 4 }),
        t("resources"),
        // t("expireY", { count: 1 }),
      ],
      btnText: t("plans.discover.btnText"),
    },
    {
      title: t("plans.advanced.title"),
      description: t("plans.advanced.description"),
      price: 100,
      features: [
        t("lessons", { count: 8 }),
        t("resources"),
        // t("expireY", { count: 1 }),
      ],
      btnText: t("plans.advanced.btnText"),
    },
    {
      title: t("plans.expert.title"),
      description: t("plans.expert.description"),
      price: 150,
      features: [
        t("lessons", { count: 12 }),
        t("resources"),
        // t("expireY", { count: 1 }),
      ],
      btnText: t("plans.advanced.btnText"),
    },
  ];

  return (
    <div>
      <div className='flex flex-col justify-center items-center min-h-screen sm:mt-16 mt-20 lg:mt-0'>
        <div className='flex flex-col items-center justify-center w-full lg:max-w-4xl p-6 '>
          <p className='lg:text-3xl text-2xl font-extrabold font-mono tracking-widest text-muted-foreground '>
            {t("title")}
          </p>
          <Separator className='w-1/2 my-4 border-1' />
          <p className='lg:text-5xl text-4xl font-bold text-center mb-4 text-primary font-Roboto'>
            {t("subtitle")}
          </p>
          <p className='text-md text-center mb-4 text-muted-foreground'>
            {t("description")}
          </p>
        </div>
        <div className='sm:grid flex flex-col items-center sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl p-6'>
          {cards.map((card, index) => (
            <PricingCard
              key={index}
              title={card.title}
              description={card.description}
              price={card.price}
              features={card.features}
              btnText={card.btnText}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
