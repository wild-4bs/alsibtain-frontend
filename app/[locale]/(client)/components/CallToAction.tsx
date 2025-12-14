import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Building2, Notebook, House, Landmark } from "lucide-react";

export const floatingIcons = [
  {
    id: 1,
    icon: <Notebook className="size-8" strokeWidth={2} />,
    className:
      "absolute top-[-20px] left-[40%] -translate-x-1/2 md:top-[-30px]",
  },
  {
    id: 2,
    icon: <Landmark className="size-8" strokeWidth={2} />,
    className:
      "absolute top-1/4 left-[20%] md:top-1/3 -rotate-45 max-md:left-4",
  },
  {
    id: 3,
    icon: <House className="size-8" strokeWidth={2} />,
    className:
      "absolute right-[15%] bottom-[-25px] -translate-x-1/2 md:bottom-12 rotate-45",
  },
  {
    id: 4,
    icon: <Building2 className="size-8" strokeWidth={2} />,
    className: "absolute right-10 md:right-[20%] md:top-12 max-md:right-2",
  },
  {
    id: 5,
    icon: <House className="size-8" strokeWidth={2} />,
    className:
      "absolute right-12 bottom-10 md:right-[10%] md:bottom-[30%] rotate-45",
  },
  {
    id: 6,
    icon: <Landmark className="size-8" strokeWidth={2} />,
    className:
      "absolute left-12 bottom-10 md:left-[30%] md:bottom-12 rotate-45",
  },
];

export const CallToAction = () => {
  return (
    <section>
      <Container className="py-20 border h-[50vh] border-input text-center flex justify-center flex-col items-center rounded-4xl relative">
        {floatingIcons.map((icon, i) => (
          <div
            key={i}
            className={cn(
              "size-18 text-primary z-0 bg-black border border-white/10 rounded-full pointer-events-none flex items-center justify-center",
              icon.className
            )}
          >
            {icon.icon}
          </div>
        ))}
        <BluryBall className="left-0 top-0 bg-primary/60" />
        <BluryBall className="left-[unset] translate-y-0 right-0 bottom-0 translate-x-1/2 bg-primary/60" />
        <h2 className="font-semibold relative z-10 text-2xl leading-[113%] mb-4">
          Future-ready development <br /> built with purpose
        </h2>
        <p className="font-normal text-sm leading-[113%] relative z-10">
          Our projects are designed to grow with communities — sustainable,
          smart, and built to last.
        </p>
        <Button className="mt-8 w-fit rounded-full bg-[#2255B1] relative z-10">
          Explore Projects
        </Button>
      </Container>
    </section>
  );
};
