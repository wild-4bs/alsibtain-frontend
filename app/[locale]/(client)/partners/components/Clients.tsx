"use client";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowUp, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const clientTestimonials = [
  {
    id: 1,
    name: "Ali Kareem",
    role: "Homeowner - Karbala",
    image: "/clients/1.png",
    testimonial:
      "Al-Subtain made the entire process smooth and professional. From choosing the unit to understanding the project details, their team supported us at every stage. Truly a trustworthy developer.",
    rating: 5,
    link: "#",
  },
  {
    id: 2,
    name: "Hassan Al-Rubaie",
    role: "Real Estate Investor",
    image: "/clients/2.png",
    testimonial:
      "Their projects are well-planned and built with long-term value in mind. Al-Subtain has become my preferred choice for reliable and safe real estate investments in Iraq.",
    rating: 5,
    link: "#",
  },
  {
    id: 3,
    name: "Hassan Al-Rubaie",
    role: "Real Estate Investor",
    image: "/clients/2.png",
    testimonial:
      "Their projects are well-planned and built with long-term value in mind. Al-Subtain has become my preferred choice for reliable and safe real estate investments in Iraq.",
    rating: 5,
    link: "#",
  },
];

const NAV_SIZE = 50;

export const Clients = () => {
  const title = useRef(null);
  const section = useRef(null);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
    };
  }, [api]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section.current, scrub: 1, end: "top 20%" },
    });
    const splitTitle = SplitText.create(title.current, {
      type: "words",
    });
    tl.from(splitTitle.words, {
      y: -100,
      opacity: 0,
      stagger: { amount: 0.3, from: "end" },
    });
  }, []);

  return (
    <section className="my-28" ref={section}>
      <Container>
        <h2
          className="text-6xl font-medium text-center mb-16 max-sm:text-4xl px-4"
          ref={title}
        >
          What Our Clients Say <br className="max-md:hidden" /> About Us
        </h2>

        <div
          className="relative"
          style={{
            paddingLeft: NAV_SIZE,
            paddingRight: NAV_SIZE,
          }}
        >
          <button
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            className="
    absolute left-0 top-1/2 -translate-y-1/2 z-10
    size-8 lg:size-9
    rounded-full border border-white/40
    flex items-center justify-center
    disabled:opacity-30 disabled:pointer-events-none
  "
          >
            <ChevronLeft className="size-4 lg:size-5" />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer
              size-9 rounded-full border border-white
              flex items-center justify-center
              disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronRight size={28} />
          </button>

          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              slidesToScroll: 1,
            }}
          >
            <CarouselContent className="-ml-6">
              {clientTestimonials.map((client) => (
                <CarouselItem
                  key={client.id}
                  className="pl-6 basis-1/2 max-md:basis-full"
                >
                  <div className=" h-full bg-white/5 border border-white/20 rounded-3xl p-6 lg:p-8 flex flex-col backdrop-blur-2xl">
                    <header className="flex flex-col items-center justify-center">
                      <Image
                        src={client.image}
                        width={1000}
                        height={1000}
                        alt={client.name}
                        className="size-16 rounded-full object-cover mb-7"
                      />
                      <h3 className="font-medium text-sm lg:text-base text-center mb-2">
                        {client.name}
                      </h3>
                      <span className="font-normal text-subtitle-color">
                        {client.role}
                      </span>
                    </header>
                    <p className="font-light text-subtitle-color text-center mt-8 flex-1 mb-5">
                      {client.testimonial}
                    </p>
                    <footer className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-2">
                        {Array.from({ length: client.rating }).map((_, i) => (
                          <Star
                            fill="gold"
                            className="text-transparent"
                            key={i}
                          />
                        ))}
                      </div>
                      <Button
                        variant={"ghost"}
                        className="hover:bg-primary/10 hover:text-white/90"
                      >
                        <ArrowUp className="rotate-45 size-6" />
                      </Button>
                    </footer>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </Container>
    </section>
  );
};
