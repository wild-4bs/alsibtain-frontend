"use client";

import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useRef } from "react";

export const About = () => {
  const imageWrapper = useRef<HTMLDivElement | null>(null);
  const whiteBall = useRef<HTMLDivElement | null>(null);
  const title = useRef(null);
  const caption = useRef(null);
  const tagline = useRef(null);
  const section = useRef(null);

  useGSAP(() => {
    if (
      !imageWrapper.current ||
      !whiteBall.current ||
      !title.current ||
      !caption.current ||
      !section.current ||
      !tagline.current
    )
      return;
    const splitTitle = SplitText.create(title.current, {
      type: "chars",
      smartWrap: true,
    });
    const splitCaption = SplitText.create(caption.current, {
      type: "lines",
      smartWrap: true,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        scrub: 1,
        start: "top 150%",
        end: "bottom 30%",
      },
    });

    tl.from(splitTitle.chars, {
      x: 10,
      autoAlpha: 0,
      stagger: 0.02,
    });
    tl.from(tagline.current, {
      x: "-10%",
      opacity: 0,
    });
    tl.from(
      splitCaption.lines,
      {
        y: 40,
        autoAlpha: 0,
        stagger: 0.03,
        duration: 1,
      },
      1
    );

    const wrapper = imageWrapper.current;
    const ball = whiteBall.current;

    const moveX = gsap.quickTo(ball, "x", {
      duration: 1.2,
      ease: "expo.out",
    });

    const moveY = gsap.quickTo(ball, "y", {
      duration: 1.2,
      ease: "expo.out",
    });

    const clamp = (v: number, min: number, max: number) =>
      Math.min(Math.max(v, min), max);

    const onMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();

      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      const nx = clamp(x / (rect.width / 2), -1, 1);
      const ny = clamp(y / (rect.height / 2), -1, 1);

      moveX(nx * 140);
      moveY(ny * 140);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section className="py-28 relative overflow-hidden" ref={section}>
      <BluryBall className="left-0" />

      <Container className="flex justify-between gap-12">
        {/* TEXT */}
        <div className="flex flex-col max-w-xl">
          <span
            className="px-7 py-1.5 w-fit text-lg bg-white/10 rounded-full border border-white/30 mb-4 inline-block"
            ref={tagline}
          >
            About Us
          </span>

          <h2 className="font-light text-3xl mb-4" ref={title}>
            Al-Subtain Real Estate
          </h2>

          <p className="mb-10 leading-relaxed text-white/80" ref={caption}>
            For over two decades, Al-Sibtain Real Estate Development has stood
            as a symbol of excellence and integrity in Iraq’s real estate
            landscape. Founded in the holy city of Karbala in 2003, the company
            has grown into a trusted national developer — delivering large-scale
            residential, commercial, and healthcare projects that combine modern
            design, local authenticity, and global standards. Every project we
            build is guided by a simple yet powerful belief: architecture is not
            just about structures — it’s about people, life, and legacy. Through
            visionary planning, innovative engineering, and a deep understanding
            of community needs, Al-Sibtain has created urban spaces that bring
            people together, inspire belonging, and reflect the values of trust,
            quality, and progress. From the ambitious Uruk City, to the serene
            Al-Salam City, and the world-class Al-Kafeel Hospital, each
            development tells a story of purposeful creation — a story that
            shapes the present and builds the future of Iraq. With a dedicated
            team of experts, architects, and engineers, Al-Sibtain continues to
            redefine modern development through sustainable practices, precision
            in delivery, and a commitment to timeless design.
          </p>

          <Button
            className="
              relative w-fit rounded-full px-10 py-4
              bg-primary text-primary-foreground font-semibold
              shadow-[0_0_30px_--theme(--color-primary/70)]
              hover:shadow-[0_0_60px_--theme(--color-primary/90)]
              transition-all duration-300
              before:absolute before:inset-0 before:rounded-full
              before:bg-primary before:blur-2xl before:opacity-70 before:-z-10
              after:absolute after:inset-0 after:rounded-full
              after:bg-primary after:blur-2xl after:opacity-40 after:-z-20
              animate-pulse
            "
          >
            Contact Us
          </Button>
        </div>

        {/* IMAGE */}
        <div className="min-w-xl h-[600px] relative rounded-bl-[141px] max-lg:hidden">
          <BluryBall className="h-[110%] w-[70%] blur-2xl!" />

          <div
            ref={imageWrapper}
            className="
              relative w-full h-full p-1 overflow-hidden
              rounded-bl-[141px]
              will-change-transform
            "
          >
            {/* WHITE BALL */}
            <div
              ref={whiteBall}
              className="
                absolute top-1/2 left-1/2
                w-[60%] h-[60%]
                -translate-x-1/2 -translate-y-1/2
                bg-white rounded-full blur-xl
                pointer-events-none
                will-change-transform
                z-0
              "
            />

            <Image
              src="/home/about.jpg"
              width={1000}
              height={1000}
              alt="About image"
              className="
                relative z-10
                w-full h-full object-cover
                rounded-bl-[141px]
              "
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
