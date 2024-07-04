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

export const Navbar = () => {
  const { user } = useUser();
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
            Level Test
          </a>
        </div>
        <div>
          <a
            href="#"
            className=""
          >
            Pricing
          </a>
        </div>

        <CustomDropdown
          title="Videos"
          isUserProfil={false}
        >
          <div className="flex-col bg-primary text-md font-normal">
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <a>Grammar</a>
            </p>
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <a>Vocabulary</a>
            </p>
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <a>Conjugation</a>
            </p>
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <a>Conversation</a>
            </p>
            <p className="py-2 text-center  hover:bg-hoverMobile hover:cursor-pointer">
              <a>Other</a>
            </p>
          </div>
        </CustomDropdown>
        <CustomDropdown
          title="Take Classes"
          isUserProfil={false}
        >
          <div className="flex-col bg-primary text-md font-normal">
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <a>Beginner</a>
            </p>
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <a>Intermediate 1</a>
            </p>
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <a>Intermediate 2</a>
            </p>
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <a>TOPIK</a>
            </p>
            <p className="py-2 text-center hover:bg-hoverMobile hover:cursor-pointer">
              <a>Advanced</a>
            </p>
          </div>
        </CustomDropdown>
        <CustomDropdown
          title="Take Classes"
          isUserProfil={false}
        >
          <div className="flex-col bg-primary text-md font-normal">
            <p className="py-2 text-center  border-b hover:bg-hoverMobile hover:cursor-pointer">
              <a>Danbee Park</a>
            </p>
            <p className="py-2 text-center   hover:bg-hoverMobile hover:cursor-pointer">
              <a>Other</a>
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
                    My Account
                  </a>
                </p>
                <p className="py-2 px-3  border-b hover:bg-hoverMobile hover:cursor-pointer">
                  <a className="flex items-center">
                    <LuShoppingCart className="mr-1 text-textColor w-7 h-7" />
                    Orders
                  </a>
                </p>
                <p className="py-2 px-3 border-b hover:bg-hoverMobile hover:cursor-pointer">
                  <a className="flex items-center">
                    <LuCalendarClock className="mr-1 text-textColor w-7 h-7" />
                    Subscriptions
                  </a>
                </p>
                <p className=" py-2 px-3 hover:bg-hoverMobile hover:cursor-pointer">
                  <a className="flex items-center">
                    <PiSignOutBold className="mr-1 text-textColor w-7 h-7" />
                    Sign Out
                  </a>
                </p>
              </div>
            </CustomDropdown>
          </>
        ) : (
          <CustomSquareButton
            href="/sign-in"
            text="Sign In"
          />
        )}
      </div>
    </>
  );
};
