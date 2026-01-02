import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { ItemsField } from "@/components/ui/dashboard/dynamic-sections/ItemsField";
import { useUpdatePageContents } from "@/services/pages";
import { ContactPageContent } from "@/types/pages";
import { FormEvent, useEffect, useState } from "react";

export const ArContent = ({
  data,
}: {
  data: ContactPageContent["sections"]["footer"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (data?.projects?.value) {
      setItems(data.projects?.value?.ar);
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
            en: data?.headline?.value?.en,
            ar: form.get("headline"),
          },
        },
        caption: {
          value: {
            en: data?.caption?.value?.en,
            ar: form.get("caption"),
          },
        },

        headOffice: {
          address: {
            value: {
              en: data?.headOffice?.address?.value?.en,
              ar: form.get("address"),
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
            en: data?.projects?.value?.en,
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
          label="Caption"
          placeholder="Enter your caption..."
          name="caption"
          defaultValue={data?.caption?.value?.ar}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.headOffice?.address?.value?.ar}
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
