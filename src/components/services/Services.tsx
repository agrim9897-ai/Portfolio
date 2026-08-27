"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICES, ServiceItem } from "@/config/services";
import { gsap } from "@/utils/gsap";

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.6,
            },
          }
        );
      }

      rowsRef.current.forEach((row) => {
        if (!row) return;

        gsap.fromTo(
          row,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              end: "top 55%",
              scrub: 0.5,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleService = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative flex w-full flex-col bg-[#0b090a] py-16 md:py-24 px-6 md:px-12 border-t border-[#221d20]"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Major Visual Anchor Section Heading */}
        <div ref={titleRef} className="mb-14 flex flex-col items-start border-b border-[#221d20] pb-10">
          <div className="flex items-center space-x-3 font-sans text-xs font-light tracking-wider text-[#7c7471] uppercase mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff3b5c]" />
            <span>02 // CAPABILITIES & CORE DISCIPLINES</span>
          </div>

          <h2 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-light tracking-wide text-[#f4eee9] uppercase leading-none transition-colors duration-300 hover:text-[#ff3b5c] cursor-pointer">
            SERVICES
          </h2>

          <p className="mt-4 font-body text-base font-light leading-relaxed text-[#c8bfba] max-w-xl">
            Bespoke digital capabilities crafted with a focus on visual distinction, custom motion architecture, and uncompromising technical performance.
          </p>
        </div>

        {/* Art-Directed Asymmetric Services Rows */}
        <div className="flex flex-col space-y-6 md:space-y-12">
          {SERVICES.map((service: ServiceItem, index: number) => {
            const isExpanded = expandedId === service.id;
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                ref={(el) => {
                  rowsRef.current[index] = el;
                }}
                className="group w-full border-b border-[#221d20] pb-8 transition-all duration-300"
              >
                {/* Main Interactive Row */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  onClick={() => toggleService(service.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleService(service.id);
                    }
                  }}
                  data-pointer="EXPLORE"
                  className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center py-6 cursor-pointer select-none w-full"
                >
                  {/* Service Number (Cols 1-2) */}
                  <div className="md:col-span-2 flex items-center space-x-3">
                    <span className="font-sans text-xs font-light tracking-wider text-[#7c7471] uppercase transition-colors duration-300 group-hover:text-[#ff3b5c]">
                      {service.number}
                    </span>
                    <span className="h-[1px] w-8 bg-[#221d20] transition-colors group-hover:bg-[#ff3b5c]" />
                  </div>

                  {/* Service Title (Cols 3-7) */}
                  <div className="md:col-span-5">
                    <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-wider text-[#f4eee9] uppercase leading-[1.1] transition-all duration-300 group-hover:text-[#ff3b5c] group-hover:translate-x-3">
                      {service.title}
                    </h3>
                  </div>

                  {/* Short Description & Expand Indicator (Cols 8-12) */}
                  <div className="md:col-span-5 flex items-center justify-between space-x-6">
                    <p className="font-body text-base font-light text-[#c8bfba] transition-colors duration-300 group-hover:text-[#f4eee9]">
                      {service.shortDesc}
                    </p>

                    <div className="flex items-center space-x-3 shrink-0">
                      <span className="hidden lg:inline-block font-sans text-xs font-light tracking-wider text-[#ff3b5c] uppercase opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                        SCOPE
                      </span>
                      <span
                        className={`font-sans text-sm text-[#7c7471] transition-all duration-300 ${
                          isExpanded ? "rotate-90 text-[#ff3b5c]" : "group-hover:translate-x-1 group-hover:text-[#ff3b5c]"
                        }`}
                      >
                        ↗
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="pb-6 pt-2 md:pl-16 pr-4">
                    <div className="border-l border-[#221d20] pl-6 py-2">
                      <div className="font-sans text-xs font-light tracking-wider text-[#7c7471] uppercase mb-4">
                        DELIVERABLES & SCOPE
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-body text-sm font-light text-[#c8bfba]">
                        {service.details.map((detail: string, idx: number) => (
                          <li key={idx} className="flex items-center space-x-2 transition-colors duration-300 hover:text-[#f4eee9]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#ff3b5c]" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
