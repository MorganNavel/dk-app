import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserGraduate } from "react-icons/fa";
import Link from "next/link";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";
interface DropdownProps {
  title: string;
  children: React.ReactNode;
  isUserProfil?: boolean;
  href?: string;
}

const CustomDropdown = ({
  title,
  children,
  isUserProfil = false,
  href,
}: DropdownProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Dropdown isOpen={isHovered} onMouseLeave={() => setIsHovered(false)}>
      <DropdownTrigger
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Button
          variant="light"
          color="primary"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="text-textColor text-lg font-semibold"
        >
          Open Menu
          <IoIosArrowDown
            className={`text-textColor transition-transform transform ${
              isHovered ? "rotate-180" : ""
            }`}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <DropdownSection>
          <DropdownItem>
            <Link href="/videos/grammar">Grammar</Link>
          </DropdownItem>
          <DropdownItem>
            <Link href="/videos/vocabulary">Vocabulary</Link>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );

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

        {href ? <Link href={href}>{title}</Link> : <span>{title}</span>}
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
