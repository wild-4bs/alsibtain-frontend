import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { ItemsField } from "@/components/ui/dashboard/dynamic-sections/ItemsField";
import { useUpdatePageContents } from "@/services/pages";
import { CareersPageContent } from "@/types/pages";
import { FormEvent, useEffect, useState } from "react";

export const EnContent = ({
  data,
}: {
  data: CareersPageContent["sections"]["benefits"];
}) => {
  const [items, setItems] = useState<any[]>([]);
  const { mutate, isPending } = useUpdatePageContents();

  useEffect(() => {
    if (data) {
      setItems(data?.benefitsList?.value?.en);
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    mutate({
      pageName: "careers",
      sectionName: "benefits",
      value: {
        title: {
          value: {
            ar: data?.title?.value?.ar,
            en: form.get("title"),
          },
        },
        caption: {
          value: {
            ar: data?.caption?.value?.ar,
            en: form.get("caption"),
          },
        },
        benefitsList: {
          value: {
            ar: data?.benefitsList?.value.ar,
            en: items,
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
          placeholder="Enter your title..."
          name="title"
          defaultValue={data?.title?.value?.en}
        />
        <TextareaField
          label="Caption"
          placeholder="Enter your caption..."
          name="caption"
          defaultValue={data?.caption?.value?.en}
        />
        <ItemsField
          type="unlimited"
          expectedFields={["icon", "title", "caption"]}
          items={items}
          setItems={setItems}
        />
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
