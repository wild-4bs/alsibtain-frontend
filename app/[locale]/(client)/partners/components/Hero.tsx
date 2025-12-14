import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative h-[calc(100vh-var(--header-height))] flex items-end">
      <Image
        src={"/partners/hero.jpg"}
        alt="image"
        width={10000}
        height={10000}
        objectFit="cover"
        className="h-[calc(100%+var(--header-height))] -top-(--header-height) w-full object-cover absolute left-0 z-0 pointer-events-none"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-black"></div>
      <BluryBall className="left-0" />
      <Container className="relative z-10 pb-20 flex justify-between gap-20 max-xl:flex-col max-xl:justify-start max-xl:gap-10">
        <h1 className="font-medium text-6xl leading-[130%] flex-1 w-full max-md:text-5xl max-md:leading-[120%] max-md:text-center">
          Partner With Al-Subtain to <br /> Shape Future Communities
        </h1>
        <div className="flex flex-col gap-6 w-md max-md:mx-auto max-md:w-full max-md:text-center max-md:items-center">
          <p>
            Collaborate with a trusted Iraqi developer on large-scale
            residential projects, We work closely with government entities,
            financial institutions, and strategic investors, to deliver
            sustainable, high-value communities across Iraq.
          </p>
          <Button className="bg-[#FFFFFF21] border-white/50 border min-w-32 min-h-8 hover:bg-[#ffffff54] w-fit">
            CONTACT US
          </Button>
        </div>
      </Container>
    </section>
  );
};
