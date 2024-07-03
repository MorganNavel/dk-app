import { ReactNode } from "react";

interface GreenButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
}

export function CustomButtonPrimary({
  onClick,
  text,
  className,
}: GreenButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={`bg-primary transition-all duration-300 hover:bg-white border-2 border-primary hover:text-primary text-white rounded-full ${className}`}
      >
        {text}
      </button>
    </>
  );
}
