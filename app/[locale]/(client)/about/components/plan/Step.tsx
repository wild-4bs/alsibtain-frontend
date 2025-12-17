import { BluryBall } from "@/components/ui/BluryBall";

interface Props {
  headline: string;
  title: string;
  description: string;
  index: number;
}
export const Step = ({ headline, description, title, index }: Props) => {
  const stepNumber = String(index).padStart(2, "0");

  return (
    <article className="w-full flex-1 min-w-sm overflow-hidden max-sm:min-w-full about-page-plan-step">
      <header className="px-5 py-4 border-l border-l-primary">
        <h3 className="relative z-30">
          Step {stepNumber} — {title}
        </h3>
      </header>
      <div className="p-px overflow-hidden bg-input rounded-xl rounded-tl-none relative">
        <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-linear-to-b from-primary to-transparent z-10"></div>
        <div className="body p-12 leading-[150%] rounded-xl relative z-10 rounded-tl-none bg-linear-to-br from-[#0033FF] via-background via-5% to-background">
          <h4 className="mb-4 font-semibold text-2xl relative z-30">
            {headline}
          </h4>
          <p className="text-lg font-medium text-subtitle-color relative z-30">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};
