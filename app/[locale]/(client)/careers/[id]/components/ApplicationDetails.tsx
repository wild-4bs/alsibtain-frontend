import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { Requirements } from "./Requirements";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const ApplicationDetails = ({
  className,
}: ComponentProps<"section">) => {
  return (
    <section className={cn("relative", className)}>
      <BluryBall className="h-full left-0 w-[599px]" />
      <Container className="relative z-10">
        <h2 className="text-2xl font-bold mb-1">PROJECT MANAGER</h2>
        <p className="font-medium text-sm mb-11">Who Are We Looking For</p>
        <div className="flex gap-10 justify-between">
          <div className="font-bold text-sm">
            <div className="space-y-6">
              <ul className="space-y-3 text-sm">
                <h3>Who We Are Looking For</h3>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Highly organized professional with strong leadership and
                    communication skills
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Proven experience managing large-scale construction or real
                    estate development projects
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Ability to coordinate between engineers, contractors,
                    consultants, and government entities
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Strong understanding of project scheduling, budgeting, and
                    progress tracking
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Familiarity with Iraqi construction regulations, approvals,
                    and on-site safety standards
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Ability to work under pressure and make quick, well-informed
                    decisions
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Excellent problem-solving skills and strong attention to
                    detail
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Commitment to delivering high-quality projects within
                    deadlines
                  </span>
                </li>
              </ul>
              <ul className="space-y-3 text-sm">
                <h3>What You Will Be Doing</h3>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Overseeing the full project lifecycle from planning to
                    handover
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Monitoring construction progress and ensuring compliance
                    with approved designs
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Coordinating with engineering teams, contractors, suppliers,
                    and service providers
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Preparing project schedules, tracking milestones, and
                    reporting progress to management
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Reviewing technical drawings, BOQs, and engineering
                    documentation
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Ensuring compliance with safety standards, local
                    regulations, and development guidelines
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Managing budgets, controlling costs, and resolving on-site
                    challenges
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Conducting site visits to assess performance, progress, and
                    quality
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Leading project meetings and maintaining transparent
                    communication with stakeholders
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Ensuring timely completion and smooth delivery of each
                    project phase
                  </span>
                </li>
              </ul>
              <ul className="space-y-3 text-sm">
                <h3>Educational Requirement</h3>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Bachelor’s degree in Civil Engineering, Construction
                    Engineering, Architectural Engineering, or related field
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>Master’s degree or PMP certification is a plus</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Bonus: Familiarity with masterplanning, infrastructure
                    layout, and Iraqi government approval workflows
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Experience using AutoCAD, Primavera, or similar project
                    management tools
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Knowledge of procurement procedures and contractor
                    evaluation
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Ability to manage multiple development phases in parallel
                  </span>
                </li>
              </ul>
              <ul className="space-y-3 text-sm">
                <h3>What We Offer</h3>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    Competitive salary based on experience and qualifications
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>Annual performance review</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>Working hours: 8:00 AM – 5:00 PM</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>Working days: 5 days per week</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>Weekend: Friday & Saturday</span>
                </li>
              </ul>
            </div>
          </div>
          <Requirements />
        </div>
      </Container>
    </section>
  );
};
