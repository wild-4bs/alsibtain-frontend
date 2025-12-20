"use client";

import Container from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { BluryBall } from "@/components/ui/BluryBall";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export const Hero = () => {
  const section = useRef<HTMLElement>(null);
  const badge = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  const imageWrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const splitTitle = SplitText.create(title.current!, {
      type: "chars",
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
      splitTitle.chars,
      {
        opacity: 0,
        stagger: {
          each: 0.015,
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
        duration: 1.2,
        ease: "power3.out",
      },
      "<"
    );
  }, []);

  return (
    <section className="relative z-10" ref={section}>
      <BluryBall className="left-[unset] right-0 bottom-0 translate-y-1/2 translate-x-1/2 w-[468px] h-[382px]" />

      <Container className="h-[calc(100vh-var(--header-height))] flex items-center gap-10 justify-between z-20 max-lg:justify-end max-lg:pt-10 max-lg:flex-col-reverse relative">
        <div
          ref={imageWrapper}
          className="h-[90%] w-full flex-1 rounded-3xl overflow-hidden max-lg:flex-[unset] max-lg:h-[400px]"
        >
          <Image
            src={"/news&media/hero.jpg"}
            width={10000}
            height={10000}
            alt="image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col text-center items-center w-1/2 max-lg:w-full">
          <div ref={badge}>
            <Badge
              className="mb-2 font-bold text-xs px-2 py-1"
              variant={"secondary"}
            >
              Story
            </Badge>
          </div>

          <h1 className="font-black text-3xl mb-2" ref={title}>
            Local Government Faces Criticism Over New Policies
          </h1>

          <p className="font-medium text-base leading-[100%]" ref={caption}>
            Local Government Faces Criticism Over New Policies as thousands took
            to the streets to oppose recent policy changes, leading to clashes
            with law enforcement and a state of emergency declared in several
            cities.
          </p>
        </div>
      </Container>
    </section>
  );
};
