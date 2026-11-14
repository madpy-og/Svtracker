import { useQuery } from "@tanstack/react-query";
import { getAllSource } from "../api/sourceApi";

export const sourceKeys = {
  all: ["sources"] as const,
};

export const useGetSources = () => {
  return useQuery({
    queryKey: sourceKeys.all,
    queryFn: getAllSource,
  });
};
