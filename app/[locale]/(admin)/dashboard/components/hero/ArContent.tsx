import { Button } from "@/components/ui/button";
import {
  InputField,
  RichTextField,
} from "@/components/ui/dashboard/dynamic-sections";
import { ItemsField } from "@/components/ui/dashboard/dynamic-sections/ItemsField";
import { useUpdatePageContents } from "@/services/pages";
import { HomePageContent } from "@/types/pages";
import { useEffect, useState, FormEvent } from "react";

export const ArContent = ({
  data,
}: {
  data: HomePageContent["sections"]["hero"];
}) => {
  const [items, setItems] = useState<any[]>(data?.sliderItems?.value?.ar || []);
  const [headline, setHeadline] = useState<string>("");
  const [subHeadline, setSubHeadline] = useState<string>("");
  useEffect(() => {
    if (data) {
      setSubHeadline(data.subheadline.value.ar);
      setHeadline(data.headline.value.ar);
    }
  }, [data]);

  const { mutate, isPending } = useUpdatePageContents();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const tagline = form.get("tagline");
    mutate({
      pageName: "home",
      sectionName: "hero",
      value: {
        tagline: {
          value: {
            en: data.tagline.value.en,
            ar: tagline,
          },
        },

        headline: {
          value: {
            en: data.headline.value.en,
            ar: headline,
          },
        },
        subheadline: {
          value: {
            en: data.subheadline.value.en,
            ar: subHeadline,
          },
        },
        sliderItems: {
          value: {
            en: data?.sliderItems?.value?.en,
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
          label="Tagline"
          placeholder="Enter your tagline..."
          name="tagline"
          defaultValue={data?.tagline?.value?.ar}
        />
        <RichTextField
          label="Headline"
          value={headline}
          onChange={(v) => setHeadline(v as string)}
        />
        <RichTextField
          label="Subheadline"
          value={subHeadline}
          onChange={(v) => setSubHeadline(v as string)}
        />
        <ItemsField
          expectedFields={data?.expectedFields}
          items={items}
          setItems={setItems}
          type="unlimited"
        />
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
