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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useCreateProject } from "@/services/projects";
import { Plus, Upload, X } from "lucide-react";
import { FormEvent, useState } from "react";

export const CreateButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUrukCity360, setShowUrukCity360] = useState(false);

  // Multilingual fields
  const [name, setName] = useState({ ar: "", en: "" });
  const [caption, setCaption] = useState({ ar: "", en: "" });
  const [projectFullName, setProjectFullName] = useState({ ar: "", en: "" });
  const [location, setLocation] = useState({ ar: "", en: "" });
  const [unitType, setUnitType] = useState({ ar: "", en: "" });
  const [description, setDescription] = useState({ ar: "", en: "" });

  // File states
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageGallery, setImageGallery] = useState<File[]>([]);
  const [videoGallery, setVideoGallery] = useState<File[]>([]);

  const { mutate, isPending, error } = useCreateProject(() => {
    setIsOpen(false);
    setName({ ar: "", en: "" });
    setCaption({ ar: "", en: "" });
    setProjectFullName({ ar: "", en: "" });
    setLocation({ ar: "", en: "" });
    setUnitType({ ar: "", en: "" });
    setDescription({ ar: "", en: "" });
    setShowUrukCity360(false);
    setLogoFile(null);
    setBackgroundFile(null);
    setThumbnailFile(null);
    setVideoFile(null);
    setImageGallery([]);
    setVideoGallery([]);
  });

  const createProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    // Create FormData with files
    const projectData = new FormData();
    
    // Append multilingual fields as JSON
    projectData.append("name", JSON.stringify(name));
    projectData.append("caption", JSON.stringify(caption));
    projectData.append("projectFullName", JSON.stringify(projectFullName));
    projectData.append("location", JSON.stringify(location));
    projectData.append("unitType", JSON.stringify(unitType));
    projectData.append("description", JSON.stringify(description));
    
    // Append non-multilingual fields
    projectData.append("totalArea", form.get("totalArea") as string);
    projectData.append("totalResidentialUnits", form.get("totalResidentialUnits") as string);
    projectData.append("showUrukCity360", showUrukCity360.toString());

    // Append required files
    if (logoFile) projectData.append("logo", logoFile);
    if (backgroundFile) projectData.append("background", backgroundFile);
    if (thumbnailFile) projectData.append("thumbnail", thumbnailFile);
    if (videoFile) projectData.append("video", videoFile);

    // Append gallery files
    imageGallery.forEach((file) => {
      projectData.append("imageGallery", file);
    });

    videoGallery.forEach((file) => {
      projectData.append("videoGallery", file);
    });

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

  const MultiFileUploadField = ({
    label,
    files,
    setFiles,
    accept,
    error,
  }: {
    label: string;
    files: File[];
    setFiles: (files: File[]) => void;
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
            input.multiple = true;
            input.onchange = (e) => {
              const target = e.target as HTMLInputElement;
              if (target.files) {
                setFiles([...files, ...Array.from(target.files)]);
              }
            };
            input.click();
          }}
        >
          <Upload size={16} className="mr-2" />
          {files.length > 0 ? `${files.length} files selected` : `Upload ${label}`}
        </Button>
        {files.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setFiles([])}
          >
            <X size={16} />
          </Button>
        )}
      </div>
      {files.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {files.map((file, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded flex items-center gap-1"
            >
              {file.name}
              <X
                size={12}
                className="cursor-pointer"
                onClick={() => setFiles(files.filter((_, i) => i !== index))}
              />
            </span>
          ))}
        </div>
      )}
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
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-3xl">
        <DialogHeader className="px-0 py-0">
          <DialogTitle>Create a New Project</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4 p-4 pb-0" onSubmit={createProject}>
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
                  label="Project Name (English)"
                  placeholder="Enter project name in English"
                  value={name.en}
                  onChange={(e) => setName({ ...name, en: e as string })}
                  error={
                    (error as any)?.fieldErrors?.name?.[0]?.includes("nested")
                      ? "Both English and Arabic names are required"
                      : (error as any)?.fieldErrors?.name?.en
                  }
                />
                <InputField
                  label="Caption (English)"
                  placeholder="Enter caption in English"
                  value={caption.en}
                  onChange={(e) => setCaption({ ...caption, en: e as string })}
                  error={(error as any)?.fieldErrors?.caption?.en}
                />
                <InputField
                  label="Full Project Name (English)"
                  placeholder="Enter full project name in English"
                  value={projectFullName.en}
                  onChange={(e) => setProjectFullName({ ...projectFullName, en: e as string })}
                  error={(error as any)?.fieldErrors?.projectFullName?.en}
                />
                <InputField
                  label="Location (English)"
                  placeholder="Enter location in English"
                  value={location.en}
                  onChange={(e) => setLocation({ ...location, en: e as string })}
                  error={(error as any)?.fieldErrors?.location?.en}
                />
                <InputField
                  label="Unit Type (English)"
                  placeholder="e.g., Apartments, Villas"
                  value={unitType.en}
                  onChange={(e) => setUnitType({ ...unitType, en: e as string })}
                  error={(error as any)?.fieldErrors?.unitType?.en}
                />
                <TextareaField
                  label="Description (English)"
                  value={description.en}
                  onChange={(e) => setDescription({ ...description, en: e as string })}
                  placeholder="Enter description in English"
                  error={(error as any)?.fieldErrors?.description?.en}
                />
              </TabsContent>

              <TabsContent value="ar" className="space-y-4">
                <InputField
                  label="اسم المشروع (عربي)"
                  placeholder="أدخل اسم المشروع بالعربية"
                  value={name.ar}
                  onChange={(e) => setName({ ...name, ar: e as string })}
                  error={
                    (error as any)?.fieldErrors?.name?.[0]?.includes("nested")
                      ? "يجب إدخال الاسم بالإنجليزية والعربية"
                      : (error as any)?.fieldErrors?.name?.ar
                  }
                />
                <InputField
                  label="التسمية التوضيحية (عربي)"
                  placeholder="أدخل التسمية بالعربية"
                  value={caption.ar}
                  onChange={(e) => setCaption({ ...caption, ar: e as string })}
                  error={(error as any)?.fieldErrors?.caption?.ar}
                />
                <InputField
                  label="الاسم الكامل للمشروع (عربي)"
                  placeholder="أدخل الاسم الكامل بالعربية"
                  value={projectFullName.ar}
                  onChange={(e) => setProjectFullName({ ...projectFullName, ar: e as string })}
                  error={(error as any)?.fieldErrors?.projectFullName?.ar}
                />
                <InputField
                  label="الموقع (عربي)"
                  placeholder="أدخل الموقع بالعربية"
                  value={location.ar}
                  onChange={(e) => setLocation({ ...location, ar: e as string })}
                  error={(error as any)?.fieldErrors?.location?.ar}
                />
                <InputField
                  label="نوع الوحدة (عربي)"
                  placeholder="مثال: شقق، فلل"
                  value={unitType.ar}
                  onChange={(e) => setUnitType({ ...unitType, ar: e as string })}
                  error={(error as any)?.fieldErrors?.unitType?.ar}
                />
                <TextareaField
                  label="الوصف (عربي)"
                  value={description.ar}
                  onChange={(e) => setDescription({ ...description, ar: e as string })}
                  placeholder="أدخل الوصف بالعربية"
                  error={(error as any)?.fieldErrors?.description?.ar}
                />
              </TabsContent>
            </Tabs>

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

          {/* Galleries */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-sm font-semibold text-subtitle-color">
              Galleries (Optional)
            </h3>

            <MultiFileUploadField
              label="Image Gallery"
              files={imageGallery}
              setFiles={setImageGallery}
              accept="image/*"
              error={(error as any)?.fieldErrors?.imageGallery}
            />

            <MultiFileUploadField
              label="Video Gallery"
              files={videoGallery}
              setFiles={setVideoGallery}
              accept="video/*"
              error={(error as any)?.fieldErrors?.videoGallery}
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