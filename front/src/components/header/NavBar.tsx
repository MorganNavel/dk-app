"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";
import React from "react";
import { cn } from "@/lib/utils";


export function Navbar({ className }: { className?: string }) {
  const t = useTranslations("header");
  const links = [
    { path: "/", label: t("home") },
    { path: "/park-danbee/profile", label: t("myprofile") },
    { path: "/about-us", label: t("aboutUs") },
    { path: "/contact", label: t("contact") },
  ];

  return (
    <div className={`${className} flex justify-between items-center`}>
      

      <NavigationMenu className="flex-grow flex justify-center">
        <NavigationMenuList className="flex space-x-13">
          {links.map((link) => (
            <NavigationMenuItem key={link.path}>
              <Link href={link.path} legacyBehavior passHref className="bg-transparent">
                <NavigationMenuLink className="relative text-xl font-semibold text-background py-2 transition-all duration-300 ease-in-out before:absolute before:w-full before:h-[3px] before:bg-white before:bottom-0 before:left-0 before:origin-left before:transform before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100">
                  {link.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="w-full"/>

     
    </div>
  );
}




const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
