"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { ServicesPageContent } from "@/types/pages";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useMemo } from "react";

gsap.registerPlugin(ScrollTrigger);

export const Counters = ({
  data,
}: {
  data: ServicesPageContent["sections"]["overview"];
}) => {
  const section = useRef<HTMLElement | null>(null);
  const image1 = useRef<HTMLImageElement | null>(null);
  const image2 = useRef<HTMLImageElement | null>(null);
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("services.counters");

  const countersData = useMemo(
    () => [
      {
        value: data?.totalProjects?.value || 0,
        suffix: "+",
        title: {
          en: "Total Projects",
          ar: "إجمالي المشاريع",
        },
      },
      {
        value: data?.yearsOfExperience?.value || 0,
        suffix: "+",
        title: {
          en: "Years of experience",
          ar: "سنوات من الخبرة",
        },
      },
      {
        value: data?.happyCustomers?.value || 0,
        suffix: "+",
        title: {
          en: "Happy Customers",
          ar: "عملاء سعداء",
        },
      },
      {
        value: data?.provinces?.value || 0,
        suffix: "+",
        title: {
          en: "Provinces",
          ar: "محافظات",
        },
      },
    ],
    [data]
  );

  useGSAP(() => {
    if (!section.current) return;
    gsap
      .timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top 80%",
          end: "top 10%",
          scrub: 1,
        },
      })
      .from(image1.current, { y: -100, opacity: 0 })
      .from(image2.current, { y: 100, opacity: 0 }, "<");

    const counters =
      section.current.querySelectorAll<HTMLElement>("[data-counter]");

    counters.forEach((el) => {
      const value = Number(el.dataset.value);

      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: value,
          duration: 2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: section.current,
            start: "top 80%",
            once: true,
          },
          snap: { innerText: 1 },
          onUpdate: () => {
            el.innerText = Math.floor(Number(el.innerText)).toString();
          },
        }
      );
    });
  }, [countersData]);

  return (
    <section ref={section} className="relative mt-24 mb-30">
      <Container className="flex gap-8">
        <div className="counters">
          <div className="flex">
            <div
              className="grid max-sm:grid-cols-1 border-y border-y-input grid-cols-2
              [&_dt]:text-xl
              [&_dd]:font-extrabold
              [&_dd]:text-primary
              [&_dd]:text-4xl
              [&_dl]:w-[315px]
              max-2xl:[&_dl]:w-[290px]
              max-lg:[&_dl]:w-[200px]
              max-md:w-full
              max-md:[&_dl]:w-full"
            >
              {countersData.map((counter, index) => (
                <dl
                  key={index}
                  className={`flex flex-col gap-1 py-12 justify-center ps-16 ${
                    index === 0
                      ? "sm:border-e border-e-input border-b border-b-input"
                      : index === 1
                      ? "max-sm:border-b max-sm:border-b-input"
                      : index === 2
                      ? "max-sm:border-b max-sm:border-b-input"
                      : "sm:border-t border-t-input sm:border-s border-s-input -mt-px -ms-px"
                  }`}
                >
                  <dd>
                    <span data-counter data-value={counter.value} />
                    {counter.suffix}
                  </dd>
                  <dt>{counter.title[locale]}</dt>
                </dl>
              ))}
            </div>

            <Image
              ref={image1}
              src={data?.image1?.value?.url || "/services/project-1.jpg"}
              width={1000}
              height={1000}
              alt="project"
              className="w-[284px] h-[366px] object-cover max-md:hidden"
            />
          </div>

          <div className="flex justify-between mt-10 max-sm:flex-col max-sm:items-center gap-3">
            <p className="text-lg w-full max-w-2xl max-sm:text-center">
              {data?.caption?.value[locale]}
            </p>

            <Button
              variant="ghost"
              className="rounded-md hover:bg-primary/10 hover:text-primary w-[200px] text-base h-12"
            >
              {t("cta")} <ArrowRight className="rtl:rotate-180" />
            </Button>
          </div>
        </div>

        <Image
          ref={image2}
          src={data?.image2?.value?.url || "/services/project-2.jpg"}
          width={1000}
          height={1000}
          alt="project"
          className="w-[284px] h-[366px] object-cover self-end translate-y-10 max-xl:hidden"
        />
      </Container>
    </section>
  );
};
