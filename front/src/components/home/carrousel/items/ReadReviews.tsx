import graph from "@public/assets/img/graph.png";
import { ItemLayout } from "./ItemLayout";
import { useTranslations } from "next-intl";
import { BadgeCheck, Leaf, Star, Sparkles } from "lucide-react";

export const ReadReviewsComponent = () => {
  const t = useTranslations();
  const scrollToReviews = () => {
    const element = document.getElementById("reviews-caroussel");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <ItemLayout
      title={t("home.intro.slider.readRewiews.title")}
      description={t("home.intro.slider.readRewiews.description")}
      buttonText={t("generals.readReviews")}
      image={graph}
      imageAlt={"graph"}
      width={346}
      height={346}
      onClick={scrollToReviews}
      tags={
        <>
          <div className='flex items-center gap-2 text-purple-500 font-medium'>
            <Sparkles className='w-5 h-5' />{" "}
            {t("home.intro.slider.readRewiews.tags.expertise")}
          </div>

          <div className='flex items-center gap-2 text-blue-500 font-medium'>
            <BadgeCheck className='w-5 h-5' />{" "}
            {t("home.intro.slider.readRewiews.tags.quality")}
          </div>
        </>
      }
    />
  );
};
