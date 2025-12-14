import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { GlassCard } from "@/components/ui/GlassCard";
import { Briefcase, HousePlus, Star, Users } from "lucide-react";

const services = [
  {
    title: "For Investors",
    caption:
      "Discover high-return projects backed by trust, quality, and long-term value.",
    icon: <Star strokeWidth={1.5} width={26} />,
    image: "",
  },
  {
    title: "For Homeowners",
    caption:
      "Enjoy modern communities designed for comfort, safety, and a better everyday life.",
    icon: <HousePlus width={26} />,
    image: "",
  },
  {
    title: "For Investors",
    caption:
      "Discover high-return projects backed by trust, quality, and long-term value.",
    icon: <Star strokeWidth={1.5} width={26} />,
    image: "",
  },
  {
    title: "For Investors",
    caption:
      "Discover high-return projects backed by trust, quality, and long-term value.",
    icon: <Star strokeWidth={1.5} width={26} />,
    image: "",
  },
  {
    title: "For Businesses",
    caption:
      "We create sustainable commercial spaces that support growth and innovation.",
    icon: <Briefcase width={26} />,
    image: "",
  },

  {
    title: "For Homeowners",
    caption:
      "Enjoy modern communities designed for comfort, safety, and a better everyday life.",
    icon: <HousePlus width={26} />,
    image: "",
  },
];
export const Services = () => {
  return (
    <section className="bg-black pb-12 z-40 relative rounded-b-[15rem]">
      <Container className="relative">
        <BluryBall className="left-0 top-2/4 -translate-x-2/4 w-[600px] h-[400px] opacity-20" />
        <BluryBall className="right-0 left-[unset] top-2/4 translate-x-2/4  w-[600px] h-[400px] opacity-20" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 relative z-10">
          {services.map((service, i) => {
            return (
              <article
                key={i}
                className="relative z-10 rounded-4xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="size-12 flex items-center justify-center bg-primary/90 rounded-full mb-5 shadow-lg shadow-primary/50">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-base leading-5 mb-2 text-white">
                  {service.title}
                </h3>
                <p className="font-light text-sm leading-5 text-white/80">
                  {service.caption}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
