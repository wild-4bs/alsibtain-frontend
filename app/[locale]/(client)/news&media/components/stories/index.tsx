"use client";
import Container from "@/components/Container";
import { Story } from "./Story";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { useGetUpdates } from "@/services/projects-updates";
import { timeAgo } from "@/lib/date";
import { useQueryState } from "nuqs";

const storiesData = [
  {
    id: 1,
    image: "/stories/1.jpg",
    title: {
      en: "Life-Changing Moments: Personal Narratives that Inspire",
      ar: "لحظات تغير الحياة: روايات شخصية ملهمة",
    },
    author: {
      en: "JANE MAY",
      ar: "جين ماي",
    },
    date: {
      en: "TODAY",
      ar: "اليوم",
    },
  },
  {
    id: 2,
    image: "/stories/2.jpg",
    title: {
      en: "Overcoming Adversity: Inspiring Tales of Resilience",
      ar: "التغلب على الشدائد: قصص ملهمة عن المرونة",
    },
    author: {
      en: "TAYLOR STONE",
      ar: "تايلور ستون",
    },
    date: {
      en: "TODAY",
      ar: "اليوم",
    },
  },
  {
    id: 3,
    image: "/stories/3.jpg",
    title: {
      en: "Cultural Chronicles: Traditions and Tales from Around the World",
      ar: "سجلات ثقافية: تقاليد وقصص من حول العالم",
    },
    author: {
      en: "LILLY LANE",
      ar: "ليلي لين",
    },
    date: {
      en: "TODAY",
      ar: "اليوم",
    },
  },
  {
    id: 4,
    image: "/stories/4.jpg",
    title: {
      en: "Unheard Voices: Stories from Remote Communities",
      ar: "أصوات غير مسموعة: قصص من المجتمعات النائية",
    },
    author: {
      en: "JANE MAY",
      ar: "جين ماي",
    },
    date: {
      en: "TODAY",
      ar: "اليوم",
    },
  },
  {
    id: 5,
    image: "/stories/5.jpg",
    title: {
      en: "Unexpected Heroes: Ordinary People Doing Extraordinary Things",
      ar: "أبطال غير متوقعين: أشخاص عاديون يفعلون أشياء استثنائية",
    },
    author: {
      en: "TAYLOR STONE",
      ar: "تايلور ستون",
    },
    date: {
      en: "TODAY",
      ar: "اليوم",
    },
  },
  {
    id: 6,
    image: "/stories/6.jpg",
    title: {
      en: "Urban Legends: Exploring the Myths and Mysteries of Cities",
      ar: "أساطير حضرية: استكشاف خرافات وأسرار المدن",
    },
    author: {
      en: "JANE MAY",
      ar: "جين ماي",
    },
    date: {
      en: "YESTERDAY",
      ar: "أمس",
    },
  },
  {
    id: 7,
    image: "/stories/7.jpg",
    title: {
      en: "Innovative Minds: Stories of Creativity and Invention",
      ar: "عقول مبتكرة: قصص الإبداع والاختراع",
    },
    author: {
      en: "TAYLOR STONE",
      ar: "تايلور ستون",
    },
    date: {
      en: "YESTERDAY",
      ar: "أمس",
    },
  },
  {
    id: 8,
    image: "/stories/8.jpg",
    title: {
      en: "The Human Connection: Heartwarming Stories that Unite Us",
      ar: "الرابطة الإنسانية: قصص دافئة توحدنا",
    },
    author: {
      en: "JANE MAY",
      ar: "جين ماي",
    },
    date: {
      en: "YESTERDAY",
      ar: "أمس",
    },
  },
];

export const Stories = () => {
  const [activeUpdates, setActiveUpdates] = useQueryState("active-updates");
  const t = useTranslations("common");
  const { data } = useGetUpdates({});

  return (
    <section className="mt-28">
      <Container>
        <h2 className="font-black text-3xl mb-6">{t("stories")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {data?.payload?.map((story) => (
            <Story
              key={story._id}
              image={story.thumbnail?.url}
              title={story.title}
              createdBy={story.writtenBy}
              date={timeAgo(story.createdAt)}
              active={activeUpdates == story?._id}
              onClick={() => {
                setActiveUpdates(story?._id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          ))}
        </div>
        {/* <Button className="mt-6 text-lg font-black" variant={"ghost"}>
          {t("seeMore")} +
        </Button> */}
      </Container>
    </section>
  );
};
