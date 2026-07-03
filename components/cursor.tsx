"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "@/lib/gsap";

type CursorContextValue = {
  hovered: boolean;
  label: string;
  setCursor: (hovered: boolean, label?: string) => void;
};

const CursorContext = createContext<CursorContextValue>({
  hovered: false,
  label: "",
  setCursor: () => {},
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState("");
  const setCursor = useCallback((h: boolean, l = "") => {
    setHovered(h);
    setLabel(l);
  }, []);
  return (
    <CursorContext.Provider value={{ hovered, label, setCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

const useCursorState = () => useContext(CursorContext);

export function useCursorHover(label = "") {
  const { setCursor } = useCursorState();
  return {
    onMouseEnter: () => setCursor(true, label),
    onMouseLeave: () => setCursor(false, ""),
  };
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { hovered, label } = useCursorState();

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#141210]"
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-black/50 transition-all duration-300 ease-out"
        style={{
          width: hovered ? 88 : 40,
          height: hovered ? 88 : 40,
          marginLeft: hovered ? -44 : -20,
          marginTop: hovered ? -44 : -20,
          backgroundColor: hovered ? "rgba(20,18,16,0.9)" : "transparent",
        }}
      >
        <span
          className="font-body text-[11px] uppercase tracking-widest text-white transition-opacity duration-200"
          style={{ opacity: hovered && label ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
