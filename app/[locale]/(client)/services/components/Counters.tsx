"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const Counters = () => {
  const section = useRef<HTMLElement | null>(null);
  const image1 = useRef<HTMLImageElement | null>(null);
  const image2 = useRef<HTMLImageElement | null>(null);

  useGSAP(() => {
    if (!section.current) return;
    gsap
      .timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top 80%",
          end: "top 10%",
          scrub: 1,
        },
      })
      .from(image1.current, { y: -100, opacity: 0 })
      .from(image2.current, { y: 100, opacity: 0 }, "<");

    const counters =
      section.current.querySelectorAll<HTMLElement>("[data-counter]");

    counters.forEach((el) => {
      const value = Number(el.dataset.value);

      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: value,
          duration: 2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: section.current,
            start: "top 80%",
            once: true, // run only once
          },
          snap: { innerText: 1 },
          onUpdate: () => {
            el.innerText = Math.floor(Number(el.innerText)).toString();
          },
        }
      );
    });
  }, []);

  return (
    <section ref={section} className="relative mt-24 mb-30">
      <Container className="flex gap-8">
        <div className="counters">
          <div className="flex">
            <div
              className="grid max-sm:grid-cols-1 border-y border-y-input grid-cols-2
              [&_dt]:text-xl
              [&_dd]:font-extrabold
              [&_dd]:text-primary
              [&_dd]:text-4xl
              [&_dl]:w-[315px]
              max-2xl:[&_dl]:w-[290px]
              max-lg:[&_dl]:w-[200px]
              max-md:w-full
              max-md:[&_dl]:w-full"
            >
              <dl className="flex flex-col gap-1 py-12 justify-center ps-16 sm:border-e border-e-input border-b border-b-input">
                <dd>
                  <span data-counter data-value="25" />+
                </dd>
                <dt>Total Projects</dt>
              </dl>

              <dl className="flex flex-col gap-1 py-12 justify-center ps-16 max-sm:border-b max-sm:border-b-input">
                <dd>
                  <span data-counter data-value="21" />+
                </dd>
                <dt>Years of experience</dt>
              </dl>

              <dl className="flex flex-col gap-1 py-12 justify-center ps-16 max-sm:border-b max-sm:border-b-input">
                <dd>
                  <span data-counter data-value="3000" />+
                </dd>
                <dt>Happy Customers</dt>
              </dl>

              <dl className="flex flex-col gap-1 py-12 justify-center ps-16 sm:border-t border-t-input sm:border-s border-s-input -mt-px -ms-px">
                <dd>
                  <span data-counter data-value="3" />+
                </dd>
                <dt>Provinces</dt>
              </dl>
            </div>

            <Image
              ref={image1}
              src="/services/project-1.jpg"
              width={1000}
              height={1000}
              alt="project"
              className="w-[284px] h-[366px] object-cover max-md:hidden"
            />
          </div>

          <div className="flex justify-between mt-10 max-sm:flex-col max-sm:items-center gap-3">
            <p className="text-lg w-full max-w-2xl max-sm:text-center">
              We work together with our clients to design and construct homes
              and surroundings that match their values and way of life.
            </p>

            <Button
              variant="ghost"
              className="rounded-md hover:bg-primary/10 hover:text-primary w-[200px] text-base h-12"
            >
              View Projects <ArrowRight />
            </Button>
          </div>
        </div>

        <Image
          ref={image2}
          src="/services/project-2.jpg"
          width={1000}
          height={1000}
          alt="project"
          className="w-[284px] h-[366px] object-cover self-end translate-y-10 max-xl:hidden"
        />
      </Container>
    </section>
  );
};
