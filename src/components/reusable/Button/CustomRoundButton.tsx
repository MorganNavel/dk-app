interface GreenButtonProps {
  onClick?: () => void;
  text: string;
  type?: "submit" | "button" | "reset";
  className?: string;
}

export const CustomButtonPrimary = ({
  onClick,
  text,
  type = "button",
  className,
}: GreenButtonProps) => {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={`bg-primary transition-all duration-300 hover:bg-white border-2 border-primary hover:text-primary text-white rounded-full ${className}`}
      >
        {text}
      </button>
    </>
  );
};
