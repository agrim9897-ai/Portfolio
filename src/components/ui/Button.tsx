"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, EASINGS } from "@/utils/gsap";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "text";
  href?: string;
  className?: string;
  magnetic?: boolean;
  onClick?: () => void;
  "data-pointer"?: string;
}

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  magnetic = true,
  onClick,
  "data-pointer": dataPointer,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [, setIsHovered] = useState(false);

  useEffect(() => {
    if (!magnetic) return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const el = buttonRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.18;

      gsap.to(el, {
        x,
        y,
        duration: 0.35,
        ease: EASINGS.UI,
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: EASINGS.MAGNETIC,
      });
      setIsHovered(false);
    };

    const onMouseEnter = () => {
      setIsHovered(true);
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseenter", onMouseEnter);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [magnetic]);

  // Secondary / Text Editorial Link (No button box)
  if (variant === "secondary" || variant === "text") {
    const Component = href ? "a" : "button";
    return (
      <Component
        ref={buttonRef as any}
        href={href}
        onClick={onClick}
        data-pointer={dataPointer}
        className={`group relative inline-flex items-center space-x-2 font-sans text-xs font-light tracking-wide text-[#c8bfba] transition-colors duration-300 hover:text-[#f4eee9] py-1 ${className}`}
      >
        <span className="relative">
          {children}
          <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 bg-[#f4eee9]/60 transition-transform duration-300 origin-left group-hover:scale-x-100" />
        </span>
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          ↗
        </span>
      </Component>
    );
  }

  // Primary Editorial Rectangular Button
  const baseStyles =
    "relative inline-flex items-center justify-between space-x-3 overflow-hidden transition-all duration-300 font-sans text-xs font-normal tracking-wide uppercase select-none rounded-[1px] border";

  const variantStyles = "border-[#221d20] bg-transparent text-[#f4eee9] hover:border-[#f4eee9] hover:bg-[#f4eee9] hover:text-[#0b090a] px-5 h-10";

  const Component = href ? "a" : "button";

  return (
    <Component
      ref={buttonRef as any}
      href={href}
      onClick={onClick}
      data-pointer={dataPointer}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>
    </Component>
  );
}
