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
import { useCreateUpdates } from "@/services/projects-updates";
import { Plus, Upload, X } from "lucide-react";
import { FormEvent, useState } from "react";

export const CreateButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const { mutate, isPending, error } = useCreateUpdates(() => {
    setIsOpen(false);
    setThumbnailFile(null);
  });

  const createUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const updateData = new FormData();
    updateData.append("title", form.get("title") as string);
    updateData.append("writtenBy", form.get("writtenBy") as string);
    updateData.append("description", form.get("description") as string);

    if (thumbnailFile) updateData.append("thumbnail", thumbnailFile);

    mutate(updateData as any);
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

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={16} />
          Create Update
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a New Project Update</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4 p-4 pb-0" onSubmit={createUpdate}>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-subtitle-color">
              Update Information
            </h3>

            <InputField
              label="Title"
              placeholder="Enter update title"
              name="title"
              error={(error as any)?.fieldErrors?.title}
            />

            <TextareaField
              label="Description"
              placeholder="Enter update description"
              name="description"
              error={(error as any)?.fieldErrors?.description}
            />

            <InputField
              label="Written By"
              placeholder="Enter author name"
              name="writtenBy"
              error={(error as any)?.fieldErrors?.writtenBy}
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
              error={(error as any)?.fieldErrors?.thumbnail}
            />
          </div>

          <DialogFooter>
            <Button className="w-full" disabled={isPending}>
              {isPending ? "Creating..." : "Create Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
