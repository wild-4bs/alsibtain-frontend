import ApiClient from "@/lib/apiClient";
import { GalleryImage } from "@/types/gallery";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/providers/queryClientProvider";
import { Job } from "./jobs";
import { toast } from "sonner";

export type FileAsset = {
  _id: string;
  fileId: string;
  url: string;
};

export type Application = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;

  job?: Job;

  coverLetter: FileAsset;
  cv: FileAsset;

  startDate: string;

  createdAt: string;
  updatedAt: string;
};

export type PaginatedResponse<T> = {
  payload: T[];
  total: number;
  page: number;
  lastPage: number;
};

export type ApplicationsResponse = PaginatedResponse<Application>;

export const useGetApplications = ({ search }: { search: string }) => {
  const endpoint = new ApiClient<any, ApplicationsResponse>("/applications");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["applications", search],
    meta: { ...(search ? { params: { search } } : {}) },
  });
};

export const useCreateApplication = (scss: () => void) => {
  const endpoint = new ApiClient<any, any>("/applications");
  return useMutation({
    mutationFn: endpoint.post,
    onError: (err) => {
      toast.error(err?.message);
    },
    onSuccess: () => {
      scss();
    },
  });
};

export const useDeleteApplicaiton = () => {
  const endpoint = new ApiClient<any, any>("/applications");
  return useMutation({
    mutationFn: (id: string) => endpoint.delete({}, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};
