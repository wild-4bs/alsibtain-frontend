import ApiClient from "@/lib/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/providers/queryClientProvider";

export type Updates = {
  thumbnail: { fileId: string; url: string };
  title: string;
  writtenBy: string;
  description: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type PaginatedUpdatesResponse = {
  payload: Updates[];
  total: number;
  page: number;
  lastPage: number;
  message: string;
};

export const useGetUpdates = ({
  search,
  params,
}: {
  search?: string;
  params?: {};
}) => {
  const endpoint = new ApiClient<any, PaginatedUpdatesResponse>(
    "/projects-updates"
  );
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["projects-updates", search],
    meta: { params: { ...(search ? { search } : {}) }, ...params },
  });
};
export const useGetUpdatesById = (id: string) => {
  const endpoint = new ApiClient<any, Updates>(`/projects-updates/${id}`);
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["projects-updates", id],
  });
};

export const useCreateUpdates = (scss: () => void) => {
  const endpoint = new ApiClient<any, any>("/projects-updates");
  return useMutation({
    mutationFn: endpoint.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects-updates"] });
      scss();
    },
  });
};
export const useUpdateUpdates = (scss: () => void) => {
  const endpoint = new ApiClient<any, any>("/projects-updates");
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string }) =>
      endpoint.put(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects-updates"] });
      scss();
    },
  });
};

export const useDeleteUpdates = () => {
  const endpoint = new ApiClient<any, any>("/projects-updates");
  return useMutation({
    mutationFn: (id: string) => endpoint.delete({}, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects-updates"] });
    },
  });
};
