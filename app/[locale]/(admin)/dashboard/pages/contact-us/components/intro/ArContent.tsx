import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { useUpdatePageContents } from "@/services/pages";
import { ContactPageContent } from "@/types/pages";
import { FormEvent } from "react";

export const ArContent = ({
  data,
}: {
  data: ContactPageContent["sections"]["header"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    mutate({
      pageName: "contact",
      sectionName: "header",
      value: {
        title: {
          value: {
            en: data?.title?.value?.en,
            ar: form.get("title"),
          },
        },
        subtitle: {
          value: {
            en: data?.subtitle?.value?.en,
            ar: form.get("subtitle"),
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
          label="Title"
          placeholder="Enter your title..."
          name="title"
          defaultValue={data?.title?.value?.ar}
        />
        <InputField
          label="Subtitle"
          placeholder="Enter your subtitle..."
          name="subtitle"
          defaultValue={data?.subtitle?.value?.ar}
        />
        <TextareaField
          label="Caption"
          placeholder="Enter your caption..."
          name="caption"
          defaultValue={data?.caption?.value?.ar}
        />
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
