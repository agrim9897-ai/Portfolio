"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, EASINGS } from "@/utils/gsap";

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const lineDividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Development intro reset mechanism via query param ?intro=reset
    const urlParams = new URLSearchParams(window.location.search);
    const forceReset = urlParams.get("intro") === "reset";

    if (forceReset) {
      sessionStorage.removeItem("shivam_intro_seen");
    }

    const hasVisited = sessionStorage.getItem("shivam_intro_seen");
    if (hasVisited && !forceReset) {
      setVisible(false);
      onComplete();
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion && !forceReset) {
      sessionStorage.setItem("shivam_intro_seen", "true");
      setVisible(false);
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("shivam_intro_seen", "true");
          setVisible(false);
          onComplete();
        },
      });

      // Frame 1 -> 2: Thin hairline horizontal divider line scales out
      tl.to(lineDividerRef.current, {
        scaleX: 1,
        duration: 0.5,
        ease: "power3.inOut",
      })
        // Frame 3: "WE CREATE" reveal mask
        .to(
          line1Ref.current,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            ease: EASINGS.REVEAL,
          },
          "+=0.1"
        )
        // Frame 5: "EPIC SHIT." impact reveal
        .to(
          line2Ref.current,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power4.out",
          },
          "+=0.15"
        )
        // Frame 6: Hold moment
        .to({}, { duration: 0.7 })
        // Frame 7: Upward curtain slide reveal
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b090a] px-6 select-none"
    >
      <div className="flex flex-col items-center text-center space-y-4 max-w-2xl">
        {/* Frame 3: WE CREATE */}
        <div className="overflow-hidden py-1">
          <h2
            ref={line1Ref}
            style={{ opacity: 0 }}
            className="translate-y-full opacity-0 font-display text-lg sm:text-xl font-light tracking-wide text-[#c8bfba] uppercase"
          >
            WE BUILD
          </h2>
        </div>

        {/* Frame 1 -> 2: Hairline Divider Line */}
        <div
          ref={lineDividerRef}
          className="h-[1px] w-24 scale-x-0 bg-[#221d20] transition-transform"
        />

        {/* Frame 5: SOMETHING THAT MATTERS. */}
        <div className="overflow-hidden py-2">
          <h1
            ref={line2Ref}
            style={{ opacity: 0 }}
            className="translate-y-full opacity-0 font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-wide text-[#f4eee9] uppercase leading-[1.15]"
          >
            SOMETHING THAT MATTERS.
          </h1>
        </div>
      </div>
    </div>
  );
}
