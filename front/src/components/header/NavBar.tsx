"use client";
import logo from "@public/assets/img/logo.png";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

import { LanguageSelect } from "../reusable/LanguageSelect";

export const NavBar = () => {
  const t = useTranslations("header");

  const [activeLink, setActiveLink] = useState<string>("/");

  return (
    <>
      <div className='flex justify-center lg:ml-5'>
        <Link href='/'>
          <Image
            src={logo}
            alt='logo'
            className='w-auto h-24 cursor-pointer'
          />
        </Link>
      </div>
      <div className='invisible lg:hidden'></div>

      <div className='hidden lg:flex text-lg space-x-8 xl:text-[20px] font-semibold'>
        {[
          { path: "/", label: t("home") },
          { path: "/park-danbee/profile", label: t("myprofile") },
          { path: "/about-us", label: t("aboutUs") },
          { path: "/contact", label: t("contact") },
        ].map((link) => (
          <Link
            key={link.path}
            href={link.path}
            onClick={() => setActiveLink(link.path)}
            className={`relative text-white pb-1 transition-all duration-300 group`}
          >
            {link.label}
            {activeLink === link.path && (
              <span className='rounded-full absolute bottom-0 left-0 w-full h-1 bg-white' />
            )}
            <span
              className={`${
                activeLink !== link.path && "group-hover:opacity-100"
              } opacity-0 bg-white rounded-full absolute bottom-0 left-0 w-full h-1 scale-x-0 transition-all duration-300 ease-in-out origin-left group-hover:scale-x-100`}
            />
          </Link>
        ))}
      </div>

      <div className='hidden text-lg lg:flex mr-9'>
        <LanguageSelect />
      </div>
    </>
  );
};
