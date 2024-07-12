"use client";
import Header from "@/components/header/Header"
import { Caroussel } from "@/components/home/carrousel/FirstCaroussel";
import { ELearningComponent } from "@/components/home/ELearningComponent";
import { OnlineClassesComponent } from "@/components/home/OnlineClassesComponent";
import { Comment } from "@/components/reusable/Comment"
import { renderStars } from "./utils/renderStars";
import { useTranslations } from "next-intl";




export default function Home() {
  const t = useTranslations()
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col h-screen justify-between">
          <Header />
          <Caroussel />
        </div>
        <ELearningComponent
          onClick={() => {
            console.log("learn more");
          }}
        />
        <OnlineClassesComponent onClick={() => console.log("learn more")} />
          <div className="h-screen">
            <div className=" hidden lg:flex w-full fex flex-col justify-between">
              <h1 className="text-4xl font-bold text-center text-primary drop-shadow mt-13"> {t("home.reviews.title")}</h1>
              <div className="flex justify-center mt-8">
                <h2 className="text-2xl font-bold text-center text-primary drop-shadow flex items-center text-primary">
                  <p className="mr-5">{t("generals.average")} : </p>
                  <span className="flex text-yellow-500">{renderStars(5)}</span>
                </h2>
              </div>
              
              <div className="flex justify-center mt-13">
                <div className="bg-primary w-[5px]"></div>
                <Comment fullname={t("home.reviews.comments.1.fullname")} comment={t("home.reviews.comments.1.comment")} rating={5} />
                <div className="bg-primary w-[5px] "></div>
                <Comment fullname={t("home.reviews.comments.2.fullname")} comment={t("home.reviews.comments.2.comment")} rating={5} />
                <div className="bg-primary w-[5px] "></div>
                <Comment fullname={t("home.reviews.comments.3.fullname")} comment={t("home.reviews.comments.3.comment")} rating={5} />
                <div className="bg-primary w-[5px]"></div>
              </div>
            </div>
        </div>
    </div>  
  </>
);
}
