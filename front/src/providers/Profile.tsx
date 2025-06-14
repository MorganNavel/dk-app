"user client";
import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProfileMe } from "@/types/User";
import { apiCall } from "@/utils/apiCall";

interface ProfileContextType {
  profile: ProfileMe;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery<ProfileMe | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const options: RequestInit = {
          credentials: "include",
        };
        const data = await apiCall<ProfileMe>(
          "/user/me",
          undefined,
          undefined,
          options
        );
        return data;
      } catch (error) {
        return null;
      }
    },
  });

  const value = useMemo(
    () => ({
      profile: profile ?? {
        idUser: -1,
        name: "",
        firstname: "",
        email: "",
        role: "anonymous",
        description: "",
      },
      isLoading,
      isError,
      error,
    }),
    [profile, isLoading, isError, error]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
