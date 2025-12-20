"use client";
import Container from "@/components/Container";
import Image from "next/image";
import { BluryBall } from "@/components/ui/BluryBall";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const MissionAndVision = () => {
  const section = useRef(null);
  const vision = useRef(null);
  const mission = useRef(null);
  const values = useRef(null);
  const title = useRef(null);
  const caption = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        scrub: true,
        end: "top 10%",
      },
    });
    tl.from(
      title.current,
      {
        x: "-50%",
        opacity: 0,
      },
      "<"
    );
    tl.from(
      caption.current,
      {
        x: "-50%",
        opacity: 0,
        delay: 0.2,
      },
      "<"
    );
    tl.from(
      vision.current,
      {
        x: "50%",
        opacity: 0,
      },
      "<"
    );
    tl.from(
      mission.current,
      {
        y: "-50%",
        opacity: 0,
      },
      "<"
    );
    tl.from(
      values.current,
      {
        x: "-50%",
        opacity: 0,
      },
      "<"
    );
  }, []);
  return (
    <section className="my-32 leading-[150%] relative" ref={section}>
      <Image
        width={1000}
        height={1000}
        src={"/waterflow.png"}
        alt="water-flow"
        className="w-full max-w-[1400px] h-auto absolute left-1/2 -translate-x-1/2 object-cover -top-1/2 object-bottom max-xl:-top-1/4 max-lg:-top-1/5 max-md:-top-[10%]"
      />
      <Container>
        <BluryBall className="top-12 -left-1/5 w-[900px] h-[350px]" />
        <BluryBall className="bottom-0 -right-[70%] left-[unest] w-[900px] h-[700px]" />
        <header className="mb-12 relative z-10">
          <h2 className="font-semibold text-5xl mb-2" ref={title}>
            Our Vision & Mission
          </h2>
          <p className="text-subtitle-color font-medium text-lg" ref={caption}>
            Our purpose has always been clear: to build communities that last,
            serve, and inspire, Every decision we make — from planning to
            execution — reflects our long-term commitment to people, quality,
            and the future of Iraq.
          </p>
        </header>
        <div className="flex gap-10 flex-wrap relative z-10">
          <article
            className="w-full flex-1 md:min-w-xs max-md:min-w-full ring-8 rounded-xl p-12 bg-[#0f0f0f] ring-[#191919]"
            ref={vision}
          >
            <h2 className="mb-6 font-semibold text-3xl">Our Vision</h2>
            <h3 className="font-bold mb-5 text-lg text-subtitle-color">
              Shaping Tomorrow's Communities
            </h3>
            <p className="font-medium text-lg text-subtitle-color">
              Our vision is to set a new standard for real estate development in
              Iraq creating sustainable, modern, and people-focused environments
              that support families and future generations.
            </p>
          </article>

          <article
            className="w-full flex-1 md:min-w-xs max-md:min-w-full ring-8 rounded-xl p-12 bg-[#0f0f0f] ring-[#191919]"
            ref={mission}
          >
            <h2 className="mb-6 font-semibold text-3xl">Our Mission</h2>
            <h3 className="font-bold mb-5 text-lg text-subtitle-color">
              Building With Purpose
            </h3>
            <p className="font-medium text-lg text-subtitle-color">
              Our mission is to transform development into a meaningful
              experience by combining thoughtful design, engineering excellence,
              and practical solutions that elevate everyday living.
            </p>
          </article>

          <article
            className="w-full flex-1 md:min-w-xs max-md:min-w-full ring-8 rounded-xl p-12 bg-[#0f0f0f] ring-[#191919]"
            ref={values}
          >
            <h2 className="mb-6 font-semibold text-3xl">Our Values</h2>
            <h3 className="font-bold mb-5 text-lg text-subtitle-color">
              Guided by Principles That Last
            </h3>
            <p className="font-medium text-lg text-subtitle-color">
              Integrity, quality, innovation, sustainability, and
              community—these values shape every project we deliver and define
              who we are as a company.
            </p>
          </article>
        </div>
      </Container>
      <Image
        width={1000}
        height={1000}
        src={"/waterflow.png"}
        alt="water-flow"
        className="w-full h-auto absolute -translate-x-1/2 max-w-[1400px] left-1/2 object-cover -bottom-1/2 rotate-180 max-xl:-bottom-1/4 max-lg:-bottom-1/5 max-md:-bottom-[10%]"
      />
    </section>
  );
};
