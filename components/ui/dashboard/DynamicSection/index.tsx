"use client";
import { useState } from "react";
import { SectionEditor } from "../SectionEditor";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";
import { ImageField, LimitedImages, UnlimitedImages } from "./ImageField";
import { LimitedItems, UnlimitedItems } from "./ItemsField";
import { IconPicker } from "../IconPicker";
import RichEditor from "../RichEditor";
import { VideoFetcher } from "../VideoFetcher";
import { Button } from "../../button";
import { useReplaceImage } from "@/services/imageKit";
import { useGetPageContents, useUpdatePageContents } from "@/services/pages";

type FieldType =
  | "input"
  | "textarea"
  | "image"
  | "images"
  | "items"
  | "number"
  | "richtext"
  | "icon"
  | "video";

type Field = {
  type: FieldType;
  value: any;
  maxValue?: number | "unlimited";
  expectedFields?: string[];
};

interface Props {
  page: string;
  sectionKey: string;
  fields: Record<string, Field>;
  onUpdate?: (data: Record<string, Field>) => void; // send updated data to parent
}

export function formatLabel(key: string): string {
  return (
    key
      // Add space before capital letters
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // Capitalize the first letter
      .replace(/^./, (str) => str.toUpperCase())
  );
}

export const DynamicSectionForm = ({
  page,
  sectionKey,
  fields,
  onUpdate,
}: Props) => {
  const [formData, setFormData] = useState(fields);
  const [canSave, setCanSave] = useState(false);

  const handleFieldChange = (key: string, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [key]: { ...prev[key], value } };
      onUpdate?.(newData); // send updated data to parent
      return newData;
    });
    setCanSave(true);
  };

  const { replaceImage, isReplacing } = useReplaceImage();
  const { mutate, isPending } = useUpdatePageContents();

  const handleSave = async () => {
    let dataToSave = { ...formData };

    for (const [key, field] of Object.entries(formData)) {
      // Single image
      if (field.type === "image") {
        const newValue = field.value;
        const oldValue = fields[key]?.value;

        if (newValue instanceof File) {
          const form = new FormData();
          form.append("image", newValue);
          try {
            const uploaded = await replaceImage(oldValue || "null", form);
            dataToSave[key] = { ...field, value: uploaded.secure_url };
          } catch (err) {
            console.error("Single image upload failed", err);
          }
        }
      }

      // Multiple images
      if (field.type === "images" && Array.isArray(field.value)) {
        const updatedImages: string[] = [];
        for (let i = 0; i < field.value.length; i++) {
          const img = field.value[i];
          const oldValue =
            Array.isArray(fields[key]?.value) && fields[key].value[i]
              ? fields[key].value[i]
              : "null";

          if (img instanceof File) {
            const form = new FormData();
            form.append("image", img);
            try {
              const uploaded = await replaceImage(oldValue, form);
              updatedImages.push(uploaded.secure_url);
            } catch (err) {
              console.error("Multiple image upload failed", err);
            }
          } else {
            updatedImages.push(img);
          }
        }
        dataToSave[key] = { ...field, value: updatedImages };
      }
    }

    mutate({
      pageName: page,
      sectionName: sectionKey,
      value: dataToSave,
    });

    setCanSave(false);
  };

  return (
    <SectionEditor
      name={formatLabel(sectionKey)}
      sectionId={`${page}-${sectionKey}`}
    >
      <form className="space-y-4">
        {Object.entries(formData).map(([key, field]) => {
          switch (field.type) {
            case "input":
            case "number":
              return (
                <InputField
                  key={key}
                  label={formatLabel(key)}
                  value={field.value}
                  onChange={(val: any) => handleFieldChange(key, val)}
                />
              );
            case "textarea":
              return (
                <TextareaField
                  key={key}
                  label={formatLabel(key)}
                  value={field.value}
                  onChange={(val: any) => handleFieldChange(key, val)}
                />
              );
            case "image":
              return (
                <ImageField
                  key={key}
                  id={`${page}-${sectionKey}-${key}`}
                  value={field.value}
                  onChange={(val: any) => handleFieldChange(key, val)}
                />
              );
            case "images":
              if (field.maxValue === "unlimited") {
                return (
                  <UnlimitedImages
                    key={key}
                    images={field.value || []}
                    setImages={(v) => handleFieldChange(key, v)}
                  />
                );
              }
              if (typeof field.maxValue === "number") {
                return (
                  <LimitedImages
                    key={key}
                    images={field.value || []}
                    setImages={(v) => handleFieldChange(key, v)}
                    max={field.maxValue}
                  />
                );
              }
              return null;
            case "items":
              if (field.maxValue === "unlimited") {
                return (
                  <UnlimitedItems
                    key={key}
                    items={field.value || []}
                    setItems={(v) => handleFieldChange(key, v)}
                    expectedFields={(fields.expectedFields as any) || []}
                  />
                );
              }
              if (typeof field.maxValue === "number") {
                return (
                  <LimitedItems
                    key={key}
                    items={field.value || []}
                    setItems={(v) => handleFieldChange(key, v)}
                    expectedFields={(fields.expectedFields as any) || []}
                    max={field.maxValue}
                  />
                );
              }
              return null;
            case "icon":
              return (
                <IconPicker
                  key={key}
                  value={field.value}
                  placeholder={formatLabel(key)}
                  showClearButton
                  className="w-[300px]"
                  onChange={(val) => handleFieldChange(key, val)}
                />
              );
            case "richtext":
              return (
                <RichEditor
                  key={key}
                  value={field.value}
                  onChange={(val) => handleFieldChange(key, val)}
                />
              );
            case "video":
              return (
                <VideoFetcher
                  key={key}
                  buttonContent="Get It"
                  thumbnail={false}
                  imageInputId={`${page}-${sectionKey}-${key}`}
                  imageInputName={key}
                  defaultLink={field.value}
                  label={formatLabel(key)}
                  setVideoLink={(val: string) => handleFieldChange(key, val)}
                />
              );
            default:
              return null;
          }
        })}

        <Button
          type="button"
          onClick={handleSave}
          disabled={!canSave || isPending || isReplacing}
          className="mt-4"
        >
          {isPending && !isReplacing && "Saving..."}
          {!isPending && isReplacing && "Replacing Image..."}
          {!isPending && !isReplacing && "Save"}
        </Button>
      </form>
    </SectionEditor>
  );
};
