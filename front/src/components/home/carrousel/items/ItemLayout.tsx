import { Button } from "@ui/button";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
interface ItemLayoutProps {
  title: string;
  description: string;
  buttonText: string;
  image: StaticImport;
  imageSizeDesktop?: number;
  imageSizeMobile?: number;
  imageAlt: string;
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
              <p className="text-lg text-black max-w-xs text-center lg:max-w-md mx-auto lg:text-xl  lg:my-16">
                {description}
              </p>
            </div>
            <Image
              src={image}
              alt={imageAlt}
              height={imageSizeMobile}
              width={imageSizeMobile}
              className="lg:hidden mb-6 mt-6"
            />

            <Button onClick={onClick} variant={"round-outline"} className="py-5 px-8 text-lg font-semibold">
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
      {imageSizeDesktop ? (
        <Image
          src={image}
          alt="rocket"
          height={imageSizeDesktop}
          width={imageSizeDesktop}
          className="absolute hidden lg:flex transform -translate-x-1/2 -translate-y-1/2 top-1/2 right-24"
        />
      ) : null}
    </>
  );
};
