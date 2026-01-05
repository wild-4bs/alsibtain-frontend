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
import { useCreateNews } from "@/services/latest-news";
import { Plus, Upload, X } from "lucide-react";
import { FormEvent, useState } from "react";

export const CreateButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const [activeLang, setActiveLang] = useState<"ar" | "en">("ar");
  const [title, setTitle] = useState({ ar: "", en: "" });
  const [caption, setCaption] = useState({ ar: "", en: "" });
  const [writtenBy, setWrittenBy] = useState({ ar: "", en: "" });
  const [category, setCategory] = useState({ ar: "", en: "" });

  const { mutate, isPending, error } = useCreateNews(() => {
    setIsOpen(false);
    setThumbnailFile(null);
    setTitle({ ar: "", en: "" });
    setCaption({ ar: "", en: "" });
    setWrittenBy({ ar: "", en: "" });
    setCategory({ ar: "", en: "" });
  });

  const createNews = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", JSON.stringify(title));
    formData.append("caption", JSON.stringify(caption));
    formData.append("writtenBy", JSON.stringify(writtenBy));
    formData.append("category", JSON.stringify(category));

    if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

    mutate(formData as any);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={16} />
          Create News
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a New News Article</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4 p-4 pb-0" onSubmit={createNews}>
          {/* Language Tabs */}
          <div className="flex gap-2 mb-4">
            <Button
              type="button"
              variant={activeLang === "ar" ? "default" : "outline"}
              onClick={() => setActiveLang("ar")}
            >
              Arabic
            </Button>
            <Button
              type="button"
              variant={activeLang === "en" ? "default" : "outline"}
              onClick={() => setActiveLang("en")}
            >
              English
            </Button>
          </div>

          <InputField
            label="Title"
            placeholder="Enter news title"
            name={`title-${activeLang}`}
            value={title[activeLang]}
            onChange={(v) => setTitle({ ...title, [activeLang]: v as string })}
            error={(error as any)?.fieldErrors?.title}
          />

          <TextareaField
            label="Caption"
            placeholder="Enter news caption"
            name={`caption-${activeLang}`}
            value={caption[activeLang]}
            onChange={(v) =>
              setCaption({ ...caption, [activeLang]: v as string })
            }
            error={(error as any)?.fieldErrors?.caption}
          />

          <InputField
            label="Written By"
            placeholder="Enter author name"
            name={`writtenBy-${activeLang}`}
            value={writtenBy[activeLang]}
            onChange={(v) =>
              setWrittenBy({ ...writtenBy, [activeLang]: v as string })
            }
            error={(error as any)?.fieldErrors?.writtenBy}
          />

          <InputField
            label="Category"
            placeholder="Enter news category"
            name={`category-${activeLang}`}
            value={category[activeLang]}
            onChange={(v) =>
              setCategory({ ...category, [activeLang]: v as string })
            }
            error={(error as any)?.fieldErrors?.category}
          />

          {/* Thumbnail Upload */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-sm font-semibold text-subtitle-color">
              Thumbnail
            </h3>

            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => {
                    const target = e.target as HTMLInputElement;
                    if (target.files?.[0]) setThumbnailFile(target.files[0]);
                  };
                  input.click();
                }}
              >
                <Upload size={16} className="mr-2" />
                {thumbnailFile ? thumbnailFile.name : "Upload Thumbnail"}
              </Button>

              {thumbnailFile && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setThumbnailFile(null)}
                >
                  <X size={16} />
                </Button>
              )}

              {(error as any)?.fieldErrors?.thumbnail && (
                <span className="text-xs text-red-500">
                  {(error as any)?.fieldErrors?.thumbnail}
                </span>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button className="w-full" disabled={isPending}>
              {isPending ? "Creating..." : "Create News"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
