import { Lato } from "next/font/google";
import { Hero } from "./components/Hero";
import { cn } from "@/lib/utils";
import { Services } from "./components/Services";
import { Counters } from "./components/Counters";
import { Partners } from "../components/Partners";
import { CallToAction } from "./components/CallToAction";
import { Projects } from "./components/Projects";
import { useLocale } from "next-intl";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});
export default function page() {
  const locale = useLocale();
  return (
    <main className={cn(locale == "en" && lato.className)}>
      <Hero />
      <Services />
      <Counters />
      <Partners className="z-0 relative" />
      <CallToAction />
      <Projects />
    </main>
  );
}
