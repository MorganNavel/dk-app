import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { SidebarItem } from "./SidebarItems";
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

interface SidebarProps {
  isOpen: boolean;
  profile: UserProfile;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, profile, onClose }: SidebarProps) => {
  const t = useTranslations();
  const [teachers, setTeachers] = useState<UserProfile[] | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (!isOpen) return;
      const target = event.target as HTMLElement;
      if (!target.closest(".sidebar") && isOpen) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

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
    <div
      className={`text-textColor lg:hidden sidebar fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#57A773] to-[#539B70] shadow-lg transform ${
        isOpen ? "translate-x-0 " : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50 font-Roboto`}
    >
      <div className="text-xl font-bold flex justify-between items-center p-4 border-b">
        {profile.idUser !== -1 ? (
          <div className="flex items-center space-x-4 overflow-hidden">
            <div className="p-2 rounded-3xl bg-hoverMobile">
              <FaUserGraduate className="h-5 w-5" />
            </div>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
              {profile.firstname.charAt(0)}. {profile.name}
            </p>
          </div>
        ) : (
          <h2>{t("generals.menu")}</h2>
        )}
        <button onClick={onClose}>
          <IoIosClose className="w-6 h-6" />
        </button>
      </div>
      <nav className="ml-4 mt-4">
        <ul className="pb-14">
          <li className="py-1 ">
            <SidebarItem href="/level-test" text="Level Test">
              <TbCertificate className=" h-5 w-5" />
            </SidebarItem>
          </li>
          <li className="py-1 ">
            <SidebarItem href="/pricing" text={t("header.pricing")}>
              <FaEuroSign className="h-5 w-5" />
            </SidebarItem>
          </li>
          <li>
            <DropdownSidebar
              title={t("header.videos.title")}
              icon={<FiYoutube className="h-5 w-5 flex justify-start" />}
            >
              <div className="flex-col bg-hoverMobile mr-4">
                <p className="py-1 text-center  border-b ">
                  <Link href="/videos/grammar">
                    {t("header.videos.grammar")}
                  </Link>
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
                <p className="py-1 text-center  border-b">
                  <Link href="/videos/conjugation">
                    {t("header.videos.conjugation")}
                  </Link>
                </p>
                <p className="py-1 text-center  border-b">
                  <Link href="/videos">{t("generals.others")}</Link>
                </p>
              </div>
            </DropdownSidebar>
          </li>
          <li>
            <DropdownSidebar
              title="Teachers"
              icon={<FaPeopleGroup className="h-5 w-5 flex justify-start" />}
            >
              <div className="flex-col bg-hoverMobile mr-4">
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

                <p className="py-1 text-center  border-b ">
                  <Link href="/teachers">{t("generals.others")}</Link>
                </p>
              </div>
            </DropdownSidebar>
          </li>
          <li className="py-1 ">
            <DropdownSidebar
              title={t("header.takeLessons.title")}
              icon={<IoIosSchool className="h-5 w-5" />}
            >
              <div className="flex-col bg-hoverMobile mr-4">
                <p className="py-1 text-center  border-b ">
                  <Link
                    href={{ pathname: "lessons", query: { level: "beginner" } }}
                  >
                    {t("header.takeLessons.beginner")}
                  </Link>
                </p>
                <p className="py-1 text-center  border-b">
                  <Link
                    href={{
                      pathname: "lessons",
                      query: { level: "intermediate1" },
                    }}
                  >
                    {t("header.takeLessons.intermediate1")}
                  </Link>
                </p>
                <p className="py-1 text-center  border-b">
                  <Link
                    href={{
                      pathname: "lessons",
                      query: { level: "intermediate2" },
                    }}
                  >
                    {t("header.takeLessons.intermediate2")}
                  </Link>
                </p>
                <p className="py-1 text-center  border-b">
                  <Link
                    href={{ pathname: "lessons", query: { level: "topik" } }}
                  >
                    {t("header.takeLessons.topik")}
                  </Link>
                </p>
                <p className="py-1 text-center  border-b">
                  <Link
                    href={{ pathname: "lessons", query: { level: "advanced" } }}
                  >
                    {t("header.takeLessons.advanced")}
                  </Link>
                </p>
              </div>
            </DropdownSidebar>
          </li>
        </ul>

        <div className="min-h-screen flex flex-col items-center">
          {profile.idUser != -1 ? (
            <button className="border-2 border-textColor rounded-md px-9 py-3">
              <Link href="/sign-out">{t("generals.signout")}</Link>
            </button>
          ) : (
            <button className="border-2 border-textColor rounded-md px-9 py-3">
              <Link href="/auth">{t("generals.signin")}</Link>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};
