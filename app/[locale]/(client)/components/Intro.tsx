"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { HomePageContent } from "@/types/pages";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";

export const Intro = ({
  data,
}: {
  data: HomePageContent["sections"]["intro"];
}) => {
  const section = useRef<HTMLElement | null>(null);
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("home.intro");
  const headline = data?.headline?.value?.[locale] || "";
  const [firstWord, ...restWords] = headline.trim().split(" ");
  const restText = restWords.join(" ");

  useGSAP(() => {
    gsap.to(section.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      opacity: 1,
      scrollTrigger: {
        trigger: section.current,
        end: "center 20%",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={section}
      className="p-14 rounded-b-[165px] max-sm:rounded-b-[100px] h-fit bg-primary/10 text-center overflow-hidden relative opacity-0"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
    >
      <Image
        src="/home/about.png"
        width={10000}
        height={10000}
        alt="about"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
      />

      <h2 className="font-semibold text-4xl mb-2">
        <span className="text-primary animate-pulse-glow">{firstWord}</span>{" "}
        <span className="text-white animate-pulse-glow-white">{restText}</span>
      </h2>

      <p className="mb-8">{data?.subheadline?.value?.[locale]}</p>

      <Link href="/projects">
        <Button className="relative rounded-full bg-primary text-white overflow-visible">
          <span className="relative z-10">{t("cta")}</span>{" "}
          <span className="absolute inset-0 rounded-full bg-primary blur-2xl opacity-60 animate-pulse-glow-bg -z-10"></span>{" "}
        </Button>
      </Link>
    </section>
  );
};
