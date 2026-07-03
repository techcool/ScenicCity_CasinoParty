"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { pricingPackages } from "@/components/data";
import SplitText from "@/components/SplitText";
import Reveal from "@/components/Reveal";
import { useCountUp } from "@/components/useCountUp";
import { useCursorHover } from "@/components/cursor";
import { ArrowUpRight, Check } from "@/components/icons";

function PackageCard({ pkg }: { pkg: (typeof pricingPackages)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cursor = useCursorHover("Book");
  const priceValue = parseInt(pkg.price.replace(/,/g, ""), 10);
  const { ref: priceRef, display } = useCountUp(priceValue);

  // Mouse-follow tilt + spotlight position
  useEffect(() => {
    const el = cardRef.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    gsap.set(el, { transformPerspective: 900 });
    const rotX = gsap.quickTo(el, "rotationX", {
      duration: 0.5,
      ease: "power3.out",
    });
    const rotY = gsap.quickTo(el, "rotationY", {
      duration: 0.5,
      ease: "power3.out",
    });
    const lift = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      rotX((py - 0.5) * -6);
      rotY((px - 0.5) * 6);
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
    };
    const enter = () => lift(-8);
    const leave = () => {
      rotX(0);
      rotY(0);
      lift(0);
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div className="pricing-card h-full will-change-transform">
      <div
        ref={cardRef}
        {...cursor}
        onClick={() =>
          document
            .querySelector("#contact")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-sm border border-black/10 bg-white/50 p-8 transition-[border-color,box-shadow] duration-500 hover:border-[#c9961e]/60 hover:shadow-[0_24px_60px_-24px_rgba(20,18,16,0.25)]"
      >
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(201,150,30,0.12), transparent 65%)",
          }}
        />
        <h3 className="relative font-display text-3xl font-medium tracking-tight">
          {pkg.name}
        </h3>
        <div className="relative mt-3 flex flex-col gap-1 font-body text-xs uppercase tracking-[0.2em] text-black/45">
          <span>{pkg.tables}</span>
          <span>{pkg.guests}</span>
        </div>
        <ul className="relative mt-8 flex-1">
          {pkg.games.map((game) => (
            <li
              key={game}
              className="flex items-start gap-3 border-t border-black/10 py-3 font-body text-sm text-black/70"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c9961e]" />
              {game}
            </li>
          ))}
        </ul>
        <div className="relative mt-10 border-t border-black/10 pt-6">
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-2xl italic text-[#c9961e]">$</span>
            <span
              ref={priceRef}
              className="font-display text-5xl font-medium tracking-tight"
            >
              {Number(display).toLocaleString("en-US")}
            </span>
          </div>
          <div className="mt-5 flex translate-y-1 items-center gap-2 font-body text-xs uppercase tracking-widest text-[#c9961e] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            Book this package <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Pricing() {
  const gridRef = useRef<HTMLDivElement>(null);

  // Cards enter from the right, one by one, driven by scroll
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(
      grid.querySelectorAll<HTMLElement>(".pricing-card")
    );
    if (!cards.length) return;
    const mm = gsap.matchMedia();

    // Wide screens: pin the row and scrub each card in sequentially
    mm.add("(min-width: 1280px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: "top 15%",
          end: "+=2200",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { x: () => window.innerWidth * 1.05, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
          i
        );
      });
      tl.to({}, { duration: 0.35 });
    });

    // Stacked layouts: slide in from the right as each card enters
    mm.add("(max-width: 1279px)", () => {
      cards.forEach((card, i) => {
        gsap.set(card, { x: 120, opacity: 0 });
        const trigger = ScrollTrigger.create({
          trigger: card,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.to(card, {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              delay: (i % 2) * 0.12,
            }),
        });
        return () => trigger.kill();
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="pricing" className="relative px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1600px]">
        <span className="mb-8 flex items-center gap-4 font-body text-xs uppercase tracking-[0.3em] text-black/40">
          <span className="h-px w-10 bg-[#c9961e]" /> (05) — Packages &amp;
          Pricing
        </span>
        <SplitText
          as="h2"
          type="words"
          variant="mask"
          className="max-w-4xl font-display text-[9vw] font-medium leading-[1] tracking-tight md:text-[4.5vw]"
        >
          Casino Party Packages
        </SplitText>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:max-w-4xl">
          <Reveal variant="up" delay={0.1}>
            <p className="font-body leading-relaxed text-black/55">
              Take your event to the next level with Magic City Casino
              Parties&apos; professional casino entertainment packages. Our
              premium casino tables, professional dealers, and customized setups
              create an unforgettable experience for corporate events,
              fundraisers, private parties, and celebrations throughout
              Birmingham and Central Alabama.
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.2}>
            <p className="font-body leading-relaxed text-black/55">
              All packages include professional staffing, casino equipment,
              setup, and breakdown, so you can enjoy a seamless casino
              experience from start to finish.
            </p>
          </Reveal>
        </div>
        <div ref={gridRef} className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pricingPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
