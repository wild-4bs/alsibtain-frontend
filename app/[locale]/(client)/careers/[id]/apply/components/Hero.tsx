import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="h-screen -mt-(--header-height) relative w-full bg-primary">
      <BluryBall className="top-0 right-0 left-[unset] translate-x-1/2 h-[643px] w-[980px] z-10" />
      <Image
        src={"/careers/application/hero.jpg"}
        width={10000}
        height={10000}
        alt="hero"
        className="absolute top-0 left-0 object-cover w-full h-full pointer-events-none z-0 opacity-85"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-black z-0"></div>
      <Container className="h-full flex items-center justify-center relative z-20">
        <h1 className="font-medium text-5xl text-center">
          Your Career. Our Next Landmark.
        </h1>
      </Container>
    </section>
  );
};
