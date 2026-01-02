import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { Label } from "@/components/ui/label";
import { useUpdatePageContents } from "@/services/pages";
import { AboutPageContent } from "@/types/pages";
import { FormEvent } from "react";

export const EnContent = ({
  data,
}: {
  data: AboutPageContent["sections"]["overview"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    mutate({
      pageName: "about",
      sectionName: "overview",
      value: {
        headline: {
          value: {
            ar: data?.headline?.value?.ar,
            en: form.get("headline"),
          },
        },
        subheadline: {
          value: {
            ar: data?.subheadline?.value?.ar,
            en: form.get("subheadline"),
          },
        },
        ourMissionTitle: {
          value: {
            ar: data?.ourMissionTitle?.value?.ar,
            en: form.get("ourMissionTitle"),
          },
        },
        ourMissionCaption: {
          value: {
            ar: data?.ourMissionCaption?.value?.ar,
            en: form.get("ourMissionCaption"),
          },
        },
        ourVisionTitle: {
          value: {
            ar: data?.ourVisionTitle?.value?.ar,
            en: form.get("ourVisionTitle"),
          },
        },
        ourVisionCaption: {
          value: {
            ar: data?.ourVisionCaption?.value?.ar,
            en: form.get("ourVisionCaption"),
          },
        },
        coreValuesTitle: {
          value: {
            ar: data?.coreValuesTitle?.value?.ar,
            en: form.get("coreValuesTitle"),
          },
        },
        coreValuesCaption: {
          value: {
            ar: data?.coreValuesCaption?.value?.ar,
            en: form.get("coreValuesCaption"),
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

        <div className="grid grid-cols-3 p-4 rounded-md bg-gray-500/4 shadow-sm gap-4">
          <div className="grid gap-2 bg-gray-500/10 p-4 rounded-lg">
            <Label className="font-bold">Our Mission</Label>
            <InputField
              label="Title"
              name="ourMissionTitle"
              defaultValue={data?.ourMissionTitle?.value?.en}
            />
            <TextareaField
              label="Caption"
              name="ourMissionCaption"
              defaultValue={data?.ourMissionCaption?.value?.en}
            />
          </div>

          <div className="grid gap-2 bg-gray-500/10 p-4 rounded-lg">
            <Label className="font-bold">Our Vision</Label>
            <InputField
              label="Title"
              name="ourVisionTitle"
              defaultValue={data?.ourVisionTitle?.value?.en}
            />
            <TextareaField
              label="Caption"
              name="ourVisionCaption"
              defaultValue={data?.ourVisionCaption?.value?.en}
            />
          </div>

          <div className="grid gap-2 bg-gray-500/10 p-4 rounded-lg">
            <Label className="font-bold">Core Values</Label>
            <InputField
              label="Title"
              name="coreValuesTitle"
              defaultValue={data?.coreValuesTitle?.value?.en}
            />
            <TextareaField
              label="Caption"
              name="coreValuesCaption"
              defaultValue={data?.coreValuesCaption?.value?.en}
            />
          </div>
        </div>

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
