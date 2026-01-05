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
import { FormEvent, useState, useEffect } from "react";

interface Props {
  newsId: string;
}

export const UpdateNewsButton = ({ newsId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [activeLang, setActiveLang] = useState<"ar" | "en">("ar");

  // State for all multilingual fields
  const [title, setTitle] = useState({ ar: "", en: "" });
  const [caption, setCaption] = useState({ ar: "", en: "" });
  const [writtenBy, setWrittenBy] = useState({ ar: "", en: "" });
  const [category, setCategory] = useState({ ar: "", en: "" });

  const { data: news, isLoading } = useGetNewsById(newsId);

  const { mutate, isPending, error } = useUpdateNews(() => {
    setIsOpen(false);
    setThumbnailFile(null);
    setActiveLang("ar");
  });

  // Load existing data when news loads
  useEffect(() => {
    if (news) {
      setTitle(news.title || { ar: "", en: "" });
      setCaption(news.caption || { ar: "", en: "" });
      setWrittenBy(news.writtenBy || { ar: "", en: "" });
      setCategory(news.category || { ar: "", en: "" });
    }
  }, [news]);

  const updateNews = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newsData = new FormData();

    // Send complete multilingual objects as JSON strings
    newsData.append("title", JSON.stringify(title));
    newsData.append("caption", JSON.stringify(caption));
    newsData.append("writtenBy", JSON.stringify(writtenBy));
    newsData.append("category", JSON.stringify(category));

    if (thumbnailFile) {
      newsData.append("thumbnail", thumbnailFile);
    }

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
  }: {
    label: string;
    file: File | null;
    setFile: (file: File | null) => void;
    accept: string;
    currentUrl?: string;
  }) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>

      {currentUrl && !file && (
        <p className="text-xs text-subtitle-color">
          Current: {currentUrl.split("/").pop()}
        </p>
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
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) setFile(file);
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
          <form onSubmit={updateNews} className="flex flex-col gap-6 p-4 pb-0">
            {/* LANGUAGE TABS */}
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

            {/* Form fields for active language */}
            <div className="space-y-4">
              <InputField
                label="Title"
                placeholder={`Enter title in ${
                  activeLang === "ar" ? "Arabic" : "English"
                }`}
                value={title[activeLang]}
                onChange={(v) =>
                  setTitle({ ...title, [activeLang]: v as string })
                }
                error={(error as any)?.fieldErrors?.title}
              />

              <TextareaField
                label="Caption"
                placeholder={`Enter caption in ${
                  activeLang === "ar" ? "Arabic" : "English"
                }`}
                value={caption[activeLang]}
                onChange={(v) =>
                  setCaption({ ...caption, [activeLang]: v as string })
                }
                error={(error as any)?.fieldErrors?.caption}
              />

              <InputField
                label="Written By"
                placeholder={`Enter author name in ${
                  activeLang === "ar" ? "Arabic" : "English"
                }`}
                value={writtenBy[activeLang]}
                onChange={(v) =>
                  setWrittenBy({ ...writtenBy, [activeLang]: v as string })
                }
                error={(error as any)?.fieldErrors?.writtenBy}
              />

              <InputField
                label="Category"
                placeholder={`Enter category in ${
                  activeLang === "ar" ? "Arabic" : "English"
                }`}
                value={category[activeLang]}
                onChange={(v) =>
                  setCategory({ ...category, [activeLang]: v as string })
                }
                error={(error as any)?.fieldErrors?.category}
              />
            </div>

            {/* THUMBNAIL */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-subtitle-color mb-4">
                Thumbnail
              </h3>
              <FileUploadField
                label="Thumbnail"
                file={thumbnailFile}
                setFile={setThumbnailFile}
                accept="image/*"
                currentUrl={news?.thumbnail?.url}
              />
            </div>

            <DialogFooter>
              <Button disabled={isPending} className="w-full">
                {isPending ? "Updating..." : "Update News"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
