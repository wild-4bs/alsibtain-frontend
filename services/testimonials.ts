import ApiClient from "@/lib/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/providers/queryClientProvider";
import { Job } from "./jobs";

export type Testimonial = {
  image: { fileId: string; url: string };
  clientType: string;
  location: string;
  testimonial: string;
  stars: number;
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

export type TestimonailResponse = PaginatedResponse<Testimonial>;

export const useGetTestimonials = ({ search }: { search?: string }) => {
  const endpoint = new ApiClient<any, TestimonailResponse>("/testimonials");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["testimonials", search],
    meta: { ...(search ? { params: { search, fields: "name" } } : {}) },
  });
};
export const useGetTestimonialById = (id: string) => {
  const endpoint = new ApiClient<any, Testimonial>(`/testimonials/${id}`);
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["testimonials", id],
  });
};

export const useCreateTestimonial = () => {
  const endpoint = new ApiClient<any, any>("/testimonials");
  return useMutation({
    mutationFn: endpoint.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
};

export const useUpdateTestimonial = () => {
  const endpoint = new ApiClient<any, any>("/testimonials");
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string }) =>
      endpoint.put(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
};

export const useDeleteTestimonial = () => {
  const endpoint = new ApiClient<any, any>("/testimonials");
  return useMutation({
    mutationFn: (id: string) => endpoint.delete({}, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
};
