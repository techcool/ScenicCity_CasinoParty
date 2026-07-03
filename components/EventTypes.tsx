"use client";

import { eventTypes } from "@/components/data";
import SplitText from "@/components/SplitText";
import Reveal from "@/components/Reveal";
import { useCursorHover } from "@/components/cursor";
import { ArrowUpRight } from "@/components/icons";

type EventType = (typeof eventTypes)[number];

function EventCard({ event, index }: { event: EventType; index: number }) {
  const cursor = useCursorHover("Book");
  return (
    <Reveal
      variant="up"
      delay={(index % 2) * 0.12}
      className={index % 2 === 1 ? "md:mt-28" : ""}
    >
      <a
        href="#contact"
        {...cursor}
        onClick={(e) => {
          e.preventDefault();
          document
            .querySelector("#contact")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="group block"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#e9e4d8]">
          <img
            src={event.img}
            alt={event.title}
            className="h-full w-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
          <div className="absolute right-5 top-5 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-white text-[#050505] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </div>
          <div className="absolute bottom-5 left-5 right-5">
            <p className="max-w-sm font-body text-sm leading-relaxed text-white/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {event.blurb}
            </p>
          </div>
        </div>
        <div className="mt-5 flex items-end justify-between">
          <div>
            <h3 className="font-display text-2xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
              {event.title}
            </h3>
            <p className="mt-1 font-body text-sm text-black/45">
              {event.category}
            </p>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

export default function EventTypes() {
  return (
    <section id="events" className="relative px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-8 flex items-center gap-4 font-body text-xs uppercase tracking-[0.3em] text-black/40">
              <span className="h-px w-10 bg-[#c9961e]" /> (02) — Event Types
            </span>
            <SplitText
              as="h2"
              type="chars"
              variant="mask"
              stagger={0.02}
              className="font-display text-[11vw] font-medium leading-none tracking-tight md:text-[5.5vw]"
            >
              Every Occasion
            </SplitText>
          </div>
          <p className="max-w-xs font-body text-sm leading-relaxed text-black/50">
            Casino entertainment for every type of event across Central Alabama
            — fully delivered, set up and staffed.
          </p>
        </div>
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
          {eventTypes.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
