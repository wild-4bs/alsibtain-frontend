import { Rubik } from "next/font/google";
import { ApplicationDetails } from "./components/ApplicationDetails";
import { Hero } from "./components/Hero";
import { useLocale } from "next-intl";
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export default function page() {
  const locale = useLocale() as "ar" | "en";
  return (
    <main style={locale == "en" ? rubik.style : {}}>
      <Hero />
      <ApplicationDetails />
    </main>
  );
}
