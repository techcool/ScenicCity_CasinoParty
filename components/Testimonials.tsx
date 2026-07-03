"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/components/data";
import { useCursorHover } from "@/components/cursor";
import { ArrowLeft, ArrowRight } from "@/components/icons";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const cursor = useCursorHover();

  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section
      id="voices"
      className="relative overflow-hidden px-6 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1600px]">
        <span className="mb-16 flex items-center gap-4 font-body text-xs uppercase tracking-[0.3em] text-black/40">
          <span className="h-px w-10 bg-[#c9961e]" /> (03) — Testimonials
        </span>
        <div className="relative min-h-[46vh]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -80 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="max-w-5xl font-display text-[7vw] font-medium leading-[1.05] tracking-tight md:text-[3.4vw]">
                “{current.quote}”
              </blockquote>
              <div className="mt-12 flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="h-14 w-14 overflow-hidden rounded-full bg-[#e9e4d8]"
                >
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                <div>
                  <p className="font-body text-[#141210]">{current.name}</p>
                  <p className="font-body text-sm text-black/45">
                    {current.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-12 flex items-center gap-4">
          <button
            {...cursor}
            onClick={() => paginate(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-black/20 transition-colors hover:bg-[#141210] hover:text-[#141210]"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            {...cursor}
            onClick={() => paginate(1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-black/20 transition-colors hover:bg-[#141210] hover:text-[#141210]"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
          <span className="ml-4 font-body text-sm text-black/40">
            0{index + 1} / 0{testimonials.length}
          </span>
        </div>
      </div>
    </section>
  );
}
