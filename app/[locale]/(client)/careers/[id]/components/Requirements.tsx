import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import {
  MapPin,
  Briefcase,
  Calendar,
  BookOpen,
  Clock,
  CalendarDays,
  Armchair,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export const Requirements = () => {
  const t = useTranslations("careers.singleCareer");
  const locale = useLocale() as "ar" | "en";

  return (
    <div className="px-8 py-11 border border-white rounded-3xl space-y-10 h-fit">
      <div className="flex justify-center">
        <Link href={"/careers/id/apply"}>
          <Button className="h-[52px] w-[180px] bg-[#19499F] hover:bg-[#163e87]">
            {t("applyNow") || { ar: "قدم الآن", en: "Apply Now" }[locale]}
          </Button>
        </Link>
      </div>

      <div className="space-y-8 text-white">
        <h2 className="font-bold text-lg">
          {t("jobSummary") || { ar: "ملخص الوظيفة", en: "Job Summary" }[locale]}
        </h2>

        <ul className="space-y-7 text-lg font-normal">
          <li className="flex items-start gap-4">
            <MapPin className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>{t("location") || { ar: "الموقع", en: "Location" }[locale]}</dt>
              <dd>
                {{
                  ar: "مركز ساوث بريز، باناني11",
                  en: "Shouth Breeze Center, Banani11",
                }[locale]}
              </dd>
            </dl>
          </li>

          <li className="flex items-start gap-4">
            <Briefcase className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>{t("jobType") || { ar: "نوع الوظيفة", en: "Job Type" }[locale]}</dt>
              <dd>{{ ar: "دوام كامل", en: "Full Time" }[locale]}</dd>
            </dl>
          </li>

          <li className="flex items-start gap-4">
            <Calendar className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>{t("datePosted") || { ar: "تاريخ النشر", en: "Date Posted" }[locale]}</dt>
              <dd>{{ ar: "منذ شهر", en: "Posted 1 month ago" }[locale]}</dd>
            </dl>
          </li>

          <li className="flex items-start gap-4">
            <BookOpen className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>{t("experience") || { ar: "الخبرة", en: "Experience" }[locale]}</dt>
              <dd>{{ ar: "1–3 سنوات", en: "1–3 Years" }[locale]}</dd>
            </dl>
          </li>

          <li className="flex items-start gap-4">
            <Clock className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>{t("workingHours") || { ar: "ساعات العمل", en: "Working Hours" }[locale]}</dt>
              <dd>{{ ar: "9 ص – 6 م", en: "9 AM – 6 PM" }[locale]}</dd>
            </dl>
          </li>

          <li className="flex items-start gap-4">
            <CalendarDays className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>{t("workingDays") || { ar: "أيام العمل", en: "Working Days" }[locale]}</dt>
              <dd>{{ ar: "أسبوعياً: 5 أيام", en: "Weekly: 5 Days" }[locale]}</dd>
              <dd>{{ ar: "عطلة نهاية الأسبوع: الجمعة والسبت", en: "Weekend: Saturday, Sunday" }[locale]}</dd>
            </dl>
          </li>

          <li className="flex items-start gap-4">
            <Armchair className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>{t("vacancy") || { ar: "الوظائف الشاغرة", en: "Vacancy" }[locale]}</dt>
              <dd>{{ ar: "عدد الوظائف: 3", en: "No. of Vacancy: 3" }[locale]}</dd>
            </dl>
          </li>
        </ul>
      </div>

      <div>
        <Link
          href="/careers"
          className="text-white underline underline-offset-4 text-sm"
        >
          {t("viewAllJobs") || { ar: "عرض كل الوظائف", en: "View all Jobs" }[locale]}
        </Link>
      </div>
    </div>
  );
};
