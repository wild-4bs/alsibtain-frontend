import Container from "@/components/Container";
import Users2 from "@/assets/icons/users2.svg";
import Reload from "@/assets/icons/reload.svg";
import Education from "@/assets/icons/education.svg";
import BarChart from "@/assets/icons/barChart.svg";

const reasons = [
  {
    title: "Team work",
    caption:
      "Work within a supportive team that values cooperation, respect, and shared success.",
    icon: <Users2 />,
  },
  {
    title: "Secured Future",
    caption:
      "We provide clear paths for professional advancement and long-term development.",
    icon: <Reload />,
  },
  {
    title: "Learning Opportunity",
    caption:
      "Access training, workshops, and real-world project experience to sharpen your skills.",
    icon: <Education />,
  },
  {
    title: "Upgrate Skills",
    caption:
      "Join an established Iraqi developer with a strong reputation and long-standing market presence.",
    icon: <BarChart />,
  },
];

export const WhyWorkWithUs = () => {
  return (
    <section className="mt-48">
      <Container  className="flex md:justify-between gap-10 max-md:flex-col">
        <div>
          <h2 className="mb-4 font-medium text-lg">Benefits</h2>
          <h3 className="mb-6 font-bold text-4xl">
            Why you Should Join Our Awesome Team
          </h3>
          <div className="text-sm">
            <p className="mb-2">
              At Al-Subtain, we believe that great projects start with great
              people.
            </p>
            <p>
              We provide a supportive, professional environment where every team
              member can grow, contribute,and build a meaningful career in real
              estate development.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          {reasons.map((reason, i) => (
            <div className="flex flex-col" key={i}>
              <div className="size-16 mb-8 rounded-sm bg-primary flex items-center justify-center">
                {reason.icon}
              </div>
              <h4 className="font-bold text-lg mb-3">{reason.title}</h4>
              <p className="font-light text-sm">{reason.caption}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
