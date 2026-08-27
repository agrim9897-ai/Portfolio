"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/utils/gsap";
import { useLenis } from "./SmoothScrollProvider";

interface PageTransitionContextType {
  navigateTo: (href: string, label?: string) => void;
  isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  navigateTo: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(PageTransitionContext);

interface PageTransitionProviderProps {
  children: React.ReactNode;
}

// Derive clean display label from route href
function getRouteLabel(href: string, customLabel?: string): string {
  if (customLabel && customLabel.length < 20 && !customLabel.includes("http")) {
    return customLabel.toUpperCase();
  }
  const cleanPath = href.split("?")[0].split("#")[0];
  if (cleanPath === "/" || cleanPath === "") return "HOME";
  const segment = cleanPath.replace(/^\//, "").split("/")[0];
  return segment ? segment.toUpperCase() : "HOME";
}

export default function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionLabel, setTransitionLabel] = useState("");

  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  // Transition trigger function
  const navigateTo = useCallback(
    (href: string, customLabel?: string) => {
      // Avoid duplicate triggers or same route navigation
      if (isAnimatingRef.current) return;

      const targetPath = href.split("?")[0].split("#")[0];
      const currentPath = pathname.split("?")[0].split("#")[0];

      if (targetPath === currentPath) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.innerWidth < 768;
      const label = getRouteLabel(href, customLabel);

      setTransitionLabel(label);
      setIsTransitioning(true);
      isAnimatingRef.current = true;

      // Lock scroll during transition
      if (lenis) {
        lenis.stop();
      }

      const mainEl = document.querySelector("main");
      const overlay = overlayRef.current;
      const textEl = textRef.current;

      const tl = gsap.timeline({
        onComplete: () => {
          // Route navigation inside darkness
          router.push(href);

          // Scroll to top immediately while covered
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });

          // Reveal phase
          const revealTl = gsap.timeline({
            delay: 0.05,
            onComplete: () => {
              // Reset overlay clip path and main styles
              if (overlay) {
                gsap.set(overlay, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 0 });
              }
              if (mainEl) {
                gsap.set(mainEl, { clearProps: "transform,opacity" });
              }

              // Unlock scroll & recalculate ScrollTrigger
              if (lenis) {
                lenis.start();
              }
              ScrollTrigger.refresh();

              setIsTransitioning(false);
              isAnimatingRef.current = false;
            },
          });

          // Text fade out
          if (textEl) {
            revealTl.to(textEl, {
              opacity: 0,
              y: -12,
              duration: prefersReducedMotion ? 0.15 : 0.25,
              ease: "power2.in",
            }, 0);
          }

          // Overlay sweeps away upwards
          if (overlay) {
            revealTl.to(overlay, {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              duration: prefersReducedMotion ? 0.25 : isMobile ? 0.45 : 0.55,
              ease: "power3.inOut",
            }, 0.05);
          }

          // New main content emerges and settles
          const newMain = document.querySelector("main");
          if (newMain && !prefersReducedMotion) {
            revealTl.fromTo(
              newMain,
              { scale: isMobile ? 0.99 : 0.98, opacity: 0.85, y: isMobile ? 8 : 14 },
              { scale: 1.0, opacity: 1.0, y: 0, duration: isMobile ? 0.45 : 0.55, ease: "power3.out" },
              0.1
            );
          }
        },
      });

      // 1. Current main container scales down subtly into darkness
      if (mainEl && !prefersReducedMotion) {
        tl.to(mainEl, {
          scale: isMobile ? 0.99 : 0.98,
          opacity: 0.85,
          duration: isMobile ? 0.35 : 0.42,
          ease: "power3.inOut",
        }, 0);
      }

      // 2. Dark curtain expands across viewport
      if (overlay) {
        gsap.set(overlay, { opacity: 1 });
        tl.fromTo(
          overlay,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: prefersReducedMotion ? 0.2 : isMobile ? 0.38 : 0.45,
            ease: "power3.inOut",
          },
          0
        );
      }

      // 3. Minimal centered text identifier reveals
      if (textEl) {
        tl.fromTo(
          textEl,
          { opacity: 0, y: 15, filter: prefersReducedMotion ? "none" : "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: prefersReducedMotion ? 0.2 : 0.35,
            ease: "power3.out",
          },
          0.12
        );
      }
    },
    [pathname, router, lenis]
  );

  // Global click interception for internal <a> tags
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore modifier keys (Cmd/Ctrl click to open in new tab)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      // Ignore external URLs, target="_blank", mailto, tel, downloads
      if (
        target.target === "_blank" ||
        target.hasAttribute("download") ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      // Same page anchor link (e.g. /#about or #about)
      if (href.startsWith("#") || (href.startsWith("/#") && pathname === "/")) {
        const anchorId = href.replace("/#", "").replace("#", "");
        if (anchorId) {
          const targetEl = document.getElementById(anchorId);
          if (targetEl) {
            e.preventDefault();
            if (lenis) {
              lenis.scrollTo(targetEl);
            } else {
              targetEl.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
        return;
      }

      // Internal page route navigation
      const targetPath = href.split("?")[0].split("#")[0];
      const currentPath = pathname.split("?")[0].split("#")[0];

      if (targetPath && targetPath !== currentPath) {
        e.preventDefault();
        const customLabel = target.textContent?.trim();
        navigateTo(href, customLabel);
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, [pathname, lenis, navigateTo]);

  // Handle browser back/forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      if (lenis) {
        lenis.stop();
      }
      const overlay = overlayRef.current;
      if (overlay) {
        gsap.set(overlay, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
        });
        setTimeout(() => {
          gsap.to(overlay, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(overlay, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 0 });
              if (lenis) lenis.start();
              ScrollTrigger.refresh();
            },
          });
        }, 100);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [lenis]);

  return (
    <PageTransitionContext.Provider value={{ navigateTo, isTransitioning }}>
      {children}

      {/* Cinematic Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#090809] pointer-events-none select-none overflow-hidden"
        style={{
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          opacity: 0,
        }}
        aria-hidden="true"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,238,233,0.05)_0%,transparent_70%)] pointer-events-none" />

        {/* Fine Architectural Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none" />

        {/* Minimal Centered Route Typography */}
        <div
          ref={textRef}
          className="relative z-10 flex flex-col items-center space-y-3 opacity-0 transform translate-y-4"
        >
          <div className="flex items-center space-x-3 font-sans text-[11px] font-light tracking-[0.3em] text-[#7c7471] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f4eee9] animate-pulse" />
            <span>NAVIGATION</span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="h-[1px] w-10 sm:w-20 bg-[#c8bfba]/30" />
            <span className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.35em] text-[#f4eee9] uppercase">
              {transitionLabel}
            </span>
            <div className="h-[1px] w-10 sm:w-20 bg-[#c8bfba]/30" />
          </div>
        </div>
      </div>
    </PageTransitionContext.Provider>
  );
}
