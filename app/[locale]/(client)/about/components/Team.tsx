"use client";
import Container from "@/components/Container";
import { useGetEmployees } from "@/services/employees";
import { AboutPageContent } from "@/types/pages";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";

export const teamMembers = [
  {
    id: 1,
    name: {
      en: "Abdulsattar",
      ar: "عبد الستار",
    },
    role: {
      en: "Founder",
      ar: "المؤسس",
    },
    image: "/team/1.png",
  },
  {
    id: 2,
    name: {
      en: "Abdulsattar",
      ar: "عبد الستار",
    },
    role: {
      en: "Chief Real Estate Officer",
      ar: "مدير العقارات الرئيسي",
    },
    image: "/team/2.png",
  },
  {
    id: 3,
    name: {
      en: "Abdulsattar",
      ar: "عبد الستار",
    },
    role: {
      en: "Head of Property",
      ar: "رئيس الممتلكات",
    },
    image: "/team/3.png",
  },
  {
    id: 4,
    name: {
      en: "Abdulsattar",
      ar: "عبد الستار",
    },
    role: {
      en: "Legal Counsel",
      ar: "المستشار القانوني",
    },
    image: "/team/4.png",
  },
];

export const Team = ({
  data,
}: {
  data: AboutPageContent["sections"]["team"];
}) => {
  const section = useRef<HTMLElement>(null);
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("about.team");
  const { data: teamRes } = useGetEmployees();

  useGSAP(() => {
    const teamMembers = section?.current?.querySelectorAll(
      ".about-page-team-member"
    );
    if (!teamMembers) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        scrub: true,
        end: "top 20%",
      },
    });
    tl.from(teamMembers, {
      y: "-100%",
      opacity: 0,
      stagger: {
        amount: 0.3,
        from: "random",
      },
    });
  }, []);

  return (
    <section className="mb-32" ref={section}>
      <Container>
        <header className="leading-[150%] mb-8">
          <h2 className="mb-1 font-semibold text-4xl">
            {data?.headline?.value[locale]}
          </h2>
          <p className="text-subtitle-color font-semibold text-lg">
            {data?.subheadline?.value[locale]}
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {teamRes?.payload.map((member, i) => (
            <article
              key={i}
              className="p-6 border border-input/60 rounded-xl text-center about-page-team-member"
            >
              <Image
                src={member.image.url}
                alt={member.name}
                width={1000}
                height={1000}
                className="w-[235px] h-[253px] object-cover object-center rounded-xl mx-auto mb-12"
              />
              <h3 className="font-semibold text-2xl leading-6 mb-2">
                {member.name}
              </h3>
              <h4 className="font-medium text-lg leading-6 text-subtitle-color">
                {member.position}
              </h4>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
