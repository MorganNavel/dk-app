import graph from "@public/assets/img/graph.png";
import { CustomButtonPrimary } from "@/components/reusable/Button/CustomRoundButton";
import { ItemLayout } from "./ItemLayout";
interface ReadReviewsProps {
  onClick: () => void;
}
const title = "Join Hundreds of Successful Learners";
const description =
  "We've helped hundreds of learners achieve their Korean language goals. You can be the next one!";
const buttonText = "Read Reviews";
const imageSizeDesktop = "150";
const imageSizeMobile = "150";
export const ReadReviewsComponent = ({ onClick }: ReadReviewsProps) => {
  return (
    <>
      <ItemLayout
        title={title}
        description={description}
        buttonText={buttonText}
        image={graph.src}
        imageSizeDesktop={imageSizeDesktop}
        imageSizeMobile={imageSizeMobile}
        imageAlt={"graph"}
        onClick={onClick}
      />
    </>
  );
};
