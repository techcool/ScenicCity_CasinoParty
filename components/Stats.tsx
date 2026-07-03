"use client";

import { stats } from "@/components/data";
import SplitText from "@/components/SplitText";
import { useCountUp } from "@/components/useCountUp";

function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { ref, display } = useCountUp(value);
  return (
    <div className="border-t border-black/10 pt-6">
      <div className="flex items-baseline font-display text-[13vw] font-medium leading-none tracking-tight md:text-[6vw]">
        <span ref={ref}>{display}</span>
        <span className="font-serif text-[#c9961e]">{suffix}</span>
      </div>
      <p className="mt-4 font-body text-xs uppercase tracking-[0.25em] text-black/45">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative px-6 py-14 md:px-12 md:py-20">
      <div className="mx-auto max-w-[1600px]">
        <SplitText
          as="p"
          type="words"
          variant="fade"
          className="mb-16 max-w-2xl font-display text-2xl leading-snug text-black/70 md:text-4xl"
        >
          Trusted by clients throughout Birmingham &amp; Central Alabama, backed
          by Casino Knight.
        </SplitText>
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
