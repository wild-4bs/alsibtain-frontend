"use client";
import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { Requirements } from "./Requirements";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export const ApplicationDetails = ({
  className,
}: ComponentProps<"section">) => {
  const t = useTranslations("careers.singleCareer");
  const locale = useLocale() as "ar" | "en";

  return (
    <section className={cn("relative", className)}>
      <BluryBall className="h-full left-0 w-[599px]" />
      <Container className="relative z-10">
        <h2 className="text-2xl font-bold mb-1">
          {t("title") ||
            {
              ar: "مسارك الوظيفي. علامتنا القادمة.",
              en: "Your Career. Our Next Landmark.",
            }[locale]}
        </h2>

        <p className="font-medium text-sm mb-11">
          {t("whoAreWeLookingFor") ||
            { ar: "من نبحث عنه", en: "Who Are We Looking For" }[locale]}
        </p>

        <div className="lg:flex gap-10 lg:justify-between">
          <div className="font-bold text-sm max-lg:mb-10">
            <div className="space-y-6">
              {/* Who Are We Looking For */}
              <ul className="space-y-3 text-sm">
                <h3>
                  {t("whoAreWeLookingFor") ||
                    { ar: "من نبحث عنه", en: "Who Are We Looking For" }[locale]}
                </h3>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "محترف منظم مع مهارات قوية في القيادة والتواصل",
                        en: "Highly organized professional with strong leadership and communication skills",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "خبرة مثبتة في إدارة مشاريع البناء أو تطوير العقارات واسعة النطاق",
                        en: "Proven experience managing large-scale construction or real estate development projects",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "القدرة على التنسيق بين المهندسين والمقاولين والاستشاريين والجهات الحكومية",
                        en: "Ability to coordinate between engineers, contractors, consultants, and government entities",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "فهم قوي لجدولة المشروع، الميزانية، ومتابعة التقدم",
                        en: "Strong understanding of project scheduling, budgeting, and progress tracking",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "الإلمام باللوائح العراقية للبناء والموافقات ومعايير السلامة في الموقع",
                        en: "Familiarity with Iraqi construction regulations, approvals, and on-site safety standards",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "القدرة على العمل تحت الضغط واتخاذ قرارات سريعة ومدروسة",
                        en: "Ability to work under pressure and make quick, well-informed decisions",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "مهارات ممتازة لحل المشكلات واهتمام بالتفاصيل",
                        en: "Excellent problem-solving skills and strong attention to detail",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "الالتزام بتسليم المشاريع عالية الجودة ضمن المواعيد النهائية",
                        en: "Commitment to delivering high-quality projects within deadlines",
                      }[locale]
                    }
                  </span>
                </li>
              </ul>

              {/* What You Will Be Doing */}
              <ul className="space-y-3 text-sm">
                <h3>
                  {t("whatYouWillBeDoing") ||
                    { ar: "ما الذي ستقوم به", en: "What You Will Be Doing" }[
                      locale
                    ]}
                </h3>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "الإشراف على دورة حياة المشروع بالكامل من التخطيط حتى التسليم",
                        en: "Overseeing the full project lifecycle from planning to handover",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "مراقبة تقدم البناء وضمان الالتزام بالتصاميم المعتمدة",
                        en: "Monitoring construction progress and ensuring compliance with approved designs",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "التنسيق مع فرق الهندسة والمقاولين والموردين ومقدمي الخدمات",
                        en: "Coordinating with engineering teams, contractors, suppliers, and service providers",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "إعداد جداول المشروع، متابعة الإنجازات، وتقديم تقارير التقدم للإدارة",
                        en: "Preparing project schedules, tracking milestones, and reporting progress to management",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "مراجعة الرسومات الفنية وكميات الأعمال والوثائق الهندسية",
                        en: "Reviewing technical drawings, BOQs, and engineering documentation",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "ضمان الالتزام بمعايير السلامة واللوائح المحلية وإرشادات التطوير",
                        en: "Ensuring compliance with safety standards, local regulations, and development guidelines",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "إدارة الميزانيات، التحكم بالتكاليف وحل التحديات في الموقع",
                        en: "Managing budgets, controlling costs, and resolving on-site challenges",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "زيارة المواقع لتقييم الأداء والتقدم والجودة",
                        en: "Conducting site visits to assess performance, progress, and quality",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "قيادة اجتماعات المشروع والحفاظ على التواصل الشفاف مع أصحاب المصلحة",
                        en: "Leading project meetings and maintaining transparent communication with stakeholders",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "ضمان إتمام كل مرحلة من المشروع في الوقت المناسب وتسليم سلس",
                        en: "Ensuring timely completion and smooth delivery of each project phase",
                      }[locale]
                    }
                  </span>
                </li>
              </ul>

              {/* Educational Requirement */}
              <ul className="space-y-3 text-sm">
                <h3>
                  {t("educationalRequirement") ||
                    {
                      ar: "المتطلبات التعليمية",
                      en: "Educational Requirement",
                    }[locale]}
                </h3>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "درجة البكالوريوس في الهندسة المدنية، الهندسة الإنشائية، الهندسة المعمارية، أو مجال ذي صلة",
                        en: "Bachelor’s degree in Civil Engineering, Construction Engineering, Architectural Engineering, or related field",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "درجة الماجستير أو شهادة PMP ميزة إضافية",
                        en: "Master’s degree or PMP certification is a plus",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "ميزة: الإلمام بالتخطيط الرئيسي وتوزيع البنية التحتية وموافقات الحكومة العراقية",
                        en: "Bonus: Familiarity with masterplanning, infrastructure layout, and Iraqi government approval workflows",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "الخبرة في استخدام AutoCAD، Primavera أو أدوات إدارة المشاريع المماثلة",
                        en: "Experience using AutoCAD, Primavera, or similar project management tools",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "معرفة بإجراءات المشتريات وتقييم المقاولين",
                        en: "Knowledge of procurement procedures and contractor evaluation",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "القدرة على إدارة مراحل متعددة من التطوير بالتوازي",
                        en: "Ability to manage multiple development phases in parallel",
                      }[locale]
                    }
                  </span>
                </li>
              </ul>

              {/* What We Offer */}
              <ul className="space-y-3 text-sm">
                <h3>
                  {t("whatWeOffer") ||
                    { ar: "ما الذي نقدمه", en: "What We Offer" }[locale]}
                </h3>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "راتب تنافسي بناءً على الخبرة والمؤهلات",
                        en: "Competitive salary based on experience and qualifications",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "مراجعة الأداء السنوية",
                        en: "Annual performance review",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "ساعات العمل: 8:00 صباحاً – 5:00 مساءً",
                        en: "Working hours: 8:00 AM – 5:00 PM",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "أيام العمل: 5 أيام في الأسبوع",
                        en: "Working days: 5 days per week",
                      }[locale]
                    }
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    {
                      {
                        ar: "عطلة نهاية الأسبوع: الجمعة والسبت",
                        en: "Weekend: Friday & Saturday",
                      }[locale]
                    }
                  </span>
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
