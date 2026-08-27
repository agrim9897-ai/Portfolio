export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  video?: string;
  href: string;
  objectFit?: "cover" | "contain";
}

export const PROJECTS: Project[] = [
  {
    id: "project-01",
    number: "01",
    title: "TECH AT WORK",
    category: "WEB DESIGN · DEVELOPMENT · INTERACTION",
    year: "2026",
    description: "A modern technology company website designed and developed to showcase services, case studies and digital solutions with clarity and performance.",
    image: "/projects/tech-at-work.png",
    href: "https://tech-work-mu.vercel.app/index.html",
  },
  {
    id: "project-02",
    number: "02",
    title: "SOVEREIGNONE",
    category: "BIOHACKING · LIFESTYLE · PERFORMANCE",
    year: "2026",
    description: "Science-backed digital platform for men to master hormone optimization, reset dopamine, and reclaim peak biology.",
    image: "/projects/sovereignone.png",
    href: "https://thesovereignone.tech/",
    objectFit: "contain",
  },
  {
    id: "project-03",
    number: "03",
    title: "HOUSERVE",
    category: "HOME SERVICES · PLATFORM · DEVELOPMENT",
    year: "2026",
    description: "On-demand home services platform connecting households with background-checked experts for deep cleaning, AC repair, plumbing, and electrical solutions.",
    image: "/projects/houserve.png",
    href: "https://www.houserve.in",
    objectFit: "cover",
  },
  {
    id: "project-04",
    number: "04",
    title: "MAYURA",
    category: "RESTAURANT MANAGEMENT · WEB APP · POS & RESERVATIONS",
    year: "2026",
    description: "Full-stack restaurant management platform for fine dining establishments featuring live table bookings, menu administration, POS order tracking, and guest analytics.",
    image: "/projects/mayura.png",
    href: "https://mayura-restaurant-management-system.vercel.app/",
    objectFit: "cover",
  },
];

