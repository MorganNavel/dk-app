"use client";
import "../globals.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { Navbar, NavLink, Container, Image } from "react-bootstrap";
import logo from "../../public/assets/img/logo.png";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Navbar className="bg-primary h-[81px] lg:h-[118px]">
        <Container className="flex py-3 px-5 items-center justify-between">
          <div className=" p-0.5 rounded-lg bg-hoverMobile lg:hidden">
            <IoIosMenu
              className="text-gray-300 w-7 h-7"
              onClick={toggleSidebar}
            />
          </div>

          <div className="flex justify-center lg:justify-self-start">
            <Image
              src={logo.src}
              alt="logo"
              className="w-auto h-[53px] lg:w-[143px] lg:h-[96px]"
            />
          </div>
          <div className="w-26 mr-9 lg:hidden"></div>
        </Container>
      </Navbar>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={toggleSidebar}
      />
    </>
  );
}
