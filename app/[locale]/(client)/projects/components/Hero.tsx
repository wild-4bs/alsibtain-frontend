import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import LargeComet from "@/assets/objects/large-comet.svg";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative z-10 min-h-[calc(100vh-var(--header-height))]">
      <LargeComet className="absolute z-10 top-0 left-0 animate-pulse" />
      <Container className="pt-28">
        <div className="relative z-20 max-md:text-center">
          <h1 className="font-normal text-7xl leading-[120%] mb-6 max-md:text-6xl">
            Discover Our <br /> Landmark Projects
          </h1>
          <p className="font-medium text-base w-full max-w-2xl mb-10">
            Explore a portfolio of visionary developments shaping modern urban
            living. Each project reflects our commitment to quality, innovation,
            and long-term value.
          </p>
          <Button className="bg-linear-to-tr from-[black_20%] to-[theme(colors.primary)_80% rounded-full px-6 py-6">
            Scroll to Explore
          </Button>
        </div>
        <div className="absolute top-0 right-0 w-[65%] h-full max-h-[80%] rounded-bl-[12.375rem] z-0 max-md:w-[97%] max-md:me-[2%]">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-bl-[12.275rem] max-md:bg-[linear-gradient(to_bottom,black,transparent)] max-lg:bg-[linear-gradient(to_right,black_0%,transparent_90%)] bg-[linear-gradient(to_right,black_0%,transparent_50%)]"></div>
          <Image
            width={1000}
            height={1000}
            alt="hero"
            src="/projects/hero.jpg"
            className="w-full h-full object-cover rounded-bl-[12.375rem]"
          />
        </div>
      </Container>
    </section>
  );
};
