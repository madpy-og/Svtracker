import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api/userApi";

export const userKeys = {
  profile: ["profile"] as const,
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: userKeys.profile,
    queryFn: getUserById,
  });
};
