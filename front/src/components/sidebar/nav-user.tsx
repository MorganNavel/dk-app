"use client"

import {
  BadgeCheck,
  Bell,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { FaChalkboardTeacher } from "react-icons/fa";
import { UserProfile } from "@/types/User"
import { PiStudentBold } from "react-icons/pi";
import { FaMoneyBillWave } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";

export function NavUser() {
  const user : UserProfile = {
    idUser: 1,
      firstname: "Danbee",
      name: "Park",
      email: "danbee.korean@gmail.com",
      languages: ["ko", "en"],
      description: "Danbee Korean is a language learning platform for Korean language.",
      role: "teacher",
  }
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {user.role === "teacher" ? (
                  <FaChalkboardTeacher size={32}/>
                ) : (
                  <PiStudentBold size={32}/>
                )}
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <CaretSortIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="h-14 w-14 rounded-lg flex items-center justify-center">
                  {user.role === "teacher" ? (
                    <FaChalkboardTeacher size={32} /> 
                  ) : (
                    <PiStudentBold size={32} /> 
                  )}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuSeparator />
            <DropdownMenuGroup >
              <DropdownMenuItem className="gap-2 p-2 hover:bg-primary-light">
                <VscAccount size={20}/>
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 p-2 hover:bg-primary-light">
                <FaMoneyBillWave size={20}/>
                Billing
              </DropdownMenuItem >
              <DropdownMenuItem className="gap-2 p-2 hover:bg-primary-light">
                <Bell size={20}/>
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2 hover:bg-primary-light">
              <LogOut size={20}/>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
