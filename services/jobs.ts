import ApiClient from "@/lib/apiClient";
import { GalleryImage } from "@/types/gallery";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Category } from "./categories";
import { Application } from "./applications";
import { queryClient } from "@/providers/queryClientProvider";
import { LangForm } from "./projects";

export type Job = {
  _id: string;
  title: LangForm;
  experience: LangForm;
  deadline: string;
  category: Category;
  applications: Application[];
  vacancy: number;
  description?: LangForm;
  location?: LangForm;
  jobType?: LangForm;
  workingHours?: LangForm;
  workingDays?: LangForm;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type PaginatedJobsResponse = {
  payload: Job[];
  total: number;
  page: number;
  lastPage: number;
  message: string;
};

export const useGetJobs = ({ search }: { search: string }) => {
  const endpoint = new ApiClient<any, PaginatedJobsResponse>("/jobs");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["jobs", search],
    meta: { params: { search } },
  });
};
export const useGetJobById = (id: string) => {
  const endpoint = new ApiClient<any, Job>(`/jobs/${id}`);
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["jobs", id],
  });
};

export const useCreateJob = (scss: () => void) => {
  const endpoint = new ApiClient<any, any>("/jobs");
  return useMutation({
    mutationFn: endpoint.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      scss();
    },
  });
};
export const useUpdateJob = (scss: () => void) => {
  const endpoint = new ApiClient<any, any>("/jobs");
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string }) =>
      endpoint.put(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      scss();
    },
  });
};

export const useDeleteJob = () => {
  const endpoint = new ApiClient<any, any>("/jobs");
  return useMutation({
    mutationFn: (id: string) => endpoint.delete({}, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};
