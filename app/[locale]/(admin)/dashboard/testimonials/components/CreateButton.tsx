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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateTestimonial } from "@/services/testimonials";
import { Plus, Upload, X, Star } from "lucide-react";
import { FormEvent, useState } from "react";

export const CreateButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [stars, setStars] = useState<number>(5);
  const [lang, setLang] = useState<"ar" | "en">("ar");

  const [clientType, setClientType] = useState({ ar: "", en: "" });
  const [location, setLocation] = useState({ ar: "", en: "" });
  const [testimonialText, setTestimonialText] = useState({ ar: "", en: "" });

  const { mutate, isPending, error } = useCreateTestimonial();
  const fieldErrors = (error as any)?.fieldErrors || {};

  const hasLangError = (l: "ar" | "en") =>
    Object.keys(fieldErrors).some((key) => key.endsWith(`.${l}`));

  const createTestimonial = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const testimonialData = new FormData();
    testimonialData.append("clientType", JSON.stringify(clientType));
    testimonialData.append("location", JSON.stringify(location));
    testimonialData.append("testimonial", JSON.stringify(testimonialText));
    testimonialData.append("stars", stars.toString());
    if (imageFile) testimonialData.append("image", imageFile);

    mutate(testimonialData as any, {
      onSuccess: () => {
        setIsOpen(false);
        setImageFile(null);
        setStars(5);
        setClientType({ ar: "", en: "" });
        setLocation({ ar: "", en: "" });
        setTestimonialText({ ar: "", en: "" });
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
              if (target.files?.[0]) setFile(target.files[0]);
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

      <DialogContent className="px-0!">
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

            <Tabs value={lang} onValueChange={(v) => setLang(v as "ar" | "en")}>
              <TabsList
                className="grid grid-cols-2 w-full"
                variant={"bordered"}
              >
                <TabsTrigger
                  value="ar"
                  className={
                    hasLangError("ar") ? "text-red-500 border-red-500" : ""
                  }
                >
                  Arabic
                </TabsTrigger>
                <TabsTrigger
                  value="en"
                  className={
                    hasLangError("en") ? "text-red-500 border-red-500" : ""
                  }
                >
                  English
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ar" className="space-y-4 mt-4">
                <InputField
                  label="Client Name (AR)"
                  value={clientType.ar}
                  onChange={(v) =>
                    setClientType((p) => ({ ...p, ar: v as string }))
                  }
                  error={fieldErrors["clientType.ar"]}
                />
                <InputField
                  label="Location & client type (AR)"
                  value={location.ar}
                  onChange={(v) =>
                    setLocation((p) => ({ ...p, ar: v as string }))
                  }
                  error={fieldErrors["location.ar"]}
                />
                <TextareaField
                  label="Testimonial (AR)"
                  value={testimonialText.ar}
                  onChange={(v) =>
                    setTestimonialText((p) => ({ ...p, ar: v as string }))
                  }
                  error={fieldErrors["testimonial.ar"]}
                />
              </TabsContent>

              <TabsContent value="en" className="space-y-4 mt-4">
                <InputField
                  label="Client Name (EN)"
                  value={clientType.en}
                  onChange={(v) =>
                    setClientType((p) => ({ ...p, en: v as string }))
                  }
                  error={fieldErrors["clientType.en"]}
                />
                <InputField
                  label="Location & Client type (EN)"
                  value={location.en}
                  onChange={(v) =>
                    setLocation((p) => ({ ...p, en: v as string }))
                  }
                  error={fieldErrors["location.en"]}
                />
                <TextareaField
                  label="Testimonial (EN)"
                  value={testimonialText.en}
                  onChange={(v) =>
                    setTestimonialText((p) => ({ ...p, en: v as string }))
                  }
                  error={fieldErrors["testimonial.en"]}
                />
              </TabsContent>
            </Tabs>
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
              error={fieldErrors["image"]}
            />
          </div>

          <div className="space-y-4 border-t pt-4">
            <h3 className="text-sm font-semibold text-subtitle-color">
              Testimonial Details
            </h3>
            <StarRating value={stars} onChange={setStars} />
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
