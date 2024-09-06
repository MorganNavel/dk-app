"use client";
import onlineClassImg from "@public/assets/img/online-class.png";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@ui/button";

interface OnlineClassesComponentProps {
  onClick: () => void;
}

export const OnlineClassesComponent = () => {
  const t = useTranslations();
  return (
    <div className="text-green-950 h-screen flex flex-col lg:flex-row items-center">
      <div className="hidden lg:flex h-screen w-1/2 justify-center items-center bg-primary">
        <div
          className="bg-white p-3 flex justify-center items-center rounded-lg"
          style={{ width: "30vw", height: "32vw" }}
        >
          <Image
            src={onlineClassImg}
            alt="Elearning icons"
            title="elearning icons"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col items-center lg:items-start mx-[5vw] mt-[13vh] lg:mt-0">
        <h1
          className="text-xl lg:text-2xl font-semibold font-Poppins max-w-md lg:max-w-lg text-center lg:text-left"
          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
        >
          {t("home.onlineClasses.title")}
        </h1>
        <p className="lg:max-w-md max-w-md mt-6 lg:text-lg text-md text-justify lg:text-left">
          {t("home.onlineClasses.p1")}
        </p>
        <p className="lg:max-w-md max-w-md mt-4 lg:mt-6 lg:text-lg text-md text-justify">
          {t("home.onlineClasses.p2")}
        </p>

        <Button
          onClick={() => console.log("learn more")}
          variant={"round-outline"}
          className="mt-6 px-7 py-6 text-lg mb-6"

        >
          {t("generals.learnMore")}
        </Button>
      </div>
      <div className="lg:hidden h-screen w-full flex justify-center items-center bg-primary">
        <div
          className="bg-white flex justify-center items-center rounded-lg p-3"
          style={{ width: "40vw", height: "42vw" }}
        >
          <Image
            src={onlineClassImg}
            alt="Elearning icons"
            title="elearning icons"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};
