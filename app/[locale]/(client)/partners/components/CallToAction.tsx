"use client";
import Container from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const CallToAction = () => {
  const section = useRef(null);
  const questionMark = useRef(null);
  const button = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section.current, scrub: 1, end: "top top" },
    });

    tl.from(questionMark.current, {
      y: -100,
      opacity: 0,
    });
  }, []);

  return (
    <section className="my-32" ref={section}>
      <Container className="flex flex-col items-center gap-4 text-center">
        <Badge variant={"dark"}>Call To Action</Badge>
        <h2 className="font-bold text-4xl">
          Ready to collaborate
          <span className="inline-block" ref={questionMark}>
            ?
          </span>
        </h2>
        <p className="font-medium text-base text-subtitle-color">
          Our team is here to discuss partnership opportunities and explore how
          we can build impactful projects together.
        </p>
        <Link href={"/contact"}>
          <Button
            ref={button}
            className="mt-3 font-medium px-10 rounded-full bg-[#2255B1] h-11"
          >
            Contact Us
          </Button>
        </Link>
      </Container>
    </section>
  );
};
