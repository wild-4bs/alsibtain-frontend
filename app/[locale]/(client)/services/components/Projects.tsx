"use client";
import { BluryBall } from "@/components/ui/BluryBall";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import clsx from "clsx";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export const Projects = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
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
    <section className="mt-36 h-[650px] relative max-lg:h-[550px] relative">
      <BluryBall className="w-full" />
      <Carousel
        className="w-full relative max-md:w-[90%] max-md:mx-auto"
        plugins={[plugin.current]}
        setApi={setApi}
      >
        <CarouselContent className="w-full h-full items-center gap-7">
          {Array.from({ length: 6 }).map((_, i) => (
            <CarouselItem
              key={i}
              className={clsx(
                "relative z-10 basis-1/3 max-xl:basis-full max-md:basis-full duration-300 h-[542px] max-md:h-[400px]"
              )}
            >
              <Image
                src={`/projects/${i + 11}.png`}
                width={1000}
                height={1000}
                alt="Project"
                className={clsx(
                  "object-cover absolute top-1/2 -translate-y-1/2 duration-400 left-1/2 -translate-x-1/2 z-0 w-full h-[370px] max-xl:-translate-y-1/2! max-xl:top-1/2!",
                  {
                    "bottom-0 top-[unset] translate-y-0": currentSlide == i - 1,
                  }
                )}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
