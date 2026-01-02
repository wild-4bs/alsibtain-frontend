"use client";
import Container from "@/components/Container";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { Hero } from "./Hero";
import { Intro } from "./Intro";
import { Partners } from "./Partners";
import { Counters } from "./Counters";
import { Services } from "./Services";
import { Projects } from "./Projects";
import { About } from "./About";
import { CallToAction } from "@/components/CallToAction";
import { useGetPageContents } from "@/services/pages";
import { HomePageContent } from "@/types/pages";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const Content = () => {
  const { data } = useGetPageContents("home");
  const locale = useLocale() as "ar" | "en";

  return (
    <main className={cn("relative z-10", locale == "en" && poppins.className)}>
      <Hero data={(data as HomePageContent)?.sections?.hero} />
      <Container>
        <Intro data={(data as HomePageContent)?.sections?.intro} />
      </Container>
      <Partners />
      <Counters data={(data as HomePageContent)?.sections?.overview} />
      <Services data={(data as HomePageContent)?.sections?.companyOverview} />
      <Projects />
      <About data={(data as HomePageContent)?.sections?.about} />
      <CallToAction />
    </main>
  );
};
