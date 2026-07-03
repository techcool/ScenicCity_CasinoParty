"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useCountUp(target: number, decimals = 0) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const counter = { n: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          n: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => setValue(counter.n),
        });
      },
    });
    return () => trigger.kill();
  }, [target]);
  return { ref, display: value.toFixed(decimals) };
}
