"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const counter = { n: 0 };
    const tl = gsap.timeline();
    tl.fromTo(
      ".pl-logo",
      { opacity: 0, y: 20, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }
    );
    tl.to(
      counter,
      {
        n: 100,
        duration: 1.9,
        ease: "power2.inOut",
        onUpdate: () => setCount(Math.round(counter.n)),
      },
      0.3
    );
    tl.to(
      barRef.current,
      { scaleX: 1, duration: 1.9, ease: "power2.inOut" },
      0.3
    );
    tl.to(
      ".pl-text",
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.5"
    );
    tl.to(".pl-fade", { opacity: 0, duration: 0.4, ease: "power2.in" }, "+=0.15");
    tl.to(panelRef.current, {
      yPercent: -100,
      duration: 1.1,
      ease: "power4.inOut",
      onComplete: onDone,
    });
    return () => {
      tl.kill();
    };
  }, [onDone]);

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#f6f4ee]"
    >
      <div className="pl-fade flex flex-col items-center">
        <img
          src="/logo.png"
          alt="Scenic City Casino Parties"
          className="pl-logo w-[52vw] max-w-[280px] object-contain"
        />
        <div className="mt-10 h-px w-[60vw] max-w-md overflow-hidden bg-black/10">
          <div
            ref={barRef}
            className="h-full w-full origin-left scale-x-0 bg-[#141210]"
          />
        </div>
        <div className="mt-6 flex w-[60vw] max-w-md items-center justify-between font-body text-xs uppercase tracking-[0.3em] text-black/50">
          <span className="pl-text translate-y-2 opacity-0">
            Loading experience
          </span>
          <span>{String(count).padStart(3, "0")}%</span>
        </div>
      </div>
    </div>
  );
}
