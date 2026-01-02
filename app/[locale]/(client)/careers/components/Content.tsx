"use client";
import { Rubik } from "next/font/google";
import { Hero } from "../components/Hero";
import { JobApplications } from "../components/JobApplications";
import { WhyWorkWithUs } from "../components/WhyWorkWithUs";
import { useLocale } from "next-intl";
import { useGetPageContents } from "@/services/pages";
import { CareersPageContent } from "@/types/pages";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const Content = () => {
  const { data } = useGetPageContents("careers");
  const locale = useLocale() as "ar" | "en";
  return (
    <main style={locale == "en" ? rubik.style : {}}>
      <Hero data={(data as CareersPageContent)?.sections?.hero} />
      <JobApplications />
      <WhyWorkWithUs data={(data as CareersPageContent)?.sections?.benefits} />
    </main>
  );
};
