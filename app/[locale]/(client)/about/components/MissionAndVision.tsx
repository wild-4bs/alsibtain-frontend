"use client";
import Container from "@/components/Container";
import Image from "next/image";
import { BluryBall } from "@/components/ui/BluryBall";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLocale } from "next-intl";
import { AboutPageContent } from "@/types/pages";

type Locale = "en" | "ar";

export const MissionAndVision = ({
  data,
}: {
  data: AboutPageContent["sections"]["overview"];
}) => {
  const section = useRef<HTMLElement | null>(null);
  const visionRef = useRef<HTMLElement | null>(null);
  const missionRef = useRef<HTMLElement | null>(null);
  const valuesRef = useRef<HTMLElement | null>(null);
  const title = useRef<HTMLHeadingElement | null>(null);
  const caption = useRef<HTMLParagraphElement | null>(null);
  const locale = useLocale() as Locale;

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        scrub: true,
        end: "top 10%",
      },
    });

    tl.from(title.current, { x: "-50%", opacity: 0 });
    tl.from(caption.current, { x: "-50%", opacity: 0, delay: 0.2 }, "<");
    tl.from(visionRef.current, { x: "50%", opacity: 0 }, "<");
    tl.from(missionRef.current, { y: "-50%", opacity: 0 }, "<");
    tl.from(valuesRef.current, { x: "-50%", opacity: 0 }, "<");
  }, []);

  return (
    <section className="my-32 leading-[150%] relative" ref={section}>
      <Image
        width={1000}
        height={1000}
        src={"/waterflow.png"}
        alt="water-flow"
        className="w-full max-w-[1400px] h-auto absolute left-1/2 -translate-x-1/2 object-cover -top-1/2 object-bottom max-xl:-top-1/4 max-lg:-top-1/5 max-md:-top-[10%]"
      />
      <Container>
        <BluryBall className="top-12 -left-1/5 w-[900px] h-[350px]" />
        <BluryBall className="bottom-0 -right-[70%] left-[unest] w-[900px] h-[700px]" />
        <header className="mb-12 relative z-10">
          <h2 className="font-semibold text-5xl mb-2" ref={title}>
            {data?.headline?.value[locale]}
          </h2>
          <p className="text-subtitle-color font-medium text-lg" ref={caption}>
            {data?.subheadline?.value[locale]}
          </p>
        </header>
        <div className="flex gap-10 flex-wrap relative z-10">
          {/* Vision */}
          <article
            className="w-full flex-1 md:min-w-xs max-md:min-w-full ring-8 rounded-xl p-12 bg-[#0f0f0f] ring-[#191919]"
            ref={visionRef}
          >
            <h2 className="mb-6 font-semibold text-3xl">
              {data?.ourVisionTitle?.value[locale]}
            </h2>
            <p className="font-medium text-lg text-subtitle-color">
              {data?.ourVisionCaption?.value[locale]}
            </p>
          </article>

          {/* Mission */}
          <article
            className="w-full flex-1 md:min-w-xs max-md:min-w-full ring-8 rounded-xl p-12 bg-[#0f0f0f] ring-[#191919]"
            ref={missionRef}
          >
            <h2 className="mb-6 font-semibold text-3xl">
              {data?.ourMissionTitle?.value[locale]}
            </h2>
            <p className="font-medium text-lg text-subtitle-color">
              {data?.ourMissionCaption?.value[locale]}
            </p>
          </article>

          {/* Core Values */}
          <article
            className="w-full flex-1 md:min-w-xs max-md:min-w-full ring-8 rounded-xl p-12 bg-[#0f0f0f] ring-[#191919]"
            ref={valuesRef}
          >
            <h2 className="mb-6 font-semibold text-3xl">
              {data?.coreValuesTitle?.value[locale]}
            </h2>
            <div
              className="font-medium text-lg text-subtitle-color"
              dangerouslySetInnerHTML={{
                __html: data?.coreValuesCaption?.value[locale] || "",
              }}
            />
          </article>
        </div>
      </Container>
      <Image
        width={1000}
        height={1000}
        src={"/waterflow.png"}
        alt="water-flow"
        className="w-full h-auto absolute -translate-x-1/2 max-w-[1400px] left-1/2 object-cover -bottom-1/2 rotate-180 max-xl:-bottom-1/4 max-lg:-bottom-1/5 max-md:-bottom-[10%]"
      />
    </section>
  );
};