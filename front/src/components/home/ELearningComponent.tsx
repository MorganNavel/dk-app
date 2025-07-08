"use client";
import eLearningImg from "@public/assets/img/e-learning.png";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@ui/button";

export const ELearningComponent = () => {
  const t = useTranslations();

  return (
    <div className='mx-8 lg:mx-0 flex flex-col lg:flex-row text-green-950  grid-flow-row  grid-cols-1 lg:grid-flow-col lg:grid-cols-2 gap-12 items-center'>
      <Image
        src={eLearningImg}
        alt='Elearning icons'
        title='elearning icons'
        width={1278}
        height={744}
        className=' lg:w-1/2 w-4/5 px-12'
      />
      <div className='flex flex-col items-center lg:block lg:max-w-xl '>
        <h1 className='text-2xl  font-semibold font-Poppins text-center lg:text-left max-w-md lg:max-w-full'>
          {t("home.eLearning.title")}
        </h1>
        <p className='text-md lg:text-lg text-justify mt-6 max-w-md lg:max-w-full'>
          {t("home.eLearning.p1")}
        </p>
        <p className='text-md lg:text-lg text-justify mt-6 max-w-md lg:max-w-full'>
          {t("home.eLearning.p2")}
        </p>
        <Button
          variant={"round-outline"}
          onClick={() => {}}
          className=' mt-8  font-semibold  lg:w-auto px-7 py-6 text-lg'
        >
          {t("generals.learnMore")}
        </Button>
      </div>
    </div>
  );
};
