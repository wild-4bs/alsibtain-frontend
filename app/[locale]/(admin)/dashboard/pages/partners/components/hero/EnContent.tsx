import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { useUpdatePageContents } from "@/services/pages";
import { PartnersPageContent } from "@/types/pages";
import { FormEvent } from "react";

export const EnContent = ({
  data,
}: {
  data: PartnersPageContent["sections"]["hero"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    mutate({
      pageName: "partners",
      sectionName: "hero",
      value: {
        headline: {
          value: {
            ar: data?.headline?.value?.ar,
            en: form.get("headline"),
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
          label="Headline"
          placeholder="Enter your headline..."
          name="headline"
          defaultValue={data?.headline?.value?.en}
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
