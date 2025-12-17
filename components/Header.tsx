"use client";
import Logo from "@/assets/logo.svg";
import Container from "./Container";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";
import { BluryBall } from "./ui/BluryBall";
import { Link, usePathname } from "@/i18n/routing";
import clsx from "clsx";
import { Sidebar } from "./Sidebar";
import Languages from "@/assets/icons/languages.svg";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Services", path: "/services" },
  { name: "Partners", path: "/partners" },
  { name: "News & Media", path: "/news&media" },
  { name: "Careers", path: "/careers" },
  { name: "Contact Us", path: "/contact" },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="relative z-50">
      <Container className="flex items-center gap-8 justify-between h-(--header-height) max-xl:px-2">
        <div className="relative">
          <BluryBall className="w-[500px] h-[500px]" />
          <Logo className="relative z-10" />
        </div>
        <div className="flex-1 flex justify-center">
          <GlassCard className="px-6 w-fit py-0 rounded-full relative z-10 max-xl:px-2 max-lg:hidden">
            <BluryBall className="w-full h-[200px] -top-20" />
            <ul className="flex items-center gap-2 w-full text-sm font-normal leading-5 relative z-10">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.path}
                    className={clsx(
                      "px-2 py-2 inline-block hover:scale-105 hover:underline duration-100",
                      {
                        "font-black":
                          pathname == link.path ||
                          (pathname.includes(link.path) && link.path != "/"),
                      }
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-transparent hover:bg-primary/30 size-10 flex items-center justify-center rounded-lg cursor-pointer duration-300">
            <Languages />
          </button>
          <Button
            variant={"outline"}
            className="rounded-full relative z-10 p-2 max-lg:hidden"
          >
            <span className="px-2 py-3 inline-block">Get in touch</span>
            <div className="size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <ArrowRight />
            </div>
          </Button>
        </div>
        <Sidebar />
      </Container>
    </header>
  );
};
