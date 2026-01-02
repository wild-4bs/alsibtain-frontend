import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/ui/dashboard/dynamic-sections";
import { useUpdatePageContents } from "@/services/pages";
import { NewsAndMediaPageContent } from "@/types/pages";
import { FormEvent } from "react";

export const ArContent = ({
  data,
}: {
  data: NewsAndMediaPageContent["sections"]["callToAction"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    mutate({
      pageName: "news & media",
      sectionName: "callToAction",
      value: {
        value: {
          value: {
            en: data.value.value.en,
            ar: form.get("caption"),
          },
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <TextareaField
          label="Caption"
          name="caption"
          placeholder="Type your caption..."
          defaultValue={data?.value?.value?.ar}
        />
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
