"use client";
import { Sidebar } from "./sidebar/Sidebar";
import { Navbar } from "./NavBar";

export const Header = () => {

  return (
    <div>
      <div className="fixed z-50 top-0 lg:static w-full text-textColor bg-gradient-to-b from-[#57A773] to-[#539B70] h-[81px] lg:h-[118px]">
        <div className="flex py-3 px-5 items-center justify-between ">
          <div className=" p-0.5 rounded-lg bg-hoverMobile lg:hidden">
            <Sidebar />
          </div>
          <Navbar />
        </div>
      </div>
    </div>
  );
};
