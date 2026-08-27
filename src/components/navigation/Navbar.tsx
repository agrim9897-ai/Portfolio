"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND } from "@/config/tokens";

const NAV_ITEMS = [
  { label: "Home", href: "/", id: "hero" },
  { label: "Work", href: "/work", id: "work" },
  { label: "About", href: "/#about", id: "about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("hero");
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always visible near top of page
      if (currentScrollY <= 50) {
        setVisible(true);
      } else if (currentScrollY < lastScrollY.current - 5) {
        // De-scrolling / Scrolling UP -> reveal navbar
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current + 5) {
        // Scrolling DOWN -> hide navbar
        setVisible(false);
      }

      lastScrollY.current = currentScrollY;

      if (pathname === "/work") {
        setActiveSection("work");
        return;
      }

      if (currentScrollY < 300) {
        setActiveSection("hero");
        return;
      }

      const aboutSection = document.getElementById("about");

      if (aboutSection && currentScrollY >= aboutSection.offsetTop - 300) {
        setActiveSection("about");
      } else {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex w-full justify-center bg-transparent py-6 md:py-8 select-none transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="flex w-full max-w-7xl items-center justify-between px-6 md:px-12 bg-transparent">
        {/* Designer Wordmark Signature */}
        <Link
          href="/"
          className="font-display text-[22px] font-light tracking-wider text-[#f4eee9] transition-opacity hover:opacity-80 leading-none uppercase"
        >
          {BRAND.name}.
        </Link>

        {/* Minimal Navigation Links: Home, Work (/work), About */}
        <div className="flex items-center space-x-6 sm:space-x-8">
          {NAV_ITEMS.map((item) => {
            const isActive =
              (item.href === "/work" && pathname === "/work") ||
              (pathname === "/" && activeSection === item.id);

            return (
              <Link
                key={item.label}
                href={item.href}
                className="group relative font-display text-[17px] font-light tracking-wide transition-colors duration-300 leading-none py-1"
                style={{ color: isActive ? "#f4eee9" : "#a09693" }}
              >
                <span className="group-hover:text-[#f4eee9] transition-colors duration-300">
                  {item.label}
                </span>

                {/* Coral Pink Active Dot Indicator under active item */}
                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#ff3b5c] transition-all duration-300" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
