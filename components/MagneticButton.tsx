"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useCursorHover } from "@/components/cursor";
import { ArrowUpRight } from "@/components/icons";

function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const toX = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const toY = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      toX(dx * strength);
      toY(dy * strength);
    };
    const leave = () => {
      toX(0);
      toY(0);
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);
  return ref;
}

type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "solid" | "outline";
  withArrow?: boolean;
  className?: string;
};

export default function MagneticButton({
  children,
  onClick,
  variant = "solid",
  withArrow = true,
  className = "",
}: Props) {
  const ref = useMagnetic(0.4);
  const cursor = useCursorHover();
  return (
    <button
      ref={ref}
      onClick={onClick}
      {...cursor}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 font-body text-sm uppercase tracking-widest ${
        variant === "solid"
          ? "text-white"
          : "text-[#141210] border border-black/25"
      } ${className}`}
    >
      {variant === "solid" && (
        <span className="absolute inset-0 bg-[#141210]" />
      )}
      <span
        className={`absolute inset-0 origin-bottom scale-y-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100 ${
          variant === "solid" ? "bg-[#c9961e]" : "bg-[#141210]"
        }`}
      />
      <span
        className={`relative z-10 transition-colors duration-300 ${
          variant === "outline" ? "group-hover:text-white" : ""
        }`}
      >
        {children}
      </span>
      {withArrow && (
        <ArrowUpRight
          className={`relative z-10 h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
            variant === "outline" ? "group-hover:text-white" : ""
          }`}
        />
      )}
    </button>
  );
}
