"use client";

import { CONTACT_DATA } from "@/config/contact";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0b090a] py-12 px-6 md:px-12 border-t border-[#221d20] font-sans text-xs font-light tracking-wider text-[#7c7471]">
      <div className="mx-auto flex w-full max-w-7xl flex-col space-y-8">
        {/* Bottom Footer Row: Copyright */}
        <div className="flex items-center justify-between text-[11px] text-[#7c7471] pt-2">
          <span>{CONTACT_DATA.copyright}</span>
          <span className="hidden md:inline">DESIGNED & BUILT WITH PRECISION</span>
        </div>
      </div>
    </footer>
  );
}
