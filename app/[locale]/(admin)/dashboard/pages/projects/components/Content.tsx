"use client";
import { DynamicSections } from "@/components/ui/dashboard/dynamic-sections";
import { useGetPageContents } from "@/services/pages";
import { ProjectsPageContent } from "@/types/pages";
import { Hero } from "./hero";
import { Projects } from "./projects";

export const Content = () => {
  const { data } = useGetPageContents("projects");
  return (
    <main>
      <DynamicSections>
        <Hero
          data={data && (data as unknown as ProjectsPageContent).sections.hero}
        />
        <Projects
          data={
            data && (data as unknown as ProjectsPageContent).sections.projects
          }
        />
      </DynamicSections>
    </main>
  );
};
