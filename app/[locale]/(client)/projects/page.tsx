import { Inter } from "next/font/google";
import { Hero } from "./components/Hero";
import { Projects } from "./components/projects";
import { Gallery } from "./components/Gallery";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function page() {
  return (
    <main className={cn(inter.className)}>
      <Hero />
      <Projects />
      <Gallery />
    </main>
  );
}
