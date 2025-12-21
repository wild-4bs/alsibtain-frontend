"use client";
import Container from "@/components/Container";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocale, useTranslations } from "next-intl";

export const Partners = ({ className }: ComponentProps<"section">) => {
  const t = useTranslations("common.partners");
  const locale = useLocale() as "en" | "ar";
  useGSAP(() => {
    gsap.set(".partners-marquee", {
      xPercent: 0,
    });
    gsap
      .timeline({ ease: "none", repeat: -1 })
      .to(".partners-marquee", {
        xPercent: locale == "en" ? -50 : 50,
        duration: 20,
        ease: "none",
      })
      .set(".partners-marquee", { x: 0 });
  }, []);

  return (
    <section className={cn(className)}>
      <Container>
        <h2 className="text-center my-12 text-xl font-medium leading-20">
          {t("title")}
        </h2>
      </Container>
      <div className="w-full relative">
        <div
          className="absolute top-0 left-0 w-full h-full bg-black z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, black, transparent, black)",
          }}
        ></div>
        <div className="flex w-[200%] overflow-hidden relative">
          <div className="flex partners-marquee">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                className="w-44 h-44 flex items-center justify-center relative z-0"
                key={i}
              >
                <div className="relative w-28 h-28">
                  <Image
                    src={`/home/partners/${(i % 7) + 1}.png`}
                    width={112}
                    height={112}
                    alt="partner"
                    className="object-contain"
                    priority={i < 7}
                    loading={i < 7 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                className="w-44 h-44 flex items-center justify-center relative z-0"
                key={i}
              >
                <div className="relative w-28 h-28">
                  <Image
                    src={`/home/partners/${(i % 7) + 1}.png`}
                    width={112}
                    height={112}
                    alt="partner"
                    className="object-contain"
                    priority={i < 7}
                    loading={i < 7 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
