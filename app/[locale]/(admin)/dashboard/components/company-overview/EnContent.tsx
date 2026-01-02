import { Button } from "@/components/ui/button";
import { ItemsField } from "@/components/ui/dashboard/dynamic-sections/ItemsField";
import { useUpdatePageContents } from "@/services/pages";
import { HomePageContent } from "@/types/pages";
import { FormEvent, useEffect, useState } from "react";

export const EnContent = ({
  data,
}: {
  data: HomePageContent["sections"]["companyOverview"];
}) => {
  const [items, setItems] = useState<any[]>([]);
  const { mutate, isPending } = useUpdatePageContents();

  useEffect(() => {
    if (data) {
      setItems(data?.items?.value?.en);
    }
  }, [data]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      pageName: "home",
      sectionName: "companyOverview",
      value: {
        items: {
          value: {
            en: items,
            ar: data?.items?.value?.ar,
          },
        },
      },
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
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
