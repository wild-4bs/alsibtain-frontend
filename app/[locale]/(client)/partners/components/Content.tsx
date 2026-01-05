"use client";
import { Barlow } from "next/font/google";
import { Hero } from "../components/Hero";
import { cn } from "@/lib/utils";
import { Partners } from "../../components/Partners";
import { WhyUs } from "../components/WhyUs";
import { PartnershipTypes } from "../components/PartnershipTypes";
import { CallToAction } from "../components/CallToAction";
import { Clients } from "../components/Clients";
import { CallToAction as CallToActionHome } from "../../../../../components/CallToAction";
import { useLocale } from "next-intl";
import { useGetPageContents } from "@/services/pages";
import { PartnersPageContent } from "@/types/pages";
import { ProjectsSlider } from "../../projects/[id]/components/ProjectsSlider";
import { useGetGallery } from "@/services/gallery";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
});

export const Content = () => {
  const locale = useLocale();
  const { data } = useGetPageContents("partners");
  const { data: gallery } = useGetGallery();
  return (
    <main className={cn(locale == "en" && barlow.className)}>
      <Hero data={(data as PartnersPageContent)?.sections?.hero} />
      <Partners className="z-0" />
      <WhyUs data={(data as PartnersPageContent)?.sections?.whyPartnerWithUs} />
      <PartnershipTypes
        data={(data as PartnersPageContent)?.sections?.partnershipTypes}
      />
      <CallToAction
        data={(data as PartnersPageContent)?.sections?.callToAction}
      />
      <ProjectsSlider gallery={gallery} />
      <Clients />
      <CallToActionHome />
    </main>
  );
};
