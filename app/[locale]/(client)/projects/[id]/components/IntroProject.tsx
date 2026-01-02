"use client";
import Container from "@/components/Container";
import Image from "next/image";
import PurpleLargeComet from "@/assets/objects/purple-large-comet.svg";
import { BluryBall } from "@/components/ui/BluryBall";
import { PlayIcon } from "lucide-react";
import { Magnetic } from "@/components/Magnetic";

import { useRef, useState } from "react";
import MediaViewer from "@/components/ViewportMedia";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/src/SplitText";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { Project } from "@/services/projects";

export const IntroProject = ({ project }: { project?: Project }) => {
  const [isOpen, setIsOpen] = useState(false);
  const title = useRef(null);
  const section = useRef(null);
  const image = useRef(null);

  useGSAP(() => {
    const splitTitle = SplitText.create(title.current, {
      type: "words",
      smartWrap: true,
    });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section.current, start: "top 80%" },
    });

    tl.from(splitTitle.words, {
      y: 40,
      opacity: 0,
      stagger: {
        amount: 0.3,
        from: "random",
      },
    });
  }, []);
  const t = useTranslations("projects.singleProject.projectIntro");
  return (
    <section
      className="pt-30 max-lg:mt-36 max-md:mt-48 max-sm:mt-64 relative flex flex-col gap-8"
      ref={section}
    >
      {isOpen && (
        <MediaViewer
          type="video"
          src={project?.introduction?.video?.url}
          onClose={() => setIsOpen(false)}
          autoPlay
        />
      )}
      <Image
        src={"/circle-pattern.png"}
        alt="pattern"
        width={10000}
        height={10000}
        className="w-full h-full absolute top-0 left-0 object-cover z-0 animate-pulse"
      />
      <BluryBall className="top-0 right-0 left-[unset] translate-x-0 translate-y-0 blur-[120px]" />
      <BluryBall className="top-0 left-0 translate-x-0 translate-y-0 blur-[120px]" />
      <PurpleLargeComet className="absolute bottom-0 w-full right-0" />
      <h2 className="text-center font-medium text-lg px-10" ref={title}>
        {project?.description}
      </h2>
      <Container className="max-w-[90%] w-full select-none bg-primary relative max-h-[750px] h-[90vh] f p-0! z-10 rounded-4xl  not-last:overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src={project?.introduction?.thumbnail?.url as string}
            alt="project"
            width={10000}
            height={10000}
            className="w-full h-full object-cover opacity-70 rounded-4xl"
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
