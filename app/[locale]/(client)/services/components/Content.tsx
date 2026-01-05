"use client";
import { Lato } from "next/font/google";
import { Hero } from "../components/Hero";
import { cn } from "@/lib/utils";
import { Services } from "../components/Services";
import { Counters } from "../components/Counters";
import { Partners } from "../../components/Partners";
import { CallToAction } from "../components/CallToAction";
import { useLocale } from "next-intl";
import { ProjectsSlider } from "../../projects/[id]/components/ProjectsSlider";
import { useGetPageContents } from "@/services/pages";
import { ServicesPageContent } from "@/types/pages";
import { useGetGallery } from "@/services/gallery";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});
export const Content = () => {
  const locale = useLocale();
  const { data } = useGetPageContents("services");
  const { data: gallery } = useGetGallery();
  return (
    <main className={cn(locale == "en" && lato.className)}>
      <Hero data={(data as ServicesPageContent)?.sections?.hero} />
      <Services data={(data as ServicesPageContent)?.sections?.services} />
      <Counters data={(data as ServicesPageContent)?.sections?.overview} />
      <Partners className="z-0 relative" />
      <CallToAction
        data={(data as ServicesPageContent)?.sections?.callToAction}
      />
      <ProjectsSlider gallery={gallery} />
    </main>
  );
};
