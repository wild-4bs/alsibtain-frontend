import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { ItemsField } from "@/components/ui/dashboard/dynamic-sections/ItemsField";
import { useUpdatePageContents } from "@/services/pages";
import { ContactPageContent } from "@/types/pages";
import { FormEvent, useEffect, useState } from "react";

export const EnContent = ({
  data,
}: {
  data: ContactPageContent["sections"]["footer"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (data?.projects?.value) {
      setItems(data.projects?.value?.en);
    }
  }, [data]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    mutate({
      pageName: "contact",
      sectionName: "footer",
      value: {
        headline: {
          value: {
            ar: data?.headline?.value?.ar,
            en: form.get("headline"),
          },
        },
        caption: {
          value: {
            ar: data?.caption?.value?.ar,
            en: form.get("caption"),
          },
        },

        headOffice: {
          address: {
            value: {
              ar: data?.headOffice?.address?.value?.ar,
              en: form.get("address"),
            },
          },
          phoneNumber: form.get("phoneNumber"),
          email: form.get("email"),
          website: form.get("website"),
          facebook: form.get("facebook"),
          whatsapp: form.get("whatsapp"),
          youtube: form.get("youtube"),
          instagram: form.get("instagram"),
        },
        projects: {
          value: {
            ar: data?.projects?.value?.ar,
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
          label="Caption"
          placeholder="Enter your caption..."
          name="caption"
          defaultValue={data?.caption?.value?.en}
        />

        <InputField
          label="Address"
          name="address"
          defaultValue={data?.headOffice?.address?.value?.en}
        />
        <InputField
          label="Phone Number"
          name="phoneNumber"
          defaultValue={data?.headOffice?.phoneNumber}
        />

        <InputField
          label="Email"
          name="email"
          defaultValue={data?.headOffice?.email}
        />

        <InputField
          label="Website"
          name="website"
          defaultValue={data?.headOffice?.website}
        />

        <InputField
          label="Facebook"
          name="facebook"
          defaultValue={data?.headOffice?.facebook}
        />

        <InputField
          label="WhatsApp"
          name="whatsapp"
          defaultValue={data?.headOffice?.whatsapp}
        />

        <InputField
          label="YouTube"
          name="youtube"
          defaultValue={data?.headOffice?.youtube}
        />

        <InputField
          label="Instagram"
          name="instagram"
          defaultValue={data?.headOffice?.instagram}
        />
        <div>
          <h2 className="font-medium text-lg mb-2">Projects</h2>
          <ItemsField
            items={items}
            expectedFields={["name"]}
            setItems={setItems}
            type="unlimited"
          />
        </div>

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
