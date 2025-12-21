"use client";
import { ArrowRight, MenuIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { navLinks } from "./Header";
import { Link, usePathname } from "@/i18n/routing";
import Logo from "@/assets/logo.svg";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const handleCloseSidebar = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (
        !menuButtonRef.current?.contains(target) &&
        !sidebarRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleCloseSidebar);
    return () => {
      document.removeEventListener("pointerdown", handleCloseSidebar);
    };
  }, []);

  const t = useTranslations("header");
  return (
    <aside className="lg:hidden">
      <Button
        variant={"ghost"}
        className="relative w-10 h-10"
        onClick={() => setIsOpen(!isOpen)}
        ref={menuButtonRef}
      >
        <span
          className={clsx(
            "absolute w-5 h-0.5 bg-current top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
            isOpen ? "rotate-45" : "-translate-y-2"
          )}
        ></span>
        <span
          className={clsx(
            "absolute w-5 h-0.5 bg-current top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
            isOpen ? "opacity-0" : "opacity-100"
          )}
        ></span>
        <span
          className={clsx(
            "absolute w-5 h-0.5 bg-current top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
            isOpen ? "-rotate-45" : "translate-y-2"
          )}
        ></span>
        <span className="sr-only">{isOpen ? "Close" : "Menu"}</span>
      </Button>
      <div
        ref={sidebarRef}
        className={clsx(
          "fixed top-0 flex flex-col pb-8 max-w-md max-sm:max-w-[80%] w-full bg-black h-dvh z-999 px-8 pt-4.75 duration-500 overflow-hidden ease-out",
          {
            "[clip-path:circle(0.7%_at_0_0)] -start-40 opacity-0": !isOpen,
            "[clip-path:circle(140.9%_at_0_0)] start-0 opacity-100": isOpen,
          }
        )}
      >
        <Logo className="mb-10" />
        <ul className="flex flex-col font-normal text-3xl flex-1">
          {navLinks.map((link, i) => (
            <li key={i}>
              <Link
                href={link.path}
                className={clsx(
                  "duration-200 ease-out hover:text-4xl py-2 inline-block",
                  {
                    underline: pathname == link.path,
                  }
                )}
                onClick={() => setIsOpen(false)}
              >
                {t(link.name)}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={"/contact"}>
          <Button className="rounded-md relative z-10 p-2 w-full justify-between">
            <span className="px-2 py-3 inline-block">{t("button")}</span>
            <div className="size-6 rounded-full bg-white text-black flex items-center justify-center">
              <ArrowRight />
            </div>
          </Button>
        </Link>
      </div>
    </aside>
  );
};
