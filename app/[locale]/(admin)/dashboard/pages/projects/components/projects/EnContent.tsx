import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { useUpdatePageContents } from "@/services/pages";
import { ProjectsPageContent } from "@/types/pages";
import { FormEvent } from "react";

export const EnContent = ({
  data,
}: {
  data: ProjectsPageContent["sections"]["projects"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const headline = form.get("headline");
    const badge = form.get("badge");
    mutate({
      pageName: "projects",
      sectionName: "projects",
      value: {
        headline: {
          value: {
            ar: data.headline.value.ar,
            en: headline,
          },
        },
        badge: {
          value: {
            ar: data.badge.value.ar,
            en: badge,
          },
        },
      },
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
         <InputField
          label="Badge"
          placeholder="Type your badge value..."
          name="badge"
          defaultValue={data?.badge?.value?.en}
        />
        <InputField
          label="Headline"
          placeholder="Type your headline..."
          name="headline"
          defaultValue={data?.headline?.value?.en}
        />
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
