"use client";

import { type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { ComponentType } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/routing";
import { UserRole } from "@/types/User";
import { useSession } from "@/lib/auth-client";
import { UserProfile } from "@/types/type";
export interface NavMainProps {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon | ComponentType;
    isActive?: boolean;
    items?: {
      right?: UserRole;
      title: string;
      url: string;
    }[];
  }[];
}

export function NavMain({
  items,
}: Readonly<{
  items: {
    title: string;
    url: string;
    icon?: LucideIcon | ComponentType;
    isActive?: boolean;
    items?: {
      right?: UserRole;
      title: string;
      url: string;
    }[];
  }[];
}>) {
  const router = useRouter();

  const { open, isMobile, setOpenMobile } = useSidebar();
  const t = useTranslations();
  const user = useSession();
  const profile = user.data?.user as unknown as UserProfile;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Danbee Korean</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (!item.items) {
            return (
              <SidebarMenuItem key={item.title}>
                <Link
                  href={`/${item.url}`}
                  onClick={() => isMobile && setOpenMobile(false)}
                >
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{t(item.title)}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className='group/collapsible'
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    onClick={() => {
                      if (!open && item.url) {
                        router.push(`/${item.url}`);
                      }
                    }}
                    tooltip={item.title}
                  >
                    {item.icon && <item.icon />}
                    <span>{t(item.title)}</span>
                    <ChevronRightIcon className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      if (subItem.right && !profile) return null;
                      if (subItem.right && profile?.role !== subItem.right)
                        return null;

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link
                              href={`/${subItem.url}`}
                              passHref
                              onClick={() => isMobile && setOpenMobile(false)}
                            >
                              <span>{t(subItem.title)}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
