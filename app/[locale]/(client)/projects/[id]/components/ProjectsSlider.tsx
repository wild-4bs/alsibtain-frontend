"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getDirectionClass } from "@/lib/TextDirection";
import { useGetGallery } from "@/services/gallery";
import clsx from "clsx";
import Autoplay from "embla-carousel-autoplay";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MediaViewer from "@/components/ViewportMedia";
import { Project } from "@/services/projects";

export const ProjectsSlider = ({
  gallery,
}: {
  gallery: Project["imageGallery"];
}) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsLength, setItemsLength] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
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

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsOpen(true);
  };

  return (
    <section className="mt-36 h-[650px] max-lg:h-[550px] relative">
      {isOpen && (
        <MediaViewer
          type="image"
          src={selectedImage}
          onClose={() => setIsOpen(false)}
        />
      )}

      <Carousel
        className="w-full relative max-md:w-[90%] max-md:mx-auto"
        plugins={[plugin.current]}
        setApi={setApi}
        opts={{ direction: getDirectionClass(locale) }}
      >
        <CarouselContent className="w-full h-full items-center">
          {gallery?.map((image, i) => (
            <CarouselItem
              key={i}
              className={clsx(
                "relative z-10 basis-1/3 max-md:basis-full duration-300 h-[542px] max-md:h-[400px]"
              )}
            >
              <button
                onClick={() => handleImageClick(image?.url)}
                className="absolute overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-full cursor-pointer group"
              >
                <Image
                  src={image?.url}
                  width={1000}
                  height={1000}
                  alt="Project"
                  className={clsx(
                    "object-cover duration-400 h-[423px] max-lg:h-[330px] max-md:h-full! w-full group-hover:scale-105 transition-transform",
                    {
                      "h-[542px] w-[90%] max-lg:h-[423px]":
                        currentSlide == i - 1,
                    }
                  )}
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex items-center gap-2 mt-12 absolute bottom-0 left-1/2 -translate-x-1/2">
        {gallery?.map((_, i) => (
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
