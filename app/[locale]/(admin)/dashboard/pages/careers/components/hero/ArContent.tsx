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
  data: CareersPageContent["sections"]["hero"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    mutate({
      pageName: "careers",
      sectionName: "hero",
      value: {
        headline: {
          value: {
            en: data?.headline?.value?.en,
            ar: form.get("headline"),
          },
        },

        subheadline: {
          value: {
            en: data?.subheadline?.value?.en,
            ar: form.get("subhealdine"),
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
          defaultValue={data?.headline?.value?.ar}
        />
        <TextareaField
          label="Subheadline"
          placeholder="Enter your subheadline..."
          name="subhealdine"
          defaultValue={data?.subheadline?.value?.ar}
        />
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
