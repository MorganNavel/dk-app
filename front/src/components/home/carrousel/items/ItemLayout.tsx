import { Button } from "@ui/button";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
interface ItemLayoutProps {
  title: string;
  description: string;
  buttonText: string;
  image: StaticImport;

  imageAlt: string;
  onClick: () => void;
}

export const ItemLayout = ({
  title,
  description,
  buttonText,
  image,

  imageAlt,
  onClick,
}: ItemLayoutProps) => {
  return (
      <div className='flex flex-col lg:flex-row items-center grap-8 lg:gap-12 h-screen'>
        <div className='flex-1' />

        <div className='flex flex-col items-center text-primary max-w-xl mx-auto text-center'>
          <h2 className='font-bold text-3xl lg:text-3xl drop-shadow-md'>
            {title}
          </h2>
          <p className='text-green-950 max-w-xs  lg:max-w-xl mx-auto my-8 text-lg lg:text-xl'>
            {description}
          </p>
          <Button
            onClick={onClick}
            variant='round-outline'
            className='hidden lg:flex  text-lg px-7 py-5 font-semibold'
          >
            {buttonText}
          </Button>
        </div>

        <div className='flex-1'>
          <Image src={image} alt={imageAlt} className='h-[100px] w-auto lg:w-[500px] lg:h-auto' />
        </div>

        <div className='flex-1 lg:hidden mt-5'>
          <Button
            onClick={onClick}
            variant='round-outline'
            className='text-lg px-8 py-5 font-semibold '
          >
            {buttonText}
          </Button>
        </div>
      </div>
  );
};
