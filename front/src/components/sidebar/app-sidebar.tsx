"use client";

import * as React from "react";
import { HandCoins, Info, GraduationCap, LogIn } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { NavMain, NavMainProps } from "./nav-main";
import { NavUser } from "./nav-user";
import logo from "@public/assets/img/logo.png";
import { FaChalkboardTeacher, FaRegEnvelope } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Button } from "../ui/button";
import { useSession } from "@/lib/auth-client";

const data: {
  navMain: NavMainProps["items"];
} = {
  navMain: [
    {
      title: "danbee-park",
      url: "danbee-park/profile",
      icon: FaChalkboardTeacher,
      isActive: true,
      items: [
        {
          title: "header.dashboard",
          url: "danbee-park/dashboard",
          right: "teacher",
        },
        {
          title: "header.profile",
          url: "danbee-park/profile",
        },
      ],
    },
    {
      title: "header.aboutUs",
      url: "about-us",
      icon: Info,
      isActive: true,
    },
    {
      title: "header.pricing",
      url: "pricing",
      icon: HandCoins,
      isActive: true,
    },
    {
      title: "header.classes",
      url: "danbee-park/schedule",
      icon: GraduationCap,
      isActive: true,
    },
    {
      title: "header.contact",
      url: "contact",
      icon: FaRegEnvelope,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile, setOpenMobile, open } = useSidebar();
  const session = useSession();
  const user = session.data?.user;
  const t = useTranslations();
  const router = useRouter();
  const role = user?.role;

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground '
          onClick={() => {
            isMobile && setOpenMobile(false);
            router.push("/");
          }}
        >
          <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground'>
            <Image
              src={logo}
              alt={"logo"}
              width={775}
              height={518}
              className='size-4'
            />
          </div>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>Danbee Korean</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {process.env.NODE_ENV == "development" && role && <NavUser />}
        {process.env.NODE_ENV == "development" &&
          !user &&
          (open ? (
            <Button
              variant={"round-outline"}
              className='w-full h-full'
              onClick={() => router.push("/auth/sign-in")}
            >
              {t("generals.signin.title")}
            </Button>
          ) : (
            <LogIn
              onClick={() => router.push("/auth/sign-in")}
              className='cursor-pointer'
            />
          ))}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
