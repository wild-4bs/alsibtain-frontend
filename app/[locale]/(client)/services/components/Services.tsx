"use client";
import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import * as LucideIcons from "lucide-react";
import {
  Film,
  Laptop,
  LineChart,
  Pencil,
  Rocket,
  Smartphone,
} from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ServicesPageContent } from "@/types/pages";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space_grotesk",
});

const services = [
  {
    id: 1,
    icon: <Pencil width={24} className="text-primary" />,
    title: {
      en: "Real Estate Development",
      ar: "التطوير العقاري",
    },
    description: {
      en: "Planning and developing large-scale residential projects from concept to execution, ensuring modern design, strong infrastructure, and long-term community value.",
      ar: "تخطيط وتطوير مشاريع سكنية واسعة النطاق من المفهوم إلى التنفيذ، مع ضمان التصميم العصري والبنية التحتية القوية والقيمة المجتمعية طويلة الأجل.",
    },
  },
  {
    id: 2,
    icon: <Laptop width={24} className="text-primary" />,
    title: {
      en: "Project Planning & Masterplanning",
      ar: "تخطيط المشاريع والمخططات الرئيسية",
    },
    description: {
      en: "Designing complete project layouts including land distribution, unit planning, zoning, and infrastructure networks based on global standards.",
      ar: "تصميم مخططات المشاريع الكاملة بما في ذلك توزيع الأراضي وتخطيط الوحدات والتقسيم وشبكات البنية التحتية بناءً على المعايير العالمية.",
    },
  },
  {
    id: 3,
    icon: <Smartphone width={24} className="text-primary" />,
    title: {
      en: "Construction Supervision",
      ar: "الإشراف على البناء",
    },
    description: {
      en: "Overseeing site work, timelines, and quality standards to ensure every phase of construction meets engineering and safety requirements.",
      ar: "الإشراف على أعمال الموقع والجداول الزمنية ومعايير الجودة لضمان تلبية كل مرحلة من مراحل البناء للمتطلبات الهندسية ومتطلبات السلامة.",
    },
  },
  {
    id: 4,
    icon: <Film width={24} className="text-primary" />,
    title: {
      en: "Real Estate Investment Management",
      ar: "إدارة الاستثمار العقاري",
    },
    description: {
      en: "Building sustainable investment models for residential communities and managing project financing, feasibility, and long-term returns.",
      ar: "بناء نماذج استثمارية مستدامة للمجتمعات السكنية وإدارة تمويل المشاريع والجدوى والعوائد طويلة الأجل.",
    },
  },
  {
    id: 5,
    icon: <Rocket width={24} className="text-primary" />,
    title: {
      en: "Sales & Project Marketing",
      ar: "المبيعات والتسويق العقاري",
    },
    description: {
      en: "Managing sales operations, client communication, and project marketing to ensure clear information flow and strong market presence.",
      ar: "إدارة عمليات المبيعات والتواصل مع العملاء وتسويق المشاريع لضمان تدفق معلومات واضح وحضور قوي في السوق.",
    },
  },
  {
    id: 6,
    icon: <LineChart width={24} className="text-primary" />,
    title: {
      en: "Partnerships & Government Coordination",
      ar: "الشراكات والتنسيق الحكومي",
    },
    description: {
      en: "Coordinating with government entities, service providers, and strategic partners to ensure smooth project approvals and integrated community services.",
      ar: "التنسيق مع الجهات الحكومية ومقدمي الخدمات والشركاء الاستراتيجيين لضمان الموافقات السلسة على المشاريع والخدمات المجتمعية المتكاملة.",
    },
  },
];

export const Services = ({
  data,
}: {
  data: ServicesPageContent["sections"]["services"];
}) => {
  const title = useRef(null);
  const section = useRef<HTMLElement>(null);
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("services.services");

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        scrub: 1,
        end: "top 10%",
      },
    });

    const splitTitle = SplitText.create(title.current, {
      type: locale == "en" ? "chars" : "words",
      smartWrap: true,
    });

    const services = section.current?.querySelectorAll(
      ".services-page-service"
    );

    if (!services) return;
    tl.from(locale == "en" ? splitTitle.chars : splitTitle.words, {
      opacity: 0,
      y: 100,
      stagger: {
        amount: 0.1,
        from: "random",
      },
    });
    tl.from(services, {
      y: 100,
      opacity: 0,
      stagger: {
        amount: 0.3,
        from: "center",
      },
    });
  }, []);

  return (
    <section
      ref={section}
      className={cn(
        locale == "en" && space_grotesk.className,
        "relative z-20 mt-20"
      )}
      id="our-services"
    >
      <BluryBall className="bottom-0 left-0 translate-y-1/2" />
      <BluryBall className="top-0 right-0 left-[unset] translate-x-1/2 translate-y-0" />
      <Container>
        <h2 className="text-center text-4xl mb-16" ref={title}>
          {t("title")}
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data?.items?.value[locale]?.map((service, i) => {
            const IconComponent =
              (LucideIcons as any)[service?.icon] || LucideIcons.HelpCircle;

            return (
              <article
                key={i}
                className="p-8 rounded-xl border border-[#737373] services-page-service"
              >
                <div className="size-16 bg-[#5535E61A] rounded-xl flex items-center justify-center mb-5 ">
                  <IconComponent />
                </div>
                <h3 className="font-normal text-lg">{service.title}</h3>
                <p className="text-subtitle-color mt-2">{service.caption}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
