import { Button } from "@/components/ui/button";
import {
  InputField,
} from "@/components/ui/dashboard/dynamic-sections";
import { useUpdatePageContents } from "@/services/pages";
import { HomePageContent } from "@/types/pages";
import { FormEvent } from "react";

export const ArContent = ({
  data,
}: {
  data: HomePageContent["sections"]["partners"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const title = form.get("title");
    mutate({
      pageName: "home",
      sectionName: "partners",
      value: {
        title: {
          value: {
            en: data.title.value.en,
            ar: title,
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
          placeholder="Type your title..."
          name="title"
          defaultValue={data?.title?.value?.ar}
        />
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
