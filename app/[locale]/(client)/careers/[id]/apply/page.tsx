import { Rubik } from "next/font/google";
import { ApplicationForm } from "./components/ApplicationForm";
import { Hero } from "./components/Hero";
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export default function page() {
  return (
    <main style={rubik.style}>
      <Hero />
      <ApplicationForm />
    </main>
  );
}
