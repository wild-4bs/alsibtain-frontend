"use client";
import { X, Plus } from "lucide-react";
import clsx from "clsx";
import { ImageInput } from "../ImageInput";
import {
  useDeleteFromImageKit,
  useUploadToImageKit,
} from "@/services/imageKit";
import { toast } from "sonner";
import { useState } from "react";

interface LimitedImagesFieldProps {
  type: "limited";
  max?: number;
  images: (File | { url: string; fileId: string } | "")[];
  setImages?: (v: (File | { url: string; fileId: string } | "")[]) => void;
}

interface UnlimitedImagesFieldProps {
  type: "unlimited";
  images: Array<{
    id: string;
    data: File | { url: string; fileId: string } | "";
  }>;
  setImages?: (
    images: Array<{
      id: string;
      data: File | { url: string; fileId: string } | "";
    }>
  ) => void;
}

type ImagesFieldProps = LimitedImagesFieldProps | UnlimitedImagesFieldProps;

export const ImagesField = (props: ImagesFieldProps) => {
  if (props.type === "limited") {
    const { max = 0, images, setImages } = props;
    return (
      <LimitedImages
        max={max}
        images={images}
        setImages={(val) => setImages?.(val)}
      />
    );
  }

  const { images, setImages } = props;
  return (
    <UnlimitedImages images={images} setImages={(val) => setImages?.(val)} />
  );
};

export const LimitedImages = ({
  images,
  setImages,
  max,
}: {
  images: (File | { url: string; fileId: string } | "")[];
  setImages: (v: (File | { url: string; fileId: string } | "")[]) => void;
  max: number;
}) => {
  const { mutateAsync: deleteAsync } = useDeleteFromImageKit();
  const { mutateAsync: uploadAsync } = useUploadToImageKit();

  // Track loading state per index
  const [loadingStates, setLoadingStates] = useState<
    Record<number, "uploading" | "deleting" | null>
  >({});

  const handleUpload = async (index: number, file: File) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [index]: "uploading" }));

      const currentImage = images[index];
      const isImageKitImage =
        currentImage &&
        typeof currentImage === "object" &&
        "fileId" in currentImage;

      // Delete previous ImageKit image if exists
      if (isImageKitImage) {
        await deleteAsync({ fileId: currentImage.fileId });
      }

      // Upload new image
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadAsync(formData);

      // Update parent with ImageKit data
      const copy = [...images];
      copy[index] = {
        fileId: res.fileId,
        url: res.url,
      };
      setImages(copy);
    } catch (err: any) {
      toast.error(err.message || "Image upload failed");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [index]: null }));
    }
  };

  const handleRemove = async (index: number) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [index]: "deleting" }));

      const currentImage = images[index];
      const isImageKitImage =
        currentImage &&
        typeof currentImage === "object" &&
        "fileId" in currentImage;

      if (isImageKitImage) {
        await deleteAsync({ fileId: currentImage.fileId });
      }

      const copy = [...images];
      copy[index] = "";
      setImages(copy);
    } catch (err: any) {
      toast.error(err.message || "Failed to remove image");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [index]: null }));
    }
  };

  const getImageUrl = (image: File | { url: string; fileId: string } | "") => {
    if (!image || image instanceof File) return "";
    return image.url;
  };

  return (
    <div className="flex flex-wrap gap-4 mt-2">
      {Array.from({ length: max }).map((_, i) => {
        const image = images[i];
        const hasImage = image;
        const isLoading = loadingStates[i];

        return (
          <div key={i} className="relative w-[200px] h-[200px]">
            <ImageInput
              name=""
              id={`limited-img-${i}`}
              defaultImage={getImageUrl(image)}
              onChange={(e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) handleUpload(i, file);
              }}
              className={clsx("w-full h-full", {
                "opacity-60": isLoading,
                "pointer-events-none": isLoading,
              })}
            />
            {hasImage && !isLoading && (
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm rounded">
                {isLoading === "uploading" ? "Uploading..." : "Deleting..."}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const ImageItem = ({
  image,
  id,
  onUpdate,
  onRemove,
}: {
  image: File | { fileId: string; url: string } | "";
  id: string;
  onUpdate: (id: string, file: { fileId: string; url: string }) => void;
  onRemove: (id: string) => void;
}) => {
  const { isPending: isDeleting, mutateAsync: deleteAsync } =
    useDeleteFromImageKit();

  const { mutateAsync: uploadAsync, isPending: isUploading } =
    useUploadToImageKit();

  const isImageKitImage =
    image && typeof image === "object" && "fileId" in image;

  const handleRemove = async () => {
    try {
      if (isImageKitImage) {
        await deleteAsync({ fileId: image.fileId });
      }
      onRemove(id);
    } catch (err: any) {
      toast.error(err.message || "Failed to remove image");
    }
  };

  const handleUpload = async (file: File) => {
    try {
      // 🔥 Step 1: delete previous ImageKit image if exists
      if (isImageKitImage) {
        await deleteAsync({ fileId: image.fileId });
      }

      // 🔥 Step 2: upload new image
      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadAsync(formData);

      // 🔥 Step 3: update parent with ImageKit data
      onUpdate(id, {
        fileId: res.fileId,
        url: res.url,
      });
    } catch (err: any) {
      toast.error(err.message || "Image replace failed");
    }
  };

  const getImageUrl = () => {
    if (!image || image instanceof File) return "";
    return image.url;
  };

  return (
    <div className="relative w-[200px] h-[200px] transition-all">
      <ImageInput
        name="file"
        id={`image-${id}`}
        defaultImage={getImageUrl()}
        onChange={(e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) handleUpload(file);
        }}
        className={clsx("w-full h-full", {
          "opacity-60": isUploading || isDeleting,
          "pointer-events-none": isUploading || isDeleting,
        })}
      />

      <button
        type="button"
        onClick={handleRemove}
        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {(isUploading || isDeleting) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm rounded">
          {isUploading ? "Uploading..." : "Deleting..."}
        </div>
      )}
    </div>
  );
};

export const UnlimitedImages = ({
  images,
  setImages,
}: {
  images: Array<{
    id: string;
    data: File | { fileId: string; url: string } | "";
  }>;
  setImages: (
    images: Array<{
      id: string;
      data: File | { fileId: string; url: string } | "";
    }>
  ) => void;
}) => {
  const addImage = () =>
    setImages([...images, { id: crypto.randomUUID(), data: "" }]);

  const updateImage = (
    id: string,
    file: File | { fileId: string; url: string }
  ) => {
    setImages(
      images.map((img) => (img.id === id ? { ...img, data: file } : img))
    );
  };

  const removeImage = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
  };

  return (
    <div className="flex flex-wrap gap-4 mt-2">
      {images.map((img) => (
        <ImageItem
          key={img.id}
          image={img.data}
          id={img.id}
          onUpdate={updateImage}
          onRemove={removeImage}
        />
      ))}
      <button
        type="button"
        onClick={addImage}
        className="flex items-center justify-center w-[200px] h-[200px] border border-subtitle-color border-dashed rounded-lg text-subtitle-color hover:text-white hover:border-white hover:bg-light-color/10 cursor-pointer transition-colors"
      >
        <Plus className="size-8" />
      </button>
    </div>
  );
};
