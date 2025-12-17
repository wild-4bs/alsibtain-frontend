"use client";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

export const Intro = () => {
  const section = useRef(null);
  useGSAP(() => {
    gsap.from(section.current, {
      height: 0,
      padding: 0,
      opacity: 0,
      scrollTrigger: {
        trigger: section.current,
        end: "center 20%",
        scrub: true,
      },
    });
  }, []);
  return (
    <section
      className="p-14 rounded-b-[165px] max-sm:rounded-b-[100px] h-fit bg-primary/10 text-center overflow-hidden relative"
      ref={section}
    >
      <Image
        src={"/home/about.png"}
        width={10000}
        height={10000}
        alt="about"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-2"
      />
      <h2 className="font-semibold text-4xl mb-2">
        <span className="text-primary animate-pulse-glow">Experience</span>{" "}
        <span className="text-white animate-pulse-glow-white">
          Life Through Architecture
        </span>
      </h2>
      <p className="mb-8">
        For over two decades, Al-Subtain Real Estate Development has been
        shaping Iraq's skyline — crafting communities where design, trust, and
        innovation come together, Every project we build reflects a vision of
        living that goes beyond walls and spaces — it's about life, legacy, and
        belonging.
      </p>
      <Button className="relative rounded-full bg-primary text-white overflow-visible">
        <span className="relative z-10">Explore Our Projects</span>
        <span className="absolute inset-0 rounded-full bg-primary blur-2xl opacity-60 animate-pulse-glow-bg -z-10"></span>
      </Button>
    </section>
  );
};
