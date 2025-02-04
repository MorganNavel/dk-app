"use client";
import eLearningImg from "@public/assets/img/e-learning.png";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@ui/button";

export const ELearningComponent = () => {
  const t = useTranslations();

  return (
    <div className='  flex flex-col  lg:grid lg:h-screen text-green-950  grid-flow-row  grid-cols-1 lg:grid-flow-col lg:grid-cols-2 gap-12 items-center'>
      <Image
        src={eLearningImg}
        alt='Elearning icons'
        title='elearning icons'
        className=' lg:col-span-1 w-4/5 lg:w-full px-12'
      />
      <div className='flex flex-col items-center lg:block lg:col-span-2 '>
        <h1 className='text-xl lg:text-2xl font-semibold font-Poppins text-center lg:text-left max-w-3xl'>
          {t("home.eLearning.title")}
        </h1>
        <p className='text-lg text-justify mt-6 max-w-lg lg:max-w-2xl'>
          {t("home.eLearning.p2")}
        </p>
        <p className='text-lg text-justify mt-6 max-w-lg lg:max-w-2xl'>
          {t("home.eLearning.p2")}
        </p>
        <Button
          variant={"round-outline"}
          onClick={() => console.log("learn more")}
          className=' mt-8  font-semibold  lg:w-auto px-7 py-6 text-xl'
        >
          {t("generals.learnMore")}
        </Button>
      </div>
    </div>
  );
};
