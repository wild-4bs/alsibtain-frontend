"use client";
import { DynamicSections } from "@/components/ui/dashboard/dynamic-sections";
import { useGetPageContents } from "@/services/pages";
import { PartnersPageContent } from "@/types/pages";
import { Hero } from "./hero";
import { Reasons } from "./reasons";
import { CallToAction } from "./call-to-action";
import { TypesOfPartnership } from "./typesOfPartnership";

export const Content = () => {
  const { data } = useGetPageContents("partners");
  return (
    <main>
      <DynamicSections>
        <Hero data={(data as PartnersPageContent)?.sections?.hero} />
        <Reasons
          data={(data as PartnersPageContent)?.sections?.whyPartnerWithUs}
        />
        <TypesOfPartnership
          data={(data as PartnersPageContent)?.sections?.partnershipTypes}
        />
        <CallToAction
          data={(data as PartnersPageContent)?.sections?.callToAction}
        />
      </DynamicSections>
    </main>
  );
};
