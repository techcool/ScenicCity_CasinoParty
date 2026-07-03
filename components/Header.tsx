"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "@/components/data";
import { useCursorHover } from "@/components/cursor";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cursor = useCursorHover();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
          scrolled
            ? "border-b border-black/5 bg-[#f6f4ee]/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
          <a href="#top" {...cursor} className="flex items-center">
            <img
              src="/logo.png"
              alt="Scenic City Casino Parties"
              className="h-20 w-auto object-contain md:h-24"
            />
          </a>
          <nav className="hidden items-center gap-10 md:flex">
            {navItems.slice(0, 4).map((item) => (
              <button
                key={item.href}
                onClick={() => go(item.href)}
                className="group relative font-body text-sm uppercase tracking-widest text-black/70 transition-colors hover:text-[#141210]"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#141210] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-3 font-body text-sm uppercase tracking-widest"
          >
            <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
            <span className="flex h-6 w-6 flex-col justify-center gap-1.5">
              <span
                className={`h-px w-full bg-[#141210] transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-full bg-[#141210] transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[65] flex flex-col justify-center bg-[#f6f4ee]/95 px-6 backdrop-blur-2xl md:px-12"
          >
            <nav className="mx-auto w-full max-w-[1600px]">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => go(item.href)}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.07,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block w-full border-b border-black/10 py-4 text-left font-display text-[13vw] leading-none tracking-tight text-black/80 transition-colors hover:text-[#141210] md:text-[7vw]"
                >
                  <span className="font-serif mr-4 align-top text-lg italic text-black/30">
                    0{i + 1}
                  </span>
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
