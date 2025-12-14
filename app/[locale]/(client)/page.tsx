import Container from "@/components/Container";
import { Hero } from "./components/Hero";
import { Button } from "@/components/ui/button";
import { Partners } from "./components/Partners";
import { Counters } from "./components/Counters";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import { About } from "./components/About";
import { CallToAction } from "./components/CallToAction";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

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
        <section className="p-14 rounded-b-[165px] bg-primary/10 text-center">
          <h2 className="font-semibold text-4xl mb-2">
            <span className="text-primary [text-shadow:0_0_8px_var(--primary)]">
              Experience
            </span>{" "}
            <span className="text-white [text-shadow:0_0_8px_rgba(255,255,255,0.6)]">
              Life Through Architecture
            </span>
          </h2>
          <p className="mb-8">
            For over two decades, Al-Subtain Real Estate Development has been
            shaping Iraq’s skyline — crafting communities where design, trust,
            and innovation come together, Every project we build reflects a
            vision of living that goes beyond walls and spaces — it’s about
            life, legacy, and belonging.
          </p>
          <Button
            className="relative rounded-full bg-primary text-white 
             after:absolute after:inset-0 after:rounded-full 
             after:bg-primary/40 after:blur-xl after:-z-10"
          >
            Explore Our Projects
          </Button>
        </section>
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
