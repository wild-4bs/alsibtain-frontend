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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useCreateTestimonial } from "@/services/testimonials";
import { Plus, Upload, X, Star } from "lucide-react";
import { FormEvent, useState } from "react";

export const CreateButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [testimonial, setTestimonial] = useState("");
  const [stars, setStars] = useState<number>(5);

  const { mutate, isPending, error } = useCreateTestimonial();

  const createTestimonial = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const testimonialData = new FormData();
    testimonialData.append("clientType", form.get("clientType") as string);
    testimonialData.append("location", form.get("location") as string);
    testimonialData.append("testimonial", testimonial);
    testimonialData.append("stars", stars.toString());

    if (imageFile) testimonialData.append("image", imageFile);

    mutate(testimonialData as any, {
      onSuccess: () => {
        setIsOpen(false);
        setImageFile(null);
        setTestimonial("");
        setStars(5);
      },
    });
  };

  const FileUploadField = ({
    label,
    file,
    setFile,
    accept,
    error,
  }: {
    label: string;
    file: File | null;
    setFile: (file: File | null) => void;
    accept: string;
    error?: string;
  }) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
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
          {file ? file.name : `Upload ${label}`}
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
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={16} />
          Create Testimonial
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a New Testimonial</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4 p-4 pb-0"
          onSubmit={createTestimonial}
        >
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-subtitle-color">
              Client Information
            </h3>

            <InputField
              label="Client Type / Name"
              placeholder="Enter client name or type"
              name="clientType"
              error={(error as any)?.fieldErrors?.clientType}
            />

            <InputField
              label="Location"
              placeholder="Enter client location"
              name="location"
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
              {isPending ? "Creating..." : "Create Testimonial"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
