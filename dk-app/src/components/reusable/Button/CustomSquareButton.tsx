interface CustomSquareButtonProps {
  href: string;
  text: string;
}
export const CustomSquareButton = ({ href, text }: CustomSquareButtonProps) => {
  return (
    <button className="border-2 border-textColor rounded-md px-9 py-3 hover:scale-105 hover:drop-shadow-md transition-transform duration-300 ease-in-out">
      <a href={href}>{text}</a>
    </button>
  );
};
