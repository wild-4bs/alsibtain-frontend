import { Inter } from "next/font/google";
import { Hero } from "./components/Hero";
import { Projects } from "./components/projects";
import { Gallery } from "./components/Gallery";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function page() {
  const locale = useLocale();
  return (
    <main className={cn(locale == "en" && inter.className)}>
      <Hero />
      <Projects />
      <Gallery />
    </main>
  );
}
