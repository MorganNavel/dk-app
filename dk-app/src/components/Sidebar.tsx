import React, { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import SidebarItem from "./SidebarItems";
import { TbCertificate } from "react-icons/tb";
import { FaEuroSign } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import SidebarItemDropdown from "./SidebarItemDropdown";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
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
      className={`lg:hidden sidebar fixed top-13 left-0 h-full w-64 bg-primary shadow-lg transform ${
        isOpen ? "translate-x-0 " : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50 font-Roboto`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold text-gray-300">Menu</h2>
        <button
          onClick={onClose}
          className="text-gray-300"
        >
          <IoIosClose className="text-gray-300 w-6 h-6" />
        </button>
      </div>
      <nav className="ml-4 mt-4 text-gray-300">
        <ul>
          <li className="py-1 ">
            <SidebarItem href="/level-test" text="Level Test" >
              <TbCertificate className=" h-5 w-5"/>
            </SidebarItem>
          </li>
          <li className="py-1 ">
            <SidebarItem href="/pricing" text="Pricing">
              <FaEuroSign className="h-5 w-5"/>
            </SidebarItem>
          </li>
          <li >
              <SidebarItemDropdown title="Videos">
                <div className="flex-col bg-hoverMobile mr-4">
                  <p className="py-1 text-center  border-b "> 
                    <a>
                      Grammar
                    </a> 
                  </p>
                  <p className="py-1 text-center  border-b"> 
                    <a>
                      Vocabulary
                    </a>  
                  </p>
                  <p className="py-1 text-center  border-b"> 
                    <a>
                      Conjugation
                    </a>  
                  </p>
                  <p className="py-1 text-center  border-b"> 
                    <a>
                      Conversation
                    </a> 
                  </p>
                  <p className="py-1 text-center  border-b"> 
                    <a>
                      Other
                    </a> 
                  </p>

                </div>
              </SidebarItemDropdown>
          </li>
          <li>
            <SidebarItemDropdown title="Teachers">
              <div className="flex-col bg-hoverMobile mr-4">
                <p className="py-1 text-center  border-b "> 
                  <a> Danbee Park </a> 
                </p>  
              </div>
            </SidebarItemDropdown>
          </li>
          <li className="py-1 ">
            <SidebarItem href="/tutoring" text="Take Classes">
              <IoIosSchool className="h-5 w-5"/>
            </SidebarItem>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
