"use client";
import { IoIosMenu } from "react-icons/io";
import { FaRegEnvelope } from "react-icons/fa";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { IoInformationCircleOutline } from "react-icons/io5";
import { ImProfile } from "react-icons/im";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Sidebar = () => {
  const t = useTranslations();

  return (
    <Sheet>
      <SheetTrigger className='lg:hidden'>
        <div className='bg-emerald-700 rounded-lg'>
          <IoIosMenu className='text-background w-15 h-15' />
        </div>
      </SheetTrigger>
      <SheetContent side='bottom' className='bg-primary text-white '>
        <SheetHeader className='mb-14'>
          <SheetTitle className='font-semibold text-5xl text-white'>
            <h2>{t("generals.menu")}</h2>
          </SheetTitle>
        </SheetHeader>
        <div className='flex flex-col items-center w-full'>
          <div className='flex justify-between items-center w-full'>
            <ImProfile className='h-15 w-15' />
            <Link href='/park-danbee/profile'>
              <p className='text-4xl text-center font-semibold'>
                {t("header.myprofile")}
              </p>
            </Link>
            <div className='w-6' />
          </div>
          <hr className='w-full my-4' />
          <div className='flex justify-between items-center w-full'>
            <IoInformationCircleOutline className='h-15 w-15' />
            <Link href='/about-us'>
              <p className='text-center text-4xl font-semibold'>
                {t("header.aboutUs")}
              </p>
            </Link>
            <div className='w-6' />
          </div>
          <hr className='w-full my-4' />
          <div className='flex justify-between items-center w-full'>
            <FaRegEnvelope className='h-15 w-15' />
            <Link href='/contact'>
              <p className='text-center text-4xl font-semibold'>
                {t("header.contact")}
              </p>
            </Link>
            <div className='w-6' />
          </div>
          <hr className='w-full my-4' />
        </div>
      </SheetContent>
    </Sheet>
  );
};
