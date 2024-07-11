"use client";
import { PiSignOutBold } from "react-icons/pi";
import CustomDropdown from "@/components/reusable/dropdown/Dropdown";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useUser } from "../context/useUser";
import { LuShoppingCart } from "react-icons/lu";
import { LuCalendarClock } from "react-icons/lu";
import { CustomSquareButton } from "@/components/reusable/Button/CustomSquareButton";
import logo from "@public/assets/img/logo.png";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const Navbar = () => {
  const { user } = useUser();
  const t = useTranslations();
  return (
    <>
      <div className="flex justify-center lg:ml-5">
        <Image
          src={logo}
          alt="logo"
          className="w-auto h-[53px] lg:w-[143px] lg:h-[96px]"
        />
      </div>
      <div className="invisible lg:hidden"></div>

      <div className="hidden lg:flex text-lg space-x-10 xl:text-[20px] xl:space-x-14  font-semibold">
        <div>
          <a
            href="#"
            className=""
          >
            {t("header.levelTest")}
          </a>
        </div>
        <div>
          <a
            href="#"
            className=""
          >
            {t("header.pricing")}
          </a>
        </div>

        <CustomDropdown
          title={t("header.videos.title")}
          isUserProfil={false}
        >
          <div className="flex-col bg-primary text-md font-normal">
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <a>{t("header.videos.grammar")}</a>
            </p>
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <a>{t("header.videos.vocabulary")}</a>
            </p>
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <a>{t("header.videos.conversation")}</a>
            </p>
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <a>{t("header.videos.conjugation")}</a>
            </p>
            <p className="py-2 text-center  hover:bg-hoverMobile hover:cursor-pointer">
              <a>{t("generals.others")}</a>
            </p>
          </div>
        </CustomDropdown>
        <CustomDropdown
          title={t("header.takeClasses.title")}
          isUserProfil={false}
        >
          <div className="flex-col bg-primary text-md font-normal">
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <a>{t("header.takeClasses.beginner")}</a>
            </p>
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <a>{t("header.takeClasses.intermediate1")}</a>
            </p>
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <a>{t("header.takeClasses.intermediate2")}</a>
            </p>
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <a>{t("header.takeClasses.topik")}</a>
            </p>
            <p className="py-2 text-center hover:bg-hoverMobile hover:cursor-pointer">
              <a>{t("header.takeClasses.advanced")}</a>
            </p>
          </div>
        </CustomDropdown>
        <CustomDropdown
          title={t("header.teachers.title")}
          isUserProfil={false}
        >
          <div className="flex-col bg-primary text-md font-normal">
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <a>{t("header.teachers.danbeepark")}</a>
            </p>
            <p className="py-2 text-center   hover:bg-hoverMobile hover:cursor-pointer">
              <a>{t("generals.others")}</a>
            </p>
          </div>
        </CustomDropdown>
      </div>
      <div className="hidden text-lg lg:flex mr-9">
        {user.idUser != -1 ? (
          <>
            <CustomDropdown
              title={user.firstname.charAt(0) + " ." + user.lastname}
              isUserProfil={true}
            >
              <div className="flex-col bg-primary text-md font-normal">
                <p className="py-2 px-3  border-b hover:bg-hoverMobile hover:cursor-pointer">
                  <a className="flex items-center">
                    <MdOutlineManageAccounts className="mr-1 text-textColor w-7 h-7 " />
                    {t("header.profile.myaccount")}
                  </a>
                </p>
                <p className="py-2 px-3  border-b hover:bg-hoverMobile hover:cursor-pointer">
                  <a className="flex items-center">
                    <LuShoppingCart className="mr-1 text-textColor w-7 h-7" />
                    {t("home.header.profile.orders")}
                  </a>
                </p>
                <p className="py-2 px-3 border-b hover:bg-hoverMobile hover:cursor-pointer">
                  <a className="flex items-center">
                    <LuCalendarClock className="mr-1 text-textColor w-7 h-7" />
                    {t("home.header.profile.subscriptions")}
                  </a>
                </p>
                <p className=" py-2 px-3 hover:bg-hoverMobile hover:cursor-pointer">
                  <a className="flex items-center">
                    <PiSignOutBold className="mr-1 text-textColor w-7 h-7" />
                    {t("generals.signout")}
                  </a>
                </p>
              </div>
            </CustomDropdown>
          </>
        ) : (
          <CustomSquareButton
            href="/sign-in"
            text={t("generals.signin")}
          />
        )}
      </div>
    </>
  );
};
