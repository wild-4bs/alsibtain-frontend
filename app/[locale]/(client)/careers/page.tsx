import { Rubik } from "next/font/google";
import { Hero } from "./components/Hero";
import { JobApplications } from "./components/JobApplications";
import { WhyWorkWithUs } from "./components/WhyWorkWithUs";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Page() {
  const locale = useLocale() as "ar" | "en";
  return (
    <main style={locale == "en" ? rubik.style : {}}>
      <Hero />
      <JobApplications />
      <WhyWorkWithUs />
    </main>
  );
}
