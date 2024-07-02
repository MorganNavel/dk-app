import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserGraduate } from "react-icons/fa";

interface DropdownProps {
  title: string;
  children: React.ReactNode;
  isUserProfil: boolean;
}

const CustomDropdown = ({
  title,
  children,
  isUserProfil = false,
}: DropdownProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center space-x-3 cursor-pointer">
        {isUserProfil ? (
          <span>
            <div className="p-2 rounded-3xl bg-hoverMobile">
              <FaUserGraduate className="h-5 w-5" />
            </div>
          </span>
        ) : null}

        <span>{title}</span>
        <IoIosArrowDown
          className={`text-textColor transition-transform transform ${
            isHovered ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        className={`absolute z-50 w-48 bg-primary border border-gray-300 rounded-md shadow-lg transition-all duration-300 ease-in-out transform ${
          isHovered ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomDropdown;