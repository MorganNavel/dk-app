import React, { useEffect, useState } from "react";
import { IoIosClose, IoIosMenu } from "react-icons/io";
import { TbCertificate } from "react-icons/tb";
import { FaEuroSign } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import { FaUserGraduate } from "react-icons/fa";
import { UserProfile } from "@/types/User";
import { DropdownSidebar } from "@/components/reusable/dropdown/SidebarDropdown";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FiYoutube } from "react-icons/fi";
import { FaPeopleGroup } from "react-icons/fa6";
import { apiCall } from "@/utils/apiCall";
import { useProfile } from "@/components/context/useProfile";
import { Button } from "@ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
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
      <SheetTrigger className="lg:hidden">
        <IoIosMenu className="text-background w-7 h-7" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            {profile.idUser === -1 ? (
              <div className="flex items-center space-x-4 overflow-hidden">
                <div className="p-2 rounded-3xl bg-hoverMobile">
                  <FaUserGraduate className="h-6 w-6" />
                </div>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                  {profile.firstname.charAt(0)}. {profile.name}
                </p>
              </div>
            ) : (
              <h2>{t("generals.menu")}</h2>
            )}
          </SheetTitle>
        </SheetHeader>

        <Accordion type="single" collapsible>
          <AccordionItem value="pricing">
            <AccordionTrigger>
              <span>
                <FaEuroSign className="h-6 w-6" />
              </span>
              {t("header.pricing")}
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="videos">
            <AccordionTrigger>
              <span>
                <FiYoutube className="h-6 w-6" />
              </span>
              {t("header.videos.title")}
            </AccordionTrigger>
            <AccordionContent>
              <p className="py-1 text-center  border-b ">
                <Link href="/videos/grammar">{t("header.videos.grammar")}</Link>
              </p>
              <p className="py-1 text-center  border-b">
                <Link href="/videos/vocabulary">
                  {t("header.videos.vocabulary")}
                </Link>
              </p>
              <p className="py-1 text-center  border-b">
                <Link href="/videos/conversation">
                  {t("header.videos.conversation")}
                </Link>
              </p>
              <p className="py-1 text-center">
                <Link href="/videos/conjugation">
                  {t("header.videos.conjugation")}
                </Link>
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="teachers">
            <AccordionTrigger>
              <span>
                <FaPeopleGroup className="h-5 w-5 " />
              </span>
              {t("header.teachers.title")}
            </AccordionTrigger>
            <AccordionContent>
              {teachers?.map((teacher, index) => (
                <p key={index} className="py-1 text-center  border-b w-full ">
                  <Link
                    href={{
                      pathname: "teacher/" + teacher.idUser + "/profile",
                    }}
                  >
                    {teacher.firstname} {teacher.name}
                  </Link>
                </p>
              ))}
              <p className="py-1 text-center">
                <Link href="/teachers">{t("generals.others")}</Link>
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="lessons">
            <AccordionTrigger>
              <span>
                <FiYoutube className="h-6 w-6  " />
              </span>
              {t("header.takeLessons.title")}
            </AccordionTrigger>
            <AccordionContent>
              <p className="py-1 text-center  border-b">
                <Link
                  href={{ pathname: "lessons", query: { level: "beginner" } }}
                >
                  {t("header.takeLessons.beginner")}
                </Link>
              </p>
              <p className="py-1 text-center border-b">
                <Link
                  href={{
                    pathname: "lessons",
                    query: { level: "intermediate1" },
                  }}
                >
                  {t("header.takeLessons.intermediate1")}
                </Link>
              </p>
              <p className="py-1 text-center  border-b ">
                <Link
                  href={{
                    pathname: "lessons",
                    query: { level: "intermediate2" },
                  }}
                >
                  {t("header.takeLessons.intermediate2")}
                </Link>
              </p>
              <p className="py-1 text-center  border-b ">
                <Link href={{ pathname: "lessons", query: { level: "topik" } }}>
                  {t("header.takeLessons.topik")}
                </Link>
              </p>
              <p className="py-1 text-center">
                <Link
                  href={{ pathname: "lessons", query: { level: "advanced" } }}
                >
                  {t("header.takeLessons.advanced")}
                </Link>
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <SheetFooter>
          {profile.idUser != -1 ? (
            <Button variant="square-outline">
              <Link href="/sign-out">{t("generals.signout")}</Link>
            </Button>
          ) : (
            <Button variant="square-outline">
              <Link href="/auth">{t("generals.signin")}</Link>
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
