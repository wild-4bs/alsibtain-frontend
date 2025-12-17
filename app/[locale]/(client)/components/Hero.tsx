"use client";

import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { GlassCard } from "@/components/ui/GlassCard";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import clsx from "clsx";

import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { ScrollArea } from "@/components/ui/scroll-area";

gsap.registerPlugin(SplitText);

const carouselData = [
  {
    id: 1,
    title: "Two Decades of Excellence in Development",
    description:
      "Across residential, healthcare, and commercial projects Al-Subtain continues to redefine what modern living means in Iraq.",
    image: "/home/uruk.png",
  },
  {
    id: 2,
    title: "Transforming Urban Landscapes",
    description:
      "From innovative residential communities to state-of-the-art facilities, we create spaces that inspire and endure.",
    image: "/home/uruk.png",
  },
  {
    id: 3,
    title: "Building Iraq's Future",
    description:
      "With over 21 years of expertise, we deliver projects that combine architectural excellence with sustainable development.",
    image: "/home/uruk.png",
  },
  {
    id: 4,
    title: "Quality in Every Detail",
    description:
      "Our commitment to superior craftsmanship and attention to detail ensures every project exceeds expectations.",
    image: "/home/uruk.png",
  },
  {
    id: 5,
    title: "A Legacy of Trust",
    description:
      "Trusted by thousands of families and businesses, Al-Subtain stands as a pillar of reliability in Iraq's real estate sector.",
    image: "/home/uruk.png",
  },
  {
    id: 6,
    title: "A Legacy of Trust",
    description:
      "Trusted by thousands of families and businesses, Al-Subtain stands as a pillar of reliability in Iraq's real estate sector.",
    image: "/home/uruk.png",
  },
  {
    id: 7,
    title: "A Legacy of Trust",
    description:
      "Trusted by thousands of families and businesses, Al-Subtain stands as a pillar of reliability in Iraq's real estate sector.",
    image: "/home/uruk.png",
  },
  {
    id: 8,
    title: "A Legacy of Trust",
    description:
      "Trusted by thousands of families and businesses, Al-Subtain stands as a pillar of reliability in Iraq's real estate sector.",
    image: "/home/uruk.png",
  },
  {
    id: 9,
    title: "A Legacy of Trust",
    description:
      "Trusted by thousands of families and businesses, Al-Subtain stands as a pillar of reliability in Iraq's real estate sector.",
    image: "/home/uruk.png",
  },
  {
    id: 10,
    title: "A Legacy of Trust",
    description:
      "Trusted by thousands of families and businesses, Al-Subtain stands as a pillar of reliability in Iraq's real estate sector.",
    image: "/home/uruk.png",
  },
];

const OdometerDigit = ({ value }: { value: number }) => {
  const digitRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(digitRef.current, {
      y: -value * 24,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [value]);

  return (
    <div className="relative h-6 w-[10.1px] text-sm overflow-hidden">
      <div ref={digitRef} className="absolute top-0 left-0">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="h-6 leading-6 text-center">
            {i}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Hero = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const title = useRef<HTMLHeadingElement>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  const tagline = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!api) return;
    const update = () => setCurrentSlide(api.selectedScrollSnap());
    update();
    api.on("select", update);
    return () => {
      api.off("select", update);
    };
  }, [api]);

  useGSAP(() => {
    const tl = gsap.timeline();
    const splitTitle = SplitText.create(title.current!, { type: "words" });
    const splitCaption = SplitText.create(caption.current!, { type: "lines" });

    tl.from(splitTitle.words, {
      y: 100,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.03,
      ease: "power3.out",
    })
      .from(
        splitCaption.lines,
        {
          y: 80,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        },
        0.6
      )
      .from(tagline.current, {
        x: -40,
        autoAlpha: 0,
        duration: 0.8,
      });
  }, []);

  const slideNumber = currentSlide + 1;
  const tens = Math.floor(slideNumber / 10);
  const ones = slideNumber % 10;

  return (
    <section className="h-[calc(100vh-var(--header-height))] relative overflow-hidden flex flex-col rounded-b-[165px] max-md:rounded-b-[100px]">
      <Container className="pt-20 relative z-10">
        <h1 ref={tagline} className="text-xs font-light mb-2">
          Al-Subtain REAL ESTATE
        </h1>

        <GlassCard className="p-5 w-fit overflow-hidden">
          <h2
            ref={title}
            className="text-7xl max-md:text-5xl max-sm:text-4xl font-medium mb-2 leading-[108%]"
          >
            We Build Life, Not <br /> Just Buildings
          </h2>
          <p ref={caption} className="text-sm font-light">
            Over 21 years of shaping Iraq's urban future — <br />
            where architecture meets human vision
          </p>
        </GlassCard>
      </Container>

      <article className="mt-8 self-end w-full max-w-md ps-4 z-20">
        <BluryBall className="w-[562px] h-[211px]" />
        <GlassCard className="px-2 py-5">
          <Carousel plugins={[plugin.current]} setApi={setApi}>
            <CarouselContent>
              {carouselData.map((item, i) => (
                <CarouselItem key={i}>
                  <h3 className="font-bold text-base mb-2">{item.title}</h3>
                  <ScrollArea className="h-12">
                    <p className="text-xs">{item.description}</p>
                  </ScrollArea>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </GlassCard>
      </article>

      <div className="flex-1 flex items-end pb-12 z-20">
        <Container>
          <div className="flex flex-col font-semibold text-lg">
            <div className="flex items-center leading-0">
              <span className="text-primary">#</span>
              <OdometerDigit value={tens} />
              <OdometerDigit value={ones} />
            </div>
            <span className="text-sm font-light">Al-Salam City</span>
          </div>
        </Container>
      </div>
      <BluryBall className="top-1/2 left-1/2 md:w-[552px] h-[552px] z-0!" />

      {carouselData.map((item, i) => (
        <div key={i} className="absolute bottom-0 right-[15%] w-fit z-10!">
          <Image
            src={item.image}
            alt=""
            width={1000}
            height={1000}
            className={clsx(
              "object-cover md:min-w-[900px] duration-900",
              currentSlide === i
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-full"
            )}
          />
        </div>
      ))}
    </section>
  );
};
