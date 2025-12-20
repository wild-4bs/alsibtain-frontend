import { Urbanist } from "next/font/google";
import { Hero } from "./components/Hero";
import { cn } from "@/lib/utils";
import { Plan } from "./components/plan";
import { MissionAndVision } from "./components/MissionAndVision";
import { Team } from "./components/Team";
import { Partners } from "../components/Partners";
import { CallToAction } from "../../../../components/CallToAction";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-urbanist",
});

export default function page() {
  return (
    <main className={cn(urbanist.className)}>
      <Hero />
      <Plan />
      <MissionAndVision />
      <Team />
      <Partners className="mb-24 z-0 relative" />
      <CallToAction />
    </main>
  );
}
