import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { ImagesField } from "@/components/ui/dashboard/dynamic-sections/ImagesField";
import { useUpdatePageContents } from "@/services/pages";
import { ServicesPageContent } from "@/types/pages";
import { FormEvent, useState } from "react";

export const EnContent = ({
  data,
}: {
  data: ServicesPageContent["sections"]["overview"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();
  const [images, setImages] = useState<any[]>([
    data?.image1?.value,
    data?.image2?.value,
  ]);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    mutate({
      pageName: "services",
      sectionName: "overview",
      value: {
        caption: {
          value: {
            ar: data?.caption?.value?.ar,
            en: form.get("caption"),
          },
        },
        totalProjects: {
          value: form.get("totalProjects"),
        },
        yearsOfExperience: {
          value: form.get("yearsOfExperience"),
        },
        happyCustomers: {
          value: form.get("happyCustomers"),
        },
        provinces: {
          value: form.get("provinces"),
        },
        image1: {
          value: images[0],
        },
        image2: {
          value: images[1],
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <TextareaField
          label="Caption"
          placeholder="Enter your caption..."
          name="caption"
          defaultValue={data?.caption?.value?.en}
        />
        <div className="grid grid-cols-4 gap-5">
          <InputField
            type="number"
            label="Years of Experience"
            name="yearsOfExperience"
            defaultValue={data.yearsOfExperience.value}
          />

          <InputField
            type="number"
            label="Total Projects"
            name="totalProjects"
            defaultValue={data.totalProjects.value}
          />

          <InputField
            type="number"
            label="Happy Customers"
            name="happyCustomers"
            defaultValue={data.happyCustomers.value}
          />

          <InputField
            type="number"
            label="Provinces"
            name="provinces"
            defaultValue={data.provinces.value}
          />
        </div>
        <ImagesField
          images={images}
          type="limited"
          max={2}
          setImages={setImages}
        />

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
