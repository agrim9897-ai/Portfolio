"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsap";

export default function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = [
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
        line4Ref.current,
      ];

      lines.forEach((line) => {
        if (!line) return;

        gsap.fromTo(
          line.children[0],
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.8,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex w-full flex-col justify-center bg-[#0b090a] py-16 md:py-20 px-6 md:px-12 overflow-hidden border-t border-[#221d20]"
    >
      <div className="mx-auto w-full max-w-7xl flex flex-col justify-between">
        {/* Editorial Section Header - Right Aligned Anchor */}
        <div className="mb-10 md:mb-12 flex items-center justify-between font-sans text-xs font-light tracking-wider text-[#7c7471] uppercase">
          <span>01 // MANIFESTO</span>
          <div className="flex items-center space-x-3">
            <div className="h-[1px] w-12 bg-[#221d20]" />
            <span>EST. 2026</span>
          </div>
        </div>

        {/* Clean Aligned Editorial Composition */}
        <div className="flex flex-col space-y-3 md:space-y-4 w-full">
          {/* Line 1 */}
          <div ref={line1Ref} className="overflow-hidden py-1 w-full flex justify-start">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-wider text-[#c8bfba] uppercase leading-[1.1] cursor-pointer transition-colors duration-300 hover:text-[#ff3b5c]">
              WE DON'T BUILD
            </h2>
          </div>

          {/* Line 2 */}
          <div ref={line2Ref} className="overflow-hidden py-1 w-full flex justify-start">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wider text-[#f4eee9] uppercase leading-[1.1] cursor-pointer transition-colors duration-300 hover:text-[#ff3b5c]">
              WEBSITES TO FILL SCREENS.
            </h2>
          </div>

          {/* Line 3 */}
          <div ref={line3Ref} className="overflow-hidden py-1 w-full flex justify-start">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-wider text-[#c8bfba] uppercase leading-[1.1] cursor-pointer transition-colors duration-300 hover:text-[#ff3b5c]">
              WE BUILD THEM
            </h2>
          </div>

          {/* Line 4 */}
          <div ref={line4Ref} className="overflow-hidden py-1 w-full flex justify-start">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wider text-[#f4eee9] uppercase leading-[1.1] cursor-pointer transition-colors duration-300 hover:text-[#ff3b5c]">
              TO LEAVE AN IMPRESSION.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
