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

export const Requirements = () => {
  return (
    <div className="px-8 py-11 border border-white rounded-3xl space-y-10 h-fit">
      <div className="flex justify-center">
        <Link href={"/careers/id/apply"}>
          <Button className="h-[52px] w-[180px] bg-[#19499F] hover:bg-[#163e87]">
            Apply Now
          </Button>
        </Link>
      </div>
      <div className="space-y-8 text-white">
        <h2 className="font-bold text-lg">Job Summary</h2>

        <ul className="space-y-7 text-lg font-normal">
          <li className="flex items-start gap-4">
            <MapPin className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>Location</dt>
              <dd>Shouth Breeze Center, Banani11</dd>
            </dl>
          </li>
          <li className="flex items-start gap-4">
            <Briefcase className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>Job Type</dt>
              <dd>Full Time</dd>
            </dl>
          </li>
          <li className="flex items-start gap-4">
            <Calendar className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>Date posted</dt>
              <dd>Posted 1 month ago</dd>
            </dl>
          </li>
          <li className="flex items-start gap-4">
            <BookOpen className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>Experience</dt>
              <dd>1–3 Years</dd>
            </dl>
          </li>
          <li className="flex items-start gap-4">
            <Clock className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>Working Hours</dt>
              <dd>9 AM – 6 PM</dd>
            </dl>
          </li>
          <li className="flex items-start gap-4">
            <CalendarDays className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>Working Days</dt>
              <dd>Weekly: 5 Days</dd>
              <dd>Weekend: Saturday, Sunday</dd>
            </dl>
          </li>
          <li className="flex items-start gap-4">
            <Armchair className="size-10 shrink-0" strokeWidth={2} />
            <dl>
              <dt>Vacancy</dt>
              <dd>No. of Vacancy: 3</dd>
            </dl>
          </li>
        </ul>
      </div>
      <div>
        <Link
          href="/careers"
          className="text-white underline underline-offset-4 text-sm"
        >
          View all job
        </Link>
      </div>
    </div>
  );
};
