"use client";
import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { Button } from "@/components/ui/button";
import { ServicesPageContent } from "@/types/pages";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const Hero = ({
  data,
}: {
  data: ServicesPageContent["sections"]["hero"];
}) => {
  const title = useRef(null);
  const caption = useRef(null);
  const button = useRef(null);
  const [activeImage, setActiveImage] = useState(0);
  const t = useTranslations("services.hero");
  const locale = useLocale() as "ar" | "en"; // get current locale, e.g., "ar" or "en"

  useEffect(() => {
    if (!data?.images?.value?.length) return;

    const interval = setInterval(() => {
      setActiveImage((prev) =>
        prev === data.images.value.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [data?.images?.value?.length]);

  useGSAP(() => {
    if (!title.current || !caption.current) return;

    const splitTitle = SplitText.create(title.current, {
      type: locale === "ar" ? "words" : "chars", // Arabic uses words, English uses chars
      smartWrap: true,
    });
    const splitCaption = SplitText.create(caption.current, {
      type: locale === "ar" ? "words" : "chars",
      smartWrap: true,
    });

    gsap.from(splitTitle.words, {
      opacity: 0,
      x: locale === "ar" ? 100 : -200, // small tweak for Arabic
      stagger: 0.04,
    });

    gsap.from(splitCaption.chars, {
      opacity: 0,
      y: 10,
      stagger: 0.007,
    });

    gsap.to(button.current, {
      clipPath: "circle(70.7% at 50% 50%)",
    });
  }, [locale]);

  return (
    <section className="relative z-10 h-[calc(100vh-var(--header-height))] flex items-center">
      <div className="absolute -top-(--header-height) left-0 w-full h-[calc(120%+var(--header-height))] bg-primary">
        {data?.images?.value?.map((image, i) => (
          <img
            src={image?.data?.url}
            key={image.id}
            alt={`Hero image ${i + 1}`}
            className={clsx(
              "absolute top-0 left-0 object-cover object-top z-20 transition-opacity duration-1000 w-full h-full", // Added "absolute top-0 left-0"
              {
                "opacity-90": activeImage === i,
                "opacity-0": activeImage !== i,
              }
            )}
          />
        ))}
        <div className="layer absolute top-0 left-0 w-full h-full bg-linear-to-t from-black to-transparent z-20"></div>
      </div>

      <BluryBall className="right-0 left-[unset] translate-x-1/2 blur-[335px] h-full w-[480px] z-20" />
      <BluryBall className="left-0 -translate-x-1/2 blur-[135px] h-[363px] w-[732px] z-20" />

      <Container className="relative z-70 max-lg:text-center">
        <div className="absolute top-1/2 end-5 z-30 w-4 flex flex-col gap-16 -translate-y-1/2">
          {data?.images?.value?.map((_, i) => (
            <button
              key={i}
              className={clsx(
                "border border-transparent hover:border-white/20 rounded-full flex items-center justify-center size-5 cursor-pointer duration-200",
                {
                  "border-white hover:border-white!": i === activeImage,
                }
              )}
              onClick={() => setActiveImage(i)}
            >
              <div className="size-2 bg-white rounded-full"></div>
            </button>
          ))}
        </div>

        <h1
          ref={title}
          className="font-bold text-6xl mb-5 uppercase leading-[150%] max-lg:text-5xl max-md:leading-[120%] max-md:text-4xl pe-10"
          dangerouslySetInnerHTML={{ __html: data?.headline?.value[locale] }}
        ></h1>
        <p
          ref={caption}
          className="mb-6 font-normal text-lg w-full max-w-xl max-lg:mx-auto max-lg:text-base max-lg:max-w-full pe-10"
        >
          {data?.subheadline?.value[locale]}
        </p>
        <div className="flex items-center gap-7 max-lg:justify-center pe-10">
          <Link
            href={"#our-services"}
            className="max-lg:size-24 rounded-full border-white bg-transparent size-28"
          >
            <Button
              ref={button}
              className="duration-1000 w-full h-full rounded-full flex items-center justify-center border-white"
              style={{ clipPath: "circle(0.4% at 100% 0)" }}
              variant={"outline"}
            >
              <ArrowDown className="size-8 animate-bounce" />
            </Button>
          </Link>
          <span className="text-xl max-lg:text-lg">{t("cta")}</span>
        </div>
      </Container>
    </section>
  );
};
