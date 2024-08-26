import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface DropdownProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const DropdownSidebar = ({ title, children, icon }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col  w-full">
      <div className="flex items-center w-full">
        {icon}

        <span
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full py-2 px-3"
        >
          <span className="font-semibold">{title}</span>
          <IoIosArrowDown
            className={`${
              isOpen ? "rotate-180" : ""
            } transition-transform text-textColor`}
          />
        </span>
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-300 ease-in-out bg-primary w-full ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
