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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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

  // Tabs state for AR/EN
  const [name, setName] = useState({ ar: "", en: "" });
  const [location, setLocation] = useState({ ar: "", en: "" });
  const [area, setArea] = useState("");
  const [link, setLink] = useState("");

  const { data: sliderResponse, isLoading } = useGetProjectById(projectId);
  const slider = sliderResponse?.project;

  const { data: projects } = useGetProjects({});

  const { mutate, isPending, error } = useUpdateProject(() => {
    setIsOpen(false);
    setVideoFile(null);
  });

  // Populate form when slider data is loaded
  useEffect(() => {
    if (slider) {
      setName({
        ar:
          typeof slider.name === "string" ? slider.name : slider.name?.ar || "",
        en:
          typeof slider.name === "string" ? slider.name : slider.name?.en || "",
      });
      setLocation({
        ar:
          typeof slider.location === "string"
            ? slider.location
            : slider.location?.ar || "",
        en:
          typeof slider.location === "string"
            ? slider.location
            : slider.location?.en || "",
      });
      setArea(slider.area || "");
      setLink(slider.link || "");
      setSelectedProjectLink(slider.projectLink || "");
    }
  }, [slider]);

  const updateProjectSlider = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const form = new FormData(formElement);

    // Create FormData with files
    const projectSliderData = new FormData();

    // Combine multilingual fields into JSON
    projectSliderData.append("name", JSON.stringify(name));
    projectSliderData.append("location", JSON.stringify(location));
    projectSliderData.append("area", area);

    // Optional links
    if (link) projectSliderData.append("link", link);
    if (selectedProjectLink)
      projectSliderData.append("projectLink", selectedProjectLink);

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
        <Button variant="ghost" className="justify-start gap-2 w-full">
          <Edit size={14} /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Project Slider</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <form
            className="flex flex-col gap-4 p-4 pb-0"
            onSubmit={updateProjectSlider}
          >
            {/* Multilingual Name & Location */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-subtitle-color">
                Basic Information
              </h3>

              <Tabs defaultValue="en" className="w-full">
                <TabsList className="grid grid-cols-2 w-full mb-2">
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="ar">العربية</TabsTrigger>
                </TabsList>

                <TabsContent value="en" className="space-y-4">
                  <InputField
                    label="Name (English)"
                    placeholder="Enter slider name in English"
                    value={name.en}
                    onChange={(e) => setName({ ...name, en: e as string })}
                    name="name_en"
                    error={
                      (error as any)?.fieldErrors?.name?.[0]?.includes("nested")
                        ? "Both English and Arabic names are required"
                        : (error as any)?.fieldErrors?.name?.en
                    }
                  />
                  <InputField
                    label="Location (English)"
                    placeholder="Enter location in English"
                    value={location.en}
                    onChange={(e) =>
                      setLocation({ ...location, en: e as string })
                    }
                    name="location_en"
                    error={
                      (error as any)?.fieldErrors?.location?.[0]?.includes(
                        "nested"
                      )
                        ? "Both English and Arabic locations are required"
                        : (error as any)?.fieldErrors?.location?.en
                    }
                  />
                </TabsContent>

                <TabsContent value="ar" className="space-y-4">
                  <InputField
                    label="الاسم (عربي)"
                    placeholder="أدخل اسم السلايدر بالعربية"
                    value={name.ar}
                    onChange={(e) => setName({ ...name, ar: e as string })}
                    name="name_ar"
                    error={
                      (error as any)?.fieldErrors?.name?.[0]?.includes("nested")
                        ? "يجب إدخال الاسم بالإنجليزية والعربية"
                        : (error as any)?.fieldErrors?.name?.ar
                    }
                  />
                  <InputField
                    label="الموقع (عربي)"
                    placeholder="أدخل الموقع بالعربية"
                    value={location.ar}
                    onChange={(e) =>
                      setLocation({ ...location, ar: e as string })
                    }
                    name="location_ar"
                    error={
                      (error as any)?.fieldErrors?.location?.[0]?.includes(
                        "nested"
                      )
                        ? "يجب إدخال الموقع بالإنجليزية والعربية"
                        : (error as any)?.fieldErrors?.location?.ar
                    }
                  />
                </TabsContent>
              </Tabs>

              <InputField
                label="Area"
                placeholder="e.g., 5,000 sq m"
                value={area}
                onChange={(e) => setArea(e as string)}
                name="area"
                error={(error as any)?.fieldErrors?.area}
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
                value={link}
                onChange={(e) => setLink(e as string)}
                name="link"
                error={(error as any)?.fieldErrors?.link}
              />

              <div className="grid gap-2">
                <Label>Project to Link With (optional)</Label>
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
                        {project?.name?.en || project?.name?.ar}
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
