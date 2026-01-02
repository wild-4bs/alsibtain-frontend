import ApiClient from "@/lib/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/providers/queryClientProvider";

export type News = {
  thumbnail: { fileId: string; url: string };
  title: string;
  writtenBy: string;
  caption: string;
  category: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type PaginatedNewsResponse = {
  payload: News[];
  total: number;
  page: number;
  lastPage: number;
  message: string;
};

export const useGetNews = ({
  search,
  params,
}: {
  search?: string;
  params?: {};
}) => {
  const endpoint = new ApiClient<any, PaginatedNewsResponse>("/latest-news");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["latest-news", search],
    meta: { params: { ...(search ? { search } : {}), ...params } },
  });
};
export const useGetNewsById = (id: string) => {
  const endpoint = new ApiClient<any, News>(`/latest-news/${id}`);
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["latest-news", id],
  });
};

export const useCreateNews = (scss: () => void) => {
  const endpoint = new ApiClient<any, any>("/latest-news");
  return useMutation({
    mutationFn: endpoint.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latest-news"] });
      scss();
    },
  });
};
export const useUpdateNews = (scss: () => void) => {
  const endpoint = new ApiClient<any, any>("/latest-news");
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string }) =>
      endpoint.put(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latest-news"] });
      scss();
    },
  });
};

export const useDeleteNews = () => {
  const endpoint = new ApiClient<any, any>("/latest-news");
  return useMutation({
    mutationFn: (id: string) => endpoint.delete({}, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latest-news"] });
    },
  });
};
