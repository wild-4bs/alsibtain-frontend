import { Button } from "@/components/ui/button";
import {
  InputField,
  RichTextField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { useUpdatePageContents } from "@/services/pages";
import { HomePageContent } from "@/types/pages";
import { FormEvent, useEffect, useState } from "react";

export const EnContent = ({
  data,
}: {
  data: HomePageContent["sections"]["callToAction"];
}) => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const { mutate, isPending } = useUpdatePageContents();

  useEffect(() => {
    if (data) {
      setTitle(data?.title?.value?.en);
      setCaption(data?.title?.value?.en);
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
            ar: data.title.value.ar,
            en: title,
          },
        },
        caption: {
          value: {
            ar: data.caption.value.ar,
            en: caption,
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
              value={title || ""}
            />
            <RichTextField
              label="Caption"
              onChange={(v) => setCaption(v as string)}
              value={caption || ""}
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
