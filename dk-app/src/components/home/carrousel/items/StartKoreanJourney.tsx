import { ItemLayout } from "./ItemLayout";
import rocket from "@public/assets/img/rocket.png";
interface NewHereProps {
  onClick: () => void;
}

const title = "Start Your Korean Journey!";
const description =
  "Unlock your potential and dive into the world of Korean language and culture. Join us today and take the first step towards mastering Korean!";
const buttonText = "Join Now";
const image = rocket.src;
const imageSizeMobile = "180";
const imageSizeDesktop = "210";
export const StartKoreanJourneyComponent = ({ onClick }: NewHereProps) => {
  return (
    <>
      <ItemLayout
        title={title}
        description={description}
        buttonText={buttonText}
        image={image}
        imageSizeDesktop={imageSizeDesktop}
        imageSizeMobile={imageSizeMobile}
        imageAlt={"rocket"}
        onClick={onClick}
      />
    </>
  );
};
