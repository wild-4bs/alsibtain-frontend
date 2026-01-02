"use client";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getDirectionClass } from "@/lib/TextDirection";
import { useGetTestimonials } from "@/services/testimonials";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowUp, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const clientTestimonials = [
  {
    id: 1,
    name: {
      en: "Ali Kareem",
      ar: "علي كريم",
    },
    role: {
      en: "Homeowner - Karbala",
      ar: "مالك منزل - كربلاء",
    },
    image: "/clients/1.png",
    testimonial: {
      en: "Al-Subtain made the entire process smooth and professional. From choosing the unit to understanding the project details, their team supported us at every stage. Truly a trustworthy developer.",
      ar: "جعلت السبطين العملية بأكملها سلسة ومهنية. من اختيار الوحدة إلى فهم تفاصيل المشروع، دعمنا فريقهم في كل مرحلة. مطور جدير بالثقة حقاً.",
    },
    rating: 5,
    link: "#",
  },
  {
    id: 2,
    name: {
      en: "Hassan Al-Rubaie",
      ar: "حسن الربيعي",
    },
    role: {
      en: "Real Estate Investor",
      ar: "مستثمر عقاري",
    },
    image: "/clients/2.png",
    testimonial: {
      en: "Their projects are well-planned and built with long-term value in mind. Al-Subtain has become my preferred choice for reliable and safe real estate investments in Iraq.",
      ar: "مشاريعهم مخططة جيداً ومبنية مع مراعاة القيمة طويلة الأجل. أصبحت السبطين خياري المفضل للاستثمارات العقارية الموثوقة والآمنة في العراق.",
    },
    rating: 5,
    link: "#",
  },
  {
    id: 3,
    name: {
      en: "Hassan Al-Rubaie",
      ar: "حسن الربيعي",
    },
    role: {
      en: "Real Estate Investor",
      ar: "مستثمر عقاري",
    },
    image: "/clients/2.png",
    testimonial: {
      en: "Their projects are well-planned and built with long-term value in mind. Al-Subtain has become my preferred choice for reliable and safe real estate investments in Iraq.",
      ar: "مشاريعهم مخططة جيداً ومبنية مع مراعاة القيمة طويلة الأجل. أصبحت السبطين خياري المفضل للاستثمارات العقارية الموثوقة والآمنة في العراق.",
    },
    rating: 5,
    link: "#",
  },
];

const NAV_SIZE = 50;

export const Clients = () => {
  const title = useRef(null);
  const section = useRef(null);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const locale = useLocale() as "ar" | "en";
  const isRtl = locale === "ar";
  const { data } = useGetTestimonials({});

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
    };
  }, [api]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section.current, scrub: 1, end: "top 20%" },
    });
    const splitTitle = SplitText.create(title.current, {
      type: "words",
    });
    tl.from(splitTitle.words, {
      y: -100,
      opacity: 0,
      stagger: { amount: 0.3, from: "end" },
    });
  }, []);

  const t = useTranslations("partners.clients");

  const handlePrevClick = () => {
    if (isRtl) {
      api?.scrollNext();
    } else {
      api?.scrollPrev();
    }
  };

  const handleNextClick = () => {
    if (isRtl) {
      api?.scrollPrev();
    } else {
      api?.scrollNext();
    }
  };

  return (
    <section className="my-28" ref={section}>
      <Container>
        <h2
          className="text-6xl font-medium text-center mb-16 rtl:leading-[120%] max-sm:text-4xl px-4"
          ref={title}
          dangerouslySetInnerHTML={{ __html: t("title") }}
        ></h2>

        <div
          className="relative"
          style={{
            paddingLeft: NAV_SIZE,
            paddingRight: NAV_SIZE,
          }}
        >
          <button
            onClick={handlePrevClick}
            disabled={(!canScrollPrev && !isRtl) || (!canScrollNext && isRtl)}
            className="
              absolute left-0 top-1/2 -translate-y-1/2 z-10
              size-8 lg:size-9
              rounded-full border border-white/40
              flex items-center justify-center
              disabled:opacity-30 disabled:pointer-events-none
            "
          >
            <ChevronLeft className={`size-4 lg:size-5 `} />
          </button>
          <button
            onClick={handleNextClick}
            disabled={(!canScrollNext && !isRtl) || (!canScrollPrev && isRtl)}
            className="
              absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer
              size-9 rounded-full border border-white
              flex items-center justify-center
              disabled:opacity-30 disabled:pointer-events-none
            "
          >
            <ChevronRight className={`size-5 lg:size-7 `} />
          </button>

          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              slidesToScroll: 1,
              direction: isRtl ? "rtl" : "ltr",
            }}
          >
            <CarouselContent className="-ml-6">
              {data?.payload?.map((client) => (
                <CarouselItem
                  key={client._id}
                  className="pl-6 basis-1/2 max-md:basis-full"
                >
                  <div className="h-full bg-white/5 border border-white/20 rounded-3xl p-6 lg:p-8 flex flex-col backdrop-blur-2xl">
                    <header className="flex flex-col items-center justify-center">
                      <Image
                        src={client?.image?.url}
                        width={1000}
                        height={1000}
                        alt={client?.clientType}
                        className="size-16 rounded-full object-cover mb-7"
                      />
                      <h3 className="font-medium text-sm lg:text-base text-center mb-2">
                        {client.clientType}
                      </h3>
                      <span className="font-normal text-subtitle-color">
                        {client.location}
                      </span>
                    </header>
                    <p className="font-light text-subtitle-color text-center mt-8 flex-1 mb-5">
                      {client.testimonial}
                    </p>
                    <footer className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-2">
                        {Array.from({ length: client.stars }).map((_, i) => (
                          <Star
                            fill="gold"
                            className="text-transparent"
                            key={i}
                          />
                        ))}
                      </div>
                      <Button
                        variant={"ghost"}
                        className="hover:bg-primary/10 hover:text-white/90"
                      >
                        <ArrowUp className="rotate-45 size-6 rtl:-rotate-45" />
                      </Button>
                    </footer>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </Container>
    </section>
  );
};
