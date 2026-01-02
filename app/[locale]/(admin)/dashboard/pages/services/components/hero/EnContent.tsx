import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { ImagesField } from "@/components/ui/dashboard/dynamic-sections/ImagesField";
import { useUpdatePageContents } from "@/services/pages";
import { ServicesPageContent } from "@/types/pages";
import { FormEvent, useEffect, useState } from "react";

export const EnContent = ({
  data,
}: {
  data: ServicesPageContent["sections"]["hero"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setImages(data?.images?.value);
    }
  }, [data]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const headline = form.get("headline");
    const subheadline = form.get("subheadline");
    mutate({
      pageName: "services",
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
        images: {
          value: images,
        },
      },
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
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
        <ImagesField images={images} type="unlimited" setImages={setImages} />
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
