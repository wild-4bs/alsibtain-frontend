import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { useUpdatePageContents } from "@/services/pages";
import { AboutPageContent } from "@/types/pages";
import { FormEvent } from "react";

export const ArContent = ({
  data,
}: {
  data: AboutPageContent["sections"]["team"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const headline = form.get("headline");
    const subheadline = form.get("subheadline");
    mutate({
      pageName: "about",
      sectionName: "team",
      value: {
        headline: {
          value: {
            en: data.headline.value.en,
            ar: headline,
          },
        },
        subheadline: {
          value: {
            en: data.subheadline.value.en,
            ar: subheadline,
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
          placeholder="Type your headline..."
          name="headline"
          defaultValue={data?.headline?.value?.ar}
        />
        <TextareaField
          label="Subheadline"
          placeholder="Type your subheadline"
          name="subheadline"
          defaultValue={data?.subheadline?.value?.ar}
        />
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
