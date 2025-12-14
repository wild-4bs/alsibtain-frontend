"use client";
import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import clsx from "clsx";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const Projects = () => {
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
    <section className="mx-12 max-md:mx-3 -mt-28">
      <Carousel
        className="w-full relative h-vh bg-primary/10 rounded-b-[8rem] overflow-hidden"
        plugins={[plugin.current]}
        setApi={setApi}
      >
        <Image
          width={1000}
          height={1000}
          src={"/waterflow.png"}
          alt="water-flow"
          className="w-full h-auto absolute left-0 object-cover bottom-0 object-bottom"
        />
        <BluryBall className="z-0" />
        <CarouselContent className="w-full h-screen m-0">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="w-full h-full relative z-10">
              <Image
                src={"/projects/1.png"}
                width={1000}
                height={1000}
                alt="Project"
                className="w-full h-full object-cover absolute top-0 left-0 z-0 opacity-20"
              />
              <div className="content flex items-end pb-10 relative z-10 w-full h-full">
                <Play
                  strokeWidth={1.2}
                  className="size-20 cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                />
                <Container>
                  <div className="flex items-center max-md:flex-col max-md:items-start justify-between">
                    <div>
                      <span className="px-6 mb-4 py-1 inline-block text-sm border border-white rounded-full">
                        Projects
                      </span>
                      <div className="sm:text-3xl text-xl flex items-center gap-2">
                        <dt className="font-bold">Uruk |</dt> <dd> Karbala</dd>
                      </div>
                      <div className="sm:text-3xl text-xl flex items-center gap-2">
                        <dt className="font-bold">Area:</dt> |{" "}
                        <dd>Over 950,000 m²</dd>
                      </div>
                    </div>
                    <Button
                      className="h-auto max-md:self-end rounded-full pe-1 ps-4 hover:bg-primary/30 hover:text-foreground font-medium text-lg flex gap-4"
                      variant={"ghost"}
                    >
                      Read More{" "}
                      <div className="size-10 flex items-center justify-center rounded-full border border-white">
                        <ArrowUpRight />
                      </div>
                    </Button>
                  </div>
                </Container>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <Button
          className={clsx(
            "absolute top-1/2 left-4 rounded-full size-16 hover:bg-primary/30 hover:text-foreground",
            {
              "opacity-40": !api?.canScrollPrev(),
            }
          )}
          variant={"ghost"}
          onClick={() => api?.scrollPrev()}
        >
          <ChevronLeft className="size-12" />
        </Button>
        <Button
          className={clsx(
            "absolute top-1/2 right-4 rounded-full size-16 hover:bg-primary/30 hover:text-foreground",
            {
              "opacity-40": !api?.canScrollNext(),
            }
          )}
          variant={"ghost"}
          onClick={() => api?.scrollNext()}
        >
          <ChevronRight className="size-12" />
        </Button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={clsx("size-3 cursor-pointer duration-200", {
                "bg-primary": currentSlide === i,
                "bg-white/40": currentSlide !== i,
              })}
            ></button>
          ))}
        </div>
      </Carousel>
    </section>
  );
};
