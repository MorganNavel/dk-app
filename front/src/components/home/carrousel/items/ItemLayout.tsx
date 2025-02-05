import { Button } from "@ui/button";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck, Leaf, Star } from "lucide-react"; // Icônes modernes
import { ReactNode } from "react";

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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative flex flex-col lg:flex-row items-center bg-white shadow-xl rounded-xl p-8 lg:p-12 gap-8 hover:shadow-2xl transition-all"
    >
      <div className="flex-1 text-center lg:text-left">
        <h2 className="text-primary font-bold text-3xl lg:text-4xl mb-4 drop-shadow-md">
          {title}
        </h2>
        <p className="text-justify max-w-md mx-auto lg:mx-0 text-lg lg:text-xl">
          {description}
        </p>

        <div className="flex justify-center lg:justify-start gap-4 mt-4">
          {tags}
        </div>

        <div className="hidden lg:block mt-6">
          <Button
            onClick={onClick}
            variant="round-outline"
            className="text-lg px-7 py-4 font-semibold flex items-center gap-2 transition-all hover:bg-primary hover:text-white"
          >
            {buttonText}
            <svg
              className="w-5 h-5 transition-transform transform hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </Button>
        </div>
      </div>

      <motion.div
        className="relative flex-1 flex justify-center"
        whileHover={{ rotate: 3, scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={image}
          alt={imageAlt}
          width={width}
          height={height}
          className="rounded-lg shadow-md"
          style={{ width: "250px", height: "250px", objectFit: "cover" }}
        />
      </motion.div>

      <div className="lg:hidden mt-5">
        <Button
          onClick={onClick}
          variant="round-outline"
          className="text-lg px-8 py-4 font-semibold flex items-center gap-2 transition-all hover:bg-primary hover:text-white"
        >
          {buttonText}
          <svg
            className="w-5 h-5 transition-transform transform hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </Button>
      </div>
    </motion.div>
  );
};
