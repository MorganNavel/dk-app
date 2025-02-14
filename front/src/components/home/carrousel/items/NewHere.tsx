import questionMark from "@public/assets/img/question-mark.png";
import { ItemLayout } from "./ItemLayout";
import { useTranslations } from "next-intl";
import { BadgeCheck, Leaf, Star } from "lucide-react";

export const NewHereComponent = () => {
  const t = useTranslations("home.intro.slider.newHere");

  return (
    <ItemLayout
      title={t("title")}
      description={t("description")}
      buttonText={t("buttonText")}
      image={questionMark}
      imageAlt={"question-mark"}
      width={320}
      height={320}
      onClick={() => console.log("new here")}
      tags={
        <>
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <Leaf className="w-5 h-5" /> 100% Naturel
          </div>
          <div className="flex items-center gap-2 text-yellow-500 font-medium">
            <Star className="w-5 h-5" /> Édition Limitée
          </div>
          <div className="flex items-center gap-2 text-blue-500 font-medium">
            <BadgeCheck className="w-5 h-5" /> Certifié Qualité
          </div>
        </>
      }
    />
  );
};
