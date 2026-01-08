import { Inter } from "next/font/google";
import { Articles } from "./components/articles";
import { Hero } from "./components/Hero";
import { BluryBall } from "@/components/ui/BluryBall";
import { Stories } from "./components/stories";
import { CallToAction } from "./components/CallToAction";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

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
      <div className="relative">
        <BluryBall className="left-0 h-full w-[30%] animate-pulse" />
        <Articles />
        <Stories />
      </div>
      <CallToAction />
    </main>
  );
}
