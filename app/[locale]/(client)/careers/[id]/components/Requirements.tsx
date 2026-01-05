import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { timeAgo } from "@/lib/date";
import { Job } from "@/services/jobs";
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
import { useParams } from "next/navigation";

export const Requirements = ({ data }: { data?: Job }) => {
  const t = useTranslations("careers.singleCareer");
  const locale = useLocale() as "ar" | "en";
  const { id } = useParams();

  return (
    <div className="px-8 py-11 border border-white rounded-3xl space-y-10 h-fit md:min-w-xs">
      <div className="flex justify-center">
        <Link href={`/careers/${id}/apply`}>
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
              <dt>
                {t("location") || { ar: "الموقع", en: "Location" }[locale]}
              </dt>
              <dd>{data?.location?.[locale]}</dd>
            </dl>
          </li>

          <li className="flex items-start gap-4">
            <Briefcase className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>
                {t("jobType") || { ar: "نوع الوظيفة", en: "Job Type" }[locale]}
              </dt>
              <dd>{data?.jobType?.[locale]}</dd>
            </dl>
          </li>

          <li className="flex items-start gap-4">
            <Calendar className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>
                {t("datePosted") ||
                  { ar: "تاريخ النشر", en: "Date Posted" }[locale]}
              </dt>
              <dd>{timeAgo(data?.createdAt as string, locale)}</dd>
            </dl>
          </li>

          <li className="flex items-start gap-4">
            <BookOpen className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>
                {t("experience") || { ar: "الخبرة", en: "Experience" }[locale]}
              </dt>
              <dd>{data?.experience?.[locale]}</dd>
            </dl>
          </li>

          <li className="flex items-start gap-4">
            <Clock className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>
                {t("workingHours") ||
                  { ar: "ساعات العمل", en: "Working Hours" }[locale]}
              </dt>
              <dd>{data?.workingHours?.[locale]}</dd>
            </dl>
          </li>

          <li className="flex items-start gap-4">
            <CalendarDays className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>
                {t("workingDays") ||
                  { ar: "أيام العمل", en: "Working Days" }[locale]}
              </dt>
              <dd>{data?.workingDays?.[locale]}</dd>
            </dl>
          </li>

          <li className="flex items-start gap-4">
            <Armchair className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>
                {t("vacancy") ||
                  { ar: "الوظائف الشاغرة", en: "Vacancy" }[locale]}
              </dt>
              <dd>No.of Vacancy: {data?.vacancy}</dd>
            </dl>
          </li>
        </ul>
      </div>

      <div>
        <Link
          href="/careers"
          className="text-white underline underline-offset-4 text-sm"
        >
          {t("viewAllJobs") ||
            { ar: "عرض كل الوظائف", en: "View all Jobs" }[locale]}
        </Link>
      </div>
    </div>
  );
};
