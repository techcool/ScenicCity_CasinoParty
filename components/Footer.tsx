"use client";

import { footerNav, EMAIL, PHONE, PHONE_HREF } from "@/components/data";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/MagneticButton";
import { useCursorHover } from "@/components/cursor";
import { Mail, Phone } from "@/components/icons";

export default function Footer() {
  const cursor = useCursorHover();
  const go = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer
      id="contact"
      className="relative overflow-hidden px-6 pb-12 pt-20 md:px-12 md:pt-28"
    >
      <div className="pointer-events-none absolute -bottom-1/3 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-[#c9961e]/5 blur-[140px]" />
      <div className="mx-auto max-w-[1600px]">
        <span className="mb-10 flex items-center gap-4 font-body text-xs uppercase tracking-[0.3em] text-black/40">
          <span className="h-px w-10 bg-[#c9961e]" /> — Get a Quote
        </span>
        <SplitText
          as="h2"
          type="lines"
          variant="mask"
          stagger={0.1}
          className="font-display text-[13vw] font-medium leading-[0.9] tracking-tight md:text-[9vw]"
        >
          Book your event
        </SplitText>
        <h2 className="font-display text-[13vw] font-medium leading-[0.9] tracking-tight md:text-[9vw]">
          <span className="font-serif italic text-[#c9961e]">today!</span>
        </h2>
        <div className="mt-14 flex flex-col items-start gap-8 md:flex-row md:items-center">
          <MagneticButton onClick={() => (window.location.href = PHONE_HREF)}>
            Book Now
          </MagneticButton>
          <div className="flex flex-col gap-3">
            <a
              href={PHONE_HREF}
              {...cursor}
              className="flex items-center gap-3 font-body text-lg text-black/60 transition-colors hover:text-[#141210]"
            >
              <Phone className="h-4 w-4 text-[#c9961e]" /> {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              {...cursor}
              className="flex items-center gap-3 font-body text-lg text-black/60 transition-colors hover:text-[#141210]"
            >
              <Mail className="h-4 w-4 text-[#c9961e]" /> {EMAIL}
            </a>
          </div>
        </div>
        <div className="mt-32 flex flex-col gap-10 border-t border-black/10 pt-10 md:flex-row md:items-end md:justify-between">
          <img
            src="/logo.png"
            alt="Scenic City Casino Parties"
            className="h-20 w-auto object-contain"
          />
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {footerNav.map((item) => (
              <button
                key={item.label}
                onClick={() => go(item.href)}
                {...cursor}
                className="group relative font-body text-sm uppercase tracking-widest text-black/60 transition-colors hover:text-[#141210]"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#141210] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>
          <p className="font-body text-sm text-black/40">
            © {new Date().getFullYear()} Magic City Casino Parties — All Rights
            Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
