"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { images } from "@/components/data";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/MagneticButton";
import SmoothScrollBanner from "@/components/SmoothScrollBanner";

export default function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-sub",
        { y: 30, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          delay: 1.1,
        }
      );
      gsap.fromTo(
        ".hero-cta",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.35 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const move = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      gsap.to(".hero-title", { x: nx * 12, duration: 1.2, ease: "power3.out" });
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);

  return (
    <section id="top" ref={sectionRef} className="relative">
      <div className="px-6 pb-8 pt-36 md:px-12 md:pb-10 md:pt-44">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="hero-sub mb-8 flex flex-wrap items-center gap-x-8 gap-y-2 font-body text-xs uppercase tracking-[0.3em] text-black/50">
            <span>Casino Party Rentals</span>
            <span className="hidden h-px w-16 bg-black/20 sm:block" />
            <span>Birmingham &amp; Central Alabama</span>
          </div>
          <h1 className="hero-title font-display text-[13vw] font-medium leading-[0.85] tracking-tight md:text-[7.5vw]">
            <SplitText play={ready} variant="mask" type="lines" stagger={0.12}>
              Magic City Casino
            </SplitText>
            <span className="flex flex-wrap items-baseline gap-x-[0.25em]">
              <SplitText
                as="span"
                play={ready}
                variant="mask"
                type="lines"
                delay={0.15}
                className="inline-block"
              >
                Party
              </SplitText>
              <SplitText
                as="span"
                play={ready}
                variant="mask"
                type="lines"
                delay={0.27}
                className="inline-block font-serif italic text-[#c9961e]"
              >
                Rentals.
              </SplitText>
            </span>
          </h1>
          <div className="mt-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <p className="hero-sub max-w-md font-body text-base leading-relaxed text-black/60">
              Full-service casino entertainment for corporate nights,
              fundraisers, weddings and private events across Birmingham &amp;
              Central Alabama.
            </p>
            <div className="hero-cta">
              <MagneticButton
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Request Your Free Quote
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <SmoothScrollBanner
        scrollHeight={1500}
        desktopImage={images.hero}
        mobileImage={images.heroMobile}
        initialClipPercentage={25}
        finalClipPercentage={75}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-6 right-6 flex flex-wrap items-end justify-between gap-4 md:left-12 md:right-12">
          <p className="max-w-xs font-body text-sm leading-relaxed text-white/90">
            Authentic tables, real chips and the energy of a night in Vegas —
            delivered to your venue.
          </p>
          <span className="rounded-full bg-white/90 px-5 py-2.5 font-body text-xs uppercase tracking-widest text-[#141210]">
            500+ Events Hosted
          </span>
        </div>
      </SmoothScrollBanner>
    </section>
  );
}
