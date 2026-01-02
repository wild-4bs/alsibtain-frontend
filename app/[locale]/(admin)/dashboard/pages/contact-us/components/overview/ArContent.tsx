import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { Label } from "@/components/ui/label";
import { useUpdatePageContents } from "@/services/pages";
import { AboutPageContent } from "@/types/pages";
import { FormEvent } from "react";

export const ArContent = ({
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
            en: data?.headline?.value?.en,
            ar: form.get("headline"),
          },
        },
        subheadline: {
          value: {
            en: data?.subheadline?.value?.en,
            ar: form.get("subheadline"),
          },
        },
        ourMissionTitle: {
          value: {
            en: data?.ourMissionTitle?.value?.en,
            ar: form.get("ourMissionTitle"),
          },
        },
        ourMissionCaption: {
          value: {
            en: data?.ourMissionCaption?.value?.en,
            ar: form.get("ourMissionCaption"),
          },
        },
        ourVisionTitle: {
          value: {
            en: data?.ourVisionTitle?.value?.en,
            ar: form.get("ourVisionTitle"),
          },
        },
        ourVisionCaption: {
          value: {
            en: data?.ourVisionCaption?.value?.en,
            ar: form.get("ourVisionCaption"),
          },
        },
        coreValuesTitle: {
          value: {
            en: data?.coreValuesTitle?.value?.en,
            ar: form.get("coreValuesTitle"),
          },
        },
        coreValuesCaption: {
          value: {
            en: data?.coreValuesCaption?.value?.en,
            ar: form.get("coreValuesCaption"),
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

        <div className="grid grid-cols-3 p-4 rounded-md bg-gray-500/4 shadow-sm gap-4">
          <div className="grid gap-2 bg-gray-500/10 p-4 rounded-lg">
            <Label className="font-bold">Our Mission</Label>
            <InputField
              label="Title"
              name="ourMissionTitle"
              defaultValue={data?.ourMissionTitle?.value?.ar}
            />
            <TextareaField
              label="Caption"
              name="ourMissionCaption"
              defaultValue={data?.ourMissionCaption?.value?.ar}
            />
          </div>

          <div className="grid gap-2 bg-gray-500/10 p-4 rounded-lg">
            <Label className="font-bold">Our Vision</Label>
            <InputField
              label="Title"
              name="ourVisionTitle"
              defaultValue={data?.ourVisionTitle?.value?.ar}
            />
            <TextareaField
              label="Caption"
              name="ourVisionCaption"
              defaultValue={data?.ourVisionCaption?.value?.ar}
            />
          </div>

          <div className="grid gap-2 bg-gray-500/10 p-4 rounded-lg">
            <Label className="font-bold">Core Values</Label>
            <InputField
              label="Title"
              name="coreValuesTitle"
              defaultValue={data?.coreValuesTitle?.value?.ar}
            />
            <TextareaField
              label="Caption"
              name="coreValuesCaption"
              defaultValue={data?.coreValuesCaption?.value?.ar}
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
