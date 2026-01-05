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
import { Link } from "@/i18n/routing";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import Image from "next/image";
import { useLocale } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { getDirectionClass } from "@/lib/TextDirection";
import { useGetSliderProjects } from "@/services/slider-projects";

interface ProjectSlideProps {
  isActive: boolean;
  videoSrc: string;
  projectName: string;
  location: string;
  area: string;
  handlePlay: () => void;
  isPlaying: boolean;
  projectsLabel: string;
  areaLabel: string;
  readMoreLabel: string;
  locale: "en" | "ar";
  link?: string;
  projectId?: string;
}

const ProjectSlide: React.FC<ProjectSlideProps> = ({
  isActive,
  videoSrc,
  projectName,
  location,
  area,
  handlePlay,
  isPlaying,
  projectsLabel,
  areaLabel,
  readMoreLabel,
  locale,
  link,
  projectId,
}) => {
  const locationEl = useRef(null);
  const areaEl = useRef(null);
  const projectNameEl = useRef(null);
  const areaValueEl = useRef(null);

  useGSAP(() => {
    // Only animate for English
    if (locale !== "en" || !isActive) return;

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
  }, [isActive, locale]);

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
                {projectsLabel}
              </span>
              <div className="sm:text-3xl text-xl flex items-center gap-2">
                <dt className="font-bold" ref={projectNameEl}>
                  {projectName} |
                </dt>
                <dd ref={locationEl}>{location}</dd>
              </div>
              <div className="sm:text-3xl text-xl flex items-center gap-2">
                <dt className="font-bold" ref={areaEl}>
                  {areaLabel}:
                </dt>{" "}
                <dd ref={areaValueEl}>{area}</dd>
              </div>
            </div>
            <Link
              href={link || `/projects/${projectId}`}
              className="max-md:self-end inline-block"
            >
              <Button
                className="h-auto rounded-full pe-1 ps-4 hover:bg-primary/30 hover:text-foreground font-medium text-lg flex gap-4 group"
                variant={"ghost"}
              >
                {readMoreLabel}{" "}
                <div className="size-10 flex items-center justify-center rounded-full border border-white group-hover:scale-125 ease-out duration-200 rtl:rotate-270">
                  <ArrowUpRight />
                </div>
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </CarouselItem>
  );
};

const labels = {
  projects: {
    en: "Projects",
    ar: "المشاريع",
  },
  area: {
    en: "Area",
    ar: "المساحة",
  },
  readMore: {
    en: "Read More",
    ar: "اقرأ المزيد",
  },
};

export const Projects = () => {
  const { data } = useGetSliderProjects({});
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsLength, setItemsLength] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const section = useRef(null);
  const locale = useLocale() as "en" | "ar";

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
          src={data?.projects[currentSlide].video?.url}
          onClose={() => setIsPlaying(false)}
          autoPlay
        />
      )}
      <Carousel
        className="w-full relative h-vh max-md:h-[90vh] bg-primary/10 rounded-b-[8rem] max-md:rounded-b-[4rem] overflow-hidden"
        setApi={setApi}
        opts={{
          loop: true,
          direction: getDirectionClass(locale) as "ltr" | "rtl",
        }}
      >
        <Image
          width={1000}
          height={1000}
          src={"/waterflow.png"}
          alt="water-flow"
          className="w-full h-auto absolute left-0 object-cover bottom-0 object-bottom"
        />
        <BluryBall className="z-0" />
        <CarouselContent className="w-full h-screen max-md:h-[90vh] m-0">
          {data?.projects.map((project, index) => (
            <ProjectSlide
              key={project._id}
              isActive={currentSlide === index}
              videoSrc={project?.video?.url}
              projectName={project?.name[locale]}
              location={project.location[locale]}
              area={project.area}
              handlePlay={() => setIsPlaying(true)}
              isPlaying={isPlaying}
              projectsLabel={labels.projects[locale]}
              areaLabel={labels.area[locale]}
              readMoreLabel={labels.readMore[locale]}
              locale={locale}
              link={project?.link}
              projectId={project?.projectLink}
            />
          ))}
        </CarouselContent>
        <Button
          className={clsx(
            "absolute top-1/2 left-4 rtl:left-[unset] rtl:right-4 rounded-full size-16 hover:bg-primary/30 hover:text-foreground",
            {
              "opacity-40": !api?.canScrollPrev(),
            }
          )}
          variant={"ghost"}
          onClick={() => api?.scrollPrev()}
        >
          <ChevronLeft className="size-12 rtl:rotate-180" />
        </Button>
        <Button
          className={clsx(
            "absolute top-1/2 right-4 rtl:right-[unset] rtl:left-4 rounded-full size-16 hover:bg-primary/30 hover:text-foreground",
            {
              "opacity-40": !api?.canScrollNext(),
            }
          )}
          variant={"ghost"}
          onClick={() => api?.scrollNext()}
        >
          <ChevronRight className="size-12 rtl:rotate-180" />
        </Button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {data?.projects.map((_, i) => (
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
