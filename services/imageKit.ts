import ApiClient from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";
import { UploadResponse } from "imagekit/dist/libs/interfaces";

export interface ImageKitFileResponse {
  fileId: string;
  name: string;
  size: number;
  versionInfo: {
    id: string;
    name: string;
  };
  filePath: string;
  url: string;
  fileType: "image" | "video" | string;
  height?: number;
  width?: number;
  thumbnailUrl?: string;
  AITags?: string[] | null;
  description?: string | null;
}

export const useUploadToImageKit = () => {
  const endpoint = new ApiClient<any, ImageKitFileResponse>("/files/upload");
  return useMutation({
    mutationFn: endpoint.post,
  });
};

export const useDeleteFromImageKit = (
  scss?: (res: { message: string }) => void
) => {
  return useMutation({
    mutationFn: (data: { fileId: string }) =>
      new ApiClient<any, { message: string }>(
        `/files/delete?fileId=${data?.fileId}`
      ).delete(),
    onSuccess: (res) => {
      scss && scss(res);
    },
    onError: (err)=>{
      console.log(err)
    }
  });
};

export const useReplaceImage = () => {
  const uploadMutation = useUploadToImageKit();
  const deleteMutation = useDeleteFromImageKit(() => {});

  const replaceImage = async (oldFileId: string, newImage: FormData) => {
    await deleteMutation.mutateAsync({ fileId: oldFileId });
    return uploadMutation.mutateAsync(newImage);
  };

  return {
    replaceImage,
    isReplacing: uploadMutation.isPending || deleteMutation.isPending,
  };
};
