"use client";
import { useEffect, useRef, useState } from "react";
import { NavBar } from "./NavBar";
import { Sidebar } from "./Sidebar";

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
        className="fixed top-0 left-0 w-full bg-gradient-to-b from-[#57A773] to-[#539B70] shadow-md backdrop-blur-md z-10"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="lg:hidden">
            <Sidebar />
          </div>
          <NavBar />
        </div>
      </header>

      <div style={{ marginBottom: `${headerHeight}px` }}/>
    </div>
  );
};
