import { renderStars } from "@/app/[locale]/utils/renderStars";
import { useTranslations } from "next-intl";
import { Comment } from "@/components/reusable/Comment";
import { Caroussel } from "./carrousel/Caroussel";

export const StudentsReviews = () => {
  const t = useTranslations();
  const config = {
    c1: {
      className: "",
      component: (
        <Comment
          fullname={t("home.reviews.comments.1.fullname")}
          comment={t("home.reviews.comments.1.comment")}
          rating={5}
        />
      ),
    },
    c2: {
      className: "",
      component: (
        <Comment
          fullname={t("home.reviews.comments.2.fullname")}
          comment={t("home.reviews.comments.2.comment")}
          rating={5}
        />
      ),
    },
    c3: {
      className: "",
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
    <div className="h-screen">
      <div className=" hidden lg:flex w-full fex flex-col justify-between">
        <h1 className="text-4xl font-bold text-center text-primary drop-shadow mt-13">
          {t("home.reviews.title")}
        </h1>
        <div className="flex justify-center mt-8">
          <h2 className="text-2xl font-bold text-center text-primary drop-shadow flex items-center text-primary">
            <p className="mr-5">{t("generals.average")} : </p>
            <span className="flex text-yellow-500">{renderStars(5)}</span>
          </h2>
        </div>

        <div className="flex justify-center transform translate-y-1/">
          <div className="bg-primary w-[5px]"></div>
          <Comment
            fullname={t("home.reviews.comments.1.fullname")}
            comment={t("home.reviews.comments.1.comment")}
            rating={5}
          />
          <div className="bg-primary w-[5px] "></div>
          <Comment
            fullname={t("home.reviews.comments.2.fullname")}
            comment={t("home.reviews.comments.2.comment")}
            rating={5}
          />
          <div className="bg-primary w-[5px] "></div>
          <Comment
            fullname={t("home.reviews.comments.3.fullname")}
            comment={t("home.reviews.comments.3.comment")}
            rating={5}
          />
          <div className="bg-primary w-[5px]"></div>
        </div>
      </div>
      <div className="lg:hidden">
        <Caroussel
          config={config}
          children={undefined}
          className="h-screen"
        />
      </div>
    </div>
  );
};
