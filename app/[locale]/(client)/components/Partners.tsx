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
    const marqueeWidth = marqueeElement.scrollWidth / 2;
    animationRef.current = gsap.to(marqueeElement, {
      x: -marqueeWidth,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    return () => {
      animationRef.current?.kill();
    };
  }, [data?.payload]);

  if (!data?.payload?.length) return null;

  return (
    <section className={cn(className)}>
      <Container>
        <h2 className="text-center my-12 text-xl font-medium leading-20">
          {
            (dataContent as HomePageContent)?.sections?.partners?.title?.value[
              locale
            ]
          }
        </h2>
      </Container>
      <div className="w-full relative overflow-hidden" dir="ltr">
        <div
          className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 10%, transparent 90%, rgba(0,0,0,0.8) 100%)",
          }}
        />

        <div ref={marqueeRef} className="flex gap-0">
          {[...data.payload, ...data.payload].map((partner, i) => (
            <div
              className="shrink-0 w-44 h-44 flex items-center justify-center"
              key={`${partner.logo?.url}-${i}`}
            >
              <div className="relative w-28 h-28">
                <Image
                  src={partner.logo?.url}
                  width={112}
                  height={112}
                  alt={`Partner logo ${i + 1}`}
                  className="object-contain"
                  loading="eager"
                  unoptimized={partner.logo?.url?.startsWith("http")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
