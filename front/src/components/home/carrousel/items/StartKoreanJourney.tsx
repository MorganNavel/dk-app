import { useTranslations } from "next-intl";
import { ItemLayout } from "./ItemLayout";
import rocket from "@public/assets/img/rocket.png";
import { BadgeCheck, Star, Sparkles, Headset } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { IoAccessibilityOutline } from "react-icons/io5";

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
        <div className='flex items-center gap-2 text-emerald-500 font-medium'>
          <IoAccessibilityOutline className='w-5 h-5' /> {t("tags.accessible")}
        </div>
      }
    />
  );
};
