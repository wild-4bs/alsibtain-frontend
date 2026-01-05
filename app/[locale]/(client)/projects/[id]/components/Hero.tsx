"use client";

import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { Oxanium } from "next/font/google";
import Image from "next/image";
import { useRef } from "react";
import { useLocale } from "next-intl";
import { Project } from "@/services/projects";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oxanium",
});

export const Hero = ({ project }: { project?: Project }) => {
  const image = useRef<HTMLDivElement>(null);
  const detailsList = useRef<HTMLDListElement>(null);

  const t = useTranslations("projects.singleProject");
  const locale = useLocale() as "ar" | "en";

  useGSAP(() => {
    gsap.to(image.current, {
      clipPath: "circle(200% at 50% 50%)",
      duration: 1,
      onComplete: () => {
        gsap.to(detailsList.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.5,
        });
      },
    });
  }, []);

  return (
    <section
      className="bg-primary max-md:h-[60vh] relative"
      style={{ clipPath: "circle(0.0% at 50% 50%)" }}
      ref={image}
    >
      <Image
        src={project?.background?.url || "/projects/single-project.jpg"}
        alt="singleproject"
        width={10000}
        height={10000}
        className="w-full max-h-screen opacity-90 object-cover -mt-(--header-height) max-md:h-full"
      />
      <BluryBall className="w-[688px] h-[652px] max-sm:h-[200px] max-sm:top-1/2 top-[60%]" />
      <Container className="relative z-10">
        <dl
          className={cn(
            "grid grid-cols-5 max-w-[90%] max-sm:ps-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-3 w-full -translate-x-1/2 translate-y-1/2 [&_dt]:font-medium text-lg [&_dt]:text-subtitle-color [&_dd]:font-bold absolute bottom-0 left-1/2 [&_div]:not-first:border-s [&_div]:not-first:border-s-primary px-11 py-6 border border-primary rounded-4xl",
            locale == "en" && oxanium.className
          )}
          style={{
            background:
              "linear-gradient(to right, transparent 0%, #19499FAB 30%)",
            clipPath: "inset(0 100% 0 0)",
          }}
          ref={detailsList}
        >
          <div className="flex flex-col gap-2">
            <dt>{t("labels.projectName")}</dt>
            <dd>{project?.projectFullName[locale]}</dd>
          </div>
          <div className="flex flex-col gap-2 ps-4">
            <dt>{t("labels.location")}</dt>
            <dd>{project?.location[locale]}</dd>
          </div>
          <div className="flex flex-col gap-2 ps-4">
            <dt>{t("labels.totalArea")}</dt>
            <dd>{project?.totalArea}</dd>
          </div>
          <div className="flex flex-col gap-2 ps-4">
            <dt>{t("labels.totalResidentialUnits")}</dt>
            <dd>{project?.totalResidentialUnits}</dd>
          </div>
          <div className="flex flex-col gap-2 ps-4">
            <dt>{t("labels.unitType")}</dt>
            <dd>{project?.unitType[locale]}</dd>
          </div>
        </dl>
      </Container>
    </section>
  );
};
