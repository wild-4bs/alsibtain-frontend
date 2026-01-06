"use client";
import Container from "@/components/Container";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { useGetPartners } from "@/services/partners";
import { useGetPageContents } from "@/services/pages";
import { HomePageContent } from "@/types/pages";
import gsap from "gsap";

export const Partners = ({ className }: ComponentProps<"section">) => {
  const { data } = useGetPartners({ query: {} });
  const locale = useLocale() as "en" | "ar";
  const { data: dataContent } = useGetPageContents("home");
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!marqueeRef.current || !data?.payload?.length) return;

    const marqueeElement = marqueeRef.current;
    
    // Calculate total width of one set
    const children = Array.from(marqueeElement.children);
    const singleSetWidth = children.slice(0, data.payload.length).reduce(
      (acc, child) => acc + (child as HTMLElement).offsetWidth,
      0
    );
    
    // Set initial position
    gsap.set(marqueeElement, { x: 0 });
    
    // Animate continuously with speed based on content
    const speed = 50; // pixels per second
    const duration = singleSetWidth / speed;
    
    animationRef.current = gsap.to(marqueeElement, {
      x: -singleSetWidth,
      duration: duration,
      ease: "none",
      repeat: -1,
      onRepeat: function() {
        gsap.set(this.targets()[0], { x: 0 });
      }
    });

    return () => {
      animationRef.current?.kill();
    };
  }, [data?.payload]);

  if (!data?.payload?.length) return null;

  // Duplicate content enough times to ensure smooth infinite scroll
  const duplicateCount = Math.max(3, Math.ceil(10 / data.payload.length));
  const displayLogos = Array(duplicateCount).fill(data.payload).flat();

  return (
    <section className={cn(className, "py-16")} dir="ltr">
      <Container>
        <h2 className="text-center mb-12 text-2xl font-semibold">
          {
            (dataContent as HomePageContent)?.sections?.partners?.title?.value[
              locale
            ]
          }
        </h2>
      </Container>
      
      <div className="w-full relative overflow-hidden py-8">
        {/* Gradient overlays */}
        <div
          className="absolute top-0 left-0 w-32 h-full z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, black, transparent)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-32 h-full z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, black, transparent)",
          }}
        />

        {/* Marquee container */}
        <div 
          ref={marqueeRef} 
          className="flex items-center will-change-transform"
        >
          {displayLogos.map((partner, i) => (
            <div
              className="shrink-0 px-8 md:px-12"
              key={`${partner.logo?.url}-${i}`}
            >
              <div className="relative w-32 h-20 md:w-40 md:h-24 flex items-center justify-center">
                <Image
                  src={partner.logo?.url}
                  width={160}
                  height={96}
                  alt={partner.name || `Partner ${(i % data.payload.length) + 1}`}
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  loading="eager"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};