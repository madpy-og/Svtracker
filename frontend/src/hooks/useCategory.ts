import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "../api/categoryApi";

export const categoryKeys = {
  all: ["categories"] as const,
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: getAllCategory,
  });
};
