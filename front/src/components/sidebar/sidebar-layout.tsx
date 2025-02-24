"use client";

import { ReactNode } from "react";
import { SidebarInset, SidebarTrigger, useSidebar } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Separator } from "../ui/separator";

export const SidebarLayout = ({ children }: { children: ReactNode }) => {
  const { open } = useSidebar();
  return (
    <>
      <AppSidebar />
      <SidebarInset
        className={`static flex flex-col transition-all duration-300 ease-in-out ${
          open ? " w-[calc(100%-16rem)]" : " w-[calc(100%-4rem)]"
        }`}
      >
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
          </div>
        </header>
        {children}
      </SidebarInset>
    </>
  );
};
