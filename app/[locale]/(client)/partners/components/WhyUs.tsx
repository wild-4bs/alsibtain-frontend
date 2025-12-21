"use client";
import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Hammer, Workflow, Landmark, Network, TrendingUp } from "lucide-react";
import { useRef } from "react";
import { useLocale, useTranslations } from "use-intl";

export const whyUsList = [
  {
    title: {
      en: "Proven Development Experience",
      ar: "خبرة تطوير مثبتة",
    },
    description: {
      en: "Over two decades of experience developing large residential and mixed-use communities with strong infrastructure and master-planning standards.",
      ar: "أكثر من عقدين من الخبرة في تطوير المجتمعات السكنية والمختلطة الاستخدام الكبيرة مع بنية تحتية قوية ومعايير تخطيط رئيسية.",
    },
    icon: <Hammer size={40} />,
  },
  {
    title: {
      en: "Transparent Processes",
      ar: "عمليات شفافة",
    },
    description: {
      en: "We maintain clear communication, detailed planning, and structured development stages to ensure every partner understands progress at all times.",
      ar: "نحافظ على التواصل الواضح والتخطيط التفصيلي ومراحل التطوير المنظمة لضمان فهم كل شريك للتقدم في جميع الأوقات.",
    },
    icon: <Workflow size={40} />,
  },
  {
    title: {
      en: "Government & Institutional Alignment",
      ar: "التوافق الحكومي والمؤسسي",
    },
    description: {
      en: "Our team works closely with official departments to secure approvals, facilitate procedures, and ensure compliance with Iraqi regulations.",
      ar: "يعمل فريقنا بشكل وثيق مع الدوائر الرسمية لتأمين الموافقات وتسهيل الإجراءات وضمان الامتثال للوائح العراقية.",
    },
    icon: <Landmark size={40} />,
  },
  {
    title: {
      en: "Strong Market Presence",
      ar: "حضور قوي في السوق",
    },
    description: {
      en: "With active projects across Karbala and other governorates, Al-Subtain maintains a trusted reputation in the Iraqi real estate sector.",
      ar: "مع المشاريع النشطة في كربلاء والمحافظات الأخرى، تحافظ السبطين على سمعة موثوقة في قطاع العقارات العراقي.",
    },
    icon: <Network size={40} />,
  },
  {
    title: {
      en: "Long-Term Value Creation",
      ar: "خلق قيمة طويلة الأجل",
    },
    description: {
      en: "We focus on developments that deliver sustainable returns, solid appreciation, and stable growth for all partners involved.",
      ar: "نركز على التطويرات التي تقدم عوائد مستدامة وتقدير متين ونمو مستقر لجميع الشركاء المعنيين.",
    },
    icon: <TrendingUp size={40} />,
  },
];

export const WhyUs = () => {
  const title = useRef(null);
  const section = useRef<HTMLElement>(null);
  const locale = useLocale() as "ar" | "en";

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        end: "+=100%",
        pin: true,
        scrub: true,
      },
    });

    const splitTitle = SplitText.create(title.current, {
      type: locale === "ar" ? "words" : "chars",
      smartWrap: true,
    });

    const reasonsEl = section.current?.querySelectorAll(
      ".partners-page-reason"
    );

    if (!reasonsEl) return;

    tl.from(locale === "ar" ? splitTitle.words : splitTitle.chars, {
      y: -100,
      opacity: 0,
      stagger: {
        each: 0.01,
        from: "random",
      },
    });

    tl.from(reasonsEl, {
      y: 100,
      opacity: 0,
      stagger: {
        each: 0.1,
        from: "random",
      },
    });
  }, [locale]);
  const t = useTranslations("partners.whyUs");
  return (
    <section className="pt-28 relative z-10" ref={section}>
      <BluryBall className="left-[unset] right-0 h-full w-[30%] translate-x-1/2" />
      <Container>
        <h2 className="font-semibold text-3xl mb-10 text-center" ref={title}>
          {t("title")}
        </h2>
        <div className="flex justify-center text-center flex-wrap gap-10">
          {whyUsList.map((reason, i) => (
            <article
              key={i}
              className="w-full md:max-w-md flex-col flex items-center justify-center partners-page-reason"
            >
              <div className="size-32 rounded-full bg-[#55B2FF]/12 flex items-center justify-center mb-5">
                {reason.icon}
              </div>
              <h3 className="font-semibold text-xl leading-[126%] mb-2">
                {reason.title[locale]}
              </h3>
              <p className="text-sm text-subtitle-color">
                {reason.description[locale]}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
