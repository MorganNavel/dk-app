"use client";
import { ProfileProvider } from "@/providers/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>{children}</ProfileProvider>
    </QueryClientProvider>
  );
};
