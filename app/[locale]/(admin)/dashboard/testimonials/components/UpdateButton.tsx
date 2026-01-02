"use client";
import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  useGetTestimonialById,
  useUpdateTestimonial,
} from "@/services/testimonials";
import { Edit, Upload, X, Star } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

interface Props {
  testimonialId: string;
}

export const UpdateTestimonialButton = ({ testimonialId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [testimonial, setTestimonial] = useState("");
  const [stars, setStars] = useState<number>(5);

  const { data: testimonialResponse, isLoading } =
    useGetTestimonialById(testimonialId);
  const testimonialData = testimonialResponse;

  const { mutate, isPending, error } = useUpdateTestimonial();

  useEffect(() => {
    if (testimonialData?.testimonial) {
      setTestimonial(testimonialData.testimonial);
    }
    if (testimonialData?.stars !== undefined) {
      setStars(testimonialData.stars);
    }
  }, [testimonialData]);

  const updateTestimonial = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const updateData = new FormData();
    updateData.append("clientType", form.get("clientType") as string);
    updateData.append("location", form.get("location") as string);
    updateData.append("testimonial", testimonial);
    updateData.append("stars", stars.toString());

    if (imageFile) updateData.append("image", imageFile);

    mutate(
      {
        id: testimonialId,
        data: updateData as any,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  };

  const FileUploadField = ({
    label,
    file,
    setFile,
    accept,
    currentUrl,
    error,
  }: {
    label: string;
    file: File | null;
    setFile: (file: File | null) => void;
    accept: string;
    currentUrl?: string;
    error?: string;
  }) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      {currentUrl && !file && (
        <div className="text-xs text-subtitle-color mb-1">
          Current: {currentUrl.split("/").pop()}
        </div>
      )}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = accept;
            input.onchange = (e) => {
              const target = e.target as HTMLInputElement;
              if (target.files?.[0]) {
                setFile(target.files[0]);
              }
            };
            input.click();
          }}
        >
          <Upload size={16} className="mr-2" />
          {file ? file.name : `Upload New ${label}`}
        </Button>
        {file && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setFile(null)}
          >
            <X size={16} />
          </Button>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );

  const StarRating = ({
    value,
    onChange,
  }: {
    value: number;
    onChange: (value: number) => void;
  }) => (
    <div className="flex flex-col gap-2">
      <Label>Rating</Label>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="transition-colors"
          >
            <Star
              size={24}
              className={
                star <= value
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-600 hover:text-gray-400"
              }
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-subtitle-color">({value}/5)</span>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="justify-start gap-2">
          <Edit size={14} /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Testimonial</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <form
            className="flex flex-col gap-4 p-4 pb-0"
            onSubmit={updateTestimonial}
          >
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-subtitle-color">
                Client Information
              </h3>

              <InputField
                label="Client Type / Name"
                name="clientType"
                defaultValue={testimonialData?.clientType}
                error={(error as any)?.fieldErrors?.clientType}
              />

              <InputField
                label="Location"
                name="location"
                defaultValue={testimonialData?.location}
                error={(error as any)?.fieldErrors?.location}
              />
            </div>

            <div className="space-y-4 border-t pt-4">
              <h3 className="text-sm font-semibold text-subtitle-color">
                Client Image
              </h3>

              <FileUploadField
                label="Image"
                file={imageFile}
                setFile={setImageFile}
                accept="image/*"
                currentUrl={testimonialData?.image?.url}
                error={(error as any)?.fieldErrors?.image}
              />
            </div>

            <div className="space-y-4 border-t pt-4">
              <h3 className="text-sm font-semibold text-subtitle-color">
                Testimonial Details
              </h3>

              <StarRating value={stars} onChange={setStars} />

              <TextareaField
                label="Testimonial"
                value={testimonial}
                onChange={(e) => setTestimonial(e as string)}
                placeholder="Enter the client's testimonial"
              />
            </div>

            <DialogFooter>
              <Button className="w-full" disabled={isPending}>
                {isPending ? "Updating..." : "Update Testimonial"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
