"use client";
import Container from "@/components/Container";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocale, useTranslations } from "next-intl";
import { useGetPartners } from "@/services/partners";

export const Partners = ({ className }: ComponentProps<"section">) => {
  const t = useTranslations("common.partners");
  const { data } = useGetPartners({ query: {} });
  const locale = useLocale() as "en" | "ar";

  useGSAP(() => {
    if (!data?.payload?.length) return;

    const direction = locale === "en" ? -100 : 100;

    gsap.to(".partners-marquee", {
      xPercent: direction,
      duration: 30,
      ease: "none",
      repeat: -1,
    });
  }, [data, locale]);

  if (!data?.payload?.length) return null;

  return (
    <section className={cn(className)}>
      <Container>
        <h2 className="text-center my-12 text-xl font-medium leading-20">
          {t("title")}
        </h2>
      </Container>
      <div className="w-full relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, black, transparent, black)",
          }}
        />
        <div className="flex partners-marquee">
          {[...data.payload, ...data.payload].map((partner, i) => (
            <div
              className="w-44 h-44 flex items-center justify-center flex-shrink-0"
              key={`${partner.logo?.url}-${i}`}
            >
              <div className="relative w-28 h-28">
                <Image
                  src={partner?.logo?.url}
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
    </section>
  );
};
