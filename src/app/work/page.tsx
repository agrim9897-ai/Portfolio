"use client";

import Navbar from "@/components/navigation/Navbar";
import SelectedWork from "@/components/work/SelectedWork";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import { PROJECTS } from "@/config/projects";

export default function WorkPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#0b090a] pt-24 sm:pt-28">
      {/* Fixed Header Navigation */}
      <Navbar />

      {/* Editorial Page Intro Header */}
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 pt-8 sm:pt-12 pb-4 sm:pb-6">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-3 font-sans text-xs font-light tracking-widest text-[#7c7471] uppercase">
            <span>SHOWCASE</span>
            <div className="h-[1px] w-8 bg-[#221d20]" />
            <span>{PROJECTS.length.toString().padStart(2, "0")} CHAPTERS</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-light tracking-[0.2em] sm:tracking-[0.3em] text-[#f4eee9] uppercase leading-none pl-[0.2em] sm:pl-[0.3em]">
            WORK
          </h1>

          <p className="font-sans text-sm sm:text-base font-light text-[#c8bfba] max-w-xl leading-relaxed pt-1">
            A selection of digital experiences, built from concept to launch.
          </p>
        </div>
      </div>

      {/* Cinematic Chapter Showcase */}
      <SelectedWork />

      {/* Closing Inquiry & Footer */}
      <Contact />
      <Footer />
    </main>
  );
}

