"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { whyUsItems } from "@/components/data";
import SplitText from "@/components/SplitText";
import { useCursorHover } from "@/components/cursor";
import { Plus } from "@/components/icons";

export default function WhyUs() {
  const [active, setActive] = useState<string | null>("s1");
  const cursor = useCursorHover();

  return (
    <section id="services" className="relative px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1600px]">
        <span className="mb-8 flex items-center gap-4 font-body text-xs uppercase tracking-[0.3em] text-black/40">
          <span className="h-px w-10 bg-[#c9961e]" /> (04) — What Sets Us Apart
        </span>
        <SplitText
          as="h2"
          type="words"
          variant="mask"
          className="mb-16 max-w-3xl font-display text-[9vw] font-medium leading-[1] tracking-tight md:text-[4.5vw]"
        >
          Why choose us
        </SplitText>
        <div className="border-t border-black/10">
          {whyUsItems.map((item, i) => {
            const isOpen = active === item.id;
            return (
              <div key={item.id} className="border-b border-black/10">
                <button
                  {...cursor}
                  onClick={() => setActive(isOpen ? null : item.id)}
                  className="group flex w-full items-center gap-6 py-8 text-left md:py-10"
                >
                  <span className="font-body text-sm text-black/30">
                    0{i + 1}
                  </span>
                  <span
                    className={`flex-1 font-display text-4xl font-medium tracking-tight transition-colors duration-300 md:text-6xl ${
                      isOpen
                        ? "text-[#141210]"
                        : "text-black/50 group-hover:text-[#141210]"
                    }`}
                  >
                    {item.title}
                  </span>
                  <Plus
                    className={`h-7 w-7 shrink-0 transition-transform duration-500 ${
                      isOpen ? "rotate-45 text-[#c9961e]" : "text-black/40"
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-6 pb-10 pl-0 md:flex-row md:items-end md:justify-between md:pl-14">
                        <p className="max-w-xl font-body leading-relaxed text-black/55">
                          {item.body}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-black/15 px-4 py-1.5 font-body text-xs uppercase tracking-widest text-black/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
