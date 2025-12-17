import Container from "@/components/Container";
import { Hero } from "./components/Hero";
import { Partners } from "./components/Partners";
import { Counters } from "./components/Counters";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import { About } from "./components/About";
import { CallToAction } from "../../../components/CallToAction";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Intro } from "./components/Intro";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function Home() {
  return (
    <main className={cn("relative z-10", poppins.className)}>
      <Hero />
      <Container>
        <Intro />
      </Container>
      <Partners />
      <Counters />
      <Services />
      <Projects />
      <About />
      <CallToAction />
    </main>
  );
}
