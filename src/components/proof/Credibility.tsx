"use client";

import { useEffect, useRef } from "react";
import { PROOF_DATA, StackCategory } from "@/config/proof";
import { gsap } from "@/utils/gsap";

export default function Credibility() {
  const containerRef = useRef<HTMLElement>(null);
  const stackItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      stackItemsRef.current.forEach((el) => {
        if (!el) return;

        gsap.fromTo(
          el,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 55%",
              scrub: 0.5,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="proof"
      ref={containerRef}
      className="relative flex w-full flex-col bg-[#0b090a] py-16 md:py-20 px-6 md:px-12 border-t border-[#221d20]"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 flex items-center justify-between font-sans text-xs font-light tracking-wider text-[#7c7471] uppercase">
          <div className="flex items-center space-x-4">
            <span>CAPABILITIES</span>
            <div className="h-[1px] w-12 bg-[#221d20]" />
          </div>
          <span>TECHNOLOGY</span>
        </div>

        {/* Typographic Technical Capabilities & Stack Presentation */}
        <div className="flex flex-col border-t border-[#221d20]">
          {PROOF_DATA.stack.map((group: StackCategory, index: number) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={group.category}
                ref={(el) => {
                  stackItemsRef.current[index] = el;
                }}
                className={`grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center py-8 border-b border-[#221d20] ${
                  isEven ? "" : "md:pl-12"
                }`}
              >
                {/* Category Title (Cols 1-4) */}
                <div className="md:col-span-4 flex items-center space-x-3 font-sans text-xs font-light tracking-wider text-[#7c7471] uppercase">
                  <span>{group.category}</span>
                  <span className="h-[1px] w-6 bg-[#221d20]" />
                </div>

                {/* Technologies / Capabilities Inline List (Cols 5-12) */}
                <div className="md:col-span-8 flex flex-wrap items-center gap-x-8 gap-y-3 font-display text-2xl sm:text-3xl md:text-4xl font-light tracking-wider text-[#f4eee9] uppercase">
                  {group.items.map((item: string, i: number) => (
                    <span key={i} className="flex items-center space-x-8">
                      <span className="cursor-pointer transition-colors duration-300 hover:text-[#ff3b5c]">
                        {item}
                      </span>
                      {i < group.items.length - 1 && (
                        <span className="font-sans text-xs text-[#7c7471] font-light">/</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
