"use client";
import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ArrowDown, CloudCog } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Hero = () => {
  const images = [
    { id: 0, src: "/services/hero.jpg" },
    { id: 1, src: "/projects/1.png" },
    { id: 2, src: "/projects/11.png" },
    { id: 3, src: "/projects/3.jpg" },
  ];
  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
  }, []);
  return (
    <section className="relative z-10 h-[calc(100vh-var(--header-height))] flex items-center">
      <div className="absolute -top-(--header-height) left-0 w-full h-[calc(120%+var(--header-height))] bg-primary">
        {images.map((image, i) => (
          <Image
            src={image.src}
            key={image.id}
            fill
            alt={`Hero image ${i + 1}`}
            className={clsx(
              "object-cover object-top z-20 transition-opacity duration-1000",
              {
                "opacity-90": activeImage === image.id,
                "opacity-0": activeImage !== image.id,
              }
            )}
            priority={i === 0}
          />
        ))}
        <div className="layer absolute top-0 left-0 w-full h-full bg-linear-to-t from-black to-transparent z-20"></div>
      </div>
      <BluryBall className="right-0 left-[unset] translate-x-1/2 blur-[335px] h-full w-[480px] z-20" />
      <BluryBall className="left-0 -translate-x-1/2 blur-[135px] h-[363px] w-[732px] z-20" />
      <Container className="relative z-70 max-lg:text-center">
        <div className="absolute top-1/2 right-5 z-30 w-4 flex flex-col gap-16 -translate-y-1/2">
          {images.map((_, i) => (
            <button
              key={i}
              className={clsx(
                "border border-transparent hover:border-white/20 rounded-full flex items-center justify-center size-5 cursor-pointer duration-200",
                {
                  "border-white hover:border-white!": i == activeImage,
                }
              )}
              onClick={() => setActiveImage(i)}
            >
              <div className="size-2 bg-white rounded-full"></div>
            </button>
          ))}
        </div>
        <h1 className="font-bold text-6xl mb-5 uppercase leading-[150%] max-lg:text-5xl max-md:leading-[120%] max-md:text-4xl pe-10">
          Building the Future of <br /> Modern Communities
        </h1>
        <p className="mb-6 font-normal text-lg w-full max-w-xl max-lg:mx-auto max-lg:text-base max-lg:max-w-full pe-10">
          Through strategic planning, disciplined development, and long-term
          vision, Al-Subtain delivers integrated residential projects designed
          to enrich cities and elevate everyday living.
        </p>
        <div className="flex items-center gap-7 max-lg:justify-center pe-10">
          <Button
            className="size-28 max-lg:size-24 rounded-full border-white bg-transparent"
            variant={"outline"}
          >
            <ArrowDown className="size-8" />
          </Button>
          <span className="text-xl max-lg:text-lg">Scroll Down</span>
        </div>
      </Container>
    </section>
  );
};
