"use client";
import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import {
  Hammer,
  Workflow,
  Landmark,
  Network,
  TrendingUp,
  SplitSquareVerticalIcon,
} from "lucide-react";
import { useRef } from "react";

export const whyUsList = [
  {
    title: "Proven Development Experience",
    description:
      "Over two decades of experience developing large residential and mixed-use communities with strong infrastructure and master-planning standards.",
    icon: <Hammer size={40} />,
  },
  {
    title: "Transparent Processes",
    description:
      "We maintain clear communication, detailed planning, and structured development stages to ensure every partner understands progress at all times.",
    icon: <Workflow size={40} />,
  },
  {
    title: "Government & Institutional Alignment",
    description:
      "Our team works closely with official departments to secure approvals, facilitate procedures, and ensure compliance with Iraqi regulations.",
    icon: <Landmark size={40} />,
  },
  {
    title: "Strong Market Presence",
    description:
      "With active projects across Karbala and other governorates, Al-Subtain maintains a trusted reputation in the Iraqi real estate sector.",
    icon: <Network size={40} />,
  },
  {
    title: "Long-Term Value Creation",
    description:
      "We focus on developments that deliver sustainable returns, solid appreciation, and stable growth for all partners involved.",
    icon: <TrendingUp size={40} />,
  },
];

export const WhyUs = () => {
  const title = useRef(null);
  const section = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        end: "+=100%",
        pin: true,
        scrub: true,
      },
    });

    const splitTitle = SplitText.create(title.current, {
      type: "chars",
      smartWrap: true,
    });
    const reasonsEl = section.current?.querySelectorAll(
      ".partners-page-reason"
    );
    if (!reasonsEl) return;
    tl.from(splitTitle.chars, {
      y: -100,
      opacity: 0,
      stagger: {
        each: 0.01,
        from: "random",
      },
    });
    tl.from(reasonsEl, {
      y: 100,
      opacity: 0,
      stagger: {
        each: 0.1,
        from: "random",
      },
    });
  }, []);
  return (
    <section className="pt-28 relative z-10" ref={section}>
      <BluryBall className="left-[unset] right-0 h-full w-[30%] translate-x-1/2" />
      <Container>
        <h2 className="font-semibold text-3xl mb-10 text-center" ref={title}>
          Why Partner With Us?
        </h2>
        <div className="flex justify-center text-center flex-wrap gap-10">
          {whyUsList.map((reason, i) => (
            <article
              key={i}
              className="w-full md:max-w-md flex-col flex items-center justify-center partners-page-reason"
            >
              <div className="size-32 rounded-full bg-[#55B2FF]/12 flex items-center justify-center mb-5">
                {reason.icon}
              </div>
              <h3 className="font-semibold text-xl leading-[126%] mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-subtitle-color">
                {reason.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
