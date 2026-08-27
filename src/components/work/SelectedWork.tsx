"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, Project } from "@/config/projects";
import { gsap } from "@/utils/gsap";

export default function SelectedWork() {
  const containerRef = useRef<HTMLElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  useEffect(() => {
    // Media Playback Observer for video projects
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play().catch(() => {});
      }
    });

    const ctx = gsap.context(() => {
      chapterRefs.current.forEach((chapter, index) => {
        if (!chapter) return;

        const mediaBox = chapter.querySelector(".chapter-media-box");
        const mediaInner = chapter.querySelector(".chapter-media-inner");
        const numberEl = chapter.querySelector(".chapter-number-text");
        const titleEl = chapter.querySelector(".chapter-title-text");
        const metaEl = chapter.querySelector(".chapter-meta-text");
        const ctaEl = chapter.querySelector(".chapter-cta");

        // 1. Entrance Animation Timeline with ScrollTrigger
        const entranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          },
        });

        if (mediaBox) {
          entranceTl.fromTo(
            mediaBox,
            {
              clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
              opacity: 0,
            },
            {
              clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
            },
            0
          );
        }

        if (mediaInner) {
          entranceTl.fromTo(
            mediaInner,
            { scale: 1.12 },
            { scale: 1.0, duration: 1.4, ease: "power3.out" },
            0
          );
        }

        if (numberEl) {
          entranceTl.fromTo(
            numberEl,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
            0.2
          );
        }

        if (titleEl) {
          entranceTl.fromTo(
            titleEl,
            { yPercent: 100, opacity: 0, filter: "blur(10px)" },
            {
              yPercent: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.1,
              ease: "power4.out",
            },
            0.3
          );
        }

        if (metaEl) {
          entranceTl.fromTo(
            metaEl,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 0.9, duration: 0.8, ease: "power3.out" },
            0.45
          );
        }

        if (ctaEl) {
          entranceTl.fromTo(
            ctaEl,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            0.55
          );
        }

        // 2. Parallax Scroll Effect during viewport scrub
        if (mediaInner) {
          gsap.to(mediaInner, {
            yPercent: -6,
            scale: 0.98,
            scrollTrigger: {
              trigger: chapter,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        // 3. Active Chapter Tracker for Progress Bar
        gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => setActiveChapterIndex(index),
            onEnterBack: () => setActiveChapterIndex(index),
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative flex w-full flex-col bg-[#0b090a] py-8 sm:py-12 select-none"
    >
      {/* Sticky Chapter Progress Counter (Desktop) */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center space-y-4 pointer-events-none">
        <div className="font-display text-xs font-light tracking-widest text-[#f4eee9]">
          0{activeChapterIndex + 1}
        </div>
        <div className="h-24 w-[1px] bg-[#221d20] relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-[#ff3b5c] transition-all duration-500 ease-out"
            style={{
              height: `${((activeChapterIndex + 1) / PROJECTS.length) * 100}%`,
            }}
          />
        </div>
        <div className="font-display text-xs font-light tracking-widest text-[#7c7471]">
          0{PROJECTS.length}
        </div>
      </div>

      {/* Chapters Container */}
      <div className="flex flex-col w-full">
        {PROJECTS.map((project: Project, index: number) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={project.id}
              ref={(el) => {
                chapterRefs.current[index] = el;
              }}
              className="relative flex min-h-[85vh] lg:min-h-[92vh] w-full items-center py-12 sm:py-16 md:py-20 px-6 md:px-12 border-b border-[#221d20]/50 last:border-b-0"
            >
              <div className="mx-auto w-full max-w-7xl">
                {/* Chapter Composition Grid */}
                <div
                  className={`grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-12 lg:items-center ${
                    isEven ? "" : "lg:direction-rtl"
                  }`}
                >
                  {/* Visual Stage Box (Cols 1-7 or 6-12) */}
                  <div
                    className={`relative w-full overflow-hidden bg-[#0E0E12] lg:col-span-7 h-[360px] sm:h-[460px] md:h-[520px] lg:h-[580px] group cursor-pointer ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Link href={project.href} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
                      <div
                        className="chapter-media-box relative h-full w-full overflow-hidden"
                        data-pointer="VIEW"
                      >
                        <div className="chapter-media-inner relative h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                          {project.video ? (
                            <video
                              ref={(el) => {
                                videoRefs.current[index] = el;
                              }}
                              src={project.video}
                              autoPlay
                              muted
                              loop
                              playsInline
                              className="h-full w-full object-cover object-center"
                            />
                          ) : (
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              priority={index < 2}
                              className={`${
                                project.objectFit === "contain"
                                  ? "object-contain p-2 sm:p-4"
                                  : "object-cover"
                              } object-center`}
                              sizes="(max-width: 1024px) 100vw, 60vw"
                            />
                          )}

                          {/* Subtle Image Overlay for Vignette */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0b090a]/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Editorial Text Column (Cols 8-12 or 1-5) */}
                  <div
                    className={`flex flex-col justify-center space-y-5 lg:col-span-5 lg:px-4 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    {/* Chapter Header Badge */}
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className="chapter-number-text flex items-center space-x-3 font-sans text-xs font-light tracking-widest text-[#7c7471] uppercase">
                        <span className="font-display text-sm text-[#ff3b5c]">
                          CHAPTER {project.number}
                        </span>
                        <span>/</span>
                        <span>{project.year}</span>
                      </div>
                    </div>

                    {/* Project Title with Mask Reveal */}
                    <div className="overflow-hidden py-1">
                      <h2 className="chapter-title-text font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.12em] text-[#f4eee9] uppercase leading-tight transition-colors duration-300 hover:text-[#ff3b5c]">
                        <Link href={project.href} target="_blank" rel="noopener noreferrer" data-pointer="VIEW">
                          {project.title}
                        </Link>
                      </h2>
                    </div>

                    {/* Metadata & Description */}
                    <div className="chapter-meta-text flex flex-col space-y-4 pt-1">
                      <p className="font-sans text-sm sm:text-base font-light leading-relaxed text-[#c8bfba] max-w-lg">
                        {project.description}
                      </p>

                      <div className="flex items-center space-x-2 pt-1">
                        <span className="border border-[#221d20] px-3 py-1 font-sans text-[11px] font-light tracking-widest text-[#7c7471] uppercase">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* View Project CTA */}
                    <div className="chapter-cta pt-4">
                      <Link
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center space-x-3 font-sans text-xs font-light tracking-widest text-[#f4eee9] uppercase transition-colors hover:text-[#ff3b5c]"
                        data-pointer="VIEW"
                      >
                        <span className="border-b border-[#f4eee9]/30 pb-0.5 group-hover/link:border-[#ff3b5c] transition-colors">
                          VIEW PROJECT
                        </span>
                        <span className="transform transition-transform duration-300 group-hover/link:translate-x-1.5 group-hover/link:-translate-y-0.5">
                          ↗
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

