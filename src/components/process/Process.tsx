"use client";

import { useEffect, useRef, useState } from "react";
import { PROCESS_STEPS, ProcessStep } from "@/config/process";
import { gsap } from "@/utils/gsap";

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Desktop ScrollTrigger pinning step transition
      const totalSteps = PROCESS_STEPS.length;

      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalSteps * 180}`,
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const stepIndex = Math.min(
              Math.floor(self.progress * totalSteps),
              totalSteps - 1
            );
            setActiveStep(stepIndex);
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentStep = PROCESS_STEPS[activeStep] || PROCESS_STEPS[0];

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative flex min-h-[85vh] w-full flex-col justify-between bg-[#0b090a] py-16 md:py-20 px-6 md:px-12 border-t border-[#221d20]"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between">
        {/* Section Header */}
        <div className="flex items-center justify-between font-sans text-xs font-light tracking-wider text-[#7c7471] uppercase">
          <div className="flex items-center space-x-4">
            <span>PROCESS</span>
            <div className="h-[1px] w-12 bg-[#221d20]" />
          </div>
          <span>METHODOLOGY (5 STEPS)</span>
        </div>

        {/* Desktop Art-Directed Connected Step Stage */}
        <div className="my-auto hidden md:flex flex-col space-y-12 py-10">
          {/* Visual Step Selection Bar */}
          <div className="relative flex items-center justify-between border-b border-[#221d20] pb-6">
            {/* Animated Progress Line Indicator */}
            <div className="absolute bottom-0 left-0 h-[1px] bg-[#ff3b5c] transition-all duration-500 ease-out"
                 style={{ width: `${((activeStep + 1) / PROCESS_STEPS.length) * 100}%` }} />

            {PROCESS_STEPS.map((step: ProcessStep, idx: number) => {
              const isActive = idx === activeStep;
              const isPast = idx < activeStep;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <span className={`font-display text-lg font-light transition-colors duration-300 ${
                    isActive ? "text-[#ff3b5c]" : isPast ? "text-[#f4eee9]" : "text-[#7c7471]"
                  }`}>
                    {step.number}
                  </span>
                  <span className={`font-sans text-xs font-light tracking-wider uppercase transition-colors duration-300 ${
                    isActive ? "text-[#f4eee9]" : "text-[#7c7471] group-hover:text-[#c8bfba]"
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Step Content Reveal Stage */}
          <div className="grid grid-cols-12 items-center gap-12 pt-4">
            {/* Left: Large Visual Number Anchor */}
            <div className="col-span-5 flex justify-start">
              <span className="font-display text-[140px] lg:text-[180px] font-extralight tracking-tighter text-[#f4eee9]/10 select-none transition-all duration-500 leading-none">
                {currentStep.number}
              </span>
            </div>

            {/* Right: Active Phase Title & Editorial Narrative */}
            <div className="col-span-7 flex flex-col space-y-4">
              <div className="flex items-center space-x-3 font-sans text-xs font-light tracking-wider text-[#ff3b5c] uppercase">
                <span>PHASE {currentStep.number} OF 05</span>
                <div className="h-[1px] w-8 bg-[#ff3b5c]/40" />
              </div>

              <h2 className="font-display text-4xl lg:text-6xl font-light tracking-wider text-[#f4eee9] uppercase leading-[1.1] transition-colors duration-300 hover:text-[#ff3b5c] cursor-pointer">
                {currentStep.title}
              </h2>

              <p className="font-body text-base lg:text-lg font-light leading-relaxed text-[#c8bfba] max-w-xl transition-all duration-500">
                {currentStep.description}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Sequence (No Pinning) */}
        <div className="my-10 flex flex-col space-y-10 md:hidden">
          {PROCESS_STEPS.map((step: ProcessStep) => (
            <div
              key={step.number}
              className="flex flex-col space-y-3 border-l border-[#221d20] pl-6"
            >
              <span className="font-sans text-xs font-light tracking-wider text-[#7c7471]">
                PHASE {step.number}
              </span>
              <h3 className="font-display text-3xl font-light text-[#f4eee9] uppercase leading-[1.15]">
                {step.title}
              </h3>
              <p className="font-body text-sm font-light text-[#c8bfba]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Bar */}
        <div className="flex items-center justify-between border-t border-[#221d20] pt-4 font-sans text-xs font-light tracking-wider text-[#7c7471]">
          <span>STRUCTURED WORKFLOW</span>
          <span>ESTABLISHED METHODOLOGY</span>
        </div>
      </div>
    </section>
  );
}
