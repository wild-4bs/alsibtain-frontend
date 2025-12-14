import Container from "@/components/Container";
import { Step } from "./Step";
import { BluryBall } from "@/components/ui/BluryBall";
const steps = [
  {
    id: "01",
    title: "Our Beginning",
    headline: "A Story Rooted in Karbala",
    description:
      "Founded in 2003, Al-Subtain started with a simple goal: develop projects that serve people and add real value to their daily lives.",
  },
  {
    id: "02",
    title: "Our Purpose",
    headline: "Building Communities, Not Just Buildings",
    description:
      "We design developments that focus on comfort, safety, and a complete lifestyle — where families can live, grow, and belong.",
  },
  {
    id: "03",
    title: "Our Philosophy",
    headline: "Architecture for People",
    description:
      "For us, architecture is not form or structure — it's an experience that connects individuals to their surroundings and enhances quality of life.",
  },
  {
    id: "04",
    title: "Our Projects",
    headline: "Landmarks That Shape Iraq's Future",
    description:
      "From Uruk City to Al-Salam City, Al-Kafeel Hospital, and the new Al-Abbas Residential Complex, every project reflects long-term vision and solid execution.",
  },
  {
    id: "05",
    title: "Our Team",
    headline: "Experts Behind Every Detail",
    description:
      "Architects, engineers, planners, and managers who ensure each development meets high standards and stands the test of time.",
  },
  {
    id: "06",
    title: "Our Commitment",
    headline: "Quality, Integrity, and Sustainability",
    description:
      "We build with honesty, focus on durable materials and practical solutions, and plan for the generations who will live in these communities.",
  },
];
export const Plan = () => {
  return (
    <section>
      <Container>
        <header className="mb-12">
          <h2 className="font-semibold text-5xl leading-[150%]">
            Navigating the Estatein Experience
          </h2>
          <p className="font-medium text-lg text-subtitle-color leading-[150%]">
            At Estatein, we've designed a straightforward process to help you
            find and purchase your dream property with ease. Here's a
            step-by-step guide to how it all works.
          </p>
        </header>
        <div className="flex relative items-start gap-6 flex-wrap">
          <BluryBall className="-left-1/4 h-full w-[800px] z-20 max-lg:w-[200px]" />
          <BluryBall className="-right-1/4 left-[unset] translate-x-1/2 h-full w-[800px] z-20 max-lg:hidden" />
          {steps.map((step, i) => (
            <Step
              key={i}
              title={step.title}
              headline={step.headline}
              description={step.description}
              index={i + 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
