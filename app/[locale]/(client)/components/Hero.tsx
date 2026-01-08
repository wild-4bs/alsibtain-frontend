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
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Autoplay from "embla-carousel-autoplay";
import clsx from "clsx";

import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocale, useTranslations } from "next-intl";
import { getDirectionClass } from "@/lib/TextDirection";
import StarsLayer from "@/components/StarrySky";
import { HomePageContent } from "@/types/pages";

gsap.registerPlugin(SplitText);

const OdometerDigit = React.memo(({ value }: { value: number }) => {
  const digitRef = useRef<HTMLDivElement>(null);
  const prevValue = useRef(value);

  useGSAP(() => {
    if (prevValue.current !== value) {
      gsap.to(digitRef.current, {
        y: -value * 24,
        duration: 0.6,
        ease: "power3.out",
      });
      prevValue.current = value;
    }
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
});

OdometerDigit.displayName = "OdometerDigit";

export const Hero = ({
  data,
}: {
  data: HomePageContent["sections"]["hero"];
}) => {
  const plugin = useMemo(
    () => Autoplay({ delay: 5000, stopOnInteraction: true }),
    []
  );
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const title = useRef<HTMLHeadingElement>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  const tagline = useRef<HTMLHeadingElement>(null);
  const hasAnimated = useRef(false);

  // Memoize callback to prevent recreation
  const updateSlide = useCallback(() => {
    if (api) {
      setCurrentSlide(api.selectedScrollSnap());
    }
  }, [api]);

  useEffect(() => {
    if (!api) return;

    updateSlide();
    api.on("select", updateSlide);

    return () => {
      api.off("select", updateSlide);
    };
  }, [api, updateSlide]);

  useGSAP(() => {
    if (
      hasAnimated.current ||
      !title.current ||
      !caption.current ||
      !tagline.current
    )
      return;

    hasAnimated.current = true;
    const tl = gsap.timeline();
    const splitTitle = SplitText.create(title.current, { type: "words" });
    const splitCaption = SplitText.create(caption.current, { type: "lines" });

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

    return () => {
      splitTitle.revert();
      splitCaption.revert();
    };
  }, []);

  const slideNumber = useMemo(() => currentSlide + 1, [currentSlide]);
  const tens = useMemo(() => Math.floor(slideNumber / 10), [slideNumber]);
  const ones = useMemo(() => slideNumber % 10, [slideNumber]);

  const handleSlideChange = useCallback(
    (index: number) => {
      setCurrentSlide(index);
      api?.scrollTo(index);
    },
    [api]
  );

  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("home.hero");

  return (
    <section className="sm:h-[calc(100vh-var(--header-height))] h-[80vh] overflow-hidden flex flex-col rounded-b-[165px] z-60 relative max-md:rounded-b-[100px]">
      <StarsLayer />
      <Container className="pt-20 relative z-10">
        <h1 ref={tagline} className="text-xs font-light mb-2">
          {data?.tagline?.value[locale]}
        </h1>

        <GlassCard className="p-5 w-fit overflow-hidden">
          <h2
            ref={title}
            className="text-6xl max-md:text-5xl max-sm:text-4xl font-medium mb-2 leading-[108%] rtl:leading-[130%]"
            dangerouslySetInnerHTML={{ __html: data?.headline?.value[locale] }}
          ></h2>

          <p
            ref={caption}
            className="text-sm font-light"
            dangerouslySetInnerHTML={{
              __html: data?.subheadline?.value[locale],
            }}
          ></p>
        </GlassCard>
      </Container>
      <Container className="mt-8 relative w-full flex flex-col justify-start z-20">
        <BluryBall className="w-[262px] h-20" />
        <GlassCard className="px-4 py-5 max-w-xl">
          <Carousel
            plugins={[plugin]}
            setApi={setApi}
            opts={{ direction: getDirectionClass(locale) as "rtl" | "ltr" }}
          >
            <CarouselContent>
              {data?.sliderItems?.value[locale].map((item, i) => (
                <CarouselItem key={i}>
                  <h3 className="font-bold text-base mb-2 max-sm:text-sm">
                    {item.title}
                  </h3>
                  <ScrollArea className="h-12">
                    <p
                      className="text-xs max-sm:text-white/90"
                      dir={getDirectionClass(locale)}
                    >
                      {item.caption}
                    </p>
                  </ScrollArea>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </GlassCard>
        <div className="flex items-center gap-2 mt-4 relative z-10 w-fit">
          {data?.sliderItems.value[locale].map((_, i) => (
            <button
              key={i}
              onClick={() => handleSlideChange(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={clsx(
                "size-4 bg-[#7070708b] duration-300 ease-out cursor-pointer",
                {
                  "bg-white": currentSlide === i,
                }
              )}
            ></button>
          ))}
        </div>
      </Container>
      <div className="flex-1 flex items-end pb-12 z-20">
        <Container>
          <div className="flex flex-col font-semibold text-lg">
            <div className="flex items-center leading-0">
              <span className="text-primary">#</span>
              <OdometerDigit value={locale == "ar" ? ones : tens} />
              <OdometerDigit value={locale == "ar" ? tens : ones} />
            </div>
            <span className="text-sm font-light fade-in animate-in">
              {data?.sliderItems?.value[locale][currentSlide].label}
            </span>
          </div>
        </Container>
      </div>
      {data?.sliderItems?.value[locale].map((item, i) => (
        <div key={i} className="absolute bottom-0 end-0 w-[900px] max-lg:w-[500px] 2xl:w-1/2 z-10!">
          {item?.image?.url && (
            <Image
              src={item.image?.url}
              alt=""
              width={1000}
              height={1000}
              className={clsx(
                "object-cover w-full duration-900",
                currentSlide === i
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-full"
              )}
            />
          )}
        </div>
      ))}
    </section>
  );
};
