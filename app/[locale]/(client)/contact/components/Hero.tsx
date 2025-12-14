import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="h-screen -mt-(--header-height) relative">
      <BluryBall className="top-0 right-0 left-[unset] w-[600px] h-[900px] z-10 translate-x-1/2 -translate-y-1/2" />
      <Image
        src={"/contact/hero.jpg"}
        width={10000}
        height={10000}
        objectFit="cover"
        alt="hero"
        className="w-[96%] object-cover z-0 pointer-events-none h-full left-1/2 absolute top-0 -translate-x-1/2 rounded-b-[2.5rem]"
      />
    </section>
  );
};
