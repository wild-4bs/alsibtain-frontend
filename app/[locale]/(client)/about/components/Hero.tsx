"use client";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import AbstractDesign from "@/assets/objects/abstract.svg";
import Image from "next/image";
import { BluryBall } from "@/components/ui/BluryBall";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { AboutPageContent } from "@/types/pages";

export const countersData = [
  {
    title: { en: "Year Of Excellence", ar: "سنة من التميز" },
    count: "21+",
  },
  {
    title: { en: "Projects", ar: "المشاريع" },
    count: "25+",
  },
  {
    title: { en: "Housing Units", ar: "الوحدات السكنية" },
    count: "3000+",
  },
  {
    title: { en: "Provinces", ar: "المحافظات" },
    count: "3+",
  },
];

export const Hero = ({
  data,
}: {
  data: AboutPageContent["sections"]["hero"];
}) => {
  const title = useRef<HTMLHeadingElement>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  const section = useRef<HTMLElement>(null);
  const image = useRef<HTMLDivElement>(null);
  const abstractContainer = useRef<HTMLDivElement>(null);

  const t = useTranslations("about.hero");
  const locale = useLocale() as "ar" | "en";

  useGSAP(() => {
    if (!title.current || !caption.current) return;

    const tl = gsap.timeline();

    // Animate words for title
    const titleWords = title.current.innerText.split(" ");
    const wrappedTitle = titleWords
      .map((word) => `<span class="inline-block mr-1">${word}</span>`)
      .join(" ");
    title.current.innerHTML = wrappedTitle;

    tl.from(title.current.querySelectorAll("span"), {
      y: 20,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: "power2.out",
    });

    // Animate caption words
    const captionWords = caption.current.innerText.split(" ");
    const wrappedCaption = captionWords
      .map((word) => `<span class="inline-block mr-1">${word}</span>`)
      .join(" ");
    caption.current.innerHTML = wrappedCaption;

    tl.from(caption.current.querySelectorAll("span"), {
      opacity: 0,
      y: 10,
      stagger: 0.03,
      duration: 0.4,
      ease: "power1.out",
    });

    // Animate buttons
    tl.fromTo(
      ".call-to-action-button",
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, stagger: 0.1 }
    );

    // Animate counters
    tl.fromTo(
      ".counter",
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, stagger: 0.1 }
    );

    // Animate image
    if (image.current) {
      tl.from(image.current, { x: "10%", opacity: 0, delay: 0.4 });
    }

    // Infinite scrolling animation for abstract design
    if (abstractContainer.current) {
      gsap.to(abstractContainer.current, {
        x: "-50%",
        duration: 10,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  return (
    <section
      className="mb-0 min-h-[calc(100vh-var(--header-height))] 2xl:min-h-[unset] 2xl:mb-40"
      ref={section}
    >
      <Container className="flex gap-12 pt-28 max-md:pt-4">
        <div className="relative w-full flex-1">
          <BluryBall className="-left-1/6" />
          <h1
            className="mb-5 font-semibold text-5xl max-sm:text-4xl leading-[130%] relative z-10"
            ref={title}
            dangerouslySetInnerHTML={{ __html: data?.headline?.value[locale] }}
          />
          <p
            className="font-medium text-lg max-sm:text-base text-subtitle-color mb-6 relative z-10"
            ref={caption}
          >
            {data?.subheadline?.value[locale]}
          </p>
          <div className="flex gap-4 mb-10 relative z-10">
            <Link href={"/contact"}>
              <Button
                variant={"outline"}
                className="h-14 border-white bg-transparent max-sm:h-12 call-to-action-button"
              >
                {t("cta1")}
              </Button>
            </Link>
            <Link href={"/projects"}>
              <Button className="h-14 max-sm:h-12 call-to-action-button">
                {t("cta2")}
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-5 flex-wrap relative z-10">
            {data?.counters?.value[locale].map((counter, i) => (
              <div
                key={i}
                className="px-6 py-4 bg-[#1A1A1A] border border-[#262626] rounded-2xl lg:min-w-[200px] sm:min-w-[170px] min-w-full counter"
              >
                <span className="text-3xl max-sm:text-2xl font-bold mb-2 inline-block">
                  {counter.count}
                </span>
                <h2 className="font-medium text-sm leading-[130%] max-sm:text-xs">
                  {counter.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
        <BluryBall className="-right-1/2 w-[900px] h-[650px] left-[unset]" />
        <div
          className="min-w-[500px] max-lg:hidden w-[500px] max-xl:min-w-[400px] max-xl:w-[400px] h-fit bg-[#262626] min-h-[450px] flex items-end rounded-xl relative overflow-hidden"
          ref={image}
        >
          <div
            ref={abstractContainer}
            className="absolute top-0 left-0 pointer-events-none z-10 flex"
            style={{ width: "200%" }}
          >
            <AbstractDesign
              className="w-full h-full opacity-30 shrink-0 rotate-y-180"
              style={{ height: "450px" }}
            />
            <AbstractDesign
              className="w-full h-full opacity-30 shrink-0"
              style={{ height: "450px" }}
            />
          </div>
          <Image
            src={data?.image?.value?.url || "/about/hero.png"}
            width={1000}
            height={1000}
            className="relative z-20 w-full"
            alt="hero"
          />
        </div>
      </Container>
    </section>
  );
};
