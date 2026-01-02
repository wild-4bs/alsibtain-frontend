"use client";
import { DynamicSections } from "@/components/ui/dashboard/dynamic-sections";
import { useGetPageContents } from "@/services/pages";
import { CareersPageContent } from "@/types/pages";
import { Hero } from "./hero";
import { Jobs } from "./jobs";
import { Benefits } from "./benefits";

export const Content = () => {
  const { data } = useGetPageContents("careers");
  return (
    <main>
      <DynamicSections>
        <Hero data={(data as CareersPageContent)?.sections?.hero} />
        {/* <Jobs data={(data as CareersPageContent)?.sections?.jobs} /> */}
        <Benefits data={(data as CareersPageContent)?.sections?.benefits} />
      </DynamicSections>
    </main>
  );
};
