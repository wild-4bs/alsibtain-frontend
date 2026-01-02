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
import { useGetNewsById, useUpdateNews } from "@/services/latest-news";
import { Edit, Upload, X } from "lucide-react";
import { FormEvent, useState } from "react";

interface Props {
  newsId: string;
}

export const UpdateNewsButton = ({ newsId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const { data: newsResponse, isLoading } = useGetNewsById(newsId);
  const news = newsResponse;

  const { mutate, isPending, error } = useUpdateNews(() => {
    setIsOpen(false);
  });

  const updateNews = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const newsData = new FormData();
    newsData.append("title", form.get("title") as string);
    newsData.append("writtenBy", form.get("writtenBy") as string);
    newsData.append("caption", form.get("caption") as string);
    newsData.append("category", form.get("category") as string);

    if (thumbnailFile) newsData.append("thumbnail", thumbnailFile);

    mutate({
      id: newsId,
      data: newsData as any,
    });
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="justify-start gap-2">
          <Edit size={14} /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update News Article</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <form className="flex flex-col gap-4 p-4 pb-0" onSubmit={updateNews}>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-subtitle-color">
                Article Information
              </h3>

              <InputField
                label="Title"
                name="title"
                defaultValue={news?.title}
                error={(error as any)?.fieldErrors?.title}
              />

              <TextareaField
                label="Caption"
                name="caption"
                defaultValue={news?.caption}
                error={(error as any)?.fieldErrors?.caption}
              />

              <InputField
                label="Written By"
                name="writtenBy"
                defaultValue={news?.writtenBy}
                error={(error as any)?.fieldErrors?.writtenBy}
              />

              <InputField
                label="Category"
                name="category"
                defaultValue={news?.category}
                error={(error as any)?.fieldErrors?.category}
              />
            </div>

            <div className="space-y-4 border-t pt-4">
              <h3 className="text-sm font-semibold text-subtitle-color">
                Thumbnail
              </h3>

              <FileUploadField
                label="Thumbnail"
                file={thumbnailFile}
                setFile={setThumbnailFile}
                accept="image/*"
                currentUrl={news?.thumbnail?.url}
                error={(error as any)?.fieldErrors?.thumbnail}
              />
            </div>

            <DialogFooter>
              <Button className="w-full" disabled={isPending}>
                {isPending ? "Updating..." : "Update News"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
