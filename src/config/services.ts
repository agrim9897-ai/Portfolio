export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  details: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: "service-01",
    number: "01",
    title: "WEB DESIGN",
    shortDesc: "Interfaces with a point of view.",
    details: [
      "Art Direction & Visual Identity",
      "User Experience & Wireframing",
      "Responsive Layout Systems",
      "Interactive Prototypes",
    ],
  },
  {
    id: "service-02",
    number: "02",
    title: "WEB DEVELOPMENT",
    shortDesc: "Fast, responsive and built from scratch.",
    details: [
      "Custom Next.js & React Architecture",
      "TypeScript Codebases",
      "Tailwind Design Token Integration",
      "Clean API Integrations",
    ],
  },
  {
    id: "service-03",
    number: "03",
    title: "MOTION & INTERACTION",
    shortDesc: "Movement that makes the interface feel alive.",
    details: [
      "GSAP ScrollTrigger Animation",
      "Smooth Lenis Scroll Sync",
      "Three.js & WebGL 3D Canvas",
      "Tactile Microinteractions",
    ],
  },
  {
    id: "service-04",
    number: "04",
    title: "E-COMMERCE",
    shortDesc: "Stores designed to sell without looking like stores.",
    details: [
      "Bespoke Storefront Architectures",
      "Optimized Checkout UX",
      "High-Performance Catalog Loading",
      "Brand-Led Product Storytelling",
    ],
  },
  {
    id: "service-05",
    number: "05",
    title: "PERFORMANCE",
    shortDesc: "Fast where it matters.",
    details: [
      "Core Web Vitals Optimization",
      "Bundle Size & Image Optimization",
      "SEO & Semantic Accessibility",
      "Zero-Jitter Frame Stability",
    ],
  },
];
