"use client";

import { useEffect, useRef } from "react";
import { ABOUT_DATA } from "@/config/about";
import { gsap } from "@/utils/gsap";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (statementRef.current) {
        gsap.fromTo(
          statementRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statementRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.6,
            },
          }
        );
      }

      if (bioRef.current) {
        gsap.fromTo(
          bioRef.current,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bioRef.current,
              start: "top 85%",
              end: "top 55%",
              scrub: 0.6,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative flex min-h-[40vh] w-full flex-col justify-center bg-[#0b090a] py-16 md:py-20 px-6 md:px-12 border-t border-[#221d20]"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 flex items-center justify-between font-sans text-xs font-light tracking-wider text-[#7c7471] uppercase">
          <div className="flex items-center space-x-4">
            <span>ABOUT</span>
            <div className="h-[1px] w-12 bg-[#221d20]" />
          </div>
          <span>{ABOUT_DATA.location}</span>
        </div>

        {/* Editorial About Layout */}
        <div className="pt-4">
          <div ref={bioRef} className="flex flex-col space-y-8 max-w-4xl">
            <h2 ref={statementRef} className="group font-serif text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-light tracking-wide text-[#f4eee9] uppercase leading-[1.25] cursor-pointer transition-colors duration-300 hover:text-[#ff3b5c]">
              {ABOUT_DATA.statement}
            </h2>

            <div className="flex flex-col space-y-4 pt-1">
              {ABOUT_DATA.bio.map((paragraph: string, idx: number) => (
                <p
                  key={idx}
                  className="font-serif text-xs sm:text-sm md:text-[15px] font-light italic tracking-wide leading-[1.8] text-[#c8bfba] transition-colors duration-300 hover:text-[#f4eee9]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
