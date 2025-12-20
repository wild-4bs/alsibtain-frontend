"use client";

import Container from "@/components/Container";
import Users2 from "@/assets/icons/users2.svg";
import Reload from "@/assets/icons/reload.svg";
import Education from "@/assets/icons/education.svg";
import BarChart from "@/assets/icons/barChart.svg";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const reasons = [
  {
    title: "Team work",
    caption:
      "Work within a supportive team that values cooperation, respect, and shared success.",
    icon: <Users2 />,
  },
  {
    title: "Secured Future",
    caption:
      "We provide clear paths for professional advancement and long-term development.",
    icon: <Reload />,
  },
  {
    title: "Learning Opportunity",
    caption:
      "Access training, workshops, and real-world project experience to sharpen your skills.",
    icon: <Education />,
  },
  {
    title: "Upgrate Skills",
    caption:
      "Join an established Iraqi developer with a strong reputation and long-standing market presence.",
    icon: <BarChart />,
  },
];

export const WhyWorkWithUs = () => {
  const section = useRef<HTMLElement>(null);
  const tagline = useRef<HTMLHeadingElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const caption = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const splitTitle = SplitText.create(title.current!, {
      type: "words",
      smartWrap: true,
    });

    const splitTagline = SplitText.create(tagline.current!, {
      type: "words",
      smartWrap: true,
    });

    const splitCaption = SplitText.create(caption.current!, {
      type: "words",
      smartWrap: true,
    });

    const cards = section.current?.querySelectorAll(".benefit-card");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "top 70%",
      },
    });

    // TITLE
    tl.from(splitTitle.words, {
      x: -100,
      opacity: 0,
      stagger: {
        amount: 0.3,
        from: "random",
      },
      ease: "power3.out",
    });

    // TAGLINE (2nd stage)
    tl.from(
      splitTagline.words,
      {
        x: -100,
        opacity: 0,
        stagger: {
          amount: 0.25,
          from: "random",
        },
        ease: "power3.out",
      },
      "-=0.2"
    );

    // CAPTION
    tl.from(
      splitCaption.words,
      {
        x: -100,
        opacity: 0,
        stagger: {
          amount: 0.4,
          from: "random",
        },
        ease: "power3.out",
      },
      "-=0.15"
    );

    // BENEFITS (FROM BOTTOM + RANDOM STAGGER)
    tl.from(
      cards!,
      {
        y: 80,
        opacity: 0,
        stagger: {
          each: 0.15,
          from: "random",
        },
        ease: "power3.out",
      },
      "-=0.2"
    );
  }, []);

  return (
    <section className="mt-48" ref={section}>
      <Container className="flex md:justify-between gap-10 max-md:flex-col">
        <div>
          <h2 className="mb-4 font-medium text-lg" ref={tagline}>
            Benefits
          </h2>

          <h3 className="mb-6 font-bold text-4xl" ref={title}>
            Why you Should Join Our Awesome Team
          </h3>

          <div className="text-sm" ref={caption}>
            <p className="mb-2">
              At Al-Subtain, we believe that great projects start with great
              people.
            </p>
            <p>
              We provide a supportive, professional environment where every team
              member can grow, contribute, and build a meaningful career in real
              estate development.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          {reasons.map((reason, i) => (
            <div className="benefit-card flex flex-col" key={i}>
              <div className="size-16 mb-8 rounded-sm bg-primary flex items-center justify-center">
                {reason.icon}
              </div>
              <h4 className="font-bold text-lg mb-3">{reason.title}</h4>
              <p className="font-light text-sm">{reason.caption}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
