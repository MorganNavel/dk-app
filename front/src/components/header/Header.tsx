"use client";
import { IoIosMenu } from "react-icons/io";
import { useState } from "react";
import { Sidebar } from "./sidebar/Sidebar";
import { Navbar } from "./NavBar";
import { useUser } from "@/components/context/useUser";
export const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useUser();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <div className="fixed z-50 top-0 lg:static w-full text-textColor bg-gradient-to-b from-[#57A773] to-[#539B70] h-[81px] lg:h-[118px]">
        <div className="flex py-3 px-5 items-center justify-between ">
          <div className=" p-0.5 rounded-lg bg-hoverMobile lg:hidden">
            <IoIosMenu
              className="text-textColor w-7 h-7"
              onClick={toggleSidebar}
            />
          </div>
          <Navbar />
        </div>
      </div>
      <Sidebar isOpen={sidebarOpen} user={user} onClose={toggleSidebar} />
    </div>
  );
};
