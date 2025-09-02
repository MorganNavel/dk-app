"use client";
import Image from "next/image";
import logo from "@public/assets/img/logo.png";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Star,
  HeartHandshake,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Cta } from "@/components/ui/cta";

export default function AboutUs() {
  const t = useTranslations("about-us");
  return (
    <div className='flex flex-col gap-48 mt-64'>
      <section className='flex flex-col-reverse lg:flex-row items-center justify-between gap-12 px-4 max-w-7xl mx-auto snap-start snap-always'>
        <div className='w-full md:w-1/2 space-y-8 text-center md:text-left'>
          <div className='text-3xl sm:text-3xl lg:text-5xl font-extrabold text-primary'>
            {t("title")}
          </div>
          <div className='text-base sm:text-lg leading-relaxed'>
            {t("subtitle")}
          </div>
          <div className='space-y-3'>
            <div className='text-xl sm:text-2xl font-semibold'>
              {t("who.title")}
            </div>
            <div className='text-gray-600 text-justify sm:text-center md:text-left leading-relaxed'>
              {t("who.description")}
            </div>
          </div>
        </div>

        <div className='w-full md:w-1/2 flex justify-center'>
          <Image
            src={logo}
            alt='Logo'
            width={775}
            height={518}
            className='w-64 h-auto md:w-72 lg:w-1/2 object-contain mx-auto md:mx-0'
          />
        </div>
      </section>

      <section className='w-full px-6 flex items-center'>
        <div className='max-w-5xl mx-auto text-center space-y-8'>
          <Title>{t("why.title")}</Title>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
            {[
              {
                icon: <BadgeCheck className='text-green-500 w-8 h-8 mx-auto' />,
                title: "why.efficient.title",
                desc: "why.efficient.description",
              },
              {
                icon: <Star className='text-yellow-500 w-8 h-8 mx-auto' />,
                title: "why.flexible.title",
                desc: "why.flexible.description",
              },
              {
                icon: (
                  <HeartHandshake className='text-blue-500 w-8 h-8 mx-auto' />
                ),
                title: "why.personalized.title",
                desc: "why.personalized.description",
              },
              {
                icon: <Sparkles className='text-purple-500 w-8 h-8 mx-auto' />,
                title: "why.experience.title",
                desc: "why.experience.description",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className='p-6 text-center shadow-lg hover:shadow-xl border hover:border-primary transition-all duration-300'
              >
                {item.icon}
                <CardHeader>
                  <CardTitle className='text-xl font-semibold'>
                    {t(item.title)}
                  </CardTitle>
                </CardHeader>
                <CardDescription className='text-gray-600 text-md'>
                  {t(item.desc)}
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className='flex flex-col items-center justify-center gap-16'>
        <section className='py-20 px-6 max-w-4xl sm:mx-auto'>
          <div className='text-center space-y-6'>
            <Title>{t("proposed.title")}</Title>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-left'>
              {[
                "proposed.interactive",
                "proposed.ressources",
                "proposed.personalized",
                "proposed.flexible",
              ].map((item, idx) => (
                <div key={idx} className='flex items-center gap-3'>
                  <CheckCircle className='text-green-500' size={20} />
                  <span className='text-gray-700'>{t(item)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Cta
          title={t("cta.title")}
          description={t("cta.description")}
          buttonText={t("cta.buttonText")}
          href={"/auth/sign-in"}
          className='mx-5'
        />
      </section>
    </div>
  );
}

function Title({ children }: Readonly<{ children: React.ReactNode }>) {
  return <h2 className='text-3xl font-semibold'>{children}</h2>;
}
