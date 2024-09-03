"use client";
import { renderStars } from "@/utils/renderStars";
import { useTranslations } from "next-intl";
import { Comment } from "@/components/reusable/Comment";
import { Caroussel } from "./carrousel/Caroussel";

export const StudentsReviews = () => {
  const t = useTranslations();
  const config: {
    [key: string]: { className: string; component: JSX.Element };
  } = {
    c1: {
      className: "mb-12 mt-12",
      component: (
        <Comment
          fullname={t("home.reviews.comments.1.fullname")}
          comment={t("home.reviews.comments.1.comment")}
          rating={5}
        />
      ),
    },
    c2: {
      className: "mb-12 mt-12",
      component: (
        <Comment
          fullname={t("home.reviews.comments.2.fullname")}
          comment={t("home.reviews.comments.2.comment")}
          rating={5}
        />
      ),
    },
    c3: {
      className: "mb-12 mt-12",
      component: (
        <Comment
          fullname={t("home.reviews.comments.3.fullname")}
          comment={t("home.reviews.comments.3.comment")}
          rating={5}
        />
      ),
    },
  };
  return (
    <>
      <div className="h-screen hidden lg:flex">
        <div className="w-full fex flex-col">
          <h1 className="text-4xl font-bold text-center text-primary drop-shadow mt-13">
            {t("home.reviews.title")}
          </h1>
          <div className="flex justify-center mt-8">
            <h2 className="text-2xl font-bold text-center text-primary drop-shadow flex items-center text-primary">
              <p className="mr-5">{t("generals.average")} : </p>
              <span className="flex text-yellow-500">{renderStars(5)}</span>
            </h2>
          </div>

          <div className="flex justify-center transform translate-y-1/4">
            {Object.keys(config).map((key, index) => (
              <div key={key} className="flex">
                <span className="bg-primary w-[5px]" />
                {config[key].component}
              </div>
            ))}
            <div className="bg-primary w-[5px]" />
          </div>
        </div>
      </div>
      <Caroussel config={config} className="lg:hidden h-full " />
    </>
  );
};
