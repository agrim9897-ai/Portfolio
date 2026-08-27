export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "DISCOVER",
    description: "Understand the business, audience and goal.",
  },
  {
    number: "02",
    title: "DEFINE",
    description: "Shape the structure, direction and experience.",
  },
  {
    number: "03",
    title: "DESIGN",
    description: "Turn the direction into a visual system.",
  },
  {
    number: "04",
    title: "BUILD",
    description: "Develop the experience with performance in mind.",
  },
  {
    number: "05",
    title: "LAUNCH",
    description: "Test, refine and put it into the world.",
  },
];
