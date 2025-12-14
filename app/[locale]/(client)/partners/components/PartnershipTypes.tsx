import Container from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { BluryBall } from "@/components/ui/BluryBall";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

import { Zap, Banknote, Sticker, PieChart } from "lucide-react";

const partnershipsData = [
  {
    id: 1,
    icon: <Zap size={32} className="text-primary" />,
    title: "Government Collaboration",
    description:
      "Working with ministries, municipalities, and public entities to support urban development initiatives.",
  },
  {
    id: 2,
    icon: <Banknote size={32} className="text-primary" />,
    title: "Investment Partnerships",
    description:
      "For investors seeking reliable long-term returns through structured real estate models.",
  },
  {
    id: 3,
    icon: <Sticker size={32} className="text-primary" />,
    title: "Engineering & Construction Partners",
    description:
      "Collaborating with experienced firms to ensure high-quality planning, design, and execution.",
  },
  {
    id: 4,
    icon: <PieChart size={32} className="text-primary" />,
    title: "Service & Infrastructure Providers",
    description:
      "Partnerships that enhance community services—utilities, roads, education, health, and commercial support.",
  },
];

export const PartnershipTypes = () => {
  return (
    <section className="relative mt-26">
      <BluryBall className="left-0 w-[40%] h-full" />
      <Container className="flex gap-10 relative z-10 max-lg:flex-col">
        <div className="flex flex-col gap-6 w-full">
          <Badge variant={"dark"}>Partners</Badge>
          <h2 className="font-bold text-6xl">Types of Partnerships</h2>
          <p className="font-medium text-base leading-6 text-subtitle-color">
            Explore the key partnership models we offer to support large-scale
            development, enhance community services, and create long-term value
            across our projects.
          </p>
          <Button
            variant={"secondary"}
            className="w-fit h-12 font-medium rounded-full"
          >
            <div className="-translate-y-0.5">Contact Us</div>
            <div className="size-4.5 flex items-center justify-center rounded-full border border-black">
              <ArrowUpRight
                color="#000000"
                className="size-4"
                strokeWidth={2}
              />
            </div>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-12 max-sm:grid-cols-1">
          {partnershipsData.map((partnership, i) => (
            <article
              key={i}
              className="flex flex-col gap-4 max-sm:items-center max-sm:text-center"
            >
              <div className="size-16 rounded-2xl bg-[#0D0D0D] flex items-center justify-center">
                {partnership.icon}
              </div>
              <h3 className="text-2xl font-medium">{partnership.title}</h3>
              <p className="text-base leading-6 font-medium text-subtitle-color">
                {partnership.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
