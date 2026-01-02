"use client";
import Container from "@/components/Container";
import Users2 from "@/assets/icons/users2.svg";
import Reload from "@/assets/icons/reload.svg";
import Education from "@/assets/icons/education.svg";
import BarChart from "@/assets/icons/barChart.svg";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useLocale, useTranslations } from "next-intl";
import { CareersPageContent } from "@/types/pages";
import * as LucideIcons from "lucide-react";

gsap.registerPlugin(SplitText);

const reasons = [
  {
    title: {
      en: "Team work",
      ar: "العمل الجماعي",
    },
    caption: {
      en: "Work within a supportive team that values cooperation, respect, and shared success.",
      ar: "العمل ضمن فريق داعم يقدر التعاون والاحترام والنجاح المشترك.",
    },
    icon: <Users2 />,
  },
  {
    title: {
      en: "Secured Future",
      ar: "مستقبل آمن",
    },
    caption: {
      en: "We provide clear paths for professional advancement and long-term development.",
      ar: "نقدم مسارات واضحة للتقدم المهني والتطوير طويل الأجل.",
    },
    icon: <Reload />,
  },
  {
    title: {
      en: "Learning Opportunity",
      ar: "فرصة التعلم",
    },
    caption: {
      en: "Access training, workshops, and real-world project experience to sharpen your skills.",
      ar: "الوصول إلى التدريب وورش العمل وخبرة المشاريع الواقعية لصقل مهاراتك.",
    },
    icon: <Education />,
  },
  {
    title: {
      en: "Upgrade Skills",
      ar: "تطوير المهارات",
    },
    caption: {
      en: "Join an established Iraqi developer with a strong reputation and long-standing market presence.",
      ar: "انضم إلى مطور عراقي راسخ يتمتع بسمعة قوية وحضور طويل الأمد في السوق.",
    },
    icon: <BarChart />,
  },
];

export const WhyWorkWithUs = ({
  data,
}: {
  data: CareersPageContent["sections"]["benefits"];
}) => {
  const section = useRef<HTMLElement>(null);
  const tagline = useRef<HTMLHeadingElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const caption = useRef<HTMLDivElement>(null);
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("careers.benefits");

  useGSAP(() => {
    const splitTitle = SplitText.create(title.current!, {
      type: locale === "ar" ? "words" : "words",
      smartWrap: true,
    });
    const splitTagline = SplitText.create(tagline.current!, {
      type: "words",
      smartWrap: true,
    });
    const splitCaption = SplitText.create(caption.current!, {
      type: "words",
      smartWrap: true,
    });
    const cards = section.current?.querySelectorAll(".benefit-card");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "top 70%",
      },
    });
    // TITLE
    tl.from(splitTitle.words, {
      x: -100,
      opacity: 0,
      stagger: {
        amount: 0.3,
        from: "random",
      },
      ease: "power3.out",
    });
    // TAGLINE (2nd stage)
    tl.from(
      splitTagline.words,
      {
        x: -100,
        opacity: 0,
        stagger: {
          amount: 0.25,
          from: "random",
        },
        ease: "power3.out",
      },
      "-=0.2"
    );
    // CAPTION
    tl.from(
      splitCaption.words,
      {
        x: -100,
        opacity: 0,
        stagger: {
          amount: 0.4,
          from: "random",
        },
        ease: "power3.out",
      },
      "-=0.15"
    );
    // BENEFITS (FROM BOTTOM + RANDOM STAGGER)
    tl.from(
      cards!,
      {
        y: 80,
        opacity: 0,
        stagger: {
          each: 0.15,
          from: "random",
        },
        ease: "power3.out",
      },
      "-=0.2"
    );
  }, [locale]);

  return (
    <section className="mt-48" ref={section}>
      <Container className="flex md:justify-between gap-10 max-md:flex-col">
        <div>
          <h2 className="mb-4 font-medium text-lg" ref={tagline}>
            BENEFITS
          </h2>
          <h3 className="mb-6 font-bold text-4xl" ref={title}>
            {data?.title?.value[locale]}
          </h3>
          <div
            className="text-sm [&_p]:not-last:mb-2"
            ref={caption}
            dangerouslySetInnerHTML={{ __html: data?.caption?.value[locale] }}
          ></div>
        </div>
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          {data?.benefitsList?.value[locale].map((reason, i) => {
            const IconComponent =
              (LucideIcons as any)[reason?.icon] || LucideIcons.HelpCircle;
            return (
              <div className="benefit-card flex flex-col" key={i}>
                <div className="size-16 mb-8 rounded-sm bg-primary flex items-center justify-center">
                  <IconComponent />
                </div>
                <h4 className="font-bold text-lg mb-3">{reason.title}</h4>
                <p className="font-light text-sm">{reason.caption}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
