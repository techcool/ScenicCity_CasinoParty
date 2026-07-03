"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/components/data";
import SplitText from "@/components/SplitText";
import { useCursorHover } from "@/components/cursor";
import { Plus } from "@/components/icons";

export default function FAQ() {
  const [active, setActive] = useState<string | null>("f1");
  const cursor = useCursorHover();

  return (
    <section id="faq" className="relative px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1600px]">
        <span className="mb-8 flex items-center gap-4 font-body text-xs uppercase tracking-[0.3em] text-black/40">
          <span className="h-px w-10 bg-[#c9961e]" /> (07) — FAQ
        </span>
        <SplitText
          as="h2"
          type="words"
          variant="mask"
          className="mb-16 max-w-3xl font-display text-[9vw] font-medium leading-[1] tracking-tight md:text-[4.5vw]"
        >
          Questions, answered
        </SplitText>
        <div className="border-t border-black/10">
          {faqs.map((faq) => {
            const isOpen = active === faq.id;
            return (
              <div key={faq.id} className="border-b border-black/10">
                <button
                  {...cursor}
                  onClick={() => setActive(isOpen ? null : faq.id)}
                  className="group flex w-full items-center gap-6 py-8 text-left"
                >
                  <span
                    className={`flex-1 font-display text-2xl font-medium tracking-tight transition-colors duration-300 md:text-4xl ${
                      isOpen
                        ? "text-[#141210]"
                        : "text-black/50 group-hover:text-[#141210]"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <Plus
                    className={`h-6 w-6 shrink-0 transition-transform duration-500 ${
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
                      <p className="max-w-2xl pb-8 font-body leading-relaxed text-black/55">
                        {faq.a}
                      </p>
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
