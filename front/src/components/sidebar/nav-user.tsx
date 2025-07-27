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
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaMoneyBillWave,
} from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { signOut, useSession } from "@/lib/auth-client";
import clsx from "clsx";
import Image from "next/image";
import { Badge } from "../ui/badge";

export function NavUser() {
  const { isMobile } = useSidebar();
  const t = useTranslations();
  const router = useRouter();
  const session = useSession();
  const user = session.data?.user;
  const signout = async () => {
    await signOut();
    router.refresh();
  };
  if (!user) return;

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
                {user.image && (
                  <Image
                    src={user.image}
                    alt={"Avatar"}
                    width={60}
                    height={60}
                  />
                )}
                {user.role === "teacher" && <FaChalkboardTeacher size={32} />}
                {user.role === "student" && <PiStudentBold size={32} />}
              </Avatar>
              <div className='flex flex-col flex-1 text-left leading-tight'>
                <span className='truncate font-semibold'>{user?.name}</span>
                <span className='truncate text-xs'>{user?.email}</span>
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
                  {user && user?.role === "teacher" && (
                    <FaChalkboardTeacher size={32} />
                  )}
                  {user && user?.role === "student" && (
                    <PiStudentBold size={32} />
                  )}
                </div>
                <div className='flex flex-col flex-1 text-left leading-tight'>
                  <span className='font-semibold text-sm truncate'>
                    {user?.name}
                  </span>
                  <span className='text-xs text-muted-foreground truncate'>
                    {user?.email}
                  </span>
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

export function SidebarRemainingLessons() {
  const t = useTranslations();
  const session = useSession();
  const { open } = useSidebar();
  const user = session.data?.user;

  if (!user || user.role !== "student") return null;

  const credits = user.credits ?? 0;
  if (!open)
    return (
      <div className='relative  flex items-center justify-center'>
        <FaBookOpen className='text-primary' />
        <Badge
          className={clsx(
            "absolute -top-5 -right-2",
            "h-4 min-w-[0.75rem] px-[0.25rem] text-[10px] leading-none",
            "rounded-full bg-primary text-primary-foreground font-medium"
          )}
        >
          {credits > 99 ? "99+" : credits}
        </Badge>
      </div>
    );

  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-4 py-2",
        "bg-primary/10 text-primary text-xs font-medium"
      )}
    >
      <FaBookOpen size={16} />
      <span>{t("header.remainingLessons", { count: credits })}</span>
    </div>
  );
}
