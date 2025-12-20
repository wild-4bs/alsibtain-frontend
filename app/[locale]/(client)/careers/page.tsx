import { Rubik } from "next/font/google";
import { Hero } from "./components/Hero";
import { JobApplications } from "./components/JobApplications";
import { WhyWorkWithUs } from "./components/WhyWorkWithUs";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Page() {
  return (
    <main style={rubik.style}>
      <Hero />
      <JobApplications />
      <WhyWorkWithUs />
    </main>
  );
}
