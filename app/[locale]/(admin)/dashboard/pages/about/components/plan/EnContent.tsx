import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { ItemsField } from "@/components/ui/dashboard/dynamic-sections/ItemsField";
import { useUpdatePageContents } from "@/services/pages";
import { AboutPageContent } from "@/types/pages";
import { FormEvent, useEffect, useState } from "react";

export const EnContent = ({
  data,
}: {
  data: AboutPageContent["sections"]["plan"];
}) => {
  const [items, setItems] = useState<any[]>([]);
  const { mutate, isPending } = useUpdatePageContents();

  useEffect(() => {
    if (data) {
      setItems(data?.steps?.value?.en);
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
            ar: data?.headline?.value?.ar,
            en: headline,
          },
        },

        subheadline: {
          value: {
            ar: data?.subheadline?.value?.ar,
            en: subheadline,
          },
        },
        steps: {
          value: {
            ar: data?.steps?.value.ar,
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
          label="Headline"
          placeholder="Enter your headline..."
          name="headline"
          defaultValue={data?.headline?.value?.en}
        />
        <TextareaField
          label="Subheadline"
          placeholder="Enter your subheadline..."
          name="subheadline"
          defaultValue={data?.subheadline?.value?.en}
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
