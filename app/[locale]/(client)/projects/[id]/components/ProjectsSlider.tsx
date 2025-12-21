"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getDirectionClass } from "@/lib/TextDirection";
import clsx from "clsx";
import Autoplay from "embla-carousel-autoplay";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const ProjectsSlider = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsLength, setItemsLength] = useState(0);
  const locale = useLocale() as "ar" | "en";
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
    <section className="mt-36 h-[650px] max-lg:h-[550px] relative">
      <Carousel
        className="w-full relative max-md:w-[90%] max-md:mx-auto"
        plugins={[plugin.current]}
        setApi={setApi}
        opts={{ direction: getDirectionClass(locale) }}
      >
        <CarouselContent className="w-full h-full items-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <CarouselItem
              key={i}
              className={clsx(
                "relative z-10 basis-1/3 max-md:basis-full duration-300 h-[542px] max-md:h-[400px]"
              )}
            >
              <Image
                src={`/projects/${i + 11}.png`}
                width={1000}
                height={1000}
                alt="Project"
                className={clsx(
                  "object-cover absolute top-1/2 -translate-y-1/2 duration-400 left-1/2 -translate-x-1/2 z-0 h-[423px] max-lg:h-[330px] max-md:h-full!",
                  {
                    "h-[542px] w-[90%] max-lg:h-[423px]": currentSlide == i - 1,
                  }
                )}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center gap-2 mt-12 absolute bottom-0 left-1/2 -translate-x-1/2">
        {Array.from({ length: 6 }).map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={clsx(
              "cursor-pointer duration-200 p-2 border-3 border-black",
              {
                "border-[#6D95FC]!": currentSlide === i,
              }
            )}
          >
            <div className="size-3 bg-white"></div>
          </button>
        ))}
      </div>
    </section>
  );
};
