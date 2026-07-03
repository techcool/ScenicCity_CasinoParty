"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { galleryImages, games } from "@/components/data";
import SplitText from "@/components/SplitText";
import { useCursorHover } from "@/components/cursor";

function Marquee() {
  const track = (
    <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center gap-10 pr-10">
      {[...games, ...games].map((game, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="font-display text-6xl font-medium tracking-tight text-black/80 md:text-8xl">
            {game}
          </span>
          <span className="font-serif text-4xl italic text-[#c9961e]">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="flex overflow-hidden border-y border-black/10 py-8">
      {track}
      {track}
    </div>
  );
}

function GalleryItem({ src, i }: { src: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const cursor = useCursorHover("View");

  // Directional entrance based on where the item sits in the grid:
  // left column slides in from the left (diagonally when in the bottom
  // half), right column flies in from the top/bottom-right corner, and
  // the middle column zooms up from 0.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const container = el.closest(".gallery-grid") as HTMLElement | null;
    if (!container) return;
    gsap.set(el, { opacity: 0 });
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () => {
        const c = container.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2 - c.left;
        const cy = r.top + r.height / 2 - c.top;
        const third = c.width / 3;
        const col = cx < third ? "left" : cx > third * 2 ? "right" : "middle";
        const topHalf = cy < c.height / 2;
        const from =
          col === "middle"
            ? { scale: 0, opacity: 0 }
            : {
                x: col === "left" ? -160 : 160,
                y: col === "left" ? (topHalf ? 0 : 160) : topHalf ? -160 : 160,
                opacity: 0,
              };
        gsap.fromTo(el, from, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          clearProps: "transform",
        });
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <div ref={ref} className="block break-inside-avoid will-change-transform">
      <div {...cursor} className="group relative block overflow-hidden bg-[#e9e4d8]">
        <img
          src={src}
          alt={`Casino party gallery image ${i + 1}`}
          className="block h-auto w-full align-top transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/50 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-0" />
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-14 md:py-20">
      <Marquee />
      <div className="mx-auto mt-16 max-w-[1600px] px-6 md:px-12">
        <span className="mb-8 flex items-center gap-4 font-body text-xs uppercase tracking-[0.3em] text-black/40">
          <span className="h-px w-10 bg-[#c9961e]" /> (06) — Our Gallery
        </span>
        <SplitText
          as="h2"
          type="words"
          variant="mask"
          className="mb-16 max-w-3xl font-display text-[9vw] font-medium leading-[1] tracking-tight md:text-[4.5vw]"
        >
          Moments from the floor
        </SplitText>
        <div className="gallery-grid columns-2 gap-0 md:columns-3 [&>*]:mb-0">
          {galleryImages.map((src, i) => (
            <GalleryItem key={src} src={src} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
