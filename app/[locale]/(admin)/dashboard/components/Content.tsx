"use client";
import { DynamicSections } from "@/components/ui/dashboard/dynamic-sections";
import { useGetPageContents } from "@/services/pages";
import { HomePageContent } from "@/types/pages";
import { Hero } from "./hero";
import { Intro } from "./intro";
import { Partners } from "./partners";
import { Overview } from "./overview";
import { CompanyOverview } from "./company-overview";
import { About } from "./about";
import { CallToAction } from "./call-to-action";

export const Content = () => {
  const { data, isPending } = useGetPageContents("home");
  return (
    <main>
      <DynamicSections>
        <Hero data={data && (data as HomePageContent).sections.hero} />
        <Intro data={data && (data as HomePageContent).sections.intro} />
        <Partners data={data && (data as HomePageContent).sections.partners} />
        <Overview data={data && (data as HomePageContent).sections.overview} />
        <CompanyOverview
          data={data && (data as HomePageContent).sections.companyOverview}
        />
        <About data={data && (data as HomePageContent).sections.about} />
        <CallToAction
          data={data && (data as HomePageContent).sections.callToAction}
        />
      </DynamicSections>
    </main>
  );
};
