import Container from "@/components/Container";
import Image from "next/image";
import Beenhere from "@/assets/icons/beenhere.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BluryBall } from "@/components/ui/BluryBall";
export const Projects = () => {
  return (
    <section className="relative">
      <BluryBall className="left-[unset] right-0 translate-x-1/2 h-full w-[40%]" />
      <Container className="flex gap-16 relative z-10 max-lg:flex-col px-10!">
        <div className="image h-[421.2621765136719px] w-3xl relative rounded-3xl max-xl:w-2xl max-lg:w-[calc(100%-130px)] max-md:w-full max-md:h-[300px]">
          <Image
            src={"/partners/project-1.png"}
            fill
            alt="project"
            objectFit="cover"
            className="rounded-3xl"
          />
          <div className="absolute max-md:translate-x-0 max-md:translate-y-1/2 max-md:bottom-0 bottom-16 right-0 translate-x-[70%] w-[172px] bg-white/13 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-7 shadow-lg">
            <span className="font-barlow font-medium text-3xl inline-block mb-1">
              1,348
            </span>
            <h3 className="font-medium text-sm leading-4 text-subtitle-color">
              Residential Units Planned
            </h3>
          </div>
        </div>
        <div className="flex flex-col max-md:mt-[50px]">
          <h2 className="font-medium text-5xl mb-4">
            Explore Uruk City <br /> Residential Community
          </h2>
          <div className="size-12 mb-5 flex items-center justify-center self-end border border-white/30 rounded-full bg-white/20">
            <Beenhere />
          </div>
          <div className="flex flex-col select-none lg:ps-[120px]">
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <p>
                    Discover a master-planned residential development in
                    Karbala, offering 1,348 modern units and a fully integrated
                    living experience designed for families.
                  </p>
                </CarouselItem>
              </CarouselContent>
              <button className="hover:underline text-xs font-medium mt-8">
                View Project Details
              </button>
            </Carousel>
            <div className="flex justify-between mt-5">
              <div className="flex self-end gap-3 items-center">
                <button className="size-8 rounded-full flex hover:opacity-70 duration-300 cursor-pointer items-center justify-center border border-white">
                  <ChevronLeft size={18} strokeWidth={4} />
                </button>
                <button className="size-8 rounded-full flex hover:opacity-70 duration-300 cursor-pointer items-center justify-center border border-white">
                  <ChevronRight size={18} strokeWidth={4} />
                </button>
              </div>
              <div className="flex flex-wrap justify-end gap-3">
                <div className="w-full flex justify-end">
                  <Badge
                    variant={"outline"}
                    className="text-sm border-white/44 font-normal"
                  >
                    Real Estate
                  </Badge>
                </div>
                <Badge
                  variant={"outline"}
                  className="text-sm border-white/44 font-normal"
                >
                  Karbala
                </Badge>
                <Badge
                  variant={"outline"}
                  className="text-sm border-white/44 font-normal"
                >
                  Iraq
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
