import graph from "@public/assets/img/graph.png";
import { CustomButtonPrimary } from "@/components/reusable/Button/CustomRoundButton";
interface ItemLayoutProps {
  title: string;
  description: string;
  buttonText: string;
  image?: string;
  imageSizeDesktop?: string;
  imageSizeMobile?: string;
  imageAlt?: string;
  onClick: () => void;
}

export const ItemLayout = ({
  title,
  description,
  buttonText,
  image,
  imageSizeDesktop,
  imageSizeMobile,
  imageAlt,
  onClick,
}: ItemLayoutProps) => {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-col items-center text-primary lg:space-y-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold drop-shadow-md my-4 lg:text-4xl  lg:my-16">
                {title}
              </h2>
              <p className="text-lg max-w-xs text-center lg:max-w-md mx-auto lg:text-xl  lg:my-16">
                {description}
              </p>
            </div>
            <img
              src={image}
              alt={imageAlt}
              height={imageSizeMobile}
              width={imageSizeMobile}
              className="lg:hidden mb-6 mt-6"
            />
            <CustomButtonPrimary
              onClick={onClick}
              text={buttonText}
              className="py-3 px-10 text-xl"
            />
          </div>
          {imageSizeDesktop ? (
            <img
              src={image}
              alt="rocket"
              height={imageSizeDesktop}
              width={imageSizeDesktop}
              className="hidden lg:flex"
            />
          ) : null}
        </div>
      </div>
    </>
  );
};
