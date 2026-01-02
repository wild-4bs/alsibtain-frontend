"use client";
import { Rubik } from "next/font/google";
import { ApplicationDetails } from "../components/ApplicationDetails";
import { Hero } from "../components/Hero";
import { useLocale } from "next-intl";
import { useGetJobById } from "@/services/jobs";
import { useParams } from "next/navigation";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const Content = () => {
  const { id } = useParams();
  const { data } = useGetJobById(id as string);
  const locale = useLocale() as "ar" | "en";
  return (
    <main style={locale == "en" ? rubik.style : {}}>
      <Hero />
      <ApplicationDetails data={data} />
    </main>
  );
};
