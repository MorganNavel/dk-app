"use client";
import { PiSignOutBold } from "react-icons/pi";
import CustomDropdown from "@/components/reusable/dropdown/Dropdown";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useProfile } from "../context/useProfile";
import { LuShoppingCart } from "react-icons/lu";
import { LuCalendarClock } from "react-icons/lu";
import { CustomSquareButton } from "@/components/reusable/Button/CustomSquareButton";
import logo from "@public/assets/img/logo.png";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiCall } from "@/utils/apiCall";
import { UserProfile } from "@/types/User";

export const Navbar = () => {
  const { profile } = useProfile();
  const [teachers, setTeachers] = useState<UserProfile[] | null>(null);

  async function getTeachers() {
    const teachers = await apiCall<ApiResponse<UserProfile[]>>(
      "/api/v1/user/teachers"
    );
    setTeachers(teachers.data);
  }

  useEffect(() => {
    getTeachers();
  }, []);

  const t = useTranslations();
  return (
    <>
      <div className="flex justify-center lg:ml-5">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            className="w-auto h-[53px] lg:w-[143px] lg:h-[96px]"
          />
        </Link>
      </div>
      <div className="invisible lg:hidden"></div>

      <div className="hidden lg:flex text-lg space-x-8 xl:text-[20px]  font-semibold">
        <div>
          <Link href="/level-test">{t("header.levelTest")}</Link>
        </div>
        <div>
          <Link href="/pricing">{t("header.pricing")}</Link>
        </div>

        <CustomDropdown title={t("header.videos.title")} href="/videos">
          <div className="flex-col bg-primary text-md font-normal">
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <Link href="/videos/grammar">{t("header.videos.grammar")}</Link>
            </p>
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <Link href="/videos/vocabulary">
                {t("header.videos.vocabulary")}
              </Link>
            </p>
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <Link href="/videos/conversation">
                {t("header.videos.conversation")}
              </Link>
            </p>
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <Link href="/videos/conjugation">
                {t("header.videos.conjugation")}
              </Link>
            </p>
            <p className="py-2 text-center  hover:bg-hoverMobile hover:cursor-pointer">
              <Link href="/videos">{t("generals.others")}</Link>
            </p>
          </div>
        </CustomDropdown>

        <CustomDropdown title={t("header.takeLessons.title")} href="/lessons">
          <div className="flex-col bg-primary text-md font-normal">
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <Link
                href={{ pathname: "lessons", query: { level: "beginner" } }}
              >
                {t("header.takeLessons.beginner")}
              </Link>
            </p>
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <Link
                href={{
                  pathname: "lessons",
                  query: { level: "intermediate1" },
                }}
              >
                {t("header.takeLessons.intermediate1")}
              </Link>
            </p>
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <Link
                href={{
                  pathname: "lessons",
                  query: { level: "intermediate2" },
                }}
              >
                {t("header.takeLessons.intermediate2")}
              </Link>
            </p>
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <Link href={{ pathname: "lessons", query: { level: "topik" } }}>
                {t("header.takeLessons.topik")}
              </Link>
            </p>
            <p className="py-2 text-center hover:bg-hoverMobile hover:cursor-pointer">
              <Link
                href={{ pathname: "lessons", query: { level: "advanced" } }}
              >
                {t("header.takeLessons.advanced")}
              </Link>
            </p>
          </div>
        </CustomDropdown>

        <CustomDropdown title={t("header.teachers.title")} href="/teachers">
          <div className="flex-col bg-primary text-md font-normal">
            {teachers &&
              teachers.map((teacher, index) => (
                <p
                  key={index}
                  className=" py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer"
                >
                  <Link
                    href={{
                      pathname: "teacher/" + teacher.idUser + "/profile",
                    }}
                  >
                    <span>{teacher.firstname + " " + teacher.name}</span>
                  </Link>
                </p>
              ))}
            <p className="py-2 text-center   hover:bg-hoverMobile hover:cursor-pointer">
              <Link href="/teachers">{t("generals.others")}</Link>
            </p>
          </div>
        </CustomDropdown>
      </div>
      <div className="hidden text-lg lg:flex mr-9">
        {profile.idUser != -1 ? (
          <>
            <CustomDropdown
              title={profile.firstname.charAt(0) + " ." + profile.name}
              isUserProfil={true}
            >
              <div className="flex-col bg-primary text-md font-normal">
                <p className="py-2 px-3  border-b hover:bg-hoverMobile hover:cursor-pointer">
                  <Link className="flex items-center" href="/myaccount">
                    <MdOutlineManageAccounts className="mr-1 text-textColor w-7 h-7 " />
                    {t("header.profile.myaccount")}
                  </Link>
                </p>
                <p className="py-2 px-3  border-b hover:bg-hoverMobile hover:cursor-pointer">
                  <Link className="flex items-center" href="/orders">
                    <LuShoppingCart className="mr-1 text-textColor w-7 h-7" />
                    {t("header.profile.orders")}
                  </Link>
                </p>
                <p className="py-2 px-3 border-b hover:bg-hoverMobile hover:cursor-pointer">
                  <Link className="flex items-center" href="/subscriptions">
                    <LuCalendarClock className="mr-1 text-textColor w-7 h-7" />
                    {t("header.profile.subscriptions")}
                  </Link>
                </p>
                <p className=" py-2 px-3 hover:bg-hoverMobile hover:cursor-pointer">
                  <Link className="flex items-center" href="/">
                    <PiSignOutBold className="mr-1 text-textColor w-7 h-7" />
                    {t("generals.signout")}
                  </Link>
                </p>
              </div>
            </CustomDropdown>
          </>
        ) : (
          <CustomSquareButton href="/auth" text={t("generals.signin")} />
        )}
      </div>
    </>
  );
};
