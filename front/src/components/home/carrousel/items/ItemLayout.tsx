import { Button } from "@ui/button";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface ItemLayoutProps {
  title: string;
  description: string;
  buttonText: string;
  image: StaticImport;
  width: number;
  height: number;
  imageAlt: string;
  tags?: ReactNode;
  onClick: () => void;
}

export const ItemLayout = ({
  title,
  description,
  buttonText,
  image,
  width,
  height,
  imageAlt,
  tags,
  onClick,
}: ItemLayoutProps) => {
  return (
    <Card className='mx-8 relative flex flex-col lg:flex-row items-center p-5 sm:p-8 lg:p-12 gap-6 sm:gap-8 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out'>
      <div className='flex-1 text-center lg:text-left'>
        <h2 className='text-primary font-bold text-lg sm:text-2xl lg:text-3xl mb-3 sm:mb-4 drop-shadow-md'>
          {title}
        </h2>
        <p className='text-justify text-sm sm:text-base lg:text-lg max-w-md mx-auto lg:mx-0'>
          {description}
        </p>

        {tags && (
          <div className='flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-4 mt-3 sm:mt-4'>
            {tags}
          </div>
        )}

        <div className='hidden lg:block mt-6'>
          <Button
            onClick={onClick}
            variant='round-outline'
            className='text-base px-6 py-3 font-semibold flex items-center gap-2 transition-all hover:bg-primary hover:text-white'
          >
            {buttonText}
            <svg
              className='w-5 h-5 transition-transform transform hover:translate-x-1'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5l7 7-7 7'
              />
            </svg>
          </Button>
        </div>
      </div>

      <motion.div
        className='relative flex-1 flex justify-center'
        whileHover={{ rotate: 3, scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={image}
          alt={imageAlt}
          width={width}
          height={height}
          className='rounded-lg shadow-md w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px]'
          style={{ objectFit: "cover" }}
        />
      </motion.div>

      <div className='lg:hidden mt-4'>
        <Button
          onClick={onClick}
          variant='round-outline'
          className='text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 font-semibold flex items-center gap-2 transition-all'
        >
          {buttonText}
          <svg
            className='w-5 h-5 transition-transform transform hover:translate-x-1'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 5l7 7-7 7'
            />
          </svg>
        </Button>
      </div>
    </Card>
  );
};
