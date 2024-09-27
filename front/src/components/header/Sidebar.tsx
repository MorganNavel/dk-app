import React, { useEffect, useState } from "react";
import { IoIosClose, IoIosMenu } from "react-icons/io";
import { TbCertificate } from "react-icons/tb";
import { FaEuroSign } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import { FaUserGraduate } from "react-icons/fa";
import { UserProfile } from "@/types/User";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FiYoutube } from "react-icons/fi";
import { FaPeopleGroup } from "react-icons/fa6";
import { apiCall } from "@/utils/apiCall";
import { useProfile } from "@/components/context/useProfile";
import { Button } from "@ui/button";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Sidebar = () => {
  const t = useTranslations();
  const [teachers, setTeachers] = useState<UserProfile[] | null>(null);
  const { profile } = useProfile();

  async function getTeachers() {
    const teachers = await apiCall<ApiResponse<UserProfile[]>>(
      "/api/v1/user/teachers"
    );
    setTeachers(teachers.data);
  }

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <Sheet>
      <SheetTrigger className='lg:hidden'>
        <div className='bg-primary-foreground rounded-md'>
          <IoIosMenu className='text-background w-7 h-7' />
        </div>
      </SheetTrigger>
      <SheetContent side='left' className='bg-primary-foreground text-white'>
        <SheetHeader className='mb-5'>
          <SheetTitle className='font-semibold text-2xl text-white'>
            {profile.idUser !== -1 ? (
              <div className='flex items-center space-x-4 overflow-hidden'>
                <div className='p-2 rounded-3xl bg-hoverMobile'>
                  <FaUserGraduate className='h-6 w-6' />
                </div>
                <p className='overflow-hidden text-ellipsis whitespace-nowrap max-w-full'>
                  {profile.firstname.charAt(0)}. {profile.name}
                </p>
              </div>
            ) : (
              <h2>{t("generals.menu")}</h2>
            )}
          </SheetTitle>
        </SheetHeader>
        <div className='flex flex-col items-center w-full'>
          <div className='w-full'>
            <span className='absolute position-start'>
              <FaEuroSign className='h-6 w-6' />
            </span>
            <Link href='/pricing'>
              <p className='text-center flex-1 font-semibold'>
                {t("header.pricing")}
              </p>
            </Link>
          </div>
          <hr className='divide-primary w-full mt-4' />
          <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value='videos'>
              <AccordionTrigger>
                <span>
                  <FiYoutube className='h-6 w-6' />
                </span>
                <p>{t("header.videos.title")}</p>
              </AccordionTrigger>
              <AccordionContent className='divide-y-1 divide-gray'>
                <p className='py-1 text-center'>
                  <Link href='/videos/grammar'>
                    {t("header.videos.grammar")}
                  </Link>
                </p>
                <p className='py-1 text-center'>
                  <Link href='/videos/vocabulary'>
                    {t("header.videos.vocabulary")}
                  </Link>
                </p>
                <p className='py-1 text-center'>
                  <Link href='/videos/conversation'>
                    {t("header.videos.conversation")}
                  </Link>
                </p>
                <p className='py-1 text-center'>
                  <Link href='/videos/conjugation'>
                    {t("header.videos.conjugation")}
                  </Link>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value='teachers'>
              <AccordionTrigger>
                <span>
                  <FaPeopleGroup className='h-5 w-5 ' />
                </span>
                {t("header.teachers.title")}
              </AccordionTrigger>
              <AccordionContent className='divide-y-1 divide-gray'>
                {teachers?.map((teacher, index) => (
                  <p key={index} className='py-1 text-center w-full '>
                    <Link
                      href={{
                        pathname: "teacher/" + teacher.idUser + "/profile",
                      }}
                    >
                      {teacher.firstname} {teacher.name}
                    </Link>
                  </p>
                ))}
                <p className='py-1 text-center'>
                  <Link href='/teachers'>{t("generals.others")}</Link>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value='lessons'>
              <AccordionTrigger>
                <span>
                  <FiYoutube className='h-6 w-6  ' />
                </span>
                {t("header.takeLessons.title")}
              </AccordionTrigger>
              <AccordionContent className='divide-y-1 divide-gray'>
                <p className='py-1 text-center'>
                  <Link
                    href={{ pathname: "lessons", query: { level: "beginner" } }}
                  >
                    {t("header.takeLessons.beginner")}
                  </Link>
                </p>
                <p className='py-1 text-center'>
                  <Link
                    href={{
                      pathname: "lessons",
                      query: { level: "intermediate1" },
                    }}
                  >
                    {t("header.takeLessons.intermediate1")}
                  </Link>
                </p>
                <p className='py-1 text-center '>
                  <Link
                    href={{
                      pathname: "lessons",
                      query: { level: "intermediate2" },
                    }}
                  >
                    {t("header.takeLessons.intermediate2")}
                  </Link>
                </p>
                <p className='py-1 text-center '>
                  <Link
                    href={{ pathname: "lessons", query: { level: "topik" } }}
                  >
                    {t("header.takeLessons.topik")}
                  </Link>
                </p>
                <p className='py-1 text-center'>
                  <Link
                    href={{ pathname: "lessons", query: { level: "advanced" } }}
                  >
                    {t("header.takeLessons.advanced")}
                  </Link>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <SheetFooter>
          {profile.idUser !== -1 ? (
            <Button variant={"square-outline"} className='mt-5 px-8 py-7'>
              <Link className='text-white' href='/sign-out'>
                {t("generals.signout")}
              </Link>
            </Button>
          ) : (
            <Button variant={"square-outline"} className='mt-5 px-8 py-7'>
              <Link className='text-white' href='/auth'>
                {t("generals.signin")}
              </Link>
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export const SidebarV1 = () => {
  const t = useTranslations();

  return (
    <Sheet>
      <SheetTrigger className='lg:hidden'>
        <div className='bg-primary-foreground rounded-md'>
          <IoIosMenu className='text-background w-7 h-7' />
        </div>
      </SheetTrigger>
      <SheetContent side='left' className='bg-primary-foreground text-white'>
        <SheetHeader className='mb-5'>
          <SheetTitle className='font-semibold text-2xl text-white'>
            <h2>{t("generals.menu")}</h2>
          </SheetTitle>
        </SheetHeader>
        <div className='flex flex-col items-center w-full'>
          <div className='w-full'>
            <span className='absolute position-start'>
              <ImProfile className='h-6 w-6' />
            </span>
            <Link href='/park-danbee/profile'>
              <p className='text-center flex-1 font-semibold'>
                {t("header.myprofile")}
              </p>
            </Link>
          </div>
          <hr className='w-full my-4' />
          <div className='w-full'>
            <span className='absolute position-start'>
              <IoInformationCircleOutline className='h-6 w-6' />
            </span>
            <Link href='/about-us'>
              <p className='text-center flex-1 font-semibold'>
                {t("header.aboutUs")}
              </p>
            </Link>
          </div>
          <hr className='w-full my-4' />
          <div className='w-full'>
            <span className='absolute position-start'>
              <FaRegEnvelope className='h-6 w-6' />
            </span>
            <Link href='/contact'>
              <p className='text-center flex-1 font-semibold'>
                {t("header.contact")}
              </p>
            </Link>
          </div>
          <hr className='w-full my-4' />
        </div>
      </SheetContent>
    </Sheet>
  );
};
