import { Barlow } from "next/font/google";
import { Hero } from "./components/Hero";
import { cn } from "@/lib/utils";
import { Partners } from "../components/Partners";
import { WhyUs } from "./components/WhyUs";
import { PartnershipTypes } from "./components/PartnershipTypes";
import { CallToAction } from "./components/CallToAction";
import { Projects } from "./components/Projects";
import { Clients } from "./components/Clients";
import { CallToAction as CallToActionHome } from "../../../../components/CallToAction";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
});

export default function page() {
  return (
    <main className={cn(barlow.className)}>
      <Hero />
      <Partners />
      <WhyUs />
      <PartnershipTypes />
      <CallToAction />
      <Projects />
      <Clients />
      <CallToActionHome />
    </main>
  );
}
