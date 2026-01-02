"use client";

import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useLocale, useTranslations } from "next-intl";
import { useGetUpdatesById } from "@/services/projects-updates";
import { useQueryState } from "nuqs";

gsap.registerPlugin(SplitText);

export const Hero = () => {
  const [activeUpdates] = useQueryState("active-updates");
  const { data } = useGetUpdatesById(activeUpdates || "first");
  const section = useRef<HTMLElement>(null);
  const badge = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  const imageWrapper = useRef<HTMLDivElement>(null);
  const locale = useLocale() as "en" | "ar";
  useGSAP(() => {
    const splitTitle = SplitText.create(title.current!, {
      type: locale == "en" ? "chars" : "words",
      smartWrap: true,
    });

    const tl = gsap.timeline();

    // Initial states
    gsap.set(imageWrapper.current, {
      clipPath: "circle(0.0% at 50% 50%)",
    });

    // BADGE
    tl.from(badge.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    // TITLE (chars, random, more stagger)
    tl.from(
      locale == "en" ? splitTitle.chars : splitTitle.words,
      {
        opacity: 0,
        stagger: {
          each: locale == "en" ? 0.005 : 0.05,
          from: "random",
        },
        ease: "power3.out",
      },
      "+=0.05"
    );

    // CAPTION
    tl.from(
      caption.current,
      {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "+=0.1"
    );

    // IMAGE (same time as caption)
    tl.to(
      imageWrapper.current,
      {
        clipPath: "circle(70.7% at 50% 50%)",
        duration: 2.5,
        ease: "power3.out",
      },
      "<"
    );
  }, []);
  const t = useTranslations("news&media.hero");
  return (
    <section className="relative z-10" ref={section}>
      <BluryBall className="left-[unset] right-0 bottom-0 translate-y-1/2 translate-x-1/2 w-[468px] h-[382px]" />

      <Container className="h-[calc(100vh-var(--header-height))] flex items-center gap-10 justify-between z-20 max-lg:justify-end max-lg:pt-10 max-lg:flex-col-reverse relative">
        <div
          ref={imageWrapper}
          className="h-[90%] w-full flex-1 rounded-3xl overflow-hidden max-lg:flex-[unset] max-lg:h-[400px]"
        >
          {data?.thumbnail?.url && (
            <Image
              src={data?.thumbnail?.url}
              width={10000}
              height={10000}
              alt="image"
              className="w-full h-full object-cover bg-primary/40"
            />
          )}
        </div>

        {/* CONTENT */}
        <div className="flex flex-col text-center items-center w-1/2 max-lg:w-full">
          <div ref={badge}>
            {/* <Badge
              className="mb-2 font-bold text-xs px-2 py-1"
              variant={"secondary"}
            >
              {t("badge")}
            </Badge> */}
          </div>

          <h1 className="font-black text-3xl mb-2 rtl:mb-4" ref={title}>
            {data?.title}
          </h1>

          <p
            className="font-medium text-base leading-[100%] rtl:leading-[120%]"
            ref={caption}
          >
            {data?.description}
          </p>
        </div>
      </Container>
    </section>
  );
};
