"use client";

import { createElement, useEffect, useRef, type ElementType } from "react";
import SplitType from "split-type";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Props = {
  children: string;
  as?: ElementType;
  className?: string;
  type?: "lines" | "words" | "chars";
  variant?: "mask" | "blur" | "up" | "fade";
  delay?: number;
  stagger?: number;
  play?: boolean;
};

export default function SplitText({
  children,
  as = "div",
  className = "",
  type = "lines",
  variant = "mask",
  delay = 0,
  stagger = 0.08,
  play,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const split = new SplitType(el, {
      types: (type === "chars" ? "words,chars" : type) as never,
      tagName: "span",
    });
    const targets =
      type === "chars" ? split.chars : type === "words" ? split.words : split.lines;
    if (!targets) return;

    if (variant === "mask") {
      targets.forEach((t) => {
        t.style.display = "inline-block";
      });
      if (type === "lines") {
        split.lines?.forEach((line) => {
          const mask = document.createElement("span");
          mask.className = "line-mask";
          line.parentNode?.insertBefore(mask, line);
          mask.appendChild(line);
        });
      }
    }

    const from =
      variant === "mask"
        ? { yPercent: 120 }
        : variant === "blur"
          ? { opacity: 0, yPercent: 60, filter: "blur(14px)" }
          : { opacity: 0, yPercent: 40 };
    const to =
      variant === "mask"
        ? { yPercent: 0 }
        : variant === "blur"
          ? { opacity: 1, yPercent: 0, filter: "blur(0px)" }
          : { opacity: 1, yPercent: 0 };

    gsap.set(targets, from);
    const animate = () =>
      gsap.to(targets, {
        ...to,
        duration: 1.1,
        ease: "power4.out",
        stagger,
        delay,
      });

    let trigger: ScrollTrigger | undefined;
    if (play) {
      animate();
    } else {
      trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: animate,
      });
    }
    return () => {
      trigger?.kill();
      split.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, play]);

  return createElement(as, { ref, className }, children);
}
