import questionMark from "@public/assets/img/question-mark.png";
import { ItemLayout } from "./ItemLayout";
interface NewHereProps {
  onClick: () => void;
}
const title = "New Here?";
const description =
  "Get personalized resources based on your interests, and needs. Visit our questionnaire to start your customized learning journey!";
const buttonText = "Start Questionnaire";
const image = questionMark.src;
const imageSizeMobile = "150";
export const NewHereComponent = ({ onClick }: NewHereProps) => {
  return (
    <>
      <ItemLayout
        title={title}
        description={description}
        buttonText={buttonText}
        image={image}
        imageSizeMobile={imageSizeMobile}
        imageAlt={"question-mark"}
        onClick={onClick}
      />
    </>
  );
};
