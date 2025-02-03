"use client";
import { NavBar } from "./NavBar";
import { Sidebar } from "./Sidebar";

export const Header = () => {
  return (
    <div className='fixed z-50 top-0 w-full text-textColor bg-gradient-to-b from-[#57A773] to-[#539B70] '>
      <div className='flex py-3 px-5 items-center justify-between'>
        <div className='p-1 rounded-lg bg-hoverMobile lg:hidden'>
          <Sidebar />
        </div>
        <NavBar />
      </div>
    </div>
  );
};
