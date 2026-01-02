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
import {
  useGetProjectById,
  useUpdateProject,
} from "@/services/slider-projects";
import { Edit, Upload, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

interface Props {
  projectId: string;
}

export const UpdateProjectButton = ({ projectId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  // File state
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [selectedProjectLink, setSelectedProjectLink] = useState<string>("");

  const { data: sliderResponse, isLoading } = useGetProjectById(projectId);
  const slider = sliderResponse?.project;

  const { data: projects } = useGetProjects({});

  const { mutate, isPending, error } = useUpdateProject(() => {
    setIsOpen(false);
  });

  useEffect(() => {
    if (slider?.projectLink) {
      setSelectedProjectLink(slider.projectLink);
    } else {
      setSelectedProjectLink("");
    }
  }, [slider]);

  const updateProjectSlider = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const form = new FormData(formElement);

    // Create FormData with files
    const projectSliderData = new FormData();
    projectSliderData.append("name", form.get("name") as string);
    projectSliderData.append("area", form.get("area") as string);
    projectSliderData.append("location", form.get("location") as string);

    const link = form.get("link") as string;
    const projectLink = form.get("projectLink") as string;

    if (link) projectSliderData.append("link", link);
    if (projectLink) projectSliderData.append("projectLink", projectLink);

    // Append new video file if selected
    if (videoFile) projectSliderData.append("video", videoFile);

    mutate({
      id: projectId,
      data: projectSliderData as any,
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
          <DialogTitle>Update Project Slider</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <form
            className="flex flex-col gap-4 p-4 pb-0"
            onSubmit={updateProjectSlider}
          >
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-subtitle-color">
                Basic Information
              </h3>

              <InputField
                label="Name"
                name="name"
                defaultValue={slider?.name}
                error={(error as any)?.fieldErrors?.name}
              />

              <InputField
                label="Area"
                name="area"
                defaultValue={slider?.area}
                error={(error as any)?.fieldErrors?.area}
              />

              <InputField
                label="Location"
                name="location"
                defaultValue={slider?.location}
                error={(error as any)?.fieldErrors?.location}
              />
            </div>

            {/* Video File */}
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-sm font-semibold text-subtitle-color">
                Video
              </h3>

              <FileUploadField
                label="Video"
                file={videoFile}
                setFile={setVideoFile}
                accept="video/*"
                currentUrl={slider?.video?.url}
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
                defaultValue={slider?.link || ""}
                error={(error as any)?.fieldErrors?.link}
              />

              <div className="grid gap-2">
                <Label>Project to Link With (optional)</Label>
                {slider?.projectLink && !selectedProjectLink && (
                  <div className="text-xs text-subtitle-color mb-1">
                    Current: Linked to a project
                  </div>
                )}
                <Select
                  name="projectLink"
                  value={selectedProjectLink || ""}
                  onValueChange={setSelectedProjectLink}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a Project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects?.map((project) => (
                      <SelectItem key={project?._id} value={project?._id}>
                        {project?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button className="w-full" disabled={isPending}>
                {isPending ? "Updating..." : "Update Project Slider"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
