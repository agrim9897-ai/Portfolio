import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const EASINGS = {
  UI: "power4.out",
  REVEAL: "power3.out",
  CINEMATIC: "expo.inOut",
  MAGNETIC: "elastic.out(1, 0.3)",
};

export { gsap, ScrollTrigger };
