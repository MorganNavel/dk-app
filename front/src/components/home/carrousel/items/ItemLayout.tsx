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
    <div className='flex items-center justify-center min-h-screen px-4'>
      <div className='flex flex-col lg:flex-row items-center gap-12'>
        <div className='flex-1' />

        <div className='flex flex-col items-center text-primary max-w-2xl mx-auto text-center'>
          <h2 className='font-bold text-6xl lg:text-3xl drop-shadow-md'>
            {title}
          </h2>
          <p className='text-green-950 max-w-xl mx-auto my-8 text-4xl lg:text-xl'>
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
          <Image src={image} alt={imageAlt} className='w-full h-auto' />
        </div>
        <div className='flex-1'>
          <Button
            onClick={onClick}
            variant='round-outline'
            className='lg:hidden text-4xl px-12 py-9 font-semibold'
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};
