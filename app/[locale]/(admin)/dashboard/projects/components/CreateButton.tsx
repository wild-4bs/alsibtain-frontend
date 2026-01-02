import { Button } from "@/components/ui/button";
import {
  InputField,
  RichTextField,
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
import { useCreateProject } from "@/services/projects";
import { Plus, Upload, X } from "lucide-react";
import { FormEvent, useState } from "react";

export const CreateButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [showUrukCity360, setShowUrukCity360] = useState(false);

  // File states
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const { mutate, isPending, error } = useCreateProject(() => {
    setIsOpen(false);
    setDescription("");
    setShowUrukCity360(false);
    setLogoFile(null);
    setBackgroundFile(null);
    setThumbnailFile(null);
    setVideoFile(null);
  });

  const createProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    // Create FormData with files
    const projectData = new FormData();
    projectData.append("name", form.get("name") as string);
    projectData.append("caption", form.get("caption") as string);
    projectData.append(
      "projectFullName",
      form.get("projectFullName") as string
    );
    projectData.append("location", form.get("location") as string);
    projectData.append("totalArea", form.get("totalArea") as string);
    projectData.append(
      "totalResidentialUnits",
      form.get("totalResidentialUnits") as string
    );
    projectData.append("unitType", form.get("unitType") as string);
    projectData.append("description", description);
    projectData.append("showUrukCity360", showUrukCity360.toString());

    // Append files
    if (logoFile) projectData.append("logo", logoFile);
    if (backgroundFile) projectData.append("background", backgroundFile);
    if (thumbnailFile) projectData.append("thumbnail", thumbnailFile);
    if (videoFile) projectData.append("video", videoFile);

    mutate(projectData as any);
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
        <Button>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a New Project</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4 p-4 pb-0" onSubmit={createProject}>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-subtitle-color">
              Basic Information
            </h3>

            <InputField
              label="Project Name"
              placeholder="Enter project name"
              name="name"
              error={(error as any)?.fieldErrors?.name}
            />

            <InputField
              label="Caption"
              placeholder="Enter project caption"
              name="caption"
              error={(error as any)?.fieldErrors?.caption}
            />

            <InputField
              label="Full Project Name"
              placeholder="Enter full project name"
              name="projectFullName"
              error={(error as any)?.fieldErrors?.projectFullName}
            />
          </div>

          {/* Media Files */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-sm font-semibold text-subtitle-color">
              Media Assets
            </h3>

            <FileUploadField
              label="Logo"
              file={logoFile}
              setFile={setLogoFile}
              accept="image/*"
              error={(error as any)?.fieldErrors?.logo}
            />

            <FileUploadField
              label="Background Image"
              file={backgroundFile}
              setFile={setBackgroundFile}
              accept="image/*"
              error={(error as any)?.fieldErrors?.background}
            />
          </div>

          {/* Project Details */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-sm font-semibold text-subtitle-color">
              Project Details
            </h3>

            <InputField
              label="Location"
              placeholder="Enter project location"
              name="location"
              error={(error as any)?.fieldErrors?.location}
            />

            <InputField
              label="Total Area"
              placeholder="e.g., 500,000 sqm"
              name="totalArea"
              error={(error as any)?.fieldErrors?.totalArea}
            />

            <InputField
              label="Total Residential Units"
              placeholder="e.g., 1,200 units"
              name="totalResidentialUnits"
              error={(error as any)?.fieldErrors?.totalResidentialUnits}
            />

            <InputField
              label="Unit Type"
              placeholder="e.g., Apartments, Villas"
              name="unitType"
              error={(error as any)?.fieldErrors?.unitType}
            />

            <TextareaField
              label="description"
              value={description}
              onChange={(e) => setDescription(e as string)}
              placeholder="Type your description"
            />
          </div>

          {/* Introduction Media */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-sm font-semibold text-subtitle-color">
              Introduction Media
            </h3>

            <FileUploadField
              label="Thumbnail"
              file={thumbnailFile}
              setFile={setThumbnailFile}
              accept="image/*"
              error={(error as any)?.fieldErrors?.thumbnail}
            />

            <FileUploadField
              label="Introduction Video"
              file={videoFile}
              setFile={setVideoFile}
              accept="video/*"
              error={(error as any)?.fieldErrors?.video}
            />
          </div>

          <div className="space-y-4 border-t pt-4">
            <h3 className="text-sm font-semibold text-subtitle-color">
              Additional Options
            </h3>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showUrukCity360"
                checked={showUrukCity360}
                onChange={(e) => setShowUrukCity360(e.target.checked)}
                className="w-4 h-4 rounded border-input"
              />
              <label
                htmlFor="showUrukCity360"
                className="text-sm cursor-pointer"
              >
                Show in Uruk City 360
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button className="w-full" disabled={isPending}>
              {isPending ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
