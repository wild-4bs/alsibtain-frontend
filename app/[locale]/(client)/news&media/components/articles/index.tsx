"use client";
import Container from "@/components/Container";
import { Article } from "./Article";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useLocale, useTranslations } from "next-intl";

const articlesData = [
  {
    id: 1,
    image: "/articles/1.jpg",
    title: {
      en: "Connectivity: The Future of 5G Technology",
      ar: "الاتصال: مستقبل تقنية الجيل الخامس",
    },
    createdBy: {
      en: "CATE JONES",
      ar: "كيت جونز",
    },
    date: {
      en: "TODAY",
      ar: "اليوم",
    },
  },
  {
    id: 2,
    image: "/articles/2.jpg",
    title: {
      en: "Cybersecurity Trends: Protecting Your Data in 2024",
      ar: "اتجاهات الأمن السيبراني: حماية بياناتك في 2024",
    },
    createdBy: {
      en: "STAN BEE",
      ar: "ستان بي",
    },
    date: {
      en: "TODAY",
      ar: "اليوم",
    },
  },
  {
    id: 3,
    image: "/articles/3.jpg",
    title: {
      en: "Startups to Watch: The Next Big Names in Tech",
      ar: "الشركات الناشئة التي يجب مراقبتها: الأسماء الكبيرة القادمة في التكنولوجيا",
    },
    createdBy: {
      en: "LIAM TAY",
      ar: "ليام تاي",
    },
    date: {
      en: "YESTERDAY",
      ar: "أمس",
    },
  },
  {
    id: 4,
    image: "/articles/4.jpg",
    title: {
      en: "Virtual Reality: Beyond Gaming and Into Everyday Life",
      ar: "الواقع الافتراضي: ما وراء الألعاب إلى الحياة اليومية",
    },
    createdBy: {
      en: "MOON STOLE",
      ar: "مون ستول",
    },
    date: {
      en: "YESTERDAY",
      ar: "أمس",
    },
  },
];

const featuredArticle = {
  image: "/articles/1.jpg",
  title: {
    en: "Revolutionizing Connectivity: The Future of 5G Technology",
    ar: "ثورة الاتصال: مستقبل تقنية الجيل الخامس",
  },
  description: {
    en: "Revolutionizing connectivity, the future of 5G technology promises unprecedented speeds, ultra-low latency, and the seamless integration of smart devices, transforming industries and daily life in ways previously unimaginable.",
    ar: "ثورة الاتصال، مستقبل تقنية الجيل الخامس يعد بسرعات غير مسبوقة وزمن استجابة منخفض للغاية والتكامل السلس للأجهزة الذكية، مما يحول الصناعات والحياة اليومية بطرق لم تكن متخيلة من قبل.",
  },
};

export const Articles = () => {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("common");

  return (
    <section className="mt-16 relative z-10">
      <Container className="flex gap-14 justify-between max-xl:flex-col-reverse max-lg:justify-start">
        <div>
          <h2 className="mb-6 font-black text-3xl">{t("tech")}</h2>
          <div className="flex flex-col gap-5">
            {articlesData.map((article) => (
              <Article
                key={article.id}
                image={article.image}
                title={article.title[locale]}
                createdBy={article.createdBy[locale]}
                date={article.date[locale]}
              />
            ))}
          </div>
          <Button className="mt-4 font-black" variant={"ghost"}>
            {t("seeMore")} +
          </Button>
        </div>
        <div className="w-[90%] relative overflow-hidden rounded-4xl px-3 py-4 flex items-end max-h-[600px] max-xl:h-[600px] max-xl:w-full">
          <Image
            src={featuredArticle.image}
            alt="article"
            width={1000}
            height={1000}
            className="object-cover absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
          />
          <div className="relative z-10">
            <Badge
              className="mb-2 font-bold text-xs px-2 py-1"
              variant={"secondary"}
            >
              {t("tech")}
            </Badge>
            <h3 className="font-black text-4xl mb-2 max-sm:text-3xl">
              {featuredArticle.title[locale]}
            </h3>
            <p className="font-medium max-sm:text-sm">
              {featuredArticle.description[locale]}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
