"use client";
import Logo from "@/assets/logo.svg";
import Container from "./Container";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";
import { BluryBall } from "./ui/BluryBall";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import clsx from "clsx";
import { Sidebar } from "./Sidebar";
import Languages from "@/assets/icons/languages.svg";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useEffect, useTransition } from "react";
import { cn } from "@/lib/utils";
import { Alexandria, Poppins } from "next/font/google";
import { useLocale, useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});
const alexandria = Alexandria({
  subsets: ["latin", "arabic"], // Add arabic subset
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-alexandria",
});

export const navLinks = [
  { name: "links.home", path: "/" },
  { name: "links.about", path: "/about" },
  { name: "links.projects", path: "/projects" },
  { name: "links.services", path: "/services" },
  { name: "links.partners", path: "/partners" },
  { name: "links.news", path: "/news&media" },
  { name: "links.careers", path: "/careers" },
  { name: "links.contact", path: "/contact" },
];

export const Header = () => {
  const pathname = usePathname();
  const t = useTranslations("header");

  useEffect(() => {
    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });
  }, []);

  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const selectLang = (locale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  };

  return (
    <header
      className={cn(
        "relative z-50 bg-transparent",
        poppins.className,
        alexandria.className
      )}
    >
      <Container className="flex items-center gap-8 justify-between h-(--header-height) max-xl:px-2">
        <Link className="relative" href={"/"}>
          <BluryBall className="w-[500px] h-[500px]" />
          <Logo className="relative z-10" />
        </Link>
        <div className="flex-1 flex justify-center">
          <GlassCard className="px-6 w-fit py-0 rounded-full relative z-10 max-xl:px-2 max-lg:hidden">
            <BluryBall className="w-full h-[200px] -top-20" />
            <ul className="flex items-center gap-2 w-full text-sm font-normal leading-5 relative z-10">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.path}
                    className={clsx(
                      "px-2 py-2 inline-block group duration-100",
                      {
                        "font-black":
                          pathname == link.path ||
                          (pathname.includes(link.path) && link.path != "/"),
                      }
                    )}
                  >
                    <div className="flex flex-col gap-px">
                      {t(link.name)}
                      <span
                        className={clsx(
                          "w-[0%] group-hover:w-full duration-200 ease-out h-0.5 bg-white",
                          {
                            "w-full":
                              pathname == link.path ||
                              (pathname.includes(link.path) &&
                                link.path != "/"),
                          }
                        )}
                      ></span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="bg-transparent hover:bg-primary/30 size-10 flex items-center justify-center rounded-lg cursor-pointer duration-300"
            onClick={() => selectLang(locale == "ar" ? "en" : "ar")}
          >
            <Languages />
          </button>
          <Link href={"/contact"}>
            <Button
              variant={"outline"}
              className="rounded-full relative z-10 p-2 max-lg:hidden"
            >
              <span className="px-2 py-3 inline-block">{t("button")}</span>
              <div className="size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center rtl:rotate-180">
                <ArrowRight />
              </div>
            </Button>
          </Link>
        </div>
        <Sidebar />
      </Container>
    </header>
  );
};
