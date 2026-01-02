import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { useUpdatePageContents } from "@/services/pages";
import { HomePageContent } from "@/types/pages";
import { FormEvent } from "react";

export const EnContent = ({
  data,
}: {
  data: HomePageContent["sections"]["intro"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const headline = form.get("headline");
    const subheadline = form.get("subheadline");
    mutate({
      pageName: "home",
      sectionName: "intro",
      value: {
        headline: {
          value: {
            ar: data.headline.value.ar,
            en: headline,
          },
        },
        subheadline: {
          value: {
            ar: data.subheadline.value.ar,
            en: subheadline,
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
          defaultValue={data?.headline?.value?.en}
        />
        <TextareaField
          label="Subheadline"
          placeholder="Type your subheadline"
          defaultValue={data?.subheadline?.value?.en}
          name="subheadline"
        />
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
