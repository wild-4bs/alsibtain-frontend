import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { useUpdatePageContents } from "@/services/pages";
import { CareersPageContent } from "@/types/pages";
import { FormEvent } from "react";

export const EnContent = ({
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
            ar: data?.tagline?.value?.ar,
            en: form.get("tagline"),
          },
        },
        title: {
          value: {
            ar: data?.title?.value?.ar,
            en: form.get("title"),
          },
        },
        caption: {
          value: {
            ar: data?.caption?.value?.ar,
            en: form.get("caption"),
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
          defaultValue={data?.tagline?.value?.en}
        />
        <InputField
          label="Title"
          name="title"
          placeholder="Enter your title..."
          defaultValue={data?.title?.value?.en}
        />
        <TextareaField
          label="Caption"
          name="caption"
          placeholder="Enter your caption..."
          defaultValue={data?.caption?.value?.en}
        />
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
