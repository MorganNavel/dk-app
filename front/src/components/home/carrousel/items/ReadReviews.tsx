import graph from "@public/assets/img/graph.png";
import { ItemLayout } from "./ItemLayout";
import { useTranslations } from "next-intl";
interface ReadReviewsProps {
  onClick: () => void;
}

export const ReadReviewsComponent = ({ onClick }: ReadReviewsProps) => {
  const t = useTranslations();
  return (
    <ItemLayout
      title={t("home.intro.slider.readRewiews.title")}
      description={t("home.intro.slider.readRewiews.description")}
      buttonText={t("generals.readReviews")}
      image={graph}
      imageAlt={"graph"}
      onClick={onClick}
    />
  );
};
