import Link from "next/link";
import { ReactNode } from "react";

interface IconProps {
  name?: string;
  icon: ReactNode;
  href?: string;
}
export const Icon = ({ name, icon, href }: IconProps) => {
  return (
    <div className='flex flex-col items-center space-y-1 hover:scale-105 transform transition-transform duration-250 '>
      {icon}
      {name && (
        <Link className='text-sm' href={href || ""}>
          {name}
        </Link>
      )}
    </div>
  );
};
