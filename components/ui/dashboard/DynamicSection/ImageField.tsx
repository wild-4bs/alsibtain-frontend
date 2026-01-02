import { Plus, X } from "lucide-react";
import { ImageInput } from "../ImageInput";
import { useDeleteFromCloudinary } from "@/services/imageKit";
import { useState } from "react";
import clsx from "clsx";

export const LimitedImages = ({
  images,
  setImages,
  max,
}: {
  images: (File | string)[];
  setImages: (v: (File | string)[]) => void;
  max: number;
}) => {
  const update = (index: number, file: File | string) => {
    const copy = [...images];
    copy[index] = file;
    setImages(copy);
  };

  return (
    <div className="flex flex-wrap gap-4 mt-2">
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} className="w-[200px] h-[200px]">
          <ImageInput
            name=""
            id={`limited-img-${i}`}
            defaultImage={typeof images[i] === "string" ? images[i] : ""}
            onChange={(e) =>
              update(i, (e.target as HTMLInputElement).files?.[0] || "")
            }
            className="w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};

type ImageWithId = {
  id: string;
  file: File | string;
};

const generateId = () => Math.random().toString(36).substring(2, 9);

const ImageItem = ({
  image,
  onUpdate,
  onRemove,
}: {
  image: ImageWithId;
  onUpdate: (id: string, file: File | string) => void;
  onRemove: (id: string) => void;
}) => {
  const { mutateAsync, isPending } = useDeleteFromCloudinary();

  const handleRemove = async () => {
    if (typeof image.file === "string" && image.file) {
      try {
        typeof image.file == "string" &&
          (await mutateAsync({
            public_id: extractPublicId(image.file) as string,
          }));
        onRemove(image.id);
      } catch (err) {
        console.error("Failed to delete image from Cloudinary", err);
      }
    } else {
      onRemove(image.id);
    }
  };

  return (
    <div
      className={clsx(
        `relative w-[200px] h-[200px] transition-all duration-300`,
        {
          "opacity-50 scale-90": isPending,
        }
      )}
    >
      <ImageInput
        name=""
        id={`image-${image.id}`}
        defaultImage={typeof image.file === "string" ? image.file : ""}
        onChange={(e) =>
          onUpdate(image.id, (e.target as HTMLInputElement).files?.[0] || "")
        }
        className="w-full h-full"
      />
      <button
        type="button"
        onClick={handleRemove}
        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
        disabled={isPending}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const UnlimitedImages = ({
  images,
  setImages,
}: {
  images: (File | string)[];
  setImages: (v: (File | string)[]) => void;
}) => {
  // Wrap images in ImageWithId
  const [items, setItems] = useState<ImageWithId[]>(
    images.map((file) => ({ id: generateId(), file }))
  );

  const syncToParent = (newItems: ImageWithId[]) => {
    setItems(newItems);
    setImages(newItems.map((i) => i.file));
  };

  const add = () => syncToParent([...items, { id: generateId(), file: "" }]);

  const update = (id: string, file: File | string) =>
    syncToParent(items.map((img) => (img.id === id ? { ...img, file } : img)));

  const remove = (id: string) =>
    syncToParent(items.filter((img) => img.id !== id));

  return (
    <div className="flex flex-wrap gap-4 mt-2">
      {items.map((img) => (
        <ImageItem
          key={img.id}
          image={img}
          onUpdate={update}
          onRemove={remove}
        />
      ))}

      <button
        type="button"
        onClick={add}
        className="flex items-center justify-center w-[200px] h-[200px] border-2 border-dashed rounded-lg text-gray-500 hover:text-white hover:border-gray-400 hover:bg-gray-100/10 cursor-pointer transition-colors"
      >
        <Plus className="w-10 h-10" />
      </button>
    </div>
  );
};

export const ImageField = ({ id, value, onChange }: any) => (
  <ImageInput
    id={id}
    name=""
    defaultImage={value}
    onChange={(e) => onChange((e.target as HTMLInputElement).files?.[0])}
    className="w-fit"
  />
);
