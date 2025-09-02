"use client";
import React, { ReactNode, useState } from "react";
import { PricingCard, SingleCourseCard } from "./pricing";
import { Separator } from "@radix-ui/react-separator";
import { useTranslations } from "next-intl";
import { FaStar } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { addCredits } from "./actions";

type PlanCard = {
  title: string;
  description: string;
  price: number;
  features: string[];
  btnText: string;
  isAmphasized?: boolean;
  amphasis?: ReactNode;
  onSubscribe: () => void;
};
type DialogType = "subscribe" | "unit";

export default function PricingPage() {
  const t = useTranslations("pricing");
  const [dialog, setDialog] = useState<DialogType | null>(null);
  const plans: PlanCard[] = [
    {
      title: t("plans.discover.title"),
      description: t("plans.discover.description"),
      price: 96,
      features: [t("lessons", { count: 4 }), t("resources")],
      btnText: t("plans.discover.btnText"),
      isAmphasized: true,
      amphasis: (
        <>
          <FaStar className='text-yellow-400' />
          {t("mostPopular")}
        </>
      ),
      onSubscribe: () => {
        addCredits(4);
      },
    },
    {
      title: t("plans.advanced.title"),
      description: t("plans.advanced.description"),
      price: 184,
      features: [t("lessons", { count: 8 }), t("resources")],
      btnText: t("plans.advanced.btnText"),
      onSubscribe: () => {
        addCredits(8);
      },
    },
    {
      title: t("plans.expert.title"),
      description: t("plans.expert.description"),
      price: 252,
      features: [t("lessons", { count: 12 }), t("resources")],
      btnText: t("plans.expert.btnText"),
      onSubscribe: () => {
        addCredits(12);
      },
    },
  ];

  return (
    <section className='flex flex-col items-center min-h-screen pt-32 px-6'>
      <header className='flex flex-col items-center w-full lg:max-w-4xl text-center mb-5 '>
        <h2 className='lg:text-4xl text-3xl font-extrabold font-mono tracking-widest text-muted-foreground'>
          {t("title")}
        </h2>
        <Separator className='w-1/2 my-4 border-1' />
        <h1 className='lg:text-5xl text-4xl font-bold mb-4 text-primary font-roboto'>
          {t("subtitle")}
        </h1>
        <p className='text-md mb-6 text-muted-foreground'>{t("description")}</p>
      </header>

      <div className='flex flex-col items-center md:grid w-full md:px-15 px-2 gap-10 md:gap-6 lg:gap-10 justify-center grid-cols-[repeat(auto-fit,minmax(300px,1fr))]'>
        {/* {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))} */}
        <SingleCourseCard
          onBuy={(nbLessons, _) => {
            addCredits(nbLessons);
            setDialog("unit");
          }}
          isAmphasized
          amphasis={
            <>
              <FaStar className='text-yellow-400' />
              {t("mostPopular")}
            </>
          }
          title={t("plans.free.title")}
          description={t("plans.free.description")}
          price={25}
          btnText={t("plans.free.btnText")}
        />
        <Dialog open={!!dialog} onOpenChange={(v) => !v && setDialog(null)}>
          <DialogContent className=''>
            <DialogHeader>
              <div className='flex items-center gap-2'>
                <CheckCircle2 className='h-6 w-6 text-green-500' />
                <DialogTitle className='text-xl font-bold'>
                  {t("dialog.successTitle")}
                </DialogTitle>
              </div>
              <DialogDescription className='mt-2 text-muted-foreground'>
                {t("dialog.successDescription")}
              </DialogDescription>
            </DialogHeader>

            <div className='mt-4 border rounded-lg p-4 bg-gray-50'>
              <h3 className='font-semibold mb-3 flex items-center gap-2'>
                <FaStar className='text-yellow-400' />
                {t("dialog.whatYouGet")}
              </h3>
              <ul className='list-disc list-inside space-y-2 text-sm text-muted-foreground'>
                <li>{t("dialog.creditInfo")}</li>
                <li>{t("dialog.cancelInfo")}</li>
                <li>{t("dialog.emailInfo")}</li>
              </ul>
            </div>

            <div className='mt-4'>
              <h3 className='font-semibold mb-2'>{t("dialog.howItWorks")}</h3>
              <div className='space-y-3'>
                {[1, 2, 3, 4].map((v) => (
                  <div key={v} className='flex items-start gap-2'>
                    <div className='bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0'>
                      {v}
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {t(`dialog.howItWorksSteps.step${v}`)}
                    </p>
                  </div>
                ))}
              </div>
              <p className='mt-3 text-xs italic text-gray-500'>
                {t("dialog.note")}
              </p>
            </div>

            <div className='mt-6 flex justify-end'>
              <Button onClick={() => setDialog(null)} className='font-medium'>
                {t("dialog.closeButton")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
