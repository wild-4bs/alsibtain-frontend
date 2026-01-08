"use client";

import Container from "@/components/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import MailIcon from "@/assets/icons/mail.svg";
import MapPin from "@/assets/icons/mapPin.svg";
import Instagram from "@/assets/social/instagram.svg";
import Linkedin from "@/assets/social/linkedin.svg";
import { BluryBall } from "@/components/ui/BluryBall";
import { Form } from "./Form";
import { useLocale } from "next-intl";
import { useGetPageContents } from "@/services/pages";
import { ContactPageContent } from "@/types/pages";
import { Link } from "@/i18n/routing";
import Facebook from "@/assets/social/facebook.svg";

export const ContactForm = () => {
  const { data } = useGetPageContents("contact");
  const sections = (data as ContactPageContent)?.sections;
  const locale = useLocale() as "ar" | "en";

  return (
    <section className="mt-16 relative">
      <BluryBall className="w-[100px] h-full left-0 z-0 animate-pulse" />

      <Container className="relative z-10 min-h-[80vh]">
        <div className="md:flex gap-28 mb-16">
          <div className="min-w-fit max-md:mb-3">
            <h2 className="mb-2 font-semibold text-5xl">
              {sections?.header?.title?.value[locale]}
            </h2>
            <h3 className="font-medium text-2xl">
              {sections?.header?.subtitle?.value[locale]}
            </h3>
          </div>

          <p className="font-light text-lg">
            {sections?.header?.caption?.value[locale]}
          </p>
        </div>

        <div className="lg:flex gap-12 ">
          <GlassCard className="max-lg:mb-10 md:min-w-sm">
            <header>
              <h2 className="font-bold text-4xl mb-4">
                {sections?.contactInformation?.headline?.value[locale]}
              </h2>

              <div
                className="font-normal text-sm text-subtitle-color mb-2"
                dangerouslySetInnerHTML={{
                  __html: sections?.contactInformation?.caption?.value[locale],
                }}
              ></div>
            </header>

            <ul className="text-lg font-bold mt-11">
              <li className="flex items-center gap-2 mb-2">
                <MailIcon />
                <span>{sections?.contactInformation?.email}</span>
              </li>

              <li className="flex items-center gap-2 mb-4">
                <MapPin />
                <span>
                  {sections?.contactInformation?.location?.value[locale]}
                </span>
              </li>

              <li className="flex items-center gap-2">
                {(data as ContactPageContent)?.sections?.footer?.headOffice
                  ?.instagram && (
                  <li>
                    <Link
                      href={
                        (data as ContactPageContent)?.sections?.footer
                          ?.headOffice?.instagram
                      }
                      target="_blank"
                    >
                      <Instagram />
                    </Link>
                  </li>
                )}
                {(data as ContactPageContent)?.sections?.footer?.headOffice
                  ?.facebook && (
                  <Link
                    href={
                      (data as ContactPageContent)?.sections?.footer?.headOffice
                        ?.facebook
                    }
                    target="_blank"
                  >
                    <Facebook />
                  </Link>
                )}
              </li>
            </ul>
          </GlassCard>

          <Form />
        </div>
      </Container>

      <div className="relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d419.88721980615725!2d43.9492952!3d32.6568426!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1559690067817da7%3A0x7a4f159b556aa65!2z2LTYsdmD2Kkg2KfZhNiz2KjYt9mK2YYg2YTZhNmF2YLYp9mI2YTYp9iqINin2YTYudin2YXYqSDYp9mE2YXYrdiv2YjYr9ipIC0g2YXYr9mK2YbYqSDYp9mE2LPZhNin2YUg"
          width="90%"
          height="649px"
          allowFullScreen
          loading="lazy"
          className="mx-auto rounded-2xl mt-20 relative z-10"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <BluryBall className="w-full h-1/3 top-0 animate-pulse" />
      </div>
    </section>
  );
};
