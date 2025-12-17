"use client";
import Container from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { Project } from "./Project";
import FullWidthComet from "@/assets/objects/fullWidthComet.svg";
import { BluryBall } from "@/components/ui/BluryBall";
import Logo from "@/assets/logo.svg";
import Sphere from "@/assets/objects/sphere.svg";
import Sphere2 from "@/assets/objects/sphere-2.svg";
import Sphere3 from "@/assets/objects/sphere-3.svg";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

export const projects = [
  {
    name: "Al-Salam City",
    description: "A peaceful residential community built for lasting comfort.",
  },
  {
    name: "Uruk City",
    description: "A modern integrated city offering complete, elevated living.",
  },
  {
    name: "Al-Abbas Residential Complex",
    description:
      "A fully serviced community with educational, commercial amenities.",
  },
  {
    name: "Al-Kafeel Hospital",
    description: "Advanced medical care with global standards and excellence.",
  },
];

export const Projects = () => {
  const logo = useRef(null);
  const xLine = useRef(null);
  const yLine = useRef(null);
  const title = useRef(null);
  const section = useRef<HTMLElement>(null);
  const sphere1 = useRef(null);
  const sphere2 = useRef(null);
  const sphere3 = useRef(null);

  useGSAP(() => {
    const splitTitle = SplitText.create(title.current, {
      type: "chars",
      smartWrap: true,
    });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section.current, scrub: true, end: "top top" },
    });

    tl.from(splitTitle.chars, {
      y: 100,
      stagger: {
        amount: 0.1,
        from: "random",
      },
    });

    tl.from(
      sphere1.current,
      {
        scale: 0,
      },
      "<"
    );
    tl.from(
      sphere2.current,
      {
        scale: 0,
      },
      "<"
    );
    tl.from(
      sphere3.current,
      {
        scale: 0,
      },
      "<"
    );
    tl.from(
      logo.current,
      {
        scale: 0,
      },
      "<"
    );
    tl.from(
      xLine.current,
      {
        width: 0,
      },
      "<"
    );
    tl.from(
      yLine.current,
      {
        height: 0,
      },
      "<"
    );
    const projects = section.current?.querySelectorAll(
      ".projects-page-project"
    );
    if (!projects) return;
    tl.from(
      projects,
      {
        y: 10,
        opacity: 0,
        stagger: 0.06,
      },
      "<"
    );
  }, []);

  useEffect(() => {
    const gridImg = section.current?.querySelector('img[alt="Image"]');
    if (!gridImg) return;

    let position = 0;
    const speed = 0.5;

    const animate = () => {
      position += speed;
      (gridImg as HTMLElement).style.objectPosition = `${position}px center`;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="relative" ref={section}>
      <Container>
        <header className="text-center mb-12 z-10 relative">
          <Badge className="py-2 px-3 opacity-62 mb-1">
            <h2>Projects</h2>
          </Badge>
          <h3 className="font-medium text-6xl leading-16" ref={title}>
            Choose a Project <br /> To Explore
          </h3>
        </header>
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[235px] relative max-md:gap-20">
          <div
            className="absolute inset-0 pointer-events-none z-0
    [--hole:79.889999px]            /* default: hole visible */
    max-md:[--hole:0px]             /* on small screens: hole removed */
  "
          >
            <Image
              width={1000}
              height={1000}
              alt="Image"
              src="/grid-layout-bg.png"
              className="w-full h-full object-cover"
              style={{
                WebkitMaskImage: `
        radial-gradient(
          circle,
          transparent 0,
          transparent var(--hole),
          black var(--hole),
          black 0%,
          transparent 35%
        )
      `,
                maskImage: `
        radial-gradient(
          circle,
          transparent 0,
          transparent var(--hole),
          black var(--hole),
          black 0%,
          transparent 35%
        )
      `,
              }}
            />
          </div>

          <BluryBall className="bottom-0 left-[unset] right-0 translate-x-1/2 translate-y-0 w-[600px] h-[500px] blur-[235.3px]" />
          <BluryBall className="top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] blur-[235.3px]" />
          <FullWidthComet className="absolute top-[60%] left-[50%] -translate-y-[50%] -translate-x-[60%] z-0" />
          <div
            ref={xLine}
            className="absolute top-1/2 max-md:hidden left-0 w-full h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.2),rgba(255,255,255,0.2),transparent)]"
          ></div>
          <div
            ref={yLine}
            className="absolute top-0 left-1/2 max-md:hidden h-full w-px bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.2),rgba(255,255,255,0.2),transparent)]"
          ></div>
          <div className="flex items-center justify-center w-[235px] h-[235px] absolute max-md:hidden top-1/2 left-1/2 -translate-x-1/2 -mt-[calc(235px/2)] z-20 rounded-full">
            <Sphere
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              ref={sphere1}
            />
            <Sphere2
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              ref={sphere2}
            />
            <Sphere3
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
              ref={sphere3}
            />
            <Logo className="w-fit h-fit z-20 relative -mt-2" ref={logo} />
          </div>
          {projects.map((project, i) => (
            <Project
              key={i}
              title={project.name}
              caption={project.description}
            />
          ))}
        </div>
        <p className="font-normal text-sm leading-6 mt-20 relative z-10">
          *Please click on the project name or logo to learn more.
        </p>
      </Container>
    </section>
  );
};
