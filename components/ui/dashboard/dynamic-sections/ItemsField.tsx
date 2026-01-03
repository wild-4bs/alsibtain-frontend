import { CloudCog, Plus, X, Upload, Loader2 } from "lucide-react";
import { Label } from "../../label";
import { IconPicker } from "../IconPicker";
import { InputField, TextareaField } from ".";
import { ImageInput } from "../ImageInput";
import {
  useUploadToImageKit,
  useDeleteFromImageKit,
} from "@/services/imageKit";
import { useState } from "react";
import clsx from "clsx";

interface ItemsFieldProps {
  type: "unlimited" | "limited";
  items: any[];
  setItems: (v: any[]) => void;
  expectedFields: string[];
  max?: number;
}

export const ItemsField = ({
  type,
  expectedFields,
  items,
  setItems,
  max,
}: ItemsFieldProps) => {
  return (
    <>
      {type === "unlimited" && (
        <UnlimitedItems
          expectedFields={expectedFields}
          items={items}
          setItems={setItems}
        />
      )}
      {type === "limited" && max && (
        <LimitedItems
          expectedFields={expectedFields}
          items={items}
          setItems={setItems}
          max={max}
        />
      )}
    </>
  );
};

export const UnlimitedItems = ({
  items,
  setItems,
  expectedFields,
}: {
  items: any[];
  setItems: (v: any[]) => void;
  expectedFields: string[];
}) => {
  const { mutateAsync: uploadImage } = useUploadToImageKit();
  const { mutateAsync: deleteImage } = useDeleteFromImageKit();
  const [pendingFiles, setPendingFiles] = useState<{ [key: string]: File }>({});
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});
  const [deleting, setDeleting] = useState<{ [key: string]: boolean }>({});
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const addItem = () => {
    const newItem: any = { id: crypto.randomUUID() };
    expectedFields.forEach((f) => (newItem[f] = ""));
    setItems([...(items || []), newItem]);
  };

  const updateItem = (id: string, key: string, value: any) => {
    setItems(
      (items || []).map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  const handleImageSelect = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e?.target?.files?.[0]) {
      setPendingFiles((prev) => ({ ...prev, [id]: e.target.files![0] }));
    }
  };

  const handleImageUpload = async (id: string) => {
    const file = pendingFiles[id];
    if (!file) return;

    setUploading((prev) => ({ ...prev, [id]: true }));
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await uploadImage(form);
      const { url, fileId } = res;
      updateItem(id, "image", { url, fileId });
      setPendingFiles((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      setImageErrors((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleImageDelete = async (id: string, fileId: string) => {
    setDeleting((prev) => ({ ...prev, [id]: true }));
    try {
      await deleteImage({ fileId });
      updateItem(id, "image", "");
    } catch (error) {
      console.error("Failed to delete image:", error);
      alert("Failed to delete image. Please try again.");
    } finally {
      setDeleting((prev) => ({ ...prev, [id]: false }));
    }
  };

  const removeItem = (id: string) =>
    setItems((items || []).filter((item) => item.id !== id));

  const renderField = (item: any, field: string) => {
    const normalizeValue = (v: any) =>
      typeof v === "string" ? v : v?.target?.value ?? "";

    if (
      field === "title" ||
      field === "name" ||
      field === "headline" ||
      field === "value"
    ) {
      return (
        <InputField
          key={field}
          label={field}
          value={item?.[field] ?? ""}
          onChange={(v: any) => updateItem(item.id, field, normalizeValue(v))}
        />
      );
    }
    if (field === "image") {
      const hasUploadedImage = item?.[field]?.url;
      const hasPendingFile = pendingFiles[item.id];
      const isUploading = uploading[item.id];
      const isDeleting = deleting[item.id];
      const isProcessing = isUploading || isDeleting;
      const hasImageError = imageErrors[item.id];

      return (
        <div key={field} className="relative">
          <ImageInput
            id={`${item.id}-${field}`}
            defaultImage={item?.[field]?.url ?? ""}
            name=""
            onError={() => {
              setImageErrors((prev) => ({ ...prev, [item.id]: true }));
            }}
            onChange={(v: any) => handleImageSelect(item.id, v)}
            className={clsx({
              "pointer-events-none": hasUploadedImage || isProcessing,
              "opacity-50": isProcessing,
            })}
          />
          
          {/* Upload button - shows when file is selected but not uploaded */}
          {hasPendingFile && !hasUploadedImage && !isProcessing && (
            <button
              type="button"
              onClick={() => handleImageUpload(item.id)}
              className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition"
            >
              <Upload className="w-4 h-4" />
            </button>
          )}
          
          {/* Delete button - shows when image is uploaded AND no error */}
          {hasUploadedImage && !isProcessing && !hasImageError && (
            <button
              type="button"
              onClick={() => handleImageDelete(item.id, item[field].fileId)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          {/* Clear button for broken images */}
          {hasImageError && !isProcessing && (
            <button
              type="button"
              onClick={() => {
                updateItem(item.id, "image", "");
                setImageErrors((prev) => {
                  const copy = { ...prev };
                  delete copy[item.id];
                  return copy;
                });
              }}
              className="absolute top-2 right-2 bg-yellow-500 text-white rounded-full p-2 hover:bg-yellow-600 transition"
              title="Clear broken image"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          {/* Loading overlay */}
          {isProcessing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded text-white">
              <Loader2 className="w-6 h-6 animate-spin mb-2" />
              <span className="text-sm">
                {isUploading ? "Uploading..." : "Deleting..."}
              </span>
            </div>
          )}
        </div>
      );
    }
    if (field === "label") {
      return (
        <InputField
          key={field}
          label={field}
          value={item?.[field] ?? ""}
          onChange={(v: any) => updateItem(item.id, field, normalizeValue(v))}
        />
      );
    }
    if (field === "count") {
      return (
        <InputField
          key={field}
          label={field}
          type="number"
          value={item?.[field] ?? ""}
          onChange={(v: any) => updateItem(item.id, field, normalizeValue(v))}
        />
      );
    }

    if (field === "caption") {
      return (
        <TextareaField
          key={field}
          label={field}
          value={item?.[field] ?? ""}
          onChange={(v: any) => updateItem(item.id, field, normalizeValue(v))}
        />
      );
    }

    if (field === "icon") {
      return (
        <div key={field} className="grid gap-2">
          <Label className="capitalize">{field}</Label>
          <IconPicker
            value={item?.[field] ?? ""}
            onChange={(val) => updateItem(item.id, field, val)}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-wrap gap-4 mt-2">
      {(items || []).map((item) => (
        <div
          key={item.id}
          className="relative w-full min-w-lg flex-1 border border-input rounded-lg p-3 flex flex-col gap-4"
        >
          {expectedFields.map((f) => renderField(item, f))}
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-red-500 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center justify-center w-[200px] h-[200px] border border-subtitle-color border-dashed rounded-lg text-subtitle-color hover:text-white hover:border-white hover:bg-light-color/10 cursor-pointer transition-colors"
      >
        <Plus className="size-8" />
      </button>
    </div>
  );
};

export const LimitedItems = ({
  items,
  setItems,
  max,
  expectedFields,
}: {
  items: any[];
  setItems: (v: any[]) => void;
  max: number;
  expectedFields: string[];
}) => {
  const { mutateAsync: uploadImage } = useUploadToImageKit();
  const { mutateAsync: deleteImage } = useDeleteFromImageKit();
  const [pendingFiles, setPendingFiles] = useState<{ [key: number]: File }>({});
  const [uploading, setUploading] = useState<{ [key: number]: boolean }>({});
  const [deleting, setDeleting] = useState<{ [key: number]: boolean }>({});
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const updateItem = (i: number, key: string, value: any) => {
    const copy = [...items];
    while (copy.length < max) copy.push({});
    copy[i] = { ...(copy[i] || {}), [key]: value };
    setItems(copy);
  };

  const handleImageSelect = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e?.target?.files?.[0]) {
      setPendingFiles((prev) => ({ ...prev, [index]: e.target.files![0] }));
    }
  };

  const handleImageUpload = async (index: number) => {
    const file = pendingFiles[index];
    if (!file) return;

    setUploading((prev) => ({ ...prev, [index]: true }));
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await uploadImage(form);
      const { url, fileId } = res;
      updateItem(index, "image", { url, fileId });
      setPendingFiles((prev) => {
        const copy = { ...prev };
        delete copy[index];
        return copy;
      });
      setImageErrors((prev) => {
        const copy = { ...prev };
        delete copy[index];
        return copy;
      });
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handleImageDelete = async (index: number, fileId: string) => {
    setDeleting((prev) => ({ ...prev, [index]: true }));
    try {
      await deleteImage({ fileId });
      updateItem(index, "image", "");
    } catch (error) {
      console.error("Failed to delete image:", error);
      alert("Failed to delete image. Please try again.");
    } finally {
      setDeleting((prev) => ({ ...prev, [index]: false }));
    }
  };

  const normalized = Array.from({ length: max }).map(
    (_, i) => items?.[i] || {}
  );

  const normalizeValue = (v: any) =>
    typeof v === "string" ? v : v?.target?.value ?? "";

  const renderField = (item: any, field: string, index: number) => {
    if (field === "title" || field === "headline" || field === "value") {
      return (
        <InputField
          key={field}
          label={field}
          value={item?.[field] ?? ""}
          onChange={(v: any) => updateItem(index, field, normalizeValue(v))}
        />
      );
    }

    if (field === "caption") {
      return (
        <TextareaField
          key={field}
          label={field}
          value={item?.[field] ?? ""}
          onChange={(v: any) => updateItem(index, field, normalizeValue(v))}
        />
      );
    }
    if (field === "image") {
      const hasUploadedImage = item?.[field]?.url;
      const hasPendingFile = pendingFiles[index];
      const isUploading = uploading[index];
      const isDeleting = deleting[index];
      const isProcessing = isUploading || isDeleting;
      const hasImageError = imageErrors[index];

      return (
        <div key={field} className="relative">
          <ImageInput
            id={`limited-${index}-${field}`}
            defaultImage={item?.[field]?.url ?? ""}
            name=""
            onError={() => {
              setImageErrors((prev) => ({ ...prev, [index]: true }));
            }}
            onChange={(v: any) => handleImageSelect(index, v)}
            className={clsx({
              "pointer-events-none": hasUploadedImage || isProcessing,
              "opacity-50": isProcessing,
            })}
          />
          
          {/* Upload button - shows when file is selected but not uploaded */}
          {hasPendingFile && !hasUploadedImage && !isProcessing && (
            <button
              type="button"
              onClick={() => handleImageUpload(index)}
              className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition"
            >
              <Upload className="w-4 h-4" />
            </button>
          )}
          
          {/* Delete button - shows when image is uploaded AND no error */}
          {hasUploadedImage && !isProcessing && !hasImageError && (
            <button
              type="button"
              onClick={() => handleImageDelete(index, item[field].fileId)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          {/* Clear button for broken images */}
          {hasImageError && !isProcessing && (
            <button
              type="button"
              onClick={() => {
                updateItem(index, "image", "");
                setImageErrors((prev) => {
                  const copy = { ...prev };
                  delete copy[index];
                  return copy;
                });
              }}
              className="absolute top-2 right-2 bg-yellow-500 text-white rounded-full p-2 hover:bg-yellow-600 transition"
              title="Clear broken image"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          {/* Loading overlay */}
          {isProcessing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded text-white">
              <Loader2 className="w-6 h-6 animate-spin mb-2" />
              <span className="text-sm">
                {isUploading ? "Uploading..." : "Deleting..."}
              </span>
            </div>
          )}
        </div>
      );
    }

    if (field === "icon") {
      return (
        <div key={field} className="grid gap-2">
          <Label className="capitalize">{field}</Label>
          <IconPicker
            value={item?.[field] ?? ""}
            onChange={(val) => updateItem(index, field, val)}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-wrap gap-4 mt-2">
      {normalized.map((item, i) => (
        <div
          key={i}
          className="relative w-full min-w-lg flex-1 border border-input rounded-lg p-3 flex flex-col gap-4"
        >
          {expectedFields.map((f) => renderField(item, f, i))}
        </div>
      ))}
    </div>
  );
};