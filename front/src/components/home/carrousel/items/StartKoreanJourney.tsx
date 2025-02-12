import { useTranslations } from "next-intl";
import { ItemLayout } from "./ItemLayout";
import rocket from "@public/assets/img/rocket.png";
import { BadgeCheck, Leaf, Star } from "lucide-react";
import { useRouter } from "@/i18n/routing";

export const StartKoreanJourneyComponent = () => {
  const t = useTranslations("home.intro.slider.startKoreanJourney");
  const router = useRouter();
  return (
    <ItemLayout
      title={t("title")}
      description={t("description")}
      buttonText={t("buttonText")}
      image={rocket}
      imageAlt={"rocket"}
      width={448}
      height={448}
      onClick={() => router.push("/sign-up")}
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
