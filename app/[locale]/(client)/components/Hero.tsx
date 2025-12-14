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

export const Hero = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsLength, setItemsLength] = useState(0);

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCurrentSlide(api.selectedScrollSnap());
      setItemsLength(api.scrollSnapList().length);
    };

    update();

    api.on("select", update);

    return () => {
      api.off("select", update);
    };
  }, [api]);

  return (
    <section className="h-[calc(100vh-var(--header-height))] relative overflow-hidden flex flex-col items-start rounded-b-[165px]">
      <Container className="w-full pt-20 relative overflow-hidden">
        <div className="flex justify-between relative z-10">
          <article className="max-sm:text-center">
            <h1 className="font-light mb-2 text-xs">Al-Subtain REAL ESTATE</h1>
            <GlassCard className="p-5 w-fit">
              <h2 className="font-medium text-7xl max-md:text-5xl max-sm:text-4xl mb-2 leading-[108%] max-w-2xl">
                We Build Life, Not Just Buildings
              </h2>
              <p className="font-light text-sm">
                Over 21 years of shaping Iraq’s urban future — <br /> where
                architecture meets human vision
              </p>
            </GlassCard>
          </article>
        </div>
      </Container>
      <article className="relative mt-8 float-end self-end z-20 w-full max-w-md ps-4">
        <BluryBall className="w-[562px] h-[211px]" />
        <GlassCard className="rounded-tr-none rounded-br-none px-2 py-5 relative z-10">
          <Carousel
            className="w-full max-w-sm"
            plugins={[plugin.current]}
            setApi={setApi}
          >
            <CarouselContent className="w-full">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="select-none whitespace-break-spaces"
                >
                  <div className="p-1">
                    <h2 className="text-base font-bold">
                      Two Decades of Excellence in Development
                    </h2>
                    <p className="text-xs">
                      Across residential, healthcare, and commercial projects
                      Al-Subtain continues to redefine what modern living means
                      in Iraq.
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </GlassCard>
        <div className="flex items-center gap-2 mt-2 float-end mr-12 relative z-10">
          {Array.from({ length: itemsLength }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={clsx("size-3 cursor-pointer duration-200", {
                "bg-white": currentSlide === i,
                "bg-white/40": currentSlide !== i,
              })}
            ></button>
          ))}
        </div>
      </article>
      <div className="flex-1 w-full items-end pb-12 relative z-20 flex">
        <Container className="flex flex-col">
          <span className="font-semibold">
            <span className="text-primary">#</span>02
          </span>
          <span>Al-Salam City</span>
        </Container>
      </div>
      <div className="absolute bottom-0 right-[15%] w-fit z-10">
        <BluryBall className="top-2/4 left-2/4 md:w-[552px] h-[338px] z-0" />
        <Image
          src={"/home/uruk-nor.png"}
          width={1000}
          height={1000}
          alt="image"
          className="z-10 relative w-auto object-cover md:min-w-[900px]"
        />
      </div>
    </section>
  );
};
