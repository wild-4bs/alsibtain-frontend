"use client";
import Container from "@/components/Container";
import { Magnetic } from "@/components/Magnetic";
import { BluryBall } from "@/components/ui/BluryBall";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import MediaViewer from "@/components/ViewportMedia";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface ProjectSlideProps {
  isActive: boolean;
  videoSrc: string;
  projectName: string;
  location: string;
  area: string;
  handlePlay: () => void;
  isPlaying: boolean;
}

const ProjectSlide: React.FC<ProjectSlideProps> = ({
  isActive,
  videoSrc,
  projectName,
  location,
  area,
  handlePlay,
  isPlaying,
}) => {
  const locationEl = useRef(null);
  const areaEl = useRef(null);
  const projectNameEl = useRef(null);
  const areaValueEl = useRef(null);

  useGSAP(() => {
    const splitProjectName = SplitText.create(projectNameEl.current, {
      type: "chars",
    });
    const splitArea = SplitText.create(areaEl.current, {
      type: "chars",
    });
    const splitLocation = SplitText.create(locationEl.current, {
      type: "chars",
    });
    const splitAreaValue = SplitText.create(areaValueEl.current, {
      type: "chars",
    });

    if (!isActive) return;
    gsap.from(splitProjectName.chars, {
      opacity: 0,
      x: "100%",
      stagger: 0.04,
      delay: 0.3,
    });
    gsap.from(splitArea.chars, {
      opacity: 0,
      x: "100%",
      stagger: 0.04,
      delay: 0.3,
    });
    gsap.from(splitLocation.chars, {
      opacity: 0,
      x: "100%",
      stagger: 0.04,
      delay: 0.3,
    });
    gsap.from(splitAreaValue.chars, {
      opacity: 0,
      x: "100%",
      stagger: 0.04,
      delay: 0.3,
    });
  }, [isActive]);
  return (
    <CarouselItem className="w-full h-full relative z-10">
      {isActive && (
        <video
          playsInline
          src={videoSrc}
          autoPlay={isActive}
          className="w-full z-10 h-full object-cover absolute top-0 left-0 opacity-20 animate-in fade-in duration-300"
          muted
          loop
        />
      )}
      <div className="content flex items-end pb-10 relative z-10 w-full h-full">
        <Magnetic
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 group"
          strength={40}
          triggerArea={2}
          onClick={() => handlePlay()}
        >
          {!isPlaying && (
            <Play
              strokeWidth={1.2}
              className="size-20 cursor-pointer group-hover:scale-110 duration-300 ease-out"
            />
          )}
          {isPlaying && (
            <Pause
              strokeWidth={1.2}
              className="size-20 cursor-pointer group-hover:scale-110 duration-300 ease-out"
            />
          )}
        </Magnetic>
        <Container>
          <div className="flex items-center max-md:flex-col max-md:items-start justify-between">
            <div>
              <span
                className={clsx(
                  "px-6 mb-4 py-1 duration-1000 ease-out translate-x-full inline-block text-sm border border-white rounded-full opacity-0",
                  {
                    "opacity-100 translate-x-0!": isActive,
                  }
                )}
              >
                Projects
              </span>
              <div className="sm:text-3xl text-xl flex items-center gap-2">
                <dt className="font-bold" ref={projectNameEl}>
                  {projectName} |
                </dt>{" "}
                <dd ref={locationEl}>{location}</dd>
              </div>
              <div className="sm:text-3xl text-xl flex items-center gap-2">
                <dt className="font-bold" ref={areaEl}>
                  Area:
                </dt>{" "}
                <dd ref={areaValueEl}>{area}</dd>
              </div>
            </div>
            <Button
              className="h-auto max-md:self-end rounded-full pe-1 ps-4 hover:bg-primary/30 hover:text-foreground font-medium text-lg flex gap-4 group"
              variant={"ghost"}
            >
              Read More{" "}
              <div className="size-10 flex items-center justify-center rounded-full border border-white group-hover:scale-125 ease-out duration-200">
                <ArrowUpRight />
              </div>
            </Button>
          </div>
        </Container>
      </div>
    </CarouselItem>
  );
};
const projectsData = [
  {
    id: 1,
    videoSrc: "/projects/1.mp4",
    projectName: "Uruk",
    location: "Karbala",
    area: "Over 950,000 m²",
  },
  {
    id: 2,
    videoSrc: "/projects/1.mp4",
    projectName: "Babylon",
    location: "Baghdad",
    area: "Over 800,000 m²",
  },
  {
    id: 3,
    videoSrc: "/projects/1.mp4",
    projectName: "Nineveh",
    location: "Mosul",
    area: "Over 1,200,000 m²",
  },
  {
    id: 4,
    videoSrc: "/projects/1.mp4",
    projectName: "Akkad",
    location: "Basra",
    area: "Over 650,000 m²",
  },
  {
    id: 5,
    videoSrc: "/projects/1.mp4",
    projectName: "Sumer",
    location: "Najaf",
    area: "Over 900,000 m²",
  },
];

export const Projects = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsLength, setItemsLength] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const section = useRef(null);
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
    <section className="mx-12 max-md:mx-3 -mt-28 overflow-hidden" ref={section}>
      {isPlaying && (
        <MediaViewer
          type="video"
          src={projectsData[currentSlide].videoSrc}
          onClose={() => setIsPlaying(false)}
          autoPlay
        />
      )}
      <Carousel
        className="w-full relative h-vh bg-primary/10 rounded-b-[8rem] overflow-hidden"
        setApi={setApi}
        opts={{ loop: true }}
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
          {projectsData.map((project, index) => (
            <ProjectSlide
              key={project.id}
              isActive={currentSlide === index}
              videoSrc={project.videoSrc}
              projectName={project.projectName}
              location={project.location}
              area={project.area}
              handlePlay={() => setIsPlaying(true)}
              isPlaying={isPlaying}
            />
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
          {projectsData.map((_, i) => (
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
