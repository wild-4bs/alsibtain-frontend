"use client";

import { useRef } from "react";
import Container from "@/components/Container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const Counters = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const counters = gsap.utils.toArray<HTMLElement>(".counter-number");
    const labels = gsap.utils.toArray<HTMLElement>(".counter-text");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
      },
    });

    // 🔢 ALL numbers at the same time
    counters.forEach((el) => {
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
        0 // 👈 same start time
      );
    });

    // ✨ Text AFTER numbers
    labels.forEach((label) => {
      const split = SplitText.create(label, { type: "chars" });

      tl.from(
        split.chars,
        {
          opacity: 0,
          duration: 0.3,
          stagger: 0.04,
        },
        1
      );
    });
  }, []);

  return (
    <section ref={sectionRef}>
      <Container>
        <ul className="w-full flex justify-around my-12 gap-12 max-lg:flex-wrap max-sm:text-center">
          <li className="text-2xl">
            <h3 className="font-medium counter-number">+21</h3>
            <span className="font-light counter-text">Years of Excellence</span>
          </li>

          <li className="text-2xl">
            <h3 className="font-medium counter-number">+26</h3>
            <span className="font-light counter-text">Projects</span>
          </li>

          <li className="text-2xl">
            <h3 className="font-medium counter-number">+3500</h3>
            <span className="font-light counter-text">Housing Units</span>
          </li>

          <li className="text-2xl">
            <h3 className="font-medium counter-number">+3</h3>
            <span className="font-light counter-text">Provinces</span>
          </li>
        </ul>
      </Container>
    </section>
  );
};
