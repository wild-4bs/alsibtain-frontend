import ApiClient from "@/lib/apiClient";
import { GalleryImage } from "@/types/gallery";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/providers/queryClientProvider";
import { Job } from "./jobs";

export type FileAsset = {
  _id: string;
  fileId: string;
  url: string;
};

export type SliderProject = {
  video: FileAsset;
  name: string;
  area: string;
  location: string;
  link: string;
  projectLink: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
};

export const useGetSliderProjects = ({ search }: { search?: string }) => {
  const endpoint = new ApiClient<any, { projects: SliderProject[] }>(
    "/project-slider"
  );
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["project-slider", search],
    meta: { ...(search ? { params: { search } } : {}) },
  });
};
export const useGetProjectById = (id: string) => {
  const endpoint = new ApiClient<any, { project: SliderProject }>(
    `/project-slider/${id}`
  );
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["project-slider", id],
  });
};

export const useUpdateProject = (scss: () => void) => {
  const endpoint = new ApiClient<any, any>("/project-slider");
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string }) =>
      endpoint.put(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-slider"] });
      scss();
    },
  });
};

export const useCreateProject = (scss: () => void) => {
  const endpoint = new ApiClient<any, any>("/project-slider");
  return useMutation({
    mutationFn: endpoint.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-slider"] });
      scss();
    },
  });
};

export const useDeleteSlider = () => {
  const endpoint = new ApiClient<any, any>("/project-slider");
  return useMutation({
    mutationFn: (id: string) => endpoint.delete({}, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-slider"] });
    },
  });
};
