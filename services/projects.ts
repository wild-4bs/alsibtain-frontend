import ApiClient from "@/lib/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/providers/queryClientProvider";

// Base types
export type LangForm = {
  ar: string;
  en: string;
};

export type AssetType = {
  fileId: string;
  url: string;
  _id?: string;
};

// Project type matching your schema
export type Project = {
  _id: string;
  name: LangForm;
  caption: LangForm;
  logo: AssetType;
  background: AssetType;
  projectFullName: LangForm;
  location: LangForm;
  totalArea: string;
  totalResidentialUnits: string;
  unitType: LangForm;
  description: LangForm;
  introduction: {
    thumbnail: AssetType;
    video: AssetType;
    _id?: string;
  };
  imageGallery?: AssetType[];
  videoGallery?: AssetType[];
  showUrukCity360: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

// API Response type (if you have pagination)
export type ProjectsResponse = {
  payload: Project[];
  total: number;
  page: number;
  lastPage: number;
};

// For create/update operations
export type CreateProjectDTO = Omit<
  Project,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;

export type UpdateProjectDTO = Partial<CreateProjectDTO>;

// Query params for getting projects
export type GetProjectsParams = {
  search?: string;
  page?: number;
  limit?: number;
  showUrukCity360?: boolean;
};

export type FileAsset = {
  _id: string;
  fileId: string;
  url: string;
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
