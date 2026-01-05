"use client";
import { BluryBall } from "@/components/ui/BluryBall";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useState } from "react";
import PlayIcon from "@/assets/icons/play.svg";
import MediaViewer from "@/components/ViewportMedia";
import { useLocale } from "next-intl";
import { getDirectionClass } from "@/lib/TextDirection";
import { useGetVideos } from "@/services/video-gallery";
import { Project } from "@/services/projects";

export const VideosSlider = ({
  gallery,
}: {
  gallery: Project["videoGallery"];
}) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string>("");
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

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setIsOpen(true);
  };

  const locale = useLocale() as "en" | "ar";

  return (
    <section className="relative ms-36 mt-20 max-sm:ms-4 max-sm:mx-5 mb-52">
      {isOpen && (
        <MediaViewer
          src={selectedVideo}
          onClose={() => setIsOpen(false)}
          autoPlay
          type="video"
        />
      )}
      <BluryBall className="w-full h-[266px] blur-[235px]" />
      <Carousel
        className="w-full relative overflow-hidden"
        plugins={[plugin.current]}
        setApi={setApi}
        opts={{ direction: getDirectionClass(locale) }}
      >
        <CarouselContent className="w-full m-0 flex items-center gap-6 px-3 select-none">
          {gallery?.map((video, index) => (
            <CarouselItem
              key={index}
              className="basis-1/3 max-md:basis-full max-xl:basis-1/2 h-[262px] relative z-10"
            >
              <video
                src={`${video?.url}#t=0.1`}
                className="w-full h-full object-cover absolute top-0 left-0 z-0 rounded-2xl"
                preload="metadata"
                muted
                playsInline
              />
              <button
                onClick={() => handleVideoClick(video?.url)}
                className="absolute bottom-4 left-6 flex items-center justify-center size-10 z-10 rounded-full hover:opacity-80 duration-300 cursor-pointer"
              >
                <PlayIcon />
              </button>
              <div
                className="layer w-full h-full absolute top-0 left-0"
                style={{
                  background:
                    "linear-gradient(to right, #00060FA3 30%, transparent)",
                }}
              ></div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
