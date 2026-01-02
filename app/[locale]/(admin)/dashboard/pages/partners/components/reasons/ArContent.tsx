import { Button } from "@/components/ui/button";
import { ItemsField } from "@/components/ui/dashboard/dynamic-sections/ItemsField";
import { useUpdatePageContents } from "@/services/pages";
import { PartnersPageContent } from "@/types/pages";
import { FormEvent, useEffect, useState } from "react";

export const ArContent = ({
  data,
}: {
  data: PartnersPageContent["sections"]["whyPartnerWithUs"];
}) => {
  const [items, setItems] = useState<any[]>([]);
  const { mutate, isPending } = useUpdatePageContents();

  useEffect(() => {
    if (data) {
      setItems(data?.reasons?.value?.ar);
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    mutate({
      pageName: "partners",
      sectionName: "whyPartnerWithUs",
      value: {
        reasons: {
          value: {
            en: data?.reasons?.value.en,
            ar: items,
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
