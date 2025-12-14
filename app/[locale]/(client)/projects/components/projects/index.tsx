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
  return (
    <section className="relative">
      <Container>
        <header className="text-center mb-12">
          <Badge className="py-2 px-3 opacity-62 mb-1">
            <h2>Projects</h2>
          </Badge>
          <h3 className="font-medium text-6xl leading-16">
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
          <div className="absolute top-1/2 max-md:hidden left-0 w-full h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.2),rgba(255,255,255,0.2),transparent)]"></div>
          <div className="absolute top-0 left-1/2 max-md:hidden h-full w-px bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.2),rgba(255,255,255,0.2),transparent)]"></div>
          <div className="flex items-center justify-center w-[235px] h-[235px] absolute max-md:hidden top-1/2 left-1/2 -translate-x-1/2 -mt-[calc(235px/2)] z-20 rounded-full">
            <Sphere className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
            <Sphere2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" />
            <Sphere3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30" />
            <Logo className="w-fit h-fit z-20 relative -mt-2" />
          </div>
          {projects.map((project, i) => (
            <Project
              key={i}
              title={project.name}
              caption={project.description}
            />
          ))}
        </div>
        <p className="font-normal text-sm leading-6 mt-20 relative z-10">*Please click on the project name or logo to learn more.</p>
      </Container>
    </section>
  );
};
