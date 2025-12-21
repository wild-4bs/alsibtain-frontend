"use client";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import LargeComet from "@/assets/objects/large-comet.svg";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

export const Hero = () => {
  const title = useRef(null);
  const caption = useRef(null);
  const button = useRef(null);
  const image = useRef(null);
  const locale = useLocale();

  useGSAP(() => {
    const splitTitle = SplitText.create(title.current, {
      type: "words",
    });
    const splitCaption = SplitText.create(caption.current, {
      type: locale == "en" ? "chars" : "words",
    });

    const tl = gsap.timeline();
    tl.from(splitTitle.words, {
      opacity: 0,
      x: 100,
      stagger: 0.07,
    });
    tl.from(locale == "en" ? splitCaption.chars : splitCaption.words, {
      opacity: 0,
      x: 100,
      stagger: 0.001,
    });
    tl.to(
      button.current,
      {
        opacity: 1,
        y: 0,
      },
      "<"
    );
    tl.from(
      image.current,
      {
        x: 100,
        opacity: 0,
      },
      "<"
    );
  }, []);
  const t = useTranslations("projects.hero");
  return (
    <section className="relative z-10 min-h-[calc(100vh-var(--header-height))]">
      <LargeComet className="absolute z-10 top-0 left-0 animate-pulse" />
      <Container className="pt-28">
        <div className="relative z-20 max-md:text-center">
          <h1
            className="font-normal text-7xl leading-[120%] mb-6 max-md:text-6xl"
            ref={title}
            dangerouslySetInnerHTML={{ __html: t("title") }}
          ></h1>
          <p
            className="font-medium text-base w-full max-w-2xl mb-10"
            ref={caption}
          >
            {t("caption")}
          </p>
          <Link href={"#projects"}>
            <Button
              className="bg-linear-to-tr from-[black_20%] to-[theme(colors.primary)_80% rounded-full px-6 py-6 opacity-0 translate-y-10"
              ref={button}
            >
              {t("button")}
            </Button>
          </Link>
        </div>
        <div
          className="absolute top-0 end-0 w-[65%] h-full max-h-[80%] ltr:rounded-bl-[12.375rem] rtl:rounded-br-[12.375rem] z-0 max-md:w-[97%] max-md:me-[2%]"
          ref={image}
        >
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-bl-[12.275rem] max-md:bg-[linear-gradient(to_bottom,black,transparent)] max-lg:bg-[linear-gradient(to_right,black_0%,transparent_90%)] bg-[linear-gradient(to_right,black_0%,transparent_50%)] rtl:max-lg:bg-[linear-gradient(to_left,black_0%,transparent_90%)] rtl:bg-[linear-gradient(to_left,black_0%,transparent_50%)]"></div>
          <Image
            width={1000}
            height={1000}
            alt="hero"
            src="/projects/hero.jpg"
            className="w-full h-full object-cover ltr:rounded-bl-[12.375rem] rtl:rounded-br-[12.375rem]"
          />
        </div>
      </Container>
    </section>
  );
};
