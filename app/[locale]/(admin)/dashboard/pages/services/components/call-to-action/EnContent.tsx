import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/ui/dashboard/dynamic-sections";
import { useUpdatePageContents } from "@/services/pages";
import { ServicesPageContent } from "@/types/pages";
import { FormEvent } from "react";

export const EnContent = ({
  data,
}: {
  data: ServicesPageContent["sections"]["callToAction"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    mutate({
      pageName: "services",
      sectionName: "callToAction",
      value: {
        caption: {
          value: {
            ar: data.caption.value.ar,
            en: form.get("caption"),
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
          defaultValue={data?.caption?.value?.en}
        />
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
