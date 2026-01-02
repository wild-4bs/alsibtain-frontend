"use client";

import { Accordion } from "../accordion";
import { DynamicSectionForm } from "./DynamicSection";
import { useGetPageContents } from "@/services/pages";

type Field = {
  type:
    | "input"
    | "textarea"
    | "image"
    | "items"
    | "number"
    | "richtext"
    | "icon"
    | "video";
  value: any;
};

type Sections = Record<string, Record<string, Field>>;

interface Props {
  pageName: string;
}

export const DynamicSections = ({ pageName }: Props) => {
  const { data, isFetching } = useGetPageContents(pageName);

  if (!data && !isFetching) {
    return <p className="text-red-500">Page "{pageName}" not found</p>;
  }

  return (
    <Accordion type="multiple" className="space-y-4" disabled={isFetching}>
      {data &&
        Object.entries(data?.sections as Sections).map(
          ([sectionKey, fields]) => (
            <DynamicSectionForm
              key={sectionKey}
              page={data.name}
              sectionKey={sectionKey}
              fields={fields}
            />
          )
        )}
    </Accordion>
  );
};
