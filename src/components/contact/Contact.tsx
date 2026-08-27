"use client";

import { useEffect, useRef } from "react";
import { CONTACT_DATA } from "@/config/contact";
import { gsap } from "@/utils/gsap";

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const ctaTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (ctaTitleRef.current) {
        gsap.fromTo(
          ctaTitleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaTitleRef.current,
              start: "top 85%",
              end: "top 50%",
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
      id="contact"
      ref={containerRef}
      className="relative flex w-full flex-col bg-[#0b090a] py-16 md:py-24 px-6 md:px-12 border-t border-[#221d20]"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 flex items-center justify-between font-sans text-xs font-light tracking-wider text-[#7c7471] uppercase">
          <div className="flex items-center space-x-4">
            <span>CONTACT</span>
            <div className="h-[1px] w-12 bg-[#221d20]" />
          </div>
          <span>INQUIRIES</span>
        </div>

        {/* Centered Expansive CTA Display */}
        <div ref={ctaTitleRef} className="my-8 flex flex-col items-center justify-center text-center space-y-8 max-w-4xl mx-auto">
          <h2 className="group font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light tracking-wider text-[#f4eee9] uppercase leading-[1.1] cursor-pointer">
            <span className="block transition-colors duration-300 hover:text-[#ff3b5c]">
              {CONTACT_DATA.ctaTitleLine1}
            </span>
            <span className="block text-[#c8bfba] font-extralight transition-colors duration-300 hover:text-[#f4eee9]">
              {CONTACT_DATA.ctaTitleLine2}
            </span>
          </h2>

          <div className="pt-4">
            <a
              href={`mailto:${CONTACT_DATA.email}`}
              data-pointer="EMAIL"
              className="group relative inline-flex items-center space-x-3 rounded-[1px] border border-[#221d20] bg-white/5 px-10 py-5 font-sans text-sm font-light tracking-widest text-[#f4eee9] uppercase transition-all duration-300 hover:border-[#ff3b5c] hover:bg-white/10 hover:text-[#ff3b5c]"
            >
              <span>CONTACT ME</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
