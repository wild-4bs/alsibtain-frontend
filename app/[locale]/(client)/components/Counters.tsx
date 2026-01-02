"use client";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/Container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useLocale } from "next-intl";
import { HomePageContent } from "@/types/pages";

gsap.registerPlugin(ScrollTrigger);

export const Counters = ({
  data,
}: {
  data: HomePageContent["sections"]["overview"];
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const locale = useLocale() as "en" | "ar";
  const [counters, setCounters] = useState<
    {
      number: string;
      title: {
        en: string;
        ar: string;
      };
    }[]
  >([]);

  useEffect(() => {
    if (data) {
      const newCounters = [
        {
          number: data?.yearsOfExcellence?.value,
          title: {
            en: "Years of Excellence",
            ar: "سنة من التميز",
          },
        },
        {
          number: data?.projects?.value,
          title: {
            en: "Projects",
            ar: "مشروع",
          },
        },
        {
          number: data?.housingUnits?.value,
          title: {
            en: "Housing Units",
            ar: "وحدة سكنية",
          },
        },
        {
          number: data?.provinces?.value,
          title: {
            en: "Provinces",
            ar: "محافظة",
          },
        },
      ];
      setCounters(newCounters);
    }
  }, [data]);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (!data) return;
    if (counters.length === 0) return; // Add this check

    const counterNumbers = gsap.utils.toArray<HTMLElement>(".counter-number");
    const labels = gsap.utils.toArray<HTMLElement>(".counter-text");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
      },
    });

    // 🔢 Animate numbers
    counterNumbers.forEach((el) => {
      const target = parseInt(el.textContent!.replace("+", ""), 10);
      el.textContent = "+0";
      tl.to(
        el,
        {
          innerText: target,
          duration: 1.5,
          snap: { innerText: 1 },
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `+${Math.floor(Number(el.innerText))}`;
          },
        },
        0
      );
    });

    // ✨ Animate text (only for English)
    if (locale === "en") {
      labels.forEach((label) => {
        const split = SplitText.create(label, {
          type: "chars",
          smartWrap: true,
          charsClass: "char",
        });

        tl.from(
          split.chars,
          {
            opacity: 0,
            y: 20,
            duration: 0.3,
            stagger: 0.04,
          },
          1
        );
      });
    }
    if (locale === "ar") {
      labels.forEach((label) => {
        const split = SplitText.create(label, {
          type: "words",
          smartWrap: true,
          wordsClass: "word",
        });

        tl.from(
          split.words,
          {
            opacity: 0,
            y: 20,
            duration: 0.3,
            stagger: 0.04,
          },
          1
        );
      });
    }
  }, [data, counters, locale]);

  return (
    <section ref={sectionRef}>
      <Container>
        <ul className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 text-center my-12 gap-12 max-lg:flex-wrap max-sm:text-center">
          {counters.map((counter, index) => (
            <li key={index} className="text-2xl">
              <h3 className="font-medium counter-number">+{counter.number}</h3>
              <span
                className="font-light counter-text"
                style={
                  locale === "ar"
                    ? { direction: "rtl", unicodeBidi: "isolate" }
                    : { direction: "ltr", unicodeBidi: "normal" }
                }
              >
                {counter.title[locale]}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
