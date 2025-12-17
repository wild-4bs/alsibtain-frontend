"use client";

import { useRef } from "react";
import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { Building2, Notebook, House, Landmark } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Icon layout (same spread as before)                                */
/* ------------------------------------------------------------------ */

const floatingIcons = [
  {
    id: 1,
    icon: <Notebook className="size-8 transition-colors duration-200" />,
    className: "absolute top-[6%] left-1/2 -translate-x-1/2",
  },
  {
    id: 2,
    icon: <Landmark className="size-8 transition-colors duration-200" />,
    className: "absolute top-[28%] left-[6%]",
  },
  {
    id: 3,
    icon: <House className="size-8 transition-colors duration-200" />,
    className: "absolute bottom-[10%] right-[12%]",
  },
  {
    id: 4,
    icon: <Building2 className="size-8 transition-colors duration-200" />,
    className: "absolute top-[14%] right-[6%]",
  },
  {
    id: 5,
    icon: <House className="size-8 transition-colors duration-200" />,
    className: "absolute bottom-[34%] right-[4%]",
  },
  {
    id: 6,
    icon: <Landmark className="size-8 transition-colors duration-200" />,
    className: "absolute bottom-[22%] left-[10%]",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export const CallToAction = () => {
  const iconsRef = useRef<HTMLDivElement[]>([]);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  useGSAP(() => {
    iconsRef.current.forEach((el, i) => {
      if (!el) return;

      const float = () => {
        const tween = gsap.to(el, {
          x: gsap.utils.random(-18, 18),
          y: gsap.utils.random(-22, 22),
          rotation: gsap.utils.random(-8, 8),
          duration: gsap.utils.random(2, 4), // 🔥 faster
          ease: "sine.inOut",
          onComplete: float,
        });

        tweensRef.current[i] = tween;
      };

      float();
    });

    return () => {
      tweensRef.current.forEach((t) => t?.kill());
    };
  }, []);

  const pauseAll = () => tweensRef.current.forEach((t) => t?.pause());
  const resumeAll = () => tweensRef.current.forEach((t) => t?.resume());

  return (
    <section>
      <Container
        className="
          relative h-[50vh] py-20
          flex flex-col items-center justify-center
          text-center rounded-4xl
          border border-white/10
        "
      >
        {/* Floating Icons */}
        {floatingIcons.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => {
              if (el) iconsRef.current[i] = el;
            }}
            onMouseEnter={(e) => {
              pauseAll();
              e.currentTarget.classList.add("text-white");
            }}
            onMouseLeave={(e) => {
              resumeAll();
              e.currentTarget.classList.remove("text-white");
            }}
            className={cn(
              `
                size-18
                text-primary
                bg-black/80
                border border-white/10
                rounded-full
                backdrop-blur-md
                flex items-center justify-center
                transition-colors duration-200
                cursor-pointer
                pointer-events-auto
                z-0
                will-change-transform
              `,
              item.className
            )}
          >
            {item.icon}
          </div>
        ))}

        {/* Blury Balls (OG positions) */}
        <BluryBall className="left-0 top-0 bg-primary/60" />
        <BluryBall className="left-[unset] translate-y-0 right-0 bottom-0 translate-x-1/2 bg-primary/60" />

        {/* Content */}
        <h2 className="relative z-10 text-2xl font-semibold mb-4 leading-tight">
          Future-ready development <br /> built with purpose
        </h2>

        <p className="relative z-10 max-w-md text-sm text-white/80">
          Our projects are designed to grow with communities — sustainable,
          smart, and built to last.
        </p>
        <Button
          className="
           z-10 mt-8 
              relative w-fit rounded-full px-10 py-5
              bg-primary text-primary-foreground font-semibold
              shadow-[0_0_15px_--theme(--color-primary/70)]
              hover:shadow-[0_0_30px_--theme(--color-primary/90)]
              transition-all duration-300
              before:absolute before:inset-0 before:rounded-full
              before:bg-primary before:blur-2xl before:opacity-70 before:-z-10
              after:absolute after:inset-0 after:rounded-full
              after:bg-primary after:blur-lg after:opacity-40 after:-z-20
              animate-pulse
            "
        >
          Explore Projects
        </Button>
      </Container>
    </section>
  );
};
