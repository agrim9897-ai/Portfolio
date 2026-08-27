"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/navigation/Navbar";
import { BRAND } from "@/config/tokens";
import { gsap } from "@/utils/gsap";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineWrapperRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Attempt playback in case autoplay policy requires explicit trigger
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    const ctx = gsap.context(() => {
      // 1. Initial state setup for Intro Sequence
      gsap.set(overlayRef.current, { opacity: 1 });
      gsap.set(titleRef.current, {
        yPercent: 100,
        opacity: 0,
        filter: "blur(16px)",
      });
      gsap.set(taglineRef.current, {
        yPercent: 80,
        opacity: 0,
        letterSpacing: "0.15em",
        filter: "blur(12px)",
      });

      // 2. Cinematic Intro Timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // 0.0s - 0.4s: Video atmosphere begins to reveal from dark hero screen
      tl.to(
        overlayRef.current,
        {
          opacity: 0.45, // Subtle dark overlay preserving dark mountain atmosphere
          duration: 1.2,
          ease: "power2.inOut",
        },
        0.4
      );

      // 0.8s: AGRIM emerges vertically from darkness (clip/mask reveal)
      tl.to(
        titleRef.current,
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power4.out",
        },
        0.8
      );

      // 1.4s: Tagline "WE CREATE EPIC SHIT." emerges slightly afterward
      tl.to(
        taglineRef.current,
        {
          yPercent: 0,
          opacity: 0.9,
          letterSpacing: "0.35em",
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        },
        1.4
      );

      // 3. Scroll Interactions (Parallax & Subtle Fade)
      gsap.to(titleWrapperRef.current, {
        yPercent: -20,
        opacity: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(videoRef.current, {
        scale: 1.08,
        yPercent: 5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0b090a] select-none"
    >
      <Navbar />

      {/* Fullscreen Video Background */}
      <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          src="/hero_mp4.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover object-center scale-100"
        />
        {/* Subtle Dark Overlay to preserve dark cinematic theme */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-[#0b090a]"
          style={{
            background:
              "radial-gradient(circle at center, rgba(11,9,10,0.3) 0%, rgba(11,9,10,0.7) 100%), #0b090a",
          }}
        />
      </div>

      {/* Hero Typography Focal Point */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-6xl mx-auto pointer-events-auto">
        {/* AGRIM Reveal Container */}
        <div
          ref={titleWrapperRef}
          className="overflow-hidden py-2 px-4"
        >
          <h1
            ref={titleRef}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-light tracking-[0.3em] sm:tracking-[0.45em] text-[#f4eee9] uppercase leading-none pl-[0.3em] sm:pl-[0.45em]"
            style={{
              textShadow: "0 10px 40px rgba(0,0,0,0.8)",
              willChange: "transform, opacity, filter",
            }}
          >
            {BRAND.name}
          </h1>
        </div>

        {/* Tagline Reveal Container */}
        <div
          ref={taglineWrapperRef}
          className="overflow-hidden mt-4 sm:mt-6 py-1 px-4"
        >
          <p
            ref={taglineRef}
            className="font-display text-xs sm:text-sm md:text-base font-light text-[#c8bfba] uppercase tracking-[0.3em] pl-[0.3em] leading-normal"
            style={{
              textShadow: "0 5px 20px rgba(0,0,0,0.9)",
              willChange: "transform, opacity, filter",
            }}
          >
            WE BUILD SOMETHING THAT MATTERS.
          </p>
        </div>
      </div>

      {/* Subtle Vignette / Edge Blending */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0b090a] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0b090a]/60 to-transparent z-10" />
    </section>
  );
}

