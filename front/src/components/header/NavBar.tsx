"use client";
import { PiSignOutBold } from "react-icons/pi";
import { CustomDropdown } from "@/components/reusable/dropdown/Dropdown";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useProfile } from "../context/useProfile";
import { LuShoppingCart } from "react-icons/lu";
import { LuCalendarClock } from "react-icons/lu";
import logo from "@public/assets/img/logo.png";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiCall } from "@/utils/apiCall";
import { UserProfile } from "@/types/User";
import { DropdownMenuItem, DropdownMenuSeparator } from "@ui/dropdown-menu";
import { Button } from "@ui/button";

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
    // getTeachers();
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
        <Link className="text-white" href="/level-test">
          {t("header.levelTest")}
        </Link>
        <Link className="text-white" href="/pricing">
          {t("header.pricing")}
        </Link>
        <CustomDropdown title={t("header.videos.title")} className="text-white">
          <DropdownMenuItem>
            <Link href="/videos/grammar">
              <p className="text-lg">{t("header.videos.grammar")}</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/videos/vocabulary">
              <p className="text-lg">{t("header.videos.vocabulary")}</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/videos/conversation">
              <p className="text-lg">{t("header.videos.conversation")}</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/videos/conjugation">
              <p className="text-lg">{t("header.videos.conjugation")}</p>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href="/videos">
              <p className="text-lg">{t("generals.others")}</p>
            </Link>
          </DropdownMenuItem>
        </CustomDropdown>
        <CustomDropdown
          title={t("header.takeLessons.title")}
          className="text-white"
        >
          <DropdownMenuItem>
            <Link href={{ pathname: "lessons", query: { level: "beginner" } }}>
              <p className="text-lg">{t("header.takeLessons.beginner")}</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={{ pathname: "lessons", query: { level: "intermediate1" } }}
            >
              <p className="text-lg">{t("header.takeLessons.intermediate1")}</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={{ pathname: "lessons", query: { level: "intermediate2" } }}
            >
              <p className="text-lg">{t("header.takeLessons.intermediate2")}</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={{ pathname: "lessons", query: { level: "topik" } }}>
              <p className="text-lg">{t("header.takeLessons.topik")}</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={{ pathname: "lessons", query: { level: "advanced" } }}>
              <p className="text-lg">{t("header.takeLessons.advanced")}</p>
            </Link>
          </DropdownMenuItem>
        </CustomDropdown>

        <CustomDropdown
          title={t("header.teachers.title")}
          className="text-white"
        >
          {teachers &&
            teachers.map((teacher, index) => (
              <DropdownMenuItem key={index}>
                <Link
                  href={{
                    pathname: "teacher/" + teacher.idUser + "/profile",
                  }}
                >
                  <p className="text-lg">
                    {teacher.firstname + " " + teacher.name}
                  </p>
                </Link>
              </DropdownMenuItem>
            ))}
          <DropdownMenuItem>
            <Link href="/teachers">
              <p className="text-lg">{t("generals.others")}</p>
            </Link>
          </DropdownMenuItem>
        </CustomDropdown>
      </div>
      <div className="hidden text-lg lg:flex mr-9">
        {profile.idUser != -1 ? (
          <>
            <CustomDropdown
              title={profile.firstname.charAt(0) + " ." + profile.name}
              className="text-white"
            >
              <DropdownMenuItem>
                <Link href="/myaccount" className="flex items-center">
                  <MdOutlineManageAccounts className="mr-3 text-textColor w-5 h-5 " />

                  <p className="text-lg">{t("header.profile.myaccount")}</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/orders" className="flex items-center">
                  <LuShoppingCart className="mr-3 text-textColor w-5 h-5" />

                  <p className="text-lg">{t("header.profile.orders")}</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/subscriptions" className="flex items-center">
                  <LuCalendarClock className="mr-3 text-textColor w-5 h-5" />

                  <p className="text-lg">{t("header.profile.subscriptions")}</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/" className="flex items-center">
                  <PiSignOutBold className="mr-3 text-textColor w-5 h-5" />
                  <p className="text-lg">{t("generals.signout")}</p>
                </Link>
              </DropdownMenuItem>
            </CustomDropdown>
          </>
        ) : (
          <Button variant={"square-outline"} className="px-8 py-7">
            <Link className="text-white" href="/auth">
              {t("generals.signin")}
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};



export const NavbarV1 = () => {

  const t = useTranslations("header");
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
      <Link className="text-white" href="/">
          {t("home")}
        </Link>
        <Link className="text-white" href="/parkdanbee/profile">
        {t("myprofile")}
        </Link>
        <Link className="text-white" href="/about-us">
          {t("aboutUs")}
        </Link>
        <Link className="text-white" href="/contact">
        {t("contact")}
        </Link>
      </div>
      <div className="hidden text-lg lg:flex mr-9"/>  
    </>
  );
};