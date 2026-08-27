"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const tagPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    setEnabled(true);

    // Immediate direct pointer position tracking for primary dot (0ms latency)
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.("[data-pointer]");
      if (target) {
        const text = target.getAttribute("data-pointer");
        if (text) {
          setCursorText(text);
          setIsHovered(true);
          return;
        }
      }
      setCursorText("");
      setIsHovered(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });

    // Smooth subtle inertia tracking loop for secondary text tag
    const render = () => {
      tagPos.current.x += (mousePos.current.x - tagPos.current.x) * 0.45;
      tagPos.current.y += (mousePos.current.y - tagPos.current.y) * 0.45;

      if (tagRef.current) {
        tagRef.current.style.transform = `translate3d(${tagPos.current.x + 12}px, ${tagPos.current.y + 12}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Zero-latency Precision Primary Dot */}
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 rounded-full bg-[#F8FAFC] will-change-transform ${
          isHovered ? "h-2.5 w-2.5 opacity-90" : "h-1.5 w-1.5 opacity-75"
        }`}
      />

      {/* Discrete Secondary Contextual Tag */}
      {isHovered && cursorText && (
        <div
          ref={tagRef}
          className="pointer-events-none fixed top-0 left-0 font-mono text-[9px] font-bold tracking-widest text-[#F8FAFC] bg-[#070709]/80 border border-white/20 px-1.5 py-0.5 rounded-[1px] backdrop-blur-sm uppercase will-change-transform"
        >
          {cursorText}
        </div>
      )}
    </div>
  );
}
