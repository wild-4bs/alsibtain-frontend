import ApiClient from "@/lib/apiClient";
import { queryClient } from "@/providers/queryClientProvider";
import { PageContent } from "@/types/pages";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdatePageContents = () => {
  const endpoint = new ApiClient<any, any>("/pages");
  return useMutation({
    mutationFn: (data: { pageName: string; sectionName: string; value: any }) =>
      endpoint.put(data),
    mutationKey: ["updatePageContents"],
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["getPageContents"] });
      toast.success(res.message);
    },
  });
};

export const useGetPageContents = (pageName: string) => {
  const endpoint = new ApiClient<any, PageContent>("/pages");
  return useQuery({
    queryKey: ["getPageContents", pageName],
    queryFn: endpoint.get,
    enabled: !!pageName,
    meta: { params: { name: pageName } },
  });
};
