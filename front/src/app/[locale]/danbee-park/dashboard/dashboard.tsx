"use client";

import { useSession } from "@/lib/auth-client";

export function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = useSession();
  if (user.isPending || !user || user.data?.user.role !== "teacher")
    return <div className='min-h-screen' />;
  return (
    <div className='mx-5 lg:mx-15 min-h-screen pt-32 flex flex-col gap-6'>
      {children}
    </div>
  );
}
