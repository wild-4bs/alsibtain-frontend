import ApiClient from "@/lib/apiClient";
import { GalleryImage } from "@/types/gallery";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetVideos = () => {
  const endpoint = new ApiClient<any, GalleryImage[]>("/video");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["videos"],
  });
};

export const useCreateVideo = () => {
  const endpoint = new ApiClient<any, any>("/video");
  return useMutation({
    mutationFn: endpoint.post,
  });
};

export const useDeleteVideo = (id: string) => {
  const endpoint = new ApiClient<any, any>("/video");
  return useMutation({
    mutationFn: () => endpoint.delete({}, id),
  });
};
