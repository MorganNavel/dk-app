"use client";
import onlineClassImg from "@public/assets/img/online-class.png";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@ui/button";
import { Card, CardContent } from "../ui/card";

interface OnlineClassesComponentProps {
  onClick: () => void;
}

export const OnlineClassesComponent = () => {
  const t = useTranslations();

  return (
    <div className='text-green-950 flex flex-col lg:flex-row items-center gap-12 lg:gap-0 mx-8 lg:mx-0 '>
      <div className='flex flex-col items-center lg:mx-auto w-full lg:block'>
        <h1 className='text-2xl  font-semibold font-Poppins max-w-md lg:max-w-lg text-center lg:text-left'>
          {t("home.onlineClasses.title")}
        </h1>
        <p className='lg:max-w-lg max-w-md mt-6 lg:text-lg text-md text-justify lg:text-left'>
          {t("home.onlineClasses.p1")}
        </p>
        <p className='lg:max-w-lg max-w-md mt-4 lg:mt-6 lg:text-lg text-md text-justify'>
          {t("home.onlineClasses.p2")}
        </p>

        <Button
          onClick={() => {}}
          variant={"round-outline"}
          className='mt-6  text-md px-6 py-5 lg:px-7 lg:py-6 lg:text-lg font-semibold'
        >
          {t("generals.learnMore")}
        </Button>
      </div>
      <Card className='bg-primary rounded-xl'>
        <CardContent className='bg-primary rounded-xl'>
          <Image
            src={onlineClassImg}
            alt='Elearning icons'
            title='elearning icons'
            width={636}
            height={636}
          />
        </CardContent>
      </Card>
    </div>
  );
};
