"use client";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/dashboard/dynamic-sections";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetProjects } from "@/services/projects";
import { useCreateProject } from "@/services/slider-projects";
import { Play, Upload, X } from "lucide-react";
import { FormEvent, useState } from "react";

export const CreateButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // File state
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const { mutate, isPending, error } = useCreateProject(() => {
    setIsOpen(false);
    setVideoFile(null);
  });

  const { data } = useGetProjects({});

  const createProjectSlider = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    // Create FormData with files
    const projectSliderData = new FormData();
    projectSliderData.append("name", form.get("name") as string);
    projectSliderData.append("area", form.get("area") as string);
    projectSliderData.append("location", form.get("location") as string);

    const link = form.get("link") as string;
    const projectLink = form.get("projectLink") as string;

    if (link) projectSliderData.append("link", link);
    if (projectLink) projectSliderData.append("projectLink", projectLink);

    // Append video file
    if (videoFile) projectSliderData.append("video", videoFile);

    mutate(projectSliderData as any);
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
          <Play size={16} />
          Create Slider
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a New Project Slider</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4 p-4 pb-0"
          onSubmit={createProjectSlider}
        >
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-subtitle-color">
              Basic Information
            </h3>

            <InputField
              label="Name"
              placeholder="Enter slider name"
              name="name"
              error={(error as any)?.fieldErrors?.name}
            />

            <InputField
              label="Area"
              placeholder="e.g., 5,000 sq m"
              name="area"
              error={(error as any)?.fieldErrors?.area}
            />

            <InputField
              label="Location"
              placeholder="Enter location"
              name="location"
              error={(error as any)?.fieldErrors?.location}
            />
          </div>

          {/* Video File */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-sm font-semibold text-subtitle-color">Video</h3>

            <FileUploadField
              label="Video"
              file={videoFile}
              setFile={setVideoFile}
              accept="video/*"
              error={(error as any)?.fieldErrors?.video}
            />
          </div>

          {/* Links */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-sm font-semibold text-subtitle-color">
              Links (Optional)
            </h3>

            <InputField
              label="External Link"
              placeholder="https://example.com"
              name="link"
              error={(error as any)?.fieldErrors?.link}
            />

            <div className="grid gap-2">
              <Label>Project to Link With (optional)</Label>
              <Select name="projectLink">
                <SelectTrigger>
                  <SelectValue placeholder="Choose a Project" />
                </SelectTrigger>
                <SelectContent>
                  {data?.map((project, i) => (
                    <SelectItem value={project?._id}>
                      {project?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button className="w-full" disabled={isPending}>
              {isPending ? "Creating..." : "Create Project Slider"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
