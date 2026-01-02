"use client";
import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { HomePageContent } from "@/types/pages";
import * as LucideIcons from "lucide-react";
import { HelpCircle } from "lucide-react"; // Fallback icon
import { useLocale } from "next-intl";
import { useRef } from "react";

export const Services = ({
  data,
}: {
  data: HomePageContent["sections"]["companyOverview"];
}) => {
  const section = useRef<HTMLElement>(null);
  const locale = useLocale() as "en" | "ar";

  return (
    <section
      className="bg-black pt-20 pb-12 z-40 relative rounded-b-[15rem] max-lg:pb-20 max-lg:rounded-b-[10rem] max-md:rounded-b-[7rem]"
      ref={section}
    >
      <Container className="relative">
        <BluryBall className="left-0 top-2/4 -translate-x-2/4 w-[600px] h-[400px] opacity-20" />
        <BluryBall className="right-0 left-[unset] top-2/4 translate-x-2/4 w-[600px] h-[400px] opacity-20 rtl:left-0 rtl:right-[unset] rtl:-translate-x-2/4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 relative z-10">
          {data?.items?.value[locale].map((service, i) => {
            // Get the icon component dynamically
            const IconComponent =
              (LucideIcons as any)[service.icon] || HelpCircle;

            return (
              <article
                key={i}
                className="relative z-10 home-page-service rounded-4xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all"
              >
                <div className="size-12 flex items-center justify-center bg-primary/90 rounded-full mb-5 shadow-lg shadow-primary/50">
                  <IconComponent className="text-white" width={26} />
                </div>
                <h3 className="font-semibold text-base leading-5 mb-2 text-white">
                  {service.title}
                </h3>
                <p className="font-light text-sm leading-5 text-white/80">
                  {service.caption}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
