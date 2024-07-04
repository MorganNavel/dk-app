import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FiYoutube } from "react-icons/fi";
import { FaPeopleGroup } from "react-icons/fa6";

export const DropdownSidebar = (props: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col  w-full">
      <div className="flex items-center w-full">
        {props.title == "Videos" ? (
          <FiYoutube className="h-5 w-5 flex justify-start" />
        ) : (
          <FaPeopleGroup className="h-5 w-5 flex justify-start" />
        )}

        <a
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full py-2 px-3"
        >
          <span className="font-semibold">{props.title}</span>
          <IoIosArrowDown
            className={`${
              isOpen ? "rotate-180" : ""
            } transition-transform text-textColor`}
          />
        </a>
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-300 ease-in-out bg-primary w-full ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        {props.children}
      </div>
    </div>
  );
};

