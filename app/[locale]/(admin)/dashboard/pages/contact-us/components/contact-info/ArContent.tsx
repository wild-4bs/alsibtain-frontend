import { Button } from "@/components/ui/button";
import {
  InputField,
  RichTextField,
} from "@/components/ui/dashboard/dynamic-sections";
import { useUpdatePageContents } from "@/services/pages";
import { ContactPageContent } from "@/types/pages";
import { FormEvent, useState } from "react";

export const ArContent = ({
  data,
}: {
  data: ContactPageContent["sections"]["contactInformation"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();
  const [caption, setCaption] = useState(data?.caption?.value?.ar || "");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    mutate({
      pageName: "contact",
      sectionName: "contactInformation",
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
            ar: caption,
          },
        },

        email: form.get("email"),
        location: {
          value: {
            en: data?.location?.value?.en,
            ar: form.get("location"),
          },
        },
        linkedin: form.get("linkedin"),
        instagram: form.get("instagram"),
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

        <RichTextField
          label="Caption"
          value={caption}
          onChange={(v) => setCaption(v as string)}
        />

        <InputField
          label="Email"
          placeholder="Enter your email..."
          name="email"
          defaultValue={data?.email}
        />

        <InputField
          label="Location"
          placeholder="Enter your location..."
          name="location"
          defaultValue={data?.location?.value?.ar}
        />

        <InputField
          label="LinkedIn"
          placeholder="Enter your LinkedIn..."
          name="linkedin"
          defaultValue={data?.linkedin}
        />

        <InputField
          label="Instagram"
          placeholder="Enter your Instagram..."
          name="instagram"
          defaultValue={data?.instagram}
        />

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
