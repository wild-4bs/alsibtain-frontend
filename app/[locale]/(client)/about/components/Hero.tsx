"use client";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import AbstractDesign from "@/assets/objects/abstract.svg";
import Image from "next/image";
import { BluryBall } from "@/components/ui/BluryBall";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { Link } from "@/i18n/routing";

export const counters = [
  {
    title: "Year Of Excellence",
    count: "21+",
  },
  {
    title: "Projects",
    count: "25+",
  },
  {
    title: "Housing Units",
    count: "3000+",
  },
  {
    title: "Provinces",
    count: "3+",
  },
];

export const Hero = () => {
  const title = useRef(null);
  const caption = useRef(null);
  const section = useRef<HTMLElement>(null);
  const image = useRef(null);
  const abstractContainer = useRef(null);

  useGSAP(() => {
    const splitTitle = SplitText.create(title.current, {
      type: "chars",
      smartWrap: true,
    });
    const splitCaption = SplitText.create(caption.current, {
      type: "words",
      smartWrap: true,
    });
    const tl = gsap.timeline();
    tl.from(splitTitle.chars, {
      x: 20,
      opacity: 0,
      stagger: 0.02,
    });
    tl.from(splitCaption.words, {
      opacity: 0,
      stagger: 0.02,
    });
    tl.fromTo(
      ".call-to-action-button",
      {
        y: 10,
        opacity: 0,
        duration: 0.1,
        ease: "linear",
      },
      { y: 0, opacity: 1 },
      1
    );
    tl.fromTo(
      ".counter",
      {
        y: 10,
        opacity: 0,
        duration: 0.1,
        ease: "linear",
      },
      { y: 0, opacity: 1 },
      1
    );
    tl.from(
      image.current,
      {
        x: "10%",
        opacity: 0,
        delay: 0.4,
      },
      1
    );

    // Infinite scrolling animation for abstract design
    gsap.to(abstractContainer.current, {
      x: "-50%",
      duration: 10,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section className="min-h-[calc(100vh-var(--header-height))]" ref={section}>
      <Container className="flex gap-12 pt-28 max-md:pt-4">
        <div className="relative">
          <BluryBall className="-left-1/6" />
          <h1
            className="mb-5 font-semibold text-5xl max-sm:text-4xl leading-[130%] relative z-10"
            ref={title}
          >
            Communities Designed for Real <br /> Living.
          </h1>
          <p
            className="font-medium text-lg max-sm:text-base text-subtitle-color mb-6 relative z-10"
            ref={caption}
          >
            Since 2003, Al-Subtain has been developing communities that bring
            people together combining thoughtful planning, solid engineering,
            and a commitment to long-term quality.
          </p>
          <div className="flex gap-4 mb-10 relative z-10">
            <Link href={"/contact"}>
              <Button
                variant={"outline"}
                className="h-14 border-white bg-transparent max-sm:h-12 call-to-action-button"
              >
                Contact Us
              </Button>
            </Link>
            <Link href={"/projects"}>
              <Button className="h-14 max-sm:h-12 call-to-action-button">
                Our Projects
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-5 flex-wrap relative z-10">
            {counters.map((counter, i) => (
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
              className="w-1/2 h-full opacity-30 shrink-0 rotate-y-180"
              style={{ height: "450px" }}
            />
            <AbstractDesign
              className="w-1/2 h-full opacity-30 shrink-0"
              style={{ height: "450px" }}
            />
          </div>
          <Image
            src={"/about/hero.png"}
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
