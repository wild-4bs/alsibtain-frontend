import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { cn } from "@/lib/utils";
import {
  Code,
  Film,
  Laptop,
  LayoutGrid,
  LineChart,
  Pencil,
  Rocket,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import { Space_Grotesk } from "next/font/google";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space_grotesk",
});

const services = [
  {
    id: 1,
    icon: <Pencil width={24} className="text-primary" />,
    title: "Real Estate Development",
    description:
      "Planning and developing large-scale residential projects from concept to execution, ensuring modern design, strong infrastructure, and long-term community value.",
  },
  {
    id: 2,
    icon: <Laptop width={24} className="text-primary" />,
    title: "Project Planning & Masterplanning",
    description:
      "Designing complete project layouts including land distribution, unit planning, zoning, and infrastructure networks based on global standards.",
  },
  {
    id: 3,
    icon: <Smartphone width={24} className="text-primary" />,
    title: "Construction Supervision",
    description:
      "Overseeing site work, timelines, and quality standards to ensure every phase of construction meets engineering and safety requirements.",
  },
  {
    id: 4,
    icon: <Film width={24} className="text-primary" />,
    title: "Real Estate Investment Management",
    description:
      "Building sustainable investment models for residential communities and managing project financing, feasibility, and long-term returns.",
  },
  {
    id: 5,
    icon: <Rocket width={24} className="text-primary" />,
    title: "Sales & Project Marketing",
    description:
      "Managing sales operations, client communication, and project marketing to ensure clear information flow and strong market presence.",
  },
  {
    id: 6,
    icon: <LineChart width={24} className="text-primary" />,
    title: "Partnerships & Government Coordination",
    description:
      "Coordinating with government entities, service providers, and strategic partners to ensure smooth project approvals and integrated community services.",
  },
];

export const Services = () => {
  return (
    <section className={cn(space_grotesk.className, "relative z-20 mt-20")}>
      <BluryBall className="bottom-0 left-0 translate-y-1/2" />
      <BluryBall className="top-0 right-0 left-[unset] translate-x-1/2 translate-y-0" />
      <Container>
        <h2 className="text-center text-4xl mb-16">Our Services</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <article key={i} className="p-8 rounded-xl border border-[#737373]">
              <div className="size-16 bg-[#5535E61A] rounded-xl flex items-center justify-center mb-5">
                {service.icon}
              </div>
              <h3 className="font-normal text-lg">{service.title}</h3>
              <p className="text-subtitle-color mt-2">{service.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
