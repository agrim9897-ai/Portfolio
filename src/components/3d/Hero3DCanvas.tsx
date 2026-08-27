"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import LiquidMonolith from "./LiquidMonolith";

export default function Hero3DCanvas() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return <div className="h-full w-full bg-transparent" />;

  // Intentionally composed mobile static metallic fallback
  if (isMobile) {
    return (
      <div className="flex h-full w-full items-center justify-center p-6">
        <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-white/10 shadow-2xl shadow-white/5">
          <div
            className="h-32 w-32 rounded-full border border-white/25 shadow-inner"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, #f8fafc 0%, #94a3b8 30%, #1e293b 70%, #070709 100%)",
            }}
          />
          <div className="absolute inset-0 rounded-full border border-white/30" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="h-full w-full"
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 6, 5]} intensity={2.2} color="#F8FAFC" />
        <directionalLight position={[-6, 4, -4]} intensity={1.2} color="#E2E8F0" />
        <directionalLight position={[0, -5, 2]} intensity={0.5} color="#64748B" />
        <LiquidMonolith />
      </Canvas>
    </div>
  );
}
