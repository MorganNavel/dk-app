import questionMark from "@public/assets/img/question-mark.png";
import { ItemLayout } from "./ItemLayout";
import { useTranslations } from "next-intl";
interface NewHereProps {
  onClick: () => void;
}
const imageSizeMobile = 150;

export const NewHereComponent = ({ onClick }: NewHereProps) => {
  const t = useTranslations("home.intro.slider.newHere");
  return (
    <>
      <ItemLayout
        title={t("title")}
        description={t("description")}
        buttonText={t("buttonText")}
        image={questionMark}
        imageSizeMobile={imageSizeMobile}
        imageAlt={"question-mark"}
        onClick={onClick}
      />
    </>
  );
};
