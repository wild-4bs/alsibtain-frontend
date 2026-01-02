"use client";
import { DynamicSections } from "@/components/ui/dashboard/dynamic-sections";
import { useGetPageContents } from "@/services/pages";
import { AboutPageContent } from "@/types/pages";
import { Hero } from "./hero";
import { Plan } from "./plan";
import { Overview } from "./overview";
import { Team } from "./team";

export const Content = () => {
  const { data } = useGetPageContents("about");
  return (
    <main>
      <DynamicSections>
        <Hero data={data && (data as AboutPageContent).sections.hero} />
        <Plan data={data && (data as AboutPageContent).sections.plan} />
        <Overview data={data && (data as AboutPageContent).sections.overview} />
        <Team data={data && (data as AboutPageContent).sections.team} />
      </DynamicSections>
    </main>
  );
};
