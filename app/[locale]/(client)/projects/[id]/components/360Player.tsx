"use client";
import Container from "@/components/Container";
import PurpleLargeComet from "@/assets/objects/purple-large-comet.svg";
import { Alexandria } from "next/font/google";
import ArrowInsert from "@/assets/icons/arrow_insert.svg";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { Building2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { projectData, type Locale } from "@/lib/data";
import { VirtualTour } from "./VirtualTour";

const alexandria = Alexandria({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-alexandria",
});

export const Player360 = () => {
  const title = useRef<HTMLHeadingElement>(null);
  const section = useRef<HTMLElement>(null);
  const locale = useLocale() as Locale;
  const t = useTranslations("projects.singleProject");

  useGSAP(() => {
    const splitTitle = SplitText.create(title.current!, {
      type: locale == "en" ? "chars" : "words",
      smartWrap: true,
    });

    gsap.from(locale == "en" ? splitTitle.chars : splitTitle.words, {
      opacity: 0,
      stagger: {
        amount: 0.03,
        from: "random",
      },
      ease: "power2.out",
      scrollTrigger: {
        trigger: section.current,
        scrub: true,
        end: "top 10%",
      },
    });
  }, []);

  return (
    <section className="mt-36 relative" ref={section}>
      <h2
        className="text-center max-sm:mb-5 font-medium text-5xl mb-12 px-10 max-md:text-4xl"
        ref={title}
      >
        {t("360Viewer.title")}
      </h2>
      <Container className="z-10">
        <div className="w-full z-10 relative rounded-4xl overflow-hidden bg-[#0b0b0b] shadow-[0_10px_30px_rgba(0,0,0,0.18)] border border-white/10 max-lg:h-[500px] h-[700px] outline-none">
          <iframe
            src="https://tour.panoee.net/694696954190f11272692b47/6946b2b2bd8854781f170106"
            title="360 Virtual Tour"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking; fullscreen"
            allowFullScreen
            className="w-full h-full border-0 block"
          ></iframe>
        </div>
      </Container>
      <PurpleLargeComet className="w-full scale-120 absolute rotate-155 duration-300 z-0 origin-center top-0 left-0" />
    </section>
  );
};
