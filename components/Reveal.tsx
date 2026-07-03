"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: "up" | "fade" | "scale" | "clip";
  delay?: number;
  y?: number;
};

export default function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  y = 60,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const from =
      variant === "fade"
        ? { opacity: 0 }
        : variant === "scale"
          ? { opacity: 0, scale: 0.94 }
          : variant === "clip"
            ? { clipPath: "inset(100% 0 0 0)" }
            : { opacity: 0, y };
    const to =
      variant === "clip"
        ? { clipPath: "inset(0% 0 0 0)" }
        : { opacity: 1, y: 0, scale: 1 };
    gsap.set(el, from);
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () =>
        gsap.to(el, { ...to, duration: 1.2, ease: "power3.out", delay }),
    });
    return () => trigger.kill();
  }, [variant, delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
