"use client";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "./NavBar";
import { Sidebar } from "./Sidebar";
import Link from "next/link";
import Image from "next/image";
import logo from "@public/assets/img/logo.png";
import { LanguageSelect } from "../reusable/LanguageSelect";

export const Header = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    });

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 bg-primary flex p-4 justify-between items-center"
      >
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            className="w-auto h-24 cursor-pointer"
            width={775}
            height={518}
          />
        </Link>
        <Navbar className="hidden"/>
       <LanguageSelect />
      </header>

      <div style={{ marginBottom: `${headerHeight}px` }}/>
    </div>
  );
};
