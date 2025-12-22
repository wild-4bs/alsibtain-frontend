"use client";
import Container from "@/components/Container";
import PurpleLargeComet from "@/assets/objects/purple-large-comet.svg";
import Image from "next/image";
import AssistantNavigation from "@/assets/icons/assistant_navigation.svg";
import CorporateFare from "@/assets/icons/corporate_fare.svg";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alexandria } from "next/font/google";
import { cn } from "@/lib/utils";
import ArrowInsert from "@/assets/icons/arrow_insert.svg";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { Building2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { projectData, type Locale } from "@/lib/data";
import { VirtualTour } from "./VirtualTour";

const alexandria = Alexandria({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-alexandria",
});

export const Player360 = () => {
  const title = useRef<HTMLHeadingElement>(null);
  const section = useRef<HTMLElement>(null);
  const locale = useLocale() as Locale;
  const t = useTranslations("projects.singleProject");

  useGSAP(() => {
    const splitTitle = SplitText.create(title.current!, {
      type: locale == "en" ? "chars" : "words",
      smartWrap: true,
    });

    gsap.from(locale == "en" ? splitTitle.chars : splitTitle.words, {
      opacity: 0,
      stagger: {
        amount: 0.03,
        from: "random",
      },
      ease: "power2.out",
      scrollTrigger: {
        trigger: section.current,
        scrub: true,
        end: "top 10%",
      },
    });
  }, []);

  return (
    <section className="mt-36 relative" ref={section}>
      <h2
        className="text-center max-sm:mb-5 font-medium text-5xl mb-12 px-10 max-md:text-4xl"
        ref={title}
      >
        {t("360Viewer.title")}
      </h2>
      <Container className="z-10">
        <div className="w-full z-10 relative rounded-4xl overflow-hidden bg-[#0b0b0b] shadow-[0_10px_30px_rgba(0,0,0,0.18)] border border-white/10 max-lg:h-[500px] h-[700px] outline-none">
          <iframe
            src="https://tour.panoee.net/694696954190f11272692b47/6946b2b2bd8854781f170106"
            title="360 Virtual Tour"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking; fullscreen"
            allowFullScreen
            className="w-full h-full border-0 block"
          ></iframe>
        </div>
      </Container>
      <PurpleLargeComet className="w-full scale-120 absolute rotate-155 duration-300 z-0 origin-center top-0 left-0" />
      {/* <Container
        className={cn(
          "py-6 rounded-[3rem] relative z-10 flex gap-5 max-xl:flex-col max-md:px-6",
          alexandria.className
        )}
        style={{ boxShadow: "0 0 10px 10px #00000026" }}
      >
        <div className="w-[800px] max-2xl:w-[700px] max-xl:w-full max-xl:rounded-4xl max-xl:h-[400px] object-cover rounded-s-[5rem] overflow-hidden">
          <VirtualTour />
        </div>

        <div className="content w-full flex-1 py-8 px-10">
          <header className="flex gap-12 max-sm:flex-col max-sm:justify-start max-md:gap-4 justify-between pb-4 border-b border-b-[#BCBCBC] mb-6">
            <h3 className="font-semibold text-2xl">
              {projectData.title[locale]}
            </h3>

            <dl className="flex flex-col gap-1 font-light text-base whitespace-nowrap">
              <div className="flex items-center gap-2">
                <dt>
                  <AssistantNavigation />
                </dt>
                <dd>{projectData.location[locale]}</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt>
                  <Building2 size={14} />
                </dt>
                <dd>
                  {projectData.totalArea.value}{" "}
                  {projectData.totalArea.unit[locale]}
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <dt>
                  <CorporateFare />
                </dt>
                <dd>
                  {projectData.totalUnits.value}{" "}
                  {projectData.totalUnits.label[locale]}
                </dd>
              </div>
            </dl>
          </header>

          <div className="mb-8">
            <header className="flex gap-12 max-md:flex-col">
              <h2 className="font-semibold text-4xl leading-[140%]">
                {projectData.virtualTour.title[locale]}{" "}
                <br className="max-md:hidden" />
                {projectData.virtualTour.subtitle[locale]}
              </h2>

              <div className="w-full flex-1 flex flex-col gap-3">
                <div className="flex flex-col w-full flex-1 items-end">
                  <span className="w-full inline-block text-end">
                    {projectData.unitDetails.area.label[locale]}
                  </span>
                  <span className="text-6xl">
                    {projectData.unitDetails.area.value}{" "}
                    <span className="text-2xl">
                      {projectData.unitDetails.area.unit}
                    </span>
                  </span>
                  <span className="w-full inline-block text-end">
                    {projectData.unitDetails.area.suffix[locale]}
                  </span>
                </div>

                <dl className="flex flex-col w-full flex-1 items-end [&_dt]:min-w-[140px] font-bold text-lg">
                  <div className="flex items-center gap-2">
                    <dt>{projectData.unitDetails.rooms.label[locale]}:</dt>
                    <dd>{projectData.unitDetails.rooms.value}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt>{projectData.unitDetails.bathrooms.label[locale]}:</dt>
                    <dd>{projectData.unitDetails.bathrooms.value}</dd>
                  </div>
                </dl>
              </div>
            </header>
          </div>

          <div className="px-6 py-5 border border-[#19499F] rounded-3xl">
            <ScrollArea className="h-48 w-full overflow-hidden">
              <div
                className="grid grid-cols-2 max-sm:grid-cols-1"
                style={{ rowGap: "0.5rem", columnGap: "1.25rem" }}
              >
                {projectData.features.map((feature, i) => (
                  <Button
                    key={i}
                    className="h-10 text-start justify-start rounded-full border border-[#19499F] bg-[#00153B] font-medium text-base relative pe-10"
                    dir="rtl"
                  >
                    <div className="size-10 rounded-full flex items-center justify-center border border-[#19499F] absolute top-1/2 end-0 -translate-y-1/2">
                      <ArrowInsert />
                    </div>
                    {feature.name[locale]}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </Container> */}
    </section>
  );
};
