import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { useUpdatePageContents } from "@/services/pages";
import { ContactPageContent } from "@/types/pages";
import { FormEvent } from "react";

export const EnContent = ({
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
            ar: data?.title?.value?.ar,
            en: form.get("title"),
          },
        },
        subtitle: {
          value: {
            ar: data?.subtitle?.value?.ar,
            en: form.get("subtitle"),
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
          label="Title"
          placeholder="Enter your title..."
          name="title"
          defaultValue={data?.title?.value?.en}
        />
        <InputField
          label="Subtitle"
          placeholder="Enter your subtitle..."
          name="subtitle"
          defaultValue={data?.subtitle?.value?.en}
        />
        <TextareaField
          label="Caption"
          placeholder="Enter your caption..."
          name="caption"
          defaultValue={data?.caption?.value?.en}
        />
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
