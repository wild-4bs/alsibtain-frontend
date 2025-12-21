"use client";
import Container from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { BluryBall } from "@/components/ui/BluryBall";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowUpRight } from "lucide-react";

import { Zap, Banknote, Sticker, PieChart } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";

const partnershipsData = [
  {
    id: 1,
    icon: <Zap size={32} className="text-primary" />,
    title: {
      en: "Government Collaboration",
      ar: "التعاون الحكومي",
    },
    description: {
      en: "Working with ministries, municipalities, and public entities to support urban development initiatives.",
      ar: "العمل مع الوزارات والبلديات والجهات العامة لدعم مبادرات التنمية الحضرية.",
    },
  },
  {
    id: 2,
    icon: <Banknote size={32} className="text-primary" />,
    title: {
      en: "Investment Partnerships",
      ar: "شراكات الاستثمار",
    },
    description: {
      en: "For investors seeking reliable long-term returns through structured real estate models.",
      ar: "للمستثمرين الذين يسعون للحصول على عوائد موثوقة طويلة الأجل من خلال نماذج عقارية منظمة.",
    },
  },
  {
    id: 3,
    icon: <Sticker size={32} className="text-primary" />,
    title: {
      en: "Engineering & Construction Partners",
      ar: "شركاء الهندسة والبناء",
    },
    description: {
      en: "Collaborating with experienced firms to ensure high-quality planning, design, and execution.",
      ar: "التعاون مع الشركات ذات الخبرة لضمان التخطيط والتصميم والتنفيذ عالي الجودة.",
    },
  },
  {
    id: 4,
    icon: <PieChart size={32} className="text-primary" />,
    title: {
      en: "Service & Infrastructure Providers",
      ar: "مزودو الخدمات والبنية التحتية",
    },
    description: {
      en: "Partnerships that enhance community services—utilities, roads, education, health, and commercial support.",
      ar: "الشراكات التي تعزز الخدمات المجتمعية - المرافق والطرق والتعليم والصحة والدعم التجاري.",
    },
  },
];

export const PartnershipTypes = () => {
  const title = useRef(null);
  const caption = useRef(null);
  const button = useRef(null);
  const section = useRef<HTMLElement>(null);
  const locale = useLocale() as "ar" | "en";
  useGSAP(() => {
    const splitTitle = SplitText.create(title.current, {
      type: locale == "en" ? "chars" : "words",
      smartWrap: true,
    });
    const splitCaption = SplitText.create(caption.current, {
      type: locale == "en" ? "chars" : "words",
      smartWrap: true,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        scrub: true,
        end: "top 10%",
      },
    });

    tl.from(
      locale == "en" ? splitTitle.chars : splitTitle.words,
      {
        y: -100,
        opacity: 0,
        stagger: {
          amount: 0.3,
          from: "random",
        },
      },
      "<"
    );
    tl.from(
      locale == "en" ? splitCaption.chars : splitCaption.words,
      {
        x: -100,
        opacity: 0,
        stagger: {
          amount: 0.3,
          from: "random",
        },
      },
      "<"
    );

    tl.to(button.current, {
      opacity: 1,
      x: 0,
      y: 0,
    });
  }, []);
  const t = useTranslations("partners.partnershipTypes");
  return (
    <section className="relative mt-26" ref={section}>
      <BluryBall className="left-0 w-[40%] h-full" />
      <Container className="flex gap-10 relative z-10 max-lg:flex-col">
        <div className="flex flex-col gap-6 w-full">
          <Badge variant={"dark"}>{t("badge")}</Badge>
          <h2 className="font-bold text-6xl" ref={title}>
            {t("title")}
          </h2>
          <p
            className="font-medium text-base leading-6 text-subtitle-color"
            ref={caption}
          >
            {t("caption")}
          </p>
          <Button
            variant={"secondary"}
            className="w-fit h-12 font-medium rounded-full duration-200 -translate-x-20 opacity-0"
            ref={button}
          >
            <div className="-translate-y-0.5">{t("button")}</div>
            <div className="size-4.5 flex items-center justify-center rounded-full border border-black">
              <ArrowUpRight
                color="#000000"
                className="size-4 rtl:rotate-270"
                strokeWidth={2}
              />
            </div>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-12 max-sm:grid-cols-1">
          {partnershipsData.map((partnership, i) => (
            <article
              key={i}
              className="flex flex-col gap-4 max-sm:items-center max-sm:text-center"
            >
              <div className="size-16 rounded-2xl bg-[#0D0D0D] flex items-center justify-center partnership-icon">
                {partnership.icon}
              </div>
              <h3 className="text-2xl font-medium">
                {partnership.title[locale]}
              </h3>
              <p className="text-base leading-6 font-medium text-subtitle-color">
                {partnership.description[locale]}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
