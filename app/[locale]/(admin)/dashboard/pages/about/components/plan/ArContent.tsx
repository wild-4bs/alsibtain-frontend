import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { ItemsField } from "@/components/ui/dashboard/dynamic-sections/ItemsField";
import { useUpdatePageContents } from "@/services/pages";
import { AboutPageContent } from "@/types/pages";
import { FormEvent, useEffect, useState } from "react";

export const ArContent = ({
  data,
}: {
  data: AboutPageContent["sections"]["plan"];
}) => {
  const [items, setItems] = useState<any[]>([]);
  const { mutate, isPending } = useUpdatePageContents();

  useEffect(() => {
    if (data) {
      setItems(data?.steps?.value?.ar);
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const headline = form.get("headline");
    const subheadline = form.get("subheadline");
    mutate({
      pageName: "about",
      sectionName: "plan",
      value: {
        headline: {
          value: {
            en: data?.headline?.value?.en,
            ar: headline,
          },
        },

        subheadline: {
          value: {
            en: data?.subheadline?.value?.en,
            ar: subheadline,
          },
        },
        steps: {
          value: {
            en: data?.steps?.value.en,
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
          label="Headline"
          placeholder="Enter your headline..."
          name="headline"
          defaultValue={data?.headline?.value?.ar}
        />
        <TextareaField
          label="Subheadline"
          placeholder="Enter your subheadline..."
          name="subheadline"
          defaultValue={data?.subheadline?.value?.ar}
        />
        <ItemsField
          type="unlimited"
          expectedFields={data?.expectedFields}
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
