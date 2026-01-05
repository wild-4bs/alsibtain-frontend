"use client";
import FooterLogo from "@/assets/footerLogo.svg";
import Container from "./Container";
import { navLinks } from "./Header";
import { Link } from "@/i18n/routing";
import Facebook from "@/assets/social/facebook.svg";
import Instagram from "@/assets/social/instagram.svg";
import Whatsapp from "@/assets/social/whatsapp.svg";
import Youtube from "@/assets/social/youtube.svg";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useGetPageContents } from "@/services/pages";
import { ContactPageContent } from "@/types/pages";
import { useGetProjects } from "@/services/projects";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const Footer = () => {
  const { data } = useGetPageContents("contact");
  const tLinks = useTranslations("header");
  const t = useTranslations("footer");
  const locale = useLocale() as "ar" | "en";
  const { data: projects } = useGetProjects({});

  return (
    <footer
      className={cn(
        "mt-20 border-b-0 border border-[#FFFFFF3B] rounded-t-[8rem] mx-3 lg:mx-12 pt-12 pb-5 relative z-20 bg-[linear-gradient(to_bottom,#1b1b1b,#000)]",
        locale == "en" && poppins.className
      )}
    >
      <Container className="grid grid-cols-4 gap-12 mb-12 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:text-center">
        <div className="logo leading-5">
          <Link href={"/"}>
            <FooterLogo className="mb-6 max-sm:mx-auto" />
          </Link>
          <h2 className="font-medium mb-2">
            {
              (data as ContactPageContent)?.sections?.footer?.headline?.value[
                locale
              ]
            }
          </h2>
          <p>
            {
              (data as ContactPageContent)?.sections?.footer?.caption?.value[
                locale
              ]
            }
          </p>
        </div>
        <ul className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">{t("quickLinks.title")}</h3>
          {navLinks.map((link, i) => (
            <li key={i}>
              <Link
                href={link.path}
                className="font-medium text-[0.9rem] leading-5"
              >
                {tLinks(link.name)}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">{t("projects.title")}</h3>
          {projects?.map((project, i) => (
            <li className="font-medium leading-5" key={i}>
              {project?.name[locale]}
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-0.5">
          <h3 className="font-medium text-xl mb-2">
            {t("headquarters.title")}
          </h3>
          <li className="font-medium leading-5">
            {
              (data as ContactPageContent)?.sections?.footer?.headOffice
                ?.address?.value[locale]
            }
          </li>
          <li className="font-light text-base leading-6" dir="ltr">
            {
              (data as ContactPageContent)?.sections?.footer?.headOffice
                ?.phoneNumber
            }
          </li>
          <li className="font-light text-base leading-6">
            {(data as ContactPageContent)?.sections?.footer?.headOffice?.email}
          </li>
          <li className="font-light text-base leading-6 mb-3">
            <Link
              className="hover:underline"
              href={
                (data as ContactPageContent)?.sections?.footer?.headOffice
                  ?.website
              }
              target="_blank"
            >
              {
                (data as ContactPageContent)?.sections?.footer?.headOffice
                  ?.website
              }
            </Link>
          </li>
          <ul>
            <h4 className="font-medium text-sm mb-2">{t("social.title")}</h4>
            <div className="flex gap-2 items-center max-sm:justify-center">
              {(data as ContactPageContent)?.sections?.footer?.headOffice
                ?.facebook && (
                <li>
                  <Link
                    href={
                      (data as ContactPageContent)?.sections?.footer?.headOffice
                        ?.facebook
                    }
                    target="_blank"
                  >
                    <Facebook />
                  </Link>
                </li>
              )}
              {(data as ContactPageContent)?.sections?.footer?.headOffice
                ?.instagram && (
                <li>
                  <Link
                    href={
                      (data as ContactPageContent)?.sections?.footer?.headOffice
                        ?.instagram
                    }
                    target="_blank"
                  >
                    <Instagram />
                  </Link>
                </li>
              )}
              {(data as ContactPageContent)?.sections?.footer?.headOffice
                ?.whatsapp && (
                <li>
                  <Link
                    href={
                      (data as ContactPageContent)?.sections?.footer?.headOffice
                        ?.whatsapp
                    }
                    target="_blank"
                  >
                    <Whatsapp />
                  </Link>
                </li>
              )}
              {(data as ContactPageContent)?.sections?.footer?.headOffice
                ?.youtube && (
                <li>
                  <Link
                    href={
                      (data as ContactPageContent)?.sections?.footer?.headOffice
                        ?.youtube
                    }
                    target="_blank"
                  >
                    <Youtube />
                  </Link>
                </li>
              )}
            </div>
          </ul>
        </ul>
      </Container>
      <p className="text-center text-sm font-light">
        <span className="font-medium">{t("copyright.year")}</span>{" "}
        {t("copyright.text")}
      </p>
      <p className="text-center font-light text-sm">
        {t("developer.text")}{" "}
        <Link
          href={"https://malamih.net"}
          className="font-medium hover:underline"
        >
          {t("developer.company")}
        </Link>
      </p>
    </footer>
  );
};
