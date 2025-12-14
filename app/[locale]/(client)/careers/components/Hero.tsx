import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Hero = () => {
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
        <h1 className="uppercase text-4xl font-medium">
          Join Al-Subtain and Help Build <br /> Tomorrow’s Communities
        </h1>
        <p className="mb-6 mt-3 w-full lg:max-w-2xl">
          Be part of a trusted real estate developer shaping modern residential
          projects across Iraq. Work with a professional team, real impact, and
          clear room to grow.
        </p>
        <div className="flex gap-2">
          <Button className="bg-[#19499F]">Join The Team</Button>
          <Button variant={"outline"} className="border-white border-2">
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
};
