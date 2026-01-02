"use client";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useGetCategories, useGetCategoryById } from "@/services/categories";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Rubik } from "next/font/google";
import { useQueryState } from "nuqs";
import { useRef } from "react";

const jobCategories = [
  {
    id: 1,
    title: {
      en: "ENGINEERING & PLANNING",
      ar: "الهندسة والتخطيط",
    },
    openings: null,
  },
  {
    id: 2,
    title: {
      en: "PROJECT MANAGEMENT",
      ar: "إدارة المشاريع",
    },
    openings: 20,
  },
  {
    id: 3,
    title: {
      en: "REAL ESTATE & SALES",
      ar: "العقارات والمبيعات",
    },
    openings: null,
  },
  {
    id: 4,
    title: {
      en: "ADMINISTRATION & OPERATIONS",
      ar: "الإدارة والعمليات",
    },
    openings: null,
  },
  {
    id: 5,
    title: {
      en: "FINANCE & INVESTMENT",
      ar: "المالية والاستثمار",
    },
    openings: null,
  },
];

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jobs = [
  {
    id: 1,
    title: {
      en: "Wordpress Developer",
      ar: "مطور ووردبريس",
    },
    experience: {
      en: "2 Years",
      ar: "سنتان",
    },
    deadline: "2025-11-11",
  },
  {
    id: 2,
    title: {
      en: "Javascript",
      ar: "جافا سكريبت",
    },
    experience: {
      en: "1 Years",
      ar: "سنة واحدة",
    },
    deadline: "2025-11-11",
  },
  {
    id: 3,
    title: {
      en: "Apps Developer",
      ar: "مطور تطبيقات",
    },
    experience: {
      en: "3 Years",
      ar: "3 سنوات",
    },
    deadline: "2025-11-11",
  },
  {
    id: 4,
    title: {
      en: "IOS Developer",
      ar: "مطور IOS",
    },
    experience: {
      en: "2 Years",
      ar: "سنتان",
    },
    deadline: "2025-11-11",
  },
  {
    id: 5,
    title: {
      en: "Node JS Developer",
      ar: "مطور Node JS",
    },
    experience: {
      en: "3 Years",
      ar: "3 سنوات",
    },
    deadline: "2025-11-11",
  },
];

export const JobApplications = () => {
  const [activeCategory, setActiveCategory] = useQueryState("active-category");
  const tagline = useRef(null);
  const title = useRef(null);
  const caption = useRef(null);
  const section = useRef<HTMLElement>(null);
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("careers.jobs");
  const { data: categories } = useGetCategories({});
  const { data: cat } = useGetCategoryById(activeCategory || "first");

  useGSAP(() => {
    const splitTitle = SplitText.create(title.current, {
      type: locale === "ar" ? "words" : "words",
      smartWrap: true,
    });

    const splitCaption = SplitText.create(caption.current, {
      type: "words",
      smartWrap: true,
    });
    const splitTagline = SplitText.create(tagline.current, {
      type: "words",
      smartWrap: true,
    });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section.current, end: "top 80%" },
    });
    const jobsList = section.current?.querySelectorAll(
      ".careers-page-job-list"
    );
    if (!jobsList) return;
    tl.from(splitTitle.words, {
      y: -100,
      opacity: 0,
      stagger: {
        amount: 0.1,
        from: "random",
      },
    });
    tl.from(splitTagline.words, {
      opacity: 0,
      stagger: {
        amount: 0.2,
        from: "random",
      },
    });
    tl.from(splitCaption.words, {
      opacity: 0,
      stagger: {
        amount: 0.3,
        from: "random",
      },
    });

    tl.from(
      jobsList,
      {
        x: -100,
        opacity: 0,
        stagger: 0.1,
      },
      "<"
    );
  }, [locale]);

  return (
    <section className={`mt-22 ${rubik.className}`} id="jobs" ref={section}>
      <Container>
        <header className="text-center">
          <h2 className="mb-2 text-lg font-medium" ref={tagline}>
            {t("tagline")}
          </h2>
          <h3 className="mb-5 font-bold text-4xl" ref={title}>
            {t("title")}
          </h3>
          <p
            className="mb-11 text-sm"
            ref={caption}
            dangerouslySetInnerHTML={{ __html: t("caption") }}
          ></p>
        </header>
        <div className="flex gap-12 max-xl:flex-col">
          <ul className="lg:min-w-3xs">
            {categories?.categories?.map((category, i) => (
              <li key={i} className="careers-page-job-list">
                <button
                  onClick={() => setActiveCategory(category?._id)}
                  className={clsx(
                    "py-1.5 text-lg hover:text-white/70 duration-200 cursor-pointer font-medium",
                    {
                      "text-primary hover:text-primary!":
                        cat?._id == category?._id ||
                        (i == 0 && !activeCategory),
                    }
                  )}
                >
                  {category.name}{" "}
                  {category.totalJobs && <>({category.totalJobs})</>}
                </button>
              </li>
            ))}
          </ul>
          <ul className="w-full flex-1 flex flex-col gap-5">
            {cat?.jobs?.map((job, i) => (
              <Link
                href={`/careers/${job._id}`}
                key={i}
                className="careers-page-application-list py-6 bg-white px-8 flex rounded-sm items-center text-black hover:bg-white/95 duration-300 hover:[&>button]:text-black"
              >
                <div className="flex items-center w-full max-md:flex-col max-md:items-start gap-2">
                  <h3 className="font-medium text-xl md:w-[40%]">
                    {job.title}
                  </h3>
                  <dl className="flex items-center md:gap-28 max-md:gap-10">
                    <div className="flex flex-col gap-1">
                      <dt className="font-medium text-base text-subtitle-color">
                        {t("experience")}
                      </dt>
                      <dd className="font-medium text-lg">{job.experience}</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="font-medium text-base text-subtitle-color">
                        {t("deadline")}
                      </dt>
                      <dd className="font-medium text-lg">
                        {new Date(job.deadline).toLocaleDateString()}
                      </dd>
                    </div>
                  </dl>
                </div>
                <Button
                  variant={"ghost"}
                  className="text-subtitle-color duration-300 hover:bg-black/20"
                >
                  <ArrowRight className="size-5 rtl:rotate-180" />
                </Button>
              </Link>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};
