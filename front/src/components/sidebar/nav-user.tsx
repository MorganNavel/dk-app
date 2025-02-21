"use client";

import { Bell, LogOut } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { FaChalkboardTeacher, FaMoneyBillWave } from "react-icons/fa";
import { ProfileMe } from "@/types/User";
import { PiStudentBold } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";
import { useTranslations } from "next-intl";
import { apiCall } from "@/utils/apiCall";
import { useQueryClient } from "@tanstack/react-query";
interface NavUserProps {
  profile: ProfileMe;
}

export function NavUser({ profile }: Readonly<NavUserProps>) {
  const { isMobile } = useSidebar();
  const t = useTranslations();
  const queryClient = useQueryClient();
  const signout = async () => {
    try {
      await apiCall("/auth/signout", "POST");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      window.location.href = "/";
    } catch {}
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                {profile.role === "teacher" ? (
                  <FaChalkboardTeacher size={32} />
                ) : (
                  <PiStudentBold size={32} />
                )}
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{profile.name}</span>
                <span className='truncate text-xs'>{profile.email}</span>
              </div>
              <CaretSortIcon className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? "bottom" : "right"}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <div className='h-14 w-14 rounded-lg flex items-center justify-center'>
                  {profile.role === "teacher" ? (
                    <FaChalkboardTeacher size={32} />
                  ) : (
                    <PiStudentBold size={32} />
                  )}
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{profile.name}</span>
                  <span className='truncate text-xs'>{profile.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className='gap-2 p-2 hover:bg-primary-light'>
                <VscAccount size={20} />
                {t("header.myprofile")}
              </DropdownMenuItem>
              <DropdownMenuItem className='gap-2 p-2 hover:bg-primary-light'>
                <FaMoneyBillWave size={20} />
                {t("header.billing")}
              </DropdownMenuItem>
              <DropdownMenuItem className='gap-2 p-2 hover:bg-primary-light'>
                <Bell size={20} />
                {t("header.notifications")}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='gap-2 p-2 hover:bg-primary-light '
              onClick={signout}
            >
              <LogOut size={20} />
              {t("generals.signout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
