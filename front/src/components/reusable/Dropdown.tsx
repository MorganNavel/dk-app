import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CustomDropdownProps {
  children: any;
  title: string;
  className?: string;
}

export function CustomDropdown({
  children,
  title,
  className,
}: Readonly<CustomDropdownProps>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger className={className}>
        <div className='flex items-center gap-2'>
          <span>{title}</span>
          <IoIosArrowDown className={`transition ${!isOpen && "rotate-180"}`} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}
