import { useTranslations } from "next-intl";
import { ItemLayout } from "./ItemLayout";
import rocket from "@public/assets/img/rocket.png";
interface NewHereProps {
  onClick: () => void;
}

const imageSizeMobile = 180;
const imageSizeDesktop = 210;
export const StartKoreanJourneyComponent = ({ onClick }: NewHereProps) => {
  const t = useTranslations("home.intro.slider.startKoreanJourney");
  return (
    <>
      <ItemLayout
        title={t("title")}
        description={t("description")}
        buttonText={t("buttonText")}
        image={rocket}
        imageSizeDesktop={imageSizeDesktop}
        imageSizeMobile={imageSizeMobile}
        imageAlt={"rocket"}
        onClick={onClick}
      />
    </>
  );
};
