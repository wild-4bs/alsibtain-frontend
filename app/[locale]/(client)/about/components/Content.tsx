"use client"
import {  Urbanist } from "next/font/google";
import { Hero } from "../components/Hero";
import { cn } from "@/lib/utils";
import { Plan } from "../components/plan";
import { MissionAndVision } from "../components/MissionAndVision";
import { Team } from "../components/Team";
import { Partners } from "../../components/Partners";
import { CallToAction } from "../../../../../components/CallToAction";
import { useLocale } from "next-intl";
import { useGetPageContents } from "@/services/pages";
import { AboutPageContent } from "@/types/pages";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-urbanist",
});

export const Content = () => {
  const locale = useLocale();
  const { data } = useGetPageContents("about");
  return (
    <main className={cn(locale == "en" && urbanist.className)}>
      <Hero data={(data as AboutPageContent)?.sections?.hero} />
      <Plan data={(data as AboutPageContent)?.sections?.plan} />
      <MissionAndVision data={(data as AboutPageContent)?.sections?.overview} />
      <Team data={(data as AboutPageContent)?.sections?.team} />
      <Partners className="mb-24 z-0 relative" />
      <CallToAction />
    </main>
  );
};
