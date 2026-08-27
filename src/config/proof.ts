export interface StackCategory {
  category: string;
  items: string[];
}

export const PROOF_DATA = {
  sectionNumber: "06",
  sectionTitle: "PROOF & CAPABILITIES",
  subline: "TECHNICAL STACK & INTEGRITY",
  stack: [
    {
      category: "CORE ARCHITECTURE",
      items: ["NEXT.JS 15", "REACT 19", "TYPESCRIPT"],
    },
    {
      category: "MOTION & INTERACTION",
      items: ["GSAP 3", "SCROLLTRIGGER", "LENIS SMOOTH SCROLL"],
    },
    {
      category: "3D CANVAS",
      items: ["THREE.JS", "REACT THREE FIBER", "DREI"],
    },
    {
      category: "SYSTEM DESIGN",
      items: ["TAILWIND CSS", "SEMANTIC HTML5", "ACCESSIBILITY"],
    },
  ] as StackCategory[],
};
