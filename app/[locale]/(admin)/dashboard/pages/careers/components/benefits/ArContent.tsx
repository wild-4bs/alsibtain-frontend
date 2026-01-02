import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { ItemsField } from "@/components/ui/dashboard/dynamic-sections/ItemsField";
import { useUpdatePageContents } from "@/services/pages";
import { CareersPageContent } from "@/types/pages";
import { FormEvent, useEffect, useState } from "react";

export const ArContent = ({
  data,
}: {
  data: CareersPageContent["sections"]["benefits"];
}) => {
  const [items, setItems] = useState<any[]>([]);
  const { mutate, isPending } = useUpdatePageContents();

  useEffect(() => {
    if (data) {
      setItems(data?.benefitsList?.value?.ar);
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
            en: data?.title?.value?.en,
            ar: form.get("title"),
          },
        },
        caption: {
          value: {
            en: data?.caption?.value?.en,
            ar: form.get("caption"),
          },
        },
        benefitsList: {
          value: {
            en: data?.benefitsList?.value.en,
            ar: items,
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
          defaultValue={data?.title?.value?.ar}
        />
        <TextareaField
          label="Caption"
          placeholder="Enter your caption..."
          name="caption"
          defaultValue={data?.caption?.value?.ar}
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
