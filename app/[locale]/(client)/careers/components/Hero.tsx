"use client";
import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useRef } from "react";

export const Hero = () => {
  const title = useRef(null);
  const caption = useRef(null);
  const button1 = useRef(null);
  const button2 = useRef(null);

  useGSAP(() => {
    const splitTitle = SplitText.create(title.current, {
      type: "words",
      smartWrap: true,
    });
    const splitCaption = SplitText.create(caption.current, {
      type: "words",
      smartWrap: true,
    });

    const tl = gsap.timeline();

    tl.from(splitTitle.words, {
      y: -100,
      opacity: 0,
      stagger: {
        amount: 0.3,
        from: "random",
      },
    });
    tl.from(splitCaption.words, {
      x: -10,
      opacity: 0,
      stagger: {
        amount: 0.3,
        from: "random",
      },
    });

    tl.from(button1.current, {
      x: -50,
      opacity: 0,
    });
    tl.from(
      button2.current,
      {
        x: 50,
        opacity: 0,
      },
      "<"
    );
  }, []);
  return (
    <section className="relative z-10 -mt-(--header-height) bg-primary">
      <BluryBall className="top-0 z-10" />
      <Image
        className="absolute top-0 left-0 h-full w-full object-cover z-0 opacity-75"
        src={"/careers/hero.jpg"}
        width={10000}
        height={10000}
        alt="image"
      />
      <Container className="h-screen text-center flex flex-col items-center justify-center relative z-10">
        <h1 className="uppercase text-4xl font-medium" ref={title}>
          Join Al-Subtain and Help Build <br /> Tomorrow’s Communities
        </h1>
        <p className="mb-6 mt-3 w-full lg:max-w-2xl" ref={caption}>
          Be part of a trusted real estate developer shaping modern residential
          projects across Iraq. Work with a professional team, real impact, and
          clear room to grow.
        </p>
        <div className="flex gap-2">
          <Link href={"#jobs"} ref={button1}>
            <Button className="bg-[#19499F]">Join The Team</Button>
          </Link>
          <Link href={"/contact"} ref={button2}>
            <Button variant={"outline"} className="border-white border-2">
              Contact Us
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};
