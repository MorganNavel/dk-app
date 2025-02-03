import { useTranslations } from "next-intl";
import { ItemLayout } from "./ItemLayout";
import rocket from "@public/assets/img/rocket.png";
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
    />
  );
};
