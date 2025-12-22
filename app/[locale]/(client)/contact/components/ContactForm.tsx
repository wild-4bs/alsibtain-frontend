"use client";

import Container from "@/components/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import MailIcon from "@/assets/icons/mail.svg";
import MapPin from "@/assets/icons/mapPin.svg";
import Instagram from "@/assets/social/instagram.svg";
import Linkedin from "@/assets/social/linkedin.svg";
import { BluryBall } from "@/components/ui/BluryBall";
import { Form } from "./Form";
import { useTranslations } from "next-intl";

export const ContactForm = () => {
  const t = useTranslations("contact");

  return (
    <section className="mt-16 relative">
      <BluryBall className="w-[1377px] h-full left-0 z-0" />

      <Container className="relative z-10 min-h-[80vh]">
        <div className="md:flex gap-28 mb-16">
          <div className="min-w-fit max-md:mb-3">
            <h2 className="mb-2 font-semibold text-5xl">
              {t("title")}
            </h2>
            <h3 className="font-medium text-2xl">
              {t("subTitle")}
            </h3>
          </div>

          <p className="font-light text-lg">
            {t("caption")}
          </p>
        </div>

        <div className="lg:flex gap-12">
          <GlassCard className="max-lg:mb-10">
            <header>
              <h2 className="font-bold text-4xl mb-4">
                {t("contactInfo.title")}
              </h2>

              <p className="font-normal text-sm text-subtitle-color mb-2">
                {t("contactInfo.caption1")}
              </p>

              <p className="font-normal text-sm text-subtitle-color">
                {t("contactInfo.caption2")}
              </p>
            </header>

            <ul className="text-lg font-bold mt-11">
              <li className="flex items-center gap-2 mb-2">
                <MailIcon />
                <span>info@alsibtain.com</span>
              </li>

              <li className="flex items-center gap-2 mb-4">
                <MapPin />
                <span>Iraq, Karbala</span>
              </li>

              <li className="flex items-center gap-2">
                <Instagram />
                <Linkedin />
              </li>
            </ul>
          </GlassCard>

          <Form />
        </div>
      </Container>

      <div className="relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53775.200638225324!2d44.011532149999994!3d32.60751485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15596be147b8cdc9%3A0xf6c5daaaaea111f0!2sKarbala%2C%20Karbala%20Governorate%2C%2056001!5e0!3m2!1sen!2siq!4v1765720754035!5m2!1sen!2siq"
          width="90%"
          height="649px"
          allowFullScreen
          loading="lazy"
          className="mx-auto rounded-2xl mt-20 relative z-10"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <BluryBall className="w-full h-1/2 top-0" />
      </div>
    </section>
  );
};
