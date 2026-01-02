"use client";
import { DynamicSections } from "@/components/ui/dashboard/dynamic-sections";
import { useGetPageContents } from "@/services/pages";
import { ServicesPageContent } from "@/types/pages";
import { Hero } from "./hero";
import { Services } from "./services";
import { Overview } from "./overview";
import { CallToAction } from "./call-to-action";

export const Content = () => {
  const { data } = useGetPageContents("services");
  return (
    <main>
      <DynamicSections>
        <Hero data={(data as ServicesPageContent)?.sections?.hero} />
        <Services data={(data as ServicesPageContent)?.sections?.services} />
        <Overview data={(data as ServicesPageContent)?.sections?.overview} />
        <CallToAction
          data={(data as ServicesPageContent)?.sections?.callToAction}
        />
      </DynamicSections>
    </main>
  );
};
