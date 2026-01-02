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

export type Project = {
  name: string;
  caption: string;
  logo: FileAsset;
  background: FileAsset;
  projectFullName: string;
  location: string;
  totalArea: string;
  totalResidentialUnits: string;
  unitType: string;
  description: string;
  introduction: {
    thumbnail: FileAsset;
    video: FileAsset;
  };
  showUrukCity360: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
};

export const useGetProjects = ({ search }: { search?: string }) => {
  const endpoint = new ApiClient<any, Project[]>("/projects");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["projects", search],
    meta: { ...(search ? { params: { search } } : {}) },
  });
};
export const useGetProjectById = (id: string) => {
  const endpoint = new ApiClient<any, Project>(`/projects/${id}`);
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["projects", id],
  });
};

export const useUpdateProject = (scss: () => void) => {
  const endpoint = new ApiClient<any, any>("/projects");
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string }) =>
      endpoint.put(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      scss();
    },
  });
};

export const useCreateProject = (scss: () => void) => {
  const endpoint = new ApiClient<any, any>("/projects");
  return useMutation({
    mutationFn: endpoint.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      scss();
    },
  });
};

export const useDeleteProject = () => {
  const endpoint = new ApiClient<any, any>("/projects");
  return useMutation({
    mutationFn: (id: string) => endpoint.delete({}, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
