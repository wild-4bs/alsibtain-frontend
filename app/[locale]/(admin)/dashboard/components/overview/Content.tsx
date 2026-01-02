import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/dashboard/dynamic-sections";
import { useUpdatePageContents } from "@/services/pages";
import { HomePageContent } from "@/types/pages";
import { FormEvent } from "react";

export const Content = ({
  data,
}: {
  data: HomePageContent["sections"]["overview"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    mutate({
      pageName: "home",
      sectionName: "overview",
      value: {
        yearsOfExcellence: {
          value: form.get("yearsOfExcellence"),
        },
        projects: {
          value: form.get("projects"),
        },
        housingUnits: {
          value: form.get("housingUnits"),
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
        <div className="grid grid-cols-4">
          <InputField
            type="number"
            label="Years of Excellence"
            name="yearsOfExcellence"
            defaultValue={data.yearsOfExcellence.value}
          />

          <InputField
            type="number"
            label="Projects"
            name="projects"
            defaultValue={data.projects.value}
          />

          <InputField
            type="number"
            label="Housing Units"
            name="housingUnits"
            defaultValue={data.housingUnits.value}
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
