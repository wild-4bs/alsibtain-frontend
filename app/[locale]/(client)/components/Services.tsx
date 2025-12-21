"use client";
import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, HousePlus, Star, Users } from "lucide-react";
import { useLocale } from "next-intl";
import { useRef } from "react";

const services = [
  {
    title: {
      en: "For Investors",
      ar: "للمستثمرين",
    },
    caption: {
      en: "Discover high-return projects backed by trust, quality, and long-term value.",
      ar: "اكتشف المشاريع ذات العائد المرتفع المدعومة بالثقة والجودة والقيمة طويلة الأجل.",
    },
    icon: <Star strokeWidth={1.5} width={26} />,
    image: "",
  },
  {
    title: {
      en: "For Homeowners",
      ar: "لأصحاب المنازل",
    },
    caption: {
      en: "Enjoy modern communities designed for comfort, safety, and a better everyday life.",
      ar: "استمتع بمجتمعات عصرية مصممة للراحة والأمان وحياة يومية أفضل.",
    },
    icon: <HousePlus width={26} />,
    image: "",
  },
  {
    title: {
      en: "For Partners",
      ar: "للشركاء",
    },
    caption: {
      en: "Build lasting partnerships with a trusted name in Iraq's real estate sector.",
      ar: "بناء شراكات دائمة مع اسم موثوق في قطاع العقارات في العراق.",
    },
    icon: <Users width={26} />,
    image: "",
  },
  {
    title: {
      en: "For Communities",
      ar: "للمجتمعات",
    },
    caption: {
      en: "We develop spaces that bring people together and foster connection.",
      ar: "نطور مساحات تجمع الناس معًا وتعزز الروابط.",
    },
    icon: <Star strokeWidth={1.5} width={26} />,
    image: "",
  },
  {
    title: {
      en: "For Businesses",
      ar: "للشركات",
    },
    caption: {
      en: "We create sustainable commercial spaces that support growth and innovation.",
      ar: "نخلق مساحات تجارية مستدامة تدعم النمو والابتكار.",
    },
    icon: <Briefcase width={26} />,
    image: "",
  },
  {
    title: {
      en: "For Families",
      ar: "للعائلات",
    },
    caption: {
      en: "Safe, welcoming neighborhoods where your family can thrive and grow.",
      ar: "أحياء آمنة ومرحبة حيث يمكن لعائلتك أن تزدهر وتنمو.",
    },
    icon: <HousePlus width={26} />,
    image: "",
  },
];

export const Services = () => {
  const section = useRef<HTMLElement>(null);
  const locale = useLocale() as "en" | "ar";

  useGSAP(() => {
    if (!section.current) return;
    ScrollTrigger.refresh();

    const serviceElements = gsap.utils.toArray<HTMLElement>(
      section.current.querySelectorAll(".home-page-service")
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        end: "+=200%",
        pin: true,
        scrub: true,
      },
    });

    serviceElements.forEach((service) => {
      tl.fromTo(service, { y: "100%", opacity: 0 }, { y: 0, opacity: 1 });
    });
  }, []);

  return (
    <section
      className="bg-black pt-20 pb-12 z-40 relative rounded-b-[15rem] max-lg:pb-20 max-lg:rounded-b-[10rem] max-md:rounded-b-[7rem]"
      ref={section}
    >
      <Container className="relative">
        <BluryBall className="left-0 top-2/4 -translate-x-2/4 w-[600px] h-[400px] opacity-20" />
        <BluryBall className="right-0 left-[unset] top-2/4 translate-x-2/4 w-[600px] h-[400px] opacity-20 rtl:left-0 rtl:right-[unset] rtl:-translate-x-2/4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 relative z-10">
          {services.map((service, i) => {
            return (
              <article
                key={i}
                className="relative z-10 home-page-service rounded-4xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="size-12 flex items-center justify-center bg-primary/90 rounded-full mb-5 shadow-lg shadow-primary/50">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-base leading-5 mb-2 text-white">
                  {service.title[locale]}
                </h3>
                <p className="font-light text-sm leading-5 text-white/80">
                  {service.caption[locale]}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
