import ApiClient from "@/lib/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Job } from "./jobs";
import { queryClient } from "@/providers/queryClientProvider";

export type Category = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  jobs: Job[]; // Array of jobs
  totalJobs: number;
};

export type PaginatedCategoriesResponse = {
  categories: Category[];
  totalCategories: number;
  page: number;
  lastPage: number;
  message: string;
};

export const useGetCategories = ({ name }: { name?: string }) => {
  const endpoint = new ApiClient<any, PaginatedCategoriesResponse>(
    "/categories"
  );
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["categories", name],
    meta: { params: { ...(name ? { search: name } : {}) } },
  });
};

export const useGetCategoryById = (id: string) => {
  const endpoint = new ApiClient<any, Category>(`/categories/${id}`);
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["categories", id],
  });
};

export const useCreateCategory = (scss: () => void) => {
  const endpoint = new ApiClient<any, any>("/categories");
  return useMutation({
    mutationFn: endpoint.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      scss();
    },
  });
};

export const useDeleteCategory = () => {
  const endpoint = new ApiClient<any, any>("/categories");
  return useMutation({
    mutationFn: (id: string) => endpoint.delete({}, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
