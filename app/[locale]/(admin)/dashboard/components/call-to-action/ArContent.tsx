import { Button } from "@/components/ui/button";
import {
  InputField,
  RichTextField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { useUpdatePageContents } from "@/services/pages";
import { HomePageContent } from "@/types/pages";
import { FormEvent, useEffect, useState } from "react";

export const ArContent = ({
  data,
}: {
  data: HomePageContent["sections"]["callToAction"];
}) => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const { mutate, isPending } = useUpdatePageContents();

  useEffect(() => {
    if (data) {
      setTitle(data?.title?.value?.ar);
      setCaption(data?.title?.value?.ar);
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({
      pageName: "home",
      sectionName: "callToAction",
      value: {
        title: {
          value: {
            en: data.title.value.en,
            ar: title,
          },
        },
        caption: {
          value: {
            en: data.caption.value.en,
            ar: caption,
          },
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-5">
          <div className="flex flex-col gap-4 flex-1">
            <RichTextField
              label="Title"
              onChange={(v) => setTitle(v as string)}
              value={title}
            />
            <RichTextField
              label="Caption"
              onChange={(v) => setCaption(v as string)}
              value={caption}
            />
          </div>
        </div>
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
