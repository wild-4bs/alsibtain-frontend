"use client";
import Container from "@/components/Container";
import Image from "next/image";
import { BluryBall } from "@/components/ui/BluryBall";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslations, useLocale } from "next-intl";

// Data with translations
const sectionsData = {
  vision: {
    title: { en: "Our Vision", ar: "رؤيتنا" },
    headline: {
      en: "Shaping Tomorrow's Communities",
      ar: "نشكّل مجتمعات الغد",
    },
    description: {
      en: "Our vision is to set a new standard for real estate development in Iraq creating sustainable, modern, and people-focused environments that support families and future generations.",
      ar: "رؤيتنا هي وضع معيار جديد لتطوير العقارات في العراق من خلال إنشاء بيئات مستدامة، حديثة، وتركز على الناس تدعم العائلات والأجيال القادمة.",
    },
  },
  mission: {
    title: { en: "Our Mission", ar: "مهمتنا" },
    headline: { en: "Building With Purpose", ar: "البناء بهدف" },
    description: {
      en: "Our mission is to transform development into a meaningful experience by combining thoughtful design, engineering excellence, and practical solutions that elevate everyday living.",
      ar: "مهمتنا هي تحويل التطوير إلى تجربة ذات معنى من خلال الجمع بين التصميم المدروس، التميز الهندسي، والحلول العملية التي ترتقي بحياة الناس اليومية.",
    },
  },
  values: {
    title: { en: "Our Values", ar: "قيمنا" },
    headline: { en: "Guided by Principles That Last", ar: "مرشدنا مبادئ تدوم" },
    description: {
      en: "Integrity, quality, innovation, sustainability, and community—these values shape every project we deliver and define who we are as a company.",
      ar: "النزاهة، الجودة، الابتكار، الاستدامة، والمجتمع—هذه القيم تشكل كل مشروع نقدمه وتحدد من نحن كشركة.",
    },
  },
} as const;

// Define types for keys and locale
const sectionKeys = ["vision", "mission", "values"] as const;
type SectionKey = (typeof sectionKeys)[number]; // "vision" | "mission" | "values"
type Locale = "en" | "ar";

export const MissionAndVision = () => {
  const section = useRef<HTMLElement | null>(null);
  const visionRef = useRef<HTMLElement | null>(null);
  const missionRef = useRef<HTMLElement | null>(null);
  const valuesRef = useRef<HTMLElement | null>(null);
  const title = useRef<HTMLHeadingElement | null>(null);
  const caption = useRef<HTMLParagraphElement | null>(null);
  const locale = useLocale() as Locale;

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        scrub: true,
        end: "top 10%",
      },
    });

    tl.from(title.current, { x: "-50%", opacity: 0 });
    tl.from(caption.current, { x: "-50%", opacity: 0, delay: 0.2 }, "<");
    tl.from(visionRef.current, { x: "50%", opacity: 0 }, "<");
    tl.from(missionRef.current, { y: "-50%", opacity: 0 }, "<");
    tl.from(valuesRef.current, { x: "-50%", opacity: 0 }, "<");
  }, []);

  const t = useTranslations("about.missionAndVision");

  return (
    <section className="my-32 leading-[150%] relative" ref={section}>
      <Image
        width={1000}
        height={1000}
        src={"/waterflow.png"}
        alt="water-flow"
        className="w-full max-w-[1400px] h-auto absolute left-1/2 -translate-x-1/2 object-cover -top-1/2 object-bottom max-xl:-top-1/4 max-lg:-top-1/5 max-md:-top-[10%]"
      />
      <Container>
        <BluryBall className="top-12 -left-1/5 w-[900px] h-[350px]" />
        <BluryBall className="bottom-0 -right-[70%] left-[unest] w-[900px] h-[700px]" />
        <header className="mb-12 relative z-10">
          <h2 className="font-semibold text-5xl mb-2" ref={title}>
            {t("title")}
          </h2>
          <p className="text-subtitle-color font-medium text-lg" ref={caption}>
            {t("caption")}
          </p>
        </header>
        <div className="flex gap-10 flex-wrap relative z-10">
          {sectionKeys.map((key) => (
            <article
              key={key}
              className="w-full flex-1 md:min-w-xs max-md:min-w-full ring-8 rounded-xl p-12 bg-[#0f0f0f] ring-[#191919]"
              ref={
                key === "vision"
                  ? visionRef
                  : key === "mission"
                  ? missionRef
                  : valuesRef
              }
            >
              <h2 className="mb-6 font-semibold text-3xl">
                {sectionsData[key].title[locale]}
              </h2>
              <h3 className="font-bold mb-5 text-lg text-subtitle-color">
                {sectionsData[key].headline[locale]}
              </h3>
              <p className="font-medium text-lg text-subtitle-color">
                {sectionsData[key].description[locale]}
              </p>
            </article>
          ))}
        </div>
      </Container>
      <Image
        width={1000}
        height={1000}
        src={"/waterflow.png"}
        alt="water-flow"
        className="w-full h-auto absolute -translate-x-1/2 max-w-[1400px] left-1/2 object-cover -bottom-1/2 rotate-180 max-xl:-bottom-1/4 max-lg:-bottom-1/5 max-md:-bottom-[10%]"
      />
    </section>
  );
};
