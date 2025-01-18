import { useQuery } from "@tanstack/react-query";
import { ProfileMe } from "@/types/User";
import { apiCall } from "@/utils/apiCall";

export const useProfile = () => {
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
        return data ?? null;
      } catch (error) {
        return null;
      }
    },
  });
  return { profile, isLoading, isError, error };
};
