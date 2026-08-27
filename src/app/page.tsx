"use client";

import { useState } from "react";
import CinematicIntro from "@/components/intro/CinematicIntro";
import Hero from "@/components/hero/Hero";
import Manifesto from "@/components/manifesto/Manifesto";
import Services from "@/components/services/Services";
import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <main className="relative min-h-screen w-full bg-[#0b090a]">
      {/* Phase 1 Cinematic Intro ("WE CREATE EPIC SHIT.") */}
      <CinematicIntro onComplete={() => setIntroFinished(true)} />

      {/* Approved Site Flow */}
      <div className={`transition-opacity duration-700 ${introFinished ? "opacity-100" : "opacity-90"}`}>
        <Hero />
        <Manifesto />
        <Services />
        <About />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
