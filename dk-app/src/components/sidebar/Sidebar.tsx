import React, { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import SidebarItem from "./SidebarItems";
import { TbCertificate } from "react-icons/tb";
import { FaEuroSign } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import { FaUserGraduate } from "react-icons/fa";
import { User } from "@/types/User";
import DropdownSidebar from "../reusable/dropdown/SidebarDropdown";

interface SidebarProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
}
const Sidebar = ({ isOpen, user, onClose }: SidebarProps) => {
  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (!isOpen) return;
      const target = event.target as HTMLElement;
      if (!target.closest(".sidebar") && isOpen) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`text-textColor lg:hidden sidebar fixed top-13 left-0 h-full w-64 bg-primary shadow-lg transform ${
        isOpen ? "translate-x-0 " : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50 font-Roboto`}
    >
      <div className="text-xl font-bold flex justify-between items-center p-4 border-b">
        {user.idUser !== -1 ? (
          <div className="flex items-center space-x-4 overflow-hidden">
            <div className="p-2 rounded-3xl bg-hoverMobile">
              <FaUserGraduate className="h-5 w-5" />
            </div>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
              {user.firstname.charAt(0)}. {user.lastname}
            </p>
          </div>
        ) : (
          <h2>Menu</h2>
        )}
        <button onClick={onClose}>
          <IoIosClose className="w-6 h-6" />
        </button>
      </div>
      <nav className="ml-4 mt-4">
        <ul className="pb-14">
          <li className="py-1 ">
            <SidebarItem
              href="/level-test"
              text="Level Test"
            >
              <TbCertificate className=" h-5 w-5" />
            </SidebarItem>
          </li>
          <li className="py-1 ">
            <SidebarItem
              href="/pricing"
              text="Pricing"
            >
              <FaEuroSign className="h-5 w-5" />
            </SidebarItem>
          </li>
          <li>
            <DropdownSidebar title="Videos">
              <div className="flex-col bg-hoverMobile mr-4">
                <p className="py-1 text-center  border-b ">
                  <a>Grammar</a>
                </p>
                <p className="py-1 text-center  border-b">
                  <a>Vocabulary</a>
                </p>
                <p className="py-1 text-center  border-b">
                  <a>Conjugation</a>
                </p>
                <p className="py-1 text-center  border-b">
                  <a>Conversation</a>
                </p>
                <p className="py-1 text-center  border-b">
                  <a>Other</a>
                </p>
              </div>
            </DropdownSidebar>
          </li>
          <li>
            <DropdownSidebar title="Teachers">
              <div className="flex-col bg-hoverMobile mr-4">
                <p className="py-1 text-center  border-b ">
                  <a> Danbee Park </a>
                </p>
              </div>
            </DropdownSidebar>
          </li>
          <li className="py-1 ">
            <SidebarItem
              href="/tutoring"
              text="Take Classes"
            >
              <IoIosSchool className="h-5 w-5" />
            </SidebarItem>
          </li>
        </ul>

        <div className="min-h-screen flex flex-col items-center">
          {user.idUser != -1 ? (
            <button className="border-2 border-textColor rounded-md px-9 py-3">
              <a href="/sign-out">Sign Out</a>
            </button>
          ) : (
            <button className="border-2 border-textColor rounded-md px-9 py-3">
              <a href="/sign-in">Sign In</a>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
