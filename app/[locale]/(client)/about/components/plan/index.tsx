"use client";
import Container from "@/components/Container";
import { Step } from "./Step";
import { BluryBall } from "@/components/ui/BluryBall";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { useTranslations, useLocale } from "next-intl";

export const stepsData = [
  {
    id: "01",
    title: { en: "Our Beginning", ar: "بدايتنا" },
    headline: { en: "A Story Rooted in Karbala", ar: "قصة متجذرة في كربلاء" },
    description: {
      en: "Founded in 2003, Al-Subtain started with a simple goal: develop projects that serve people and add real value to their daily lives.",
      ar: "تأسست شركة Subtain في عام 2003 بهدف بسيط: تطوير مشاريع تخدم الناس وتضيف قيمة حقيقية لحياتهم اليومية.",
    },
  },
  {
    id: "02",
    title: { en: "Our Purpose", ar: "هدفنا" },
    headline: {
      en: "Building Communities, Not Just Buildings",
      ar: "بناء مجتمعات وليس مجرد مبانٍ",
    },
    description: {
      en: "We design developments that focus on comfort, safety, and a complete lifestyle — where families can live, grow, and belong.",
      ar: "نصمم مشاريع تركز على الراحة والأمان ونمط حياة متكامل — حيث يمكن للعائلات العيش والنمو والانتماء.",
    },
  },
  {
    id: "03",
    title: { en: "Our Philosophy", ar: "فلسفتنا" },
    headline: { en: "Architecture for People", ar: "العمارة من أجل الناس" },
    description: {
      en: "For us, architecture is not form or structure — it's an experience that connects individuals to their surroundings and enhances quality of life.",
      ar: "بالنسبة لنا، العمارة ليست مجرد شكل أو هيكل — إنها تجربة تربط الأفراد بمحيطهم وتعزز جودة الحياة.",
    },
  },
  {
    id: "04",
    title: { en: "Our Projects", ar: "مشاريعنا" },
    headline: {
      en: "Landmarks That Shape Iraq's Future",
      ar: "معالم تشكّل مستقبل العراق",
    },
    description: {
      en: "From Uruk City to Al-Salam City, Al-Kafeel Hospital, and the new Al-Abbas Residential Complex, every project reflects long-term vision and solid execution.",
      ar: "من مدينة أوروك إلى مدينة السلام ومستشفى الكفيل والمجمع السكني الجديد للعباس، كل مشروع يعكس رؤية طويلة الأمد وتنفيذًا متينًا.",
    },
  },
  {
    id: "05",
    title: { en: "Our Team", ar: "فريقنا" },
    headline: { en: "Experts Behind Every Detail", ar: "خبراء خلف كل تفصيلة" },
    description: {
      en: "Architects, engineers, planners, and managers who ensure each development meets high standards and stands the test of time.",
      ar: "المهندسون والمعماريون والمخططون والمدراء الذين يضمنون أن كل مشروع يحقق معايير عالية ويصمد أمام اختبار الزمن.",
    },
  },
  {
    id: "06",
    title: { en: "Our Commitment", ar: "التزامنا" },
    headline: {
      en: "Quality, Integrity, and Sustainability",
      ar: "الجودة والنزاهة والاستدامة",
    },
    description: {
      en: "We build with honesty, focus on durable materials and practical solutions, and plan for the generations who will live in these communities.",
      ar: "نبني بصدق، ونركز على المواد المتينة والحلول العملية، ونخطط للأجيال التي ستعيش في هذه المجتمعات.",
    },
  },
];

export const Plan = () => {
  const title = useRef<HTMLHeadingElement>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  const section = useRef<HTMLElement>(null);
  const t = useTranslations("about.steps");
  const locale = useLocale() as "en" | "ar";

  useGSAP(() => {
    if (!title.current || !caption.current || !section.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "top center",
      },
    });

    // Split title and caption based on locale
    if (locale === "ar") {
      // Split words
      title.current.innerHTML = title.current.innerText
        .split(" ")
        .map((w) => `<span class="inline-block mr-1">${w}</span>`)
        .join(" ");
      caption.current.innerHTML = caption.current.innerText
        .split(" ")
        .map((w) => `<span class="inline-block mr-1">${w}</span>`)
        .join(" ");

      tl.from(title.current.querySelectorAll("span"), {
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
      });

      tl.from(caption.current.querySelectorAll("span"), {
        y: 10,
        opacity: 0,
        stagger: 0.03,
        duration: 0.4,
      });
    } else {
      // Split chars for English
      title.current.innerHTML = title.current.innerText
        .split("")
        .map((c) => `<span class="inline-block">${c}</span>`)
        .join("");
      caption.current.innerHTML = caption.current.innerText
        .split("")
        .map((c) => `<span class="inline-block">${c}</span>`)
        .join("");

      tl.from(title.current.querySelectorAll("span"), {
        y: 30,
        autoAlpha: 0,
        stagger: 0.02,
        duration: 0.4,
      });

      tl.from(caption.current.querySelectorAll("span"), {
        y: 20,
        autoAlpha: 0,
        stagger: 0.002,
      });
    }

    const stepElements = section.current.querySelectorAll(
      ".about-page-plan-step"
    );
    if (stepElements) {
      tl.from(stepElements, {
        y: 200,
        opacity: 0,
        stagger: {
          amount: 0.5,
          from: "random",
        },
      });
    }
  }, []);

  return (
    <section ref={section}>
      <Container>
        <header className="mb-12">
          <h2 className="font-semibold text-5xl leading-[150%]" ref={title}>
            {t("title")}
          </h2>
          <p
            className="font-medium text-lg text-subtitle-color leading-[150%]"
            ref={caption}
          >
            {t("caption")}
          </p>
        </header>
        <div className="flex relative items-start gap-6 flex-wrap">
          <BluryBall className="-left-1/4 h-full w-[800px] z-20 max-lg:w-[200px]" />
          <BluryBall className="-right-1/4 left-[unset] translate-x-1/2 h-full w-[800px] z-20 max-lg:hidden" />
          {stepsData.map((step, i) => (
            <Step
              key={i}
              title={step.title[locale]}
              headline={step.headline[locale]}
              description={step.description[locale]}
              index={i + 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
