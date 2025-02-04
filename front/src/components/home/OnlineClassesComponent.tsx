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
    <div className='text-green-950 flex flex-col lg:grid lg:grid-flow-col lg:grid-cols-2 items-center'>
      <Card className="bg-primary rounded-xl">
        <CardContent className="bg-primary rounded-xl">

        <Image
            src={onlineClassImg}
            alt='Elearning icons'
            title='elearning icons'
          />
        </CardContent>
      </Card>


      <div className='flex flex-col items-center lg:items-start mx-[5vw] mt-[13vh] lg:mt-0'>
        <h1
          className='text-xl lg:text-2xl font-semibold font-Poppins max-w-md lg:max-w-lg text-center lg:text-left'
          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
        >
          {t("home.onlineClasses.title")}
        </h1>
        <p className='lg:max-w-md max-w-md mt-6 lg:text-lg text-md text-justify lg:text-left'>
          {t("home.onlineClasses.p1")}
        </p>
        <p className='lg:max-w-md max-w-md mt-4 lg:mt-6 lg:text-lg text-md text-justify'>
          {t("home.onlineClasses.p2")}
        </p>

        <Button
          onClick={() => console.log("learn more")}
          variant={"round-outline"}
          className='mt-6  text-md px-6 py-5 lg:px-7 lg:py-6 lg:text-lg font-semibold'
        >
          {t("generals.learnMore")}
        </Button>
      </div>
    </div>
  );
};
