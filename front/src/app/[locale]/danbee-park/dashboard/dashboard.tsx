"use client";

import { useSession } from "@/lib/auth-client";
import { notFound } from "next/navigation";

export function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = useSession();
  if (user.isPending) return <div className='min-h-screen' />;
  if (!user || user.data?.user.role !== "teacher") notFound();
  return (
    <div className='mx-5 lg:mx-15 min-h-screen pt-32 flex flex-col gap-6'>
      {children}
    </div>
  );
}
