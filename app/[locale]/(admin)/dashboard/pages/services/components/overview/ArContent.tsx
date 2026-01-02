import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { useUpdatePageContents } from "@/services/pages";
import { ServicesPageContent } from "@/types/pages";
import { FormEvent } from "react";

export const ArContent = ({
  data,
}: {
  data: ServicesPageContent["sections"]["overview"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    mutate({
      pageName: "services",
      sectionName: "overview",
      value: {
        caption: {
          value: {
            en: data?.caption?.value?.en,
            ar: form.get("caption"),
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
          defaultValue={data?.caption?.value?.ar}
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
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
