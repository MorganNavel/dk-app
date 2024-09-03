"use client";
import { CustomButtonPrimary } from "@/components/reusable/Button/CustomRoundButton";
import eLearningImg from "@public/assets/img/e-learning.png";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const ELearningComponent = () => {
  const t = useTranslations();
  return (
    <>
      <div className="h-screen flex flex-col lg:flex-row items-center lg:items-center">
        <Image
          src={eLearningImg}
          alt="Elearning icons"
          title="elearning icons"
          className="lg:hidden mt-6 mr-2 h-[175px] w-[300px]"
        />
        <div className="flex flex-col items-center lg:items-start mx-[5vw] mt-[13vh] lg:mx-[15vw]">
          <h1
            className="text-xl lg:text-2xl font-semibold font-Poppins max-w-sm lg: max-w-lg  text-center lg:text-left"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
          >
            {t("home.eLearning.title")}
          </h1>
          <p className="lg:max-w-md max-w-md mt-6 lg:text-lg text-md text-justify lg:text-left">
            {t("home.eLearning.p1")}
          </p>
          <p className="lg:max-w-md max-w-md mt-6 lg:text-lg text-md text-justify">
            {t("home.eLearning.p2")}
          </p>
          <CustomButtonPrimary
            text={t("generals.learnMore")}
            onClick={() => {
              console.log("learn more");
            }}
            className="py-3 px-12 text-xl mb-6 mt-12"
          />
        </div>
        <Image
          src={eLearningImg}
          alt="Elearning icons"
          title="elearning icons"
          className="hidden lg:block h-[291px] w-[500px]"
        />
      </div>
    </>
  );
};
