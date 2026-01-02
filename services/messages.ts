import ApiClient from "@/lib/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/providers/queryClientProvider";
import { Job } from "./jobs";

export type Message = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedResponse<T> = {
  payload: T[];
  total: number;
  page: number;
  lastPage: number;
};

export type MessagesResponse = PaginatedResponse<Message>;

export const useGetMessages = ({ search }: { search: string }) => {
  const endpoint = new ApiClient<any, MessagesResponse>("/messages");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["messages", search],
    meta: { ...(search ? { params: { search } } : {}) },
  });
};

export const useCreateMessage = (scss: () => void) => {
  const endpoint = new ApiClient<any, any>("/messages");
  return useMutation({
    mutationFn: endpoint.post,
    onSuccess: () => {
      scss();
    },
  });
};

export const useDeleteMessage = () => {
  const endpoint = new ApiClient<any, any>("/messages");
  return useMutation({
    mutationFn: (id: string) => endpoint.delete({}, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};
