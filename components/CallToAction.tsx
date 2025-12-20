"use client";

import { useRef } from "react";
import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Phone from "@/assets/icons/phone.svg";
import Warehouse from "@/assets/icons/warehouse.svg";
import Roofing from "@/assets/icons/roofing.svg";
import HomeWork from "@/assets/icons/home_work.svg";
import Apartment from "@/assets/icons/apartment.svg";
import { Link } from "@/i18n/routing";
/* ------------------------------------------------------------------ */
/*  Icon layout (same spread as before)                                */
/* ------------------------------------------------------------------ */
const floatingIcons = [
  {
    id: 1,
    icon: <Phone />,
    className: `
      absolute top-[0%] left-1/2 -translate-x-1/2
      sm:top-[1%]
      sm:-translate-x-1/2
      md:top-[6%]
    `,
  },
  {
    id: 2,
    icon: <Warehouse />,
    className: `
      absolute top-[10%] left-[2%]
      sm:left-[-6%]
      sm:top-[36%]
      md:left-[6%]
      md:top-[28%]
    `,
  },
  {
    id: 3,
    icon: <Roofing />,
    className: `
      absolute bottom-[2%] right-[20%]
      sm:right-[-6%]
      sm:bottom-[4%]
      md:right-[12%]
      md:bottom-[10%]
    `,
  },
  {
    id: 4,
    icon: <HomeWork />,
    className: `
      absolute top-[5%] right-[6%]
      sm:right-[-6%]
      sm:top-[4%]
      md:right-[6%]
      md:top-[14%]
    `,
  },
  {
    id: 5,
    icon: <Apartment />,
    className: `
      absolute bottom-[10%] right-[0%]
      sm:right-[-8%]
      sm:bottom-[44%]
      md:right-[4%]
      md:bottom-[34%]
    `,
  },
  {
    id: 6,
    icon: <Warehouse />,
    className: `
      absolute bottom-[6%] left-[0%]
      sm:left-[-8%]
      sm:bottom-[30%]
      md:left-[10%]
      md:bottom-[22%]
    `,
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
          z-20
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
              e.currentTarget.classList.add("[&_path]:fill-white");
            }}
            onMouseLeave={(e) => {
              resumeAll();
              e.currentTarget.classList.remove("[&_path]:fill-white");
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
        <Link href={"/projects"}>
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
        </Link>
      </Container>
    </section>
  );
};
