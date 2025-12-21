"use client";
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
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export const projects = [
  {
    name: { en: "Al-Salam City", ar: "مدينة السلام" },
    description: {
      en: "A peaceful residential community built for lasting comfort.",
      ar: "مجتمع سكني هادئ مصمم للراحة الدائمة.",
    },
  },
  {
    name: { en: "Uruk City", ar: "مدينة أوروك" },
    description: {
      en: "A modern integrated city offering complete, elevated living.",
      ar: "مدينة متكاملة حديثة توفر أسلوب حياة متكامل وراقي.",
    },
  },
  {
    name: { en: "Al-Abbas Residential Complex", ar: "مجمع العباس السكني" },
    description: {
      en: "A fully serviced community with educational, commercial amenities.",
      ar: "مجتمع متكامل مزود بالخدمات التعليمية والتجارية.",
    },
  },
  {
    name: { en: "Al-Kafeel Hospital", ar: "مستشفى الكفيل" },
    description: {
      en: "Advanced medical care with global standards and excellence.",
      ar: "رعاية طبية متقدمة بمعايير عالمية وأعلى مستويات الجودة.",
    },
  },
];

export const Projects = () => {
  const section = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const gridLayoutContainer = useRef(null);
  const xLine = useRef<HTMLDivElement>(null);
  const yLine = useRef<HTMLDivElement>(null);
  const sphere1 = useRef<SVGSVGElement>(null);
  const sphere2 = useRef<SVGSVGElement>(null);
  const sphere3 = useRef<SVGSVGElement>(null);
  const logo = useRef<SVGSVGElement>(null);

  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("projects.projects");

  useGSAP(() => {
    if (!title.current || !section.current) return;

    const splitType = locale === "ar" ? "words" : "chars";

    const splitTitle = SplitText.create(title.current, {
      type: splitType,
      smartWrap: true,
    });

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        scrub: 1,
        end: "top 30%",
      },
    });

    // Title animation
    titleTl.from(splitTitle[splitType], {
      y: 100,
      opacity: 0,
      stagger: { amount: 0.1, from: "random" },
      ease: "power3.out",
    });

    const tl = gsap.timeline({ delay: 0 });

    titleTl.add(() => {
      tl.to(sphere1.current, { scale: 1, duration: 0.3, ease: "power2.out" })
        .to(sphere2.current, { scale: 1, duration: 0.3, ease: "power2.out" })
        .to(sphere3.current, { scale: 1, duration: 0.3, ease: "power2.out" })
        .to(logo.current, { scale: 1, duration: 0.3, ease: "power2.out" })
        .to(
          xLine.current,
          { width: "100%", duration: 0.5, ease: "power2.out" },
          "<"
        )
        .to(
          yLine.current,
          { height: "100%", duration: 0.5, ease: "power2.out" },
          "<"
        );
    });
  }, [locale]);

  return (
    <section className="relative" ref={section} id="projects">
      <Container>
        <header className="text-center mb-12 z-10 relative">
          <Badge className="py-2 px-3 opacity-62 mb-1">
            <h2>{t("badge")}</h2>
          </Badge>
          <h3
            className="font-medium text-6xl leading-16 rtl:leading-[120%]"
            ref={title}
            dangerouslySetInnerHTML={{ __html: t("title") }}
          ></h3>
        </header>

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[235px] relative max-md:gap-20">
          <div
            className="absolute inset-0 pointer-events-none z-0 flex
  mask-[radial-gradient(circle_at_50%_50%,black_0px,black_150px,rgba(0,0,0,0.6)_170px,rgba(0,0,0,0.3)_190px,transparent_200px)]
  mask-no-repeat
  mask-size-[100%_100%]
  [-webkit-mask-image:radial-gradient(circle_at_50%_50%,black_0px,black_150px,rgba(0,0,0,0.6)_170px,rgba(0,0,0,0.3)_190px,transparent_200px)]
  [-webkit-mask-repeat:no-repeat]
  [-webkit-mask-size:100%_100%]"
          >
            <div className="flex" ref={gridLayoutContainer}>
              <Image
                width={1000}
                height={1000}
                alt="Image"
                src="/grid-layout-bg.png"
                className="w-full h-full object-cover [--hole:79.889999px] max-md:[--hole:0px]"
              />
              <Image
                width={1000}
                height={1000}
                alt="Image"
                src="/grid-layout-bg.png"
                className="w-full h-full object-cover [--hole:79.889999px] max-md:[--hole:0px]"
              />
            </div>
          </div>

          <BluryBall className="bottom-0 left-[unset] right-0 translate-x-1/2 translate-y-0 w-[600px] h-[500px] blur-[235.3px]" />
          <BluryBall className="top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] blur-[235.3px]" />
          <FullWidthComet className="absolute top-[60%] left-[50%] -translate-y-[50%] -translate-x-[60%] z-0" />

          <div
            ref={xLine}
            className="absolute top-1/2 max-md:hidden left-0 w-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.2),rgba(255,255,255,0.2),transparent)]"
          />
          <div
            ref={yLine}
            className="absolute top-0 left-1/2 max-md:hidden w-px h-0 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.2),rgba(255,255,255,0.2),transparent)]"
          />

          <div className="flex items-center justify-center w-[235px] h-[235px] absolute max-md:hidden top-1/2 left-1/2 -translate-x-1/2 -mt-[calc(235px/2)] z-20 rounded-full">
            <Sphere
              ref={sphere1}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 scale-0"
            />
            <Sphere2
              ref={sphere2}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 scale-0"
            />
            <Sphere3
              ref={sphere3}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 scale-0"
            />
            <Logo
              ref={logo}
              className="w-fit h-fit z-20 relative -mt-2 scale-0"
            />
          </div>

          {projects.map((project, i) => (
            <Project
              key={i}
              title={project.name[locale]}
              caption={project.description[locale]}
            />
          ))}
        </div>

        <p className="font-normal text-sm leading-6 mt-20 relative z-10">
          {t("explaination")}
        </p>
      </Container>
    </section>
  );
};
