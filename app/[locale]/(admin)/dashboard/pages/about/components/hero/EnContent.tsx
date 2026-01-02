import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { ItemsField } from "@/components/ui/dashboard/dynamic-sections/ItemsField";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import {
  ImageKitFileResponse,
  useDeleteFromImageKit,
  useUploadToImageKit,
} from "@/services/imageKit";
import { useUpdatePageContents } from "@/services/pages";
import { AboutPageContent } from "@/types/pages";
import { FormEvent, useEffect, useState } from "react";

export const EnContent = ({
  data,
}: {
  data: AboutPageContent["sections"]["hero"];
}) => {
  const [items, setItems] = useState<any[]>([]);
  const { mutate, isPending } = useUpdatePageContents();
  const { isPending: isReplacing, mutateAsync: deleteImage } =
    useDeleteFromImageKit();
  const { mutateAsync, isPending: isUploading } = useUploadToImageKit();

  useEffect(() => {
    if (data) {
      setItems(data?.counters?.value?.en);
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const file = form.get("file");
    let imageData = null;
    if (file && (file as File).name != "") {
      data?.image?.value?.fileId &&
        data?.image?.value?.fileId != "" &&
        (await deleteImage({ fileId: data.image.value?.fileId }).catch(() => {
          return;
        }));
      await mutateAsync(form).then((res) => {
        imageData = res;
      });
    }
    const headline = form.get("headline");
    const subheadline = form.get("subheadline");
    mutate({
      pageName: "about",
      sectionName: "hero",
      value: {
        headline: {
          value: {
            ar: data?.headline?.value?.ar,
            en: headline,
          },
        },

        subheadline: {
          value: {
            ar: data?.subheadline?.value?.ar,
            en: subheadline,
          },
        },
        counters: {
          value: {
            ar: data?.counters?.value.ar,
            en: items,
          },
        },
        ...(imageData != null && imageData != ""
          ? {
              image: {
                value: {
                  url: (imageData as ImageKitFileResponse).url,
                  fileId: (imageData as ImageKitFileResponse).fileId,
                },
              },
            }
          : {}),
      },
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-5">
          <div className="flex flex-col gap-4 flex-1">
            <InputField
              label="Headline"
              placeholder="Enter your headline..."
              name="headline"
              defaultValue={data?.headline?.value?.en}
            />
            <TextareaField
              label="Subheadline"
              placeholder="Enter your subheadline..."
              name="subheadline"
              defaultValue={data?.subheadline?.value?.en}
            />
          </div>
          <ImageInput
            id="hero-section-image"
            name="file"
            className="w-[250px] h-[250px]"
            defaultImage={data?.image?.value?.url}
          />
        </div>
        <ItemsField
          type="unlimited"
          expectedFields={["title", "count"]}
          items={items}
          setItems={setItems}
        />
        <Button
          type="submit"
          className="w-fit"
          disabled={isPending || isReplacing || isUploading}
        >
          {isReplacing
            ? "Replacing..."
            : isUploading
            ? "Uploading..."
            : isPending
            ? "Saving..."
            : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
