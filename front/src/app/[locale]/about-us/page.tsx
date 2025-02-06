"use client";
import Image from "next/image";
import logo from "@public/assets/img/logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Star,
  HeartHandshake,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { SlidesIn } from "@/components/animations/SlidesIn";
import { useTranslations } from "next-intl";

export default function AboutUs() {
  const t = useTranslations("about-us");
  return (
    <div className='max-w-5xl mx-auto px-6 py-12 space-y-16 overflow-hidden'>
      <SlidesIn side='right' duration={0.6} once>
        <div className='flex-1 text-center md:text-left'>
          <h1 className='text-5xl font-extrabold text-primary'>{t("title")}</h1>
          <p className='mt-4 text-lg text-gray-700 max-w-xl'>{t("subtitle")}</p>
        </div>
        <Card className='lg:flex-1 shadow-lg rounded-lg overflow-hidden hidden '>
          <CardContent>
            <Image
              src={logo}
              alt='Cours de coréen en ligne'
              width={775}
              height={518}
            />
          </CardContent>
        </Card>
      </SlidesIn>

      <SlidesIn side='left' duration={0.6} once>
        <Title>{t("who.title")}</Title>
        <p className='mt-4 text-gray-700'>{t("who.description")}</p>
      </SlidesIn>

      <SlidesIn side='left' duration={0.6} once>
        <Title>{t("why.title")}</Title>
      </SlidesIn>
      <div className='mt-6 grid grid-cols-1 text-center xl:grid-cols-3 gap-6'>
        <SlidesIn side='right' duration={0.6}>
          <Card className='p-6 shadow-md hover:shadow-xl transition-transform transform duration-500 hover:scale-105 border border-transparent hover:border-primary h-full'>
            <BadgeCheck className='text-green-500 w-10 h-10 mx-auto mb-3' />
            <CardContent>
              <h3 className='text-xl font-semibold text-center'>
                {t("why.efficient.title")}
              </h3>
              <p className='mt-2 text-gray-600'>
                {t("why.efficient.description")}
              </p>
            </CardContent>
          </Card>
        </SlidesIn>

        <SlidesIn side='right' duration={0.6}>
          <Card className='h-full p-6 shadow-md hover:shadow-xl transition-transform transform duration-500 hover:scale-105 border border-transparent hover:border-primary'>
            <Star className='text-yellow-500 w-10 h-10 mx-auto mb-3' />
            <CardContent>
              <h3 className='text-xl font-semibold text-center'>
                {t("why.flexible.title")}
              </h3>
              <p className='mt-2 text-gray-600'>
                {t("why.flexible.description")}
              </p>
            </CardContent>
          </Card>
        </SlidesIn>

        <SlidesIn side='right' duration={0.6}>
          <Card className='h-full p-6 shadow-md hover:shadow-xl transition-transform transform duration-500 hover:scale-105 border border-transparent hover:border-primary'>
            <HeartHandshake className='text-blue-500 w-10 h-10 mx-auto mb-3 ' />
            <CardContent>
              <h3 className='text-xl font-semibold text-center'>
                {t("why.personalized.title")}
              </h3>
              <p className='mt-2 text-gray-600'>
                {t("why.personalized.description")}
              </p>
            </CardContent>
          </Card>
        </SlidesIn>

        <SlidesIn side='right' duration={0.6}>
          <Card className='h-full p-6 shadow-md hover:shadow-xl transition-transform transform duration-500 hover:scale-105 border border-transparent hover:border-primary'>
            <Sparkles className='text-purple-500 w-10 h-10 mx-auto mb-3' />
            <CardContent>
              <h3 className='text-xl font-semibold text-center'>
                {t("why.experience.title")}
              </h3>
              <p className='mt-2 text-gray-600'>
                {t("why.experience.description")}
              </p>
            </CardContent>
          </Card>
        </SlidesIn>
      </div>

      <section className='text-center md:text-left'>
        <SlidesIn side='left' duration={0.6} once>
          <Title> {t("proposed.title")}</Title>
        </SlidesIn>
        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center'>
          <SlidesIn side='right' duration={0.6}>
            <div className='flex items-center gap-2'>
              <CheckCircle className='text-green-500 flex-shrink-0' />
              {t("proposed.interactive")}
            </div>
          </SlidesIn>

          <SlidesIn side='right' duration={0.6}>
            <div className='flex items-center gap-2'>
              <CheckCircle className='text-green-500 flex-shrink-0' />
              {t("proposed.ressources")}
            </div>
          </SlidesIn>

          <SlidesIn side='right' duration={0.6}>
            <div className='flex items-center gap-2'>
              <CheckCircle className='text-green-500 flex-shrink-0' />
              {t("proposed.personalized")}
            </div>
          </SlidesIn>

          <SlidesIn side='right' duration={0.6}>
            <div className='flex items-center gap-2'>
              <CheckCircle className='text-green-500 flex-shrink-0' />
              {t("proposed.flexible")}
            </div>
          </SlidesIn>
        </div>
      </section>

      <section className='text-center delay-700'>
        <Card className='w-full mx-auto hover:scale-105 transition-transform duration-300 shadow-lg'>
          <CardHeader>
            <h3 className='text-3xl font-bold text-primary'>
              {t("cta.title")}
            </h3>
          </CardHeader>
          <CardContent>
            <CardDescription className='text-gray-700 '>
              {t("cta.description")}
            </CardDescription>
            <Button variant='round-outline' className='mt-5 text-md'>
              <p>{t("cta.buttonText")}</p>
              <svg
                className='w-5 h-5 transition-transform transform hover:translate-x-1'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 5l7 7-7 7'
                ></path>
              </svg>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return <h2 className='text-3xl font-semibold'>{children}</h2>;
}
