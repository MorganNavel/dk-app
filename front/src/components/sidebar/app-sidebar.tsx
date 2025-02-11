"use client";

import * as React from "react";
import { HandCoins, Info, GraduationCap } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import logo from "@public/assets/img/logo.png";
import { FaChalkboardTeacher, FaRegEnvelope } from "react-icons/fa";
import { IconType } from "react-icons";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

const data: {
  navMain: {
    title: string;
    url: string;
    icon: IconType | React.ComponentType<any>;
    isActive?: boolean;
    items?: { title: string; url: string }[];
  }[];
} = {
  navMain: [
    {
      title: "danbee-park",
      url: "danbee-park/profile",
      icon: FaChalkboardTeacher,
      isActive: true,
      items: [
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
      url: "#",
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
  const locale = useLocale();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href={`/`} locale={locale}>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
              <Image
                src={logo}
                alt={"logo"}
                width={775}
                height={518}
                className="size-4"
              />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Danbee Korean</span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {process.env.NODE_ENV == "development" && <NavUser />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
