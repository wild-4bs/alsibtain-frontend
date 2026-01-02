import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { useUpdatePageContents } from "@/services/pages";
import { PartnersPageContent } from "@/types/pages";
import { FormEvent } from "react";

export const ArContent = ({
  data,
}: {
  data: PartnersPageContent["sections"]["callToAction"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    mutate({
      pageName: "partners",
      sectionName: "callToAction",
      value: {
        title: {
          value: {
            en: data?.title?.value?.en,
            ar: form.get("title"),
          },
        },
        caption: {
          value: {
            en: data.caption.value.en,
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
          name="title"
          placeholder="Type your title..."
          defaultValue={data?.title?.value?.ar}
        />
        <TextareaField
          label="Caption"
          name="caption"
          placeholder="Type your caption..."
          defaultValue={data?.caption?.value?.ar}
        />
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
