"use client";

import { images, offerings } from "@/components/data";
import SplitText from "@/components/SplitText";
import Reveal from "@/components/Reveal";
import { Check } from "@/components/icons";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="mb-10 flex items-center gap-4 font-body text-xs uppercase tracking-[0.3em] text-black/40">
            <span className="h-px w-10 bg-[#c9961e]" /> (01) — About
          </span>
          <SplitText
            as="h2"
            type="words"
            variant="blur"
            stagger={0.05}
            className="font-display text-[8vw] font-medium leading-[1.05] tracking-tight md:text-[3.6vw]"
          >
            Professional casino entertainment for corporate nights, fundraisers,
            weddings and private events.
          </SplitText>
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <Reveal variant="up" delay={0.1}>
              <p className="font-body leading-relaxed text-black/55">
                Magic City Casino Parties brings the excitement of the casino
                floor to venues across Birmingham &amp; Central Alabama —
                authentic tables, real chips and the energy of a night in Vegas.
              </p>
            </Reveal>
            <Reveal variant="up" delay={0.2}>
              <p className="font-body leading-relaxed text-black/55">
                We are proudly backed by Casino Knight, a leading Southeast
                casino entertainment provider, so every event is delivered with
                the polish and reliability your guests deserve.
              </p>
            </Reveal>
          </div>
          <div className="mt-14">
            <p className="mb-6 font-body text-xs uppercase tracking-[0.3em] text-black/40">
              What we offer
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {offerings.map((item, i) => (
                <Reveal key={item} variant="up" delay={0.05 * i}>
                  <li className="flex items-start gap-3 border-t border-black/10 pt-3 font-body text-black/70">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#c9961e]" />
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-5">
          <Reveal variant="clip" className="h-full">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#e9e4d8]">
              <img
                src={images.about}
                alt="Elegant casino party event setup"
                className="h-full w-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
