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

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const Footer = () => {
  return (
    <footer
      className={cn(
        "mt-20 border-b-0 border border-[#FFFFFF3B] rounded-t-[8rem] mx-3 lg:mx-12 pt-12 pb-5 relative z-20 bg-[linear-gradient(to_bottom,#1b1b1b,#000)]",
        poppins.className
      )}
    >
      <Container className="grid grid-cols-4 gap-12 mb-12 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:text-center">
        <div className="logo leading-5">
          <Link href={"/"}>
            <FooterLogo className="mb-6 max-sm:mx-auto" />
          </Link>
          <h2 className="font-medium mb-2">
            Al-Subtain Real Estate Development
          </h2>
          <p>
            Building life, not just buildings. <br /> Karbala, Iraq
          </p>
        </div>
        <ul className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">Quick Links</h3>
          {navLinks.map((link, i) => (
            <li key={i}>
              <Link
                href={link.path}
                className="font-medium text-[0.9rem] leading-5"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">Our Projects</h3>
          <li className="font-medium leading-5">Uruk City</li>
          <li className="font-medium leading-5">Al-Salam City</li>
          <li className="font-medium leading-5">Al-Kafeel Hospital</li>
          <li className="font-medium leading-5">Al-Abbas</li>
        </ul>
        <ul className="flex flex-col gap-0.5">
          <h3 className="font-medium text-xl mb-2">Head Office</h3>
          <li className="font-medium leading-5">
            Al-Hur Street, Karbala – Iraq
          </li>
          <li className="font-light text-base leading-6">+964 7750050123</li>
          <li className="font-light text-base leading-6">info@alsibtain.com</li>
          <li className="font-light text-base leading-6 mb-3">
            www.alsibtain.com
          </li>
          <ul>
            <h4 className="font-medium text-sm mb-2">Follow Us</h4>
            <div className="flex gap-2 items-center max-sm:justify-center">
              <li>
                <Facebook />
              </li>
              <li>
                <Instagram />
              </li>
              <li>
                <Whatsapp />
              </li>
              <li>
                <Youtube />
              </li>
            </div>
          </ul>
        </ul>
      </Container>
      <p className="text-center text-sm font-light">
        <span className="font-medium">© 2025 Al-Subtain</span> Real Estate
        Development. All rights reserved.
      </p>
      <p className="text-center font-light text-sm">
        Designed & Developed by{" "}
        <Link
          href={"https://malamih.net"}
          className="font-medium hover:underline"
        >
          malamih.net
        </Link>
      </p>
    </footer>
  );
};
