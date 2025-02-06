"use client";

import * as React from "react";
import { Settings2, HandCoins, Info, GraduationCap } from "lucide-react";

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
import Link from "next/link";

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
      title: "Park Danbee",
      url: "/park-danbee/profile",
      icon: FaChalkboardTeacher,
      isActive: true,
      items: [
        {
          title: "Profile",
          url: "/park-danbee/profile",
        },
        {
          title: "Lessons",
          url: "/park-danbee/schedule",
        },
      ],
    },
    {
      title: "About Us",
      url: "/about-us",
      icon: Info,
      isActive: true,
    },
    {
      title: "Pricing",
      url: "/pricing",
      icon: HandCoins,
      isActive: true,
    },
    {
      title: "Classes",
      url: "#",
      icon: GraduationCap,
      isActive: true,
      items: [
        {
          title: "Beginner",
          url: "#",
        },
        {
          title: "Intermediate",
          url: "#",
        },
        {
          title: "Topik",
          url: "#",
        },
        {
          title: "Advanced",
          url: "#",
        },
      ],
    },
    {
      title: "Contact",
      url: "/contact",
      icon: FaRegEnvelope,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
        >
          <Link href="/">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
              <Image
                src={logo}
                alt={"logo"}
                width={775}
                height={518}
                className="size-4"
              />
            </div>
          </Link>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Danbee Korean</span>
          </div>
        </SidebarMenuButton>
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
