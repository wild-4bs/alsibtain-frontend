"use client";
import Container from "@/components/Container";
import Image from "next/image";
import PurpleLargeComet from "@/assets/objects/purple-large-comet.svg";
import { BluryBall } from "@/components/ui/BluryBall";
import { PlayIcon } from "lucide-react";
import { Magnetic } from "@/components/Magnetic";

import { useState } from "react";
import MediaViewer from "@/components/ViewportMedia";
export const IntroProject = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="mt-30 max-lg:mt-36 max-md:mt-48 max-sm:mt-64 relative flex flex-col gap-8">
      {isOpen && (
        <MediaViewer
          type="video"
          src="/projects/1.mp4"
          onClose={() => setIsOpen(false)}
          autoPlay
        />
      )}
      <Image
        src={"/circle-pattern.png"}
        alt="pattern"
        width={10000}
        height={10000}
        className="w-full h-full absolute top-0 left-0 object-cover z-0"
      />
      <BluryBall className="top-0 right-0 left-[unset] translate-x-0 translate-y-0 blur-[120px]" />
      <BluryBall className="top-0 left-0 translate-x-0 translate-y-0 blur-[120px]" />
      <PurpleLargeComet className="absolute bottom-0 w-full right-0" />
      <h2 className="text-center font-medium text-lg px-10">
        A master-planned residential community in Karbala, spanning 1.37 million
        m² with 1,348 modern units, featuring diverse home sizes designed for
        family living.
      </h2>
      <Container className="max-w-[90%] w-full select-none bg-primary relative max-h-[750px] h-[90vh] f p-0! z-10 rounded-4xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src={"/projects/11.png"}
            alt="project"
            width={10000}
            height={10000}
            className="w-full h-full object-cover opacity-70"
          />
          <button className="absolute flex cursor-pointer items-center justify-center top-1/2 left-1/2 p-4 -translate-x-1/2 -translate-y-1/2 rounded-full">
            <Magnetic
              className="relative z-10"
              strength={10}
              onClick={() => setIsOpen(true)}
            >
              <PlayIcon
                className="size-[50px]"
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
              />
            </Magnetic>
            <PlayIcon className="size-[50px] z-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary blur-xs" />
          </button>
        </div>
      </Container>
    </section>
  );
};
