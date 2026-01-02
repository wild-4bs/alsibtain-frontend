import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { useUpdatePageContents } from "@/services/pages";
import { CareersPageContent } from "@/types/pages";
import { FormEvent } from "react";

export const ArContent = ({
  data,
}: {
  data: CareersPageContent["sections"]["jobs"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    mutate({
      pageName: "careers",
      sectionName: "jobs",
      value: {
        tagline: {
          value: {
            en: data?.tagline?.value?.en,
            ar: form.get("tagline"),
          },
        },
        title: {
          value: {
            en: data?.title?.value?.en,
            ar: form.get("title"),
          },
        },
        caption: {
          value: {
            en: data?.caption?.value?.en,
            ar: form.get("caption"),
          },
        },
      },
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <InputField
          label="Tagline"
          name="tagline"
          placeholder="Enter your tagline..."
          defaultValue={data?.tagline?.value?.ar}
        />
        <InputField
          label="Title"
          name="title"
          placeholder="Enter your title..."
          defaultValue={data?.title?.value?.ar}
        />
        <TextareaField
          label="Caption"
          name="caption"
          placeholder="Enter your caption..."
          defaultValue={data?.caption?.value?.ar}
        />
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
