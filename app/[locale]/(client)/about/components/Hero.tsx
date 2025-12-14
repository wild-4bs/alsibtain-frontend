import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import AbstractDesign from "@/assets/objects/abstract.svg";
import Image from "next/image";
import { BluryBall } from "@/components/ui/BluryBall";

export const counters = [
  {
    title: "Year Of Excellence",
    count: "21+",
  },
  {
    title: "Projects",
    count: "25+",
  },
  {
    title: "Housing Units",
    count: "3000+",
  },
  {
    title: "Provinces",
    count: "3+",
  },
];

export const Hero = () => {
  return (
    <section className="min-h-[calc(100vh-var(--header-height))]">
      <Container className="flex gap-12 pt-28 max-md:pt-4">
        <div className="relative">
          <BluryBall className="-left-1/6" />
          <h1 className="mb-5 font-semibold text-5xl max-sm:text-4xl leading-[130%] relative z-10">
            Communities Designed for Real <br /> Living.
          </h1>
          <p className="font-medium text-lg max-sm:text-base text-subtitle-color mb-6 relative z-10">
            Since 2003, Al-Subtain has been developing communities that bring
            people together combining thoughtful planning, solid engineering,
            and a commitment to long-term quality.
          </p>
          <div className="flex gap-4 mb-10 relative z-10">
            <Button
              variant={"outline"}
              className="h-14 border-white bg-transparent max-sm:h-12"
            >
              Contact Us
            </Button>
            <Button className="h-14 max-sm:h-12">Our Projects</Button>
          </div>
          <div className="flex items-center gap-5 flex-wrap relative z-10">
            {counters.map((counter, i) => (
              <div
                key={i}
                className="px-6 py-4 bg-[#1A1A1A] border border-[#262626] rounded-2xl lg:min-w-[200px] sm:min-w-[170px] min-w-full"
              >
                <span className="text-3xl max-sm:text-2xl font-bold mb-2 inline-block">
                  {counter.count}
                </span>
                <h2 className="font-medium text-sm leading-[130%] max-sm:text-xs">
                  {counter.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
        <BluryBall className="-right-1/2 w-[900px] h-[650px] left-[unset]" />
        <div className="min-w-[500px] max-lg:hidden w-[500px] max-xl:min-w-[400px] max-xl:w-[400px] h-fit bg-[#262626] min-h-[450px] flex items-end rounded-xl relative overflow-hidden">
          <AbstractDesign className="absolute top-0 left-0 pointer-events-none z-10 w-full h-full opacity-30" />
          <Image
            src={"/about/hero.png"}
            width={1000}
            height={1000}
            className="relative z-20 w-full"
            alt="hero"
          />
        </div>
      </Container>
    </section>
  );
};
