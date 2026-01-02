"use client"
import { Inter } from "next/font/google";
import { Hero } from "../components/Hero";
import { Projects } from "../components/projects";
import { Gallery } from "../components/Gallery";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useGetPageContents } from "@/services/pages";
import { ProjectsPageContent } from "@/types/pages";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const Content = () => {
  const { data } = useGetPageContents("projects");
  const locale = useLocale();
  return (
    <main className={cn(locale == "en" && inter.className)}>
      <Hero data={(data as ProjectsPageContent)?.sections?.hero} />
      <Projects data={(data as ProjectsPageContent)?.sections?.projects} />
      <Gallery data={(data as ProjectsPageContent)?.sections?.gallery} />
    </main>
  );
};
