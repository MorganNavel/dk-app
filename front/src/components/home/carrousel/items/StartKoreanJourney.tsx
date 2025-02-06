import { useTranslations } from "next-intl";
import { ItemLayout } from "./ItemLayout";
import rocket from "@public/assets/img/rocket.png";
import { BadgeCheck, Leaf, Star } from "lucide-react";
interface NewHereProps {
  onClick: () => void;
}

export const StartKoreanJourneyComponent = ({ onClick }: NewHereProps) => {
  const t = useTranslations("home.intro.slider.startKoreanJourney");
  return (
    <ItemLayout
      title={t("title")}
      description={t("description")}
      buttonText={t("buttonText")}
      image={rocket}
      imageAlt={"rocket"}
      onClick={onClick}
      width={448}
      height={448}
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
