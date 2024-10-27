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
        const response = await apiCall<ApiResponse<ProfileMe>>(
          "/user/me",
          undefined,
          undefined,
          options
        );
        return response.data ?? null;
      } catch (error) {
        return null;
      }
    },
  });

  return { profile, isLoading, isError, error };
};
