import type { Metadata } from "next";
import { Antonio, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import PageTransitionProvider from "@/components/providers/PageTransitionProvider";
import CustomCursor from "@/components/cursor/CustomCursor";
import { BRAND } from "@/config/tokens";

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.role}`,
  description: BRAND.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${antonio.variable} ${inter.variable} ${cormorant.variable} h-full antialiased bg-[#0b090a] text-[#f4eee9]`}
    >
      <body className="min-h-full flex flex-col bg-[#0b090a] text-[#f4eee9] font-sans selection:bg-[#ff3b5c] selection:text-[#0b090a]">
        <SmoothScrollProvider>
          <PageTransitionProvider>
            <CustomCursor />
            <div className="relative flex min-h-screen flex-col bg-[#0b090a]">
              {children}
            </div>
          </PageTransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
